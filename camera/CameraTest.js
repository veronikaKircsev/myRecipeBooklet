import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image, Modal } from 'react-native';
import * as FileSystem from 'expo-file-system';

let imageUriExport = null;

export default function CameraScreen() {
    const {facing, setFacing} = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState();
    const [confirmPhoto, setConfirmPhoto] = useState(false);
    const [loadedPhotoUri, setLoadedPhotoUri] = useState(null);
    // let cameraRef = useRef();
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

      imageUriExport = imageUri;

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
      console.log("xxxxxxxxxxxxxxxxxx");

      const fileName = "photo_1";
      const photoUri = await getPhotoAsync(fileName);

      if(photoUri) {
        console.log("yyyyyyyyyyyyyyyyy");

        setImageUri(null);
        setLoadedPhotoUri(photoUri);
      }
    };

    return (
        <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <View style={styles.buttonContainer}>
            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity> */}

                <TouchableOpacity style={styles.button} onPress={takePicture}>
                    <Text style={styles.text}>Take Picture</Text>
                </TouchableOpacity>
            </View>

                {/* <Button title={'Take Picture'} onPress={takePicture} /> */}
                {/* <Button title={'Gallery'} onPress={pickImage} /> */}
        
        </CameraView>

        {confirmPhoto && (
          <Modal visible={confirmPhoto} transparent={true} animationType='slide'>
            <View style={styles.modalContainer}>
              <Image source={{ uri: imageUri }} style={styles.previewImage}/>
              <View style={styles.modalButtons}>
                <Button title="Use Photo" onPress={usePhoto} />
                <Button title="Retake" onPress={retakePhoto} />
                <Button title="Get Photo" onPress={getPhoto} />
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