import {NavigationContainer} from '@react-navigation/native';
import {ReactNode, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from '../../theme';
import {
  configureFonts,
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import {navigationRef} from '../../routes/Navigation';
import {fontConfig} from '../../fonts';
import {GlobalSnackbar} from '../global-snackbar';
import {globalSnackbarRef} from '../global-snackbar/GlobalSnackbarService';

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({children}: IProvidersProps) => {
  const colorScheme = useColorScheme();
  const paperTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: colorScheme === 'dark' ? darkTheme.colors : lightTheme.colors,
      fonts: configureFonts({config: fontConfig}),
    }),
    [colorScheme],
  );

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer ref={navigationRef}>
        {children}
        <GlobalSnackbar ref={globalSnackbarRef} />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default Providers;
