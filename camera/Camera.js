import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect, useContext } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
// import * as MediaLibrary from 'expo-media-library';
import { CameraContext } from '../context/CameraContextProvider';

let imageUriExport = null;
let imageUriExportIngredients = null;
let imageUriExportInstructions = null;
let imageUriExportNotice = null;
let imageUriExportDish = null;

const INGREDIENTS = 'ingredients';
const INSTRUCTIONS = 'instructions';
const NOTICE = 'notice';
const DISH = 'dish';

export default function CameraScreen({navigation, route}) {

    const { cameraContext, setCameraContext } = useContext(CameraContext);

    const {source} = route.params;

    const {facing, setFacing} = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState();
    const [confirmPhoto, setConfirmPhoto] = useState(false);
    const [loadedPhotoUri, setLoadedPhotoUri] = useState(null);

    const [albums, setAlbums] = useState(null);
    // const [permissionMediaLibrary, requestPermissionMediaLibrary] = MediaLibrary.usePermissions();

    let cameraRef = useRef(null);

    useEffect(() => {
        const requestPermissions = async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          requestPermission(status === 'granted');
        };
        requestPermissions();
      }, []);

    const takePicture = () => {
        if (cameraRef.current) {
            cameraRef.current?.takePictureAsync({ skipProcessing: true, })
            .then((photoData) => {
                if (photoData.uri) {
                    setImageUri(photoData.uri); 
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

    async function getPhotoAsync(fileName) {
      const fileUri = FileSystem.documentDirectory + fileName + '.jpg';

      try {
        const fileExists = await FileSystem.getInfoAsync(fileUri);
        if(fileExists.exists) {
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
      } catch (error) {
          console.error('Error while reading file:', error);
      }
    }

    const usePhoto = async () => {
      setConfirmPhoto(false);

      console.log("route: " + source);

      if(source === INGREDIENTS) {
        imageUriExportIngredients = imageUri;
      } else if(source === INSTRUCTIONS) {
        imageUriExportInstructions = imageUri;
      } else if(source === NOTICE) {
        imageUriExportNotice = imageUri;
      } else if(source === DISH) {
        imageUriExportDish = imageUri;
      }

      setCameraContext(!cameraContext);

      navigation.goBack();

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


    // async function getAlbums() {
    //   if (permissionMediaLibrary.status !== 'granted') {
    //     await requestPermissionMediaLibrary();
    //   }
    //   const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
    //     includeSmartAlbums: true,
    //   });
    //   setAlbums(fetchedAlbums);
    // }

    return (
        <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
                
                {/* <TouchableOpacity style={styles.button} onPress={getAlbums}>
                  <Text style={styles.text}>Get albums</Text>
                <Button onPress={getAlbums} title="Get albums" />
                  <ScrollView>
                    {albums && albums.map((album) => <AlbumEntry album={album} />)}
                  </ScrollView>
                  </TouchableOpacity>  */}
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

// function AlbumEntry({ album }) {
//   const [assets, setAssets] = useState([]);

//   useEffect(() => {
//     async function getAlbumAssets() {
//       const albumAssets = await MediaLibrary.getAssetsAsync({ album });
//       setAssets(albumAssets.assets);
//     }
//     getAlbumAssets();
//   }, [album]);

//   return (
//     <View key={album.id} style={styles.albumContainer}>
//       <Text>
//         {album.title} - {album.assetCount ?? 'no'} assets
//       </Text>
//       <View style={styles.albumAssetsContainer}>
//         {assets && assets.map((asset) => (
//           <Image source={{ uri: asset.uri }} width={50} height={50} />
//         ))}
//       </View>
//     </View>
//   );
// }

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
    height: '70%',
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

export const getImageUriExportNotice = () => {
  return imageUriExportNotice;
}

export const getImageUriExportDish = () => {
  return imageUriExportDish;
};

export const resetImageUris = () => {
  imageUriExportIngredients = null;
  imageUriExportInstructions = null;
  imageUriExportDish = null;
  imageUriExportNotice = null;
}