import RNFS from 'react-native-fs';

export const deleteFile = async (path: string | undefined) => {
  if (!path) {
    console.log('File path is undefined');
    return;
  }

  try {
    await RNFS.unlink(path);
    console.log('File deleted!');
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
};
