import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 75,
    height: 75,
    borderWidth: 1,
    borderColor: 'gray',
    borderStyle: 'dotted', // <-- this is the magic
    borderRadius: 8, // optional: rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoFile: {width: '100%', height: '100%', resizeMode: 'contain'},
  deletePhoto: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  thumbnail: {width: 100, height: 130},
});
