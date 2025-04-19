import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  chart: {
    borderWidth: 1,
  },
  container: {position: 'relative'},
  overlay: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
