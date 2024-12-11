import * as FileSystem from 'expo-file-system';

class FileSystemService {
    constructor() {
        if(FileSystemService.instance) {
            return FileSystemService.instance;
        }
        FileSystemService.instance = this;
    }

    async savePhotoAsync(imageUri, fileName) {
        const fileUri = FileSystem.documentDirectory +  fileName + '.jpg';
    
        try {
            await FileSystem.copyAsync({
              from: imageUri,
              to: fileUri,
            });
            console.log('FILE SYSTEM SERVICE: Photo saved in the File System successfully');
        } catch (error) {
            console.error('FILE SYSTEM SERVICE: Error while saving photo:', error);
        }
    };

    async getPhotoAsync(fileName) {
        const fileUri = FileSystem.documentDirectory + fileName + '.jpg';
  
        try {
          const fileExists = await FileSystem.getInfoAsync(fileUri);
          if(fileExists.exists) {
            console.log("FILE SYSTEM SERVICE: Photo found: ", fileUri);
            return fileUri;
          } else {
            console.error("FILE SYSTEM SERVICE: Photo not found");
            return null;
          }
        } catch(error) {
          console.error("FILE SYSTEM SERVICE: Error while retrieving photo: ", error);
          return null;
        }
    }

}

export default FileSystemService;