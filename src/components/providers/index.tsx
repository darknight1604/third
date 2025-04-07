import {NavigationContainer} from '@react-navigation/native';
import {ReactNode, useMemo} from 'react';
import {useColorScheme} from 'react-native';
import {darkTheme, lightTheme} from '../../theme';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {navigationRef} from '../../routes/Navigation';

interface IProvidersProps {
  children: ReactNode;
}

const Providers = ({children}: IProvidersProps) => {
  const colorScheme = useColorScheme();
  const paperTheme = useMemo(
    () => ({
      ...DefaultTheme,
      colors: colorScheme === 'dark' ? darkTheme.colors : lightTheme.colors,
    }),
    [colorScheme],
  );

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer ref={navigationRef}>{children}</NavigationContainer>
    </PaperProvider>
  );
};

export default Providers;
