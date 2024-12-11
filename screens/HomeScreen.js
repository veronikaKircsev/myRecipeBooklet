import React, {useState, useEffect, useContext} from 'react';
import { StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import {CategoryItem} from '../components/CategoryItem';
import Popup from '../components/PopUp';
import { colors } from '../Color';
import DatabaseService from '../database_elements/DatabaseService';
import {DBChangedContext} from '../context/DBChangedContextProvider';
import FeedBack from '../components/Feedback';
import SQLiteService from '../database_elements/SQLiteService';

const sqliteService = new SQLiteService();
const databaseService = new DatabaseService();

// databaseService.syncCategoriesFromSQLite();
// databaseService.initializeDefaultCategories();
// databaseService.generateTestRecipes();

let key = 0;

export default HomeScreen = ({ navigation }) => {

  const {dBChangedContext, setDBChangedContext} = useContext(DBChangedContext);
  const [showSavedModal, setShowSavedModal] = useState(false);

    const [isPopupVisible, setPopupVisible] = useState(false);
    // const [categories, setCategories] = useState(databaseService.getAllCategories());
    const [categories, setCategories] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    useEffect(() => {
      const initializeDatabase = async () => {
          try {
              await sqliteService.initDatabase();
              const fetchedCategories = await sqliteService.getAllCategories();
              setCategories(fetchedCategories);

              databaseService.syncCategoriesFromSQLite();
              databaseService.getAllRecipesFromSQLDatabase();


              console.log('Databases initialized successfully.');
              setIsInitialized(true); 
          } catch (error) {
              console.error('Error during database initialization:', error);
          }
      };

      initializeDatabase(); 
  }, []);

    useEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={()=>{navigation.navigate('Recipies', {homeScreen:true})}}>
            <Image source={require('../assets/appIcons/search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
        ),
      });
    }, []);

    useEffect(() => {
      const updatedCategories = databaseService.getAllCategories();
      setCategories(updatedCategories);
      setShowSavedModal(true);
    }, [dBChangedContext]);

    if (!categories) {
      return (
          <View style={styles.loadingContainer}>
              <FeedBack message="Loading categories..." />
          </View>
      );
  }
    
    return (
        <View style={styles.container}>
          <FeedBack visible={showSavedModal} onClose={()=> setShowSavedModal(false)} />
          <ScrollView>
            <View style={styles.containerView}> 
            {categories.map((category) =>
                <CategoryItem key={key++} url={category.url} name={category.name} navigation={navigation}/>
                )}
            </View>
            </ScrollView>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => togglePopup()}>
                <Image source={require('../assets/appIcons/plus.png')} style={styles.image} />
                <Popup isVisible={isPopupVisible} toggle={togglePopup} navigation={navigation} />
              </TouchableOpacity>
            </View>
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        containerView: {
          flex: 1,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          marginTop: 20,
          paddingHorizontal: 5,
          paddingVertical: 5,
        },
        text: {
          fontSize: 20,
          fontWeight: 'bold',
          textAlign: 'center',
          color: colors.text,
        },
        image: {
          width: 50,
          height: 50,
        },
        button: {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.background,
          borderRadius: 50,
          margin: 20,
          width: 70,
          height: 70,
        },
        searchIcon:
      {
        width: 40,
        height: 40,	
        margin: 20,
      }
      });