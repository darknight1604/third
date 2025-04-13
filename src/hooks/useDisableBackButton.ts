import {useFocusEffect} from '@react-navigation/native';
import {BackHandler} from 'react-native';
import {useCallback} from 'react';

export function useDisableBackButton(shouldDisable: boolean = true) {
  useFocusEffect(
    useCallback(() => {
      if (!shouldDisable) {
        return;
      }

      const backAction = () => {
        return true; // 👈 prevent back button
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // 🧹 cleanup
    }, [shouldDisable]),
  );
}
