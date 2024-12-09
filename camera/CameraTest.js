import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

let imageUriExport = null;
let imageUriExportIngredients = null;
let imageUriExportInstructions = null;
let imageUriExportDish = null;

// three camera buttons for ingredients, notice, prepare
// one button for the dish itself !!OPTIONAL!!
// FileSystem is a service
// Database save the URI of the photo file system
// Database needs to save in JSON to a file or Persistent Database from Tinybase
// get Photo from Device Library ERROR: no suitable url request handler found for ph:
// File system URI is data.ingredients || data.notice
// was lief gut, was lief nicht gut, report schreiben und senden

export default function CameraScreen({route}) {

    const {source} = route.params;

    const {facing, setFacing} = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState();
    const [confirmPhoto, setConfirmPhoto] = useState(false);
    const [loadedPhotoUri, setLoadedPhotoUri] = useState(null);

    const [albums, setAlbums] = useState(null);
    const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

    let cameraRef = useRef(null);

    useEffect(() => {
        const requestPermissions = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          requestPermission(status === 'granted');
        };
        requestPermissions();
      }, []);

    const takePicture = () => {
        console.log("takePicture(): 1");
        if (cameraRef.current) {
            console.log("takePicture(): 2");
            
            cameraRef.current?.takePictureAsync({ skipProcessing: true, })
            .then((photoData) => {
                if (photoData.uri) {
                    console.log("Foto erfolgreich aufgenommen! URI:", photoData.uri);
                    setImageUri(photoData.uri); // Pfad des Fotos speichern
                    
                    setConfirmPhoto(true);

                  } else {
                    console.error("Fotoaufnahme fehlgeschlagen!");
                  }
                setImageUri(photoData.uri);
                console.log("photoData.uri: " + photoData.uri);
            });
        }
    };
    

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
            <Text style={styles.message}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function writeFileAsync() {
      const fileUri = FileSystem.documentDirectory + 'myFile.txt';
      const content = 'Hello, World!';
  
      try {
          await FileSystem.writeAsStringAsync(fileUri, content);
          console.log('File written successfully');
      } catch (error) {
          console.error('Error while writing file:', error);
      }
    }

    async function savePhotoAsync(imageUri, fileName) {
      const fileUri = FileSystem.documentDirectory +  fileName + '.jpg';
  
      try {
          await FileSystem.copyAsync({
            from: imageUri,
            to: fileUri,
          });
          console.log('Photo saved in the File System successfully');
      } catch (error) {
          console.error('Error while saving photo:', error);
      }
    };

    async function getPhotoAsync(fileName) {
      const fileUri = FileSystem.documentDirectory + fileName + '.jpg';

      try {
        const fileExists = await FileSystem.getInfoAsync(fileUri);
        if(fileExists.exists) {
          console.log("Photo found: ", fileUri);
          return fileUri;
        } else {
          console.error("Photo not found");
          return null;
        }
      } catch(error) {
        console.error("Error while retrieving photo: ", error);
        return null;
      }
    }

    async function readFileAsync() {
      const fileUri = FileSystem.documentDirectory + 'myFile.txt';
  
      try {
          const content = await FileSystem.readAsStringAsync(fileUri);
          console.log('File content:', content);
      } catch (error) {
          console.error('Error while reading file:', error);
      }
    }

    const usePhoto = async () => {
      console.log("Foto wird verwendet: ", imageUri);
      setConfirmPhoto(false);

      // const fileName = "photo_1";
      // await savePhotoAsync(imageUri, fileName);

      // console.log("llllllllllll");
      // navigation.navigate('CreateRecipe', { imageUri: "Werwolf" });
      // console.log("CameraTest, imageUri: ", imageUri);

      // imageUriExport = imageUri;

      console.log("route: " + source);

      if(source === 'ingredients') {
        imageUriExportIngredients = imageUri;
      } else if(source === 'instructions') {
        imageUriExportInstructions = imageUri;
      } else if(source === 'dish') {
        imageUriExportDish = imageUri;
      }

    };

    // export const savePhoto = async (fileName) => {
    //   await savePhotoAsync(imageUri, fileName);
    //   setImageUri(null);
    //   console.log("const savePhoto");
    // }

    const retakePhoto = () => {
      setImageUri(null);
      setConfirmPhoto(false);
    };

    const getPhoto = async () => {
      const fileName = "photo_1";
      const photoUri = await getPhotoAsync(fileName);

      if(photoUri) {
        setImageUri(null);
        setLoadedPhotoUri(photoUri);
      }
    };

    async function getAlbums() {
      if (permissionMediaLibrary.status !== 'granted') {
        await requestPermissionMediaLibrary();
      }
      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
      setAlbums(fetchedAlbums);
    }

    return (
        <View style={styles.container}>
        <Text>Camera opened from : {source}</Text>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity> */}

                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity style={styles.button} onPress={getAlbums}>
                // <Text style={styles.text}>Get albums</Text>
                {/* <Button onPress={getAlbums} title="Get albums" /> */}
                  {/* <ScrollView> */}
                    {/* {albums && albums.map((album) => <AlbumEntry album={album} />)} */}
                  {/* </ScrollView> */}
                  {/* </TouchableOpacity> */} 
            </View>

        </CameraView>

        {confirmPhoto && (
          <Modal visible={confirmPhoto} transparent={true} animationType='slide'>
            <View style={styles.modalContainer}>
              <Image source={{ uri: imageUri }} style={styles.previewImage}/>
              <View style={styles.modalButtons}>
                <Button title="Use Photo" onPress={usePhoto} />
                <Button title="Retake" onPress={retakePhoto} />
                {/* <Button title="Get Albums" onPress={getAlbums} /> */}
              </View>
            </View>
          </Modal>
        )}
        {/* {imageUri && <Image source={{ uri: imageUri }} style={{ width: 400, height: 200 }} />} */}

        {loadedPhotoUri && (
            <Image source={{ uri: loadedPhotoUri }} style={styles.previewImage} />
        )}
        </View>
    );
}

function AlbumEntry({ album }) {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    async function getAlbumAssets() {
      const albumAssets = await MediaLibrary.getAssetsAsync({ album });
      setAssets(albumAssets.assets);
    }
    getAlbumAssets();
  }, [album]);

  return (
    <View key={album.id} style={styles.albumContainer}>
      <Text>
        {album.title} - {album.assetCount ?? 'no'} assets
      </Text>
      <View style={styles.albumAssetsContainer}>
        {assets && assets.map((asset) => (
          <Image source={{ uri: asset.uri }} width={50} height={50} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '80%',
    height: '50%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
   },
  previewImage: {
    width: '80%',
    height: '50%',
    resizeMode: 'contain',
    margin: 20,
  },
});

export const getImageUri = () => {
  return imageUriExport;
};

export const getImageUriExportIngredients = () => {
  return imageUriExportIngredients;
};

export const getImageUriExportInstructions = () => {
  return imageUriExportInstructions;
};

export const getImageUriExportDish = () => {
  return imageUriExportDish;
};

export const resetImageUris = () => {
  imageUriExportIngredients = null;
  imageUriExportInstructions = null;
  imageUriExportDish = null;

  console.log('imageUriExportIngredients' + imageUriExportIngredients + ", imageUriExportInstructions: " + imageUriExportInstructions + ", imageUriExportDish" + imageUriExportDish);
}