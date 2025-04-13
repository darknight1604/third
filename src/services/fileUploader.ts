import storage from '@react-native-firebase/storage';

const storagePath = '/third/dev/images';

export const uploadImage = async (
  imagePath: string,
  onPost: (publicUrl?: string, refPath?: string) => void,
) => uploadFile(imagePath, onPost);

const uploadFile = async (
  uri: string,
  onPost: (publicUrl?: string, refPath?: string) => void,
) => {
  try {
    const fileName = uri.substring(uri.lastIndexOf('/') + 1);
    const path = `${storagePath}/${fileName}`;
    const reference = storage().ref(path);
    const task = reference.putFile(uri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    await task;
    // Get the download URL
    const url = await reference.getDownloadURL();
    onPost(url, path);
    console.log('Image uploaded successfully! Download URL:', url);
  } catch (error) {
    console.log('Upload file ', uri, ' failed', ' ', error);
  }
};

export const deleteImage = (refPath?: string) => {
  if (!refPath) {
    return;
  }
  try {
    const reference = storage().ref(refPath);
    reference.delete();
    console.log('Image deleted successfully!: ', refPath);
  } catch (error) {
    console.log('Image deleted failed!: ', refPath);
    console.log(error);
  }
};
