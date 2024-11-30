import { CameraView, CameraType, useCameraPermissions, Camera } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


export default function CameraScreen() {
    const {facing, setFacing} = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [imageUri, setImageUri] = useState();
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
        {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
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
});
