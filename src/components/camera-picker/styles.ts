import {DIMENSION} from '@third/constants';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderStyle: 'dotted', // <-- this is the magic
    borderRadius: DIMENSION.BORDER_RADIUS, // optional: rounded corners
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
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: DIMENSION.BORDER_RADIUS,
    backgroundColor: '#f5f5f5',
    borderWidth: 0.5,
  },
});
