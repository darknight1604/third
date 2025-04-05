import {NavigationContainer} from '@react-navigation/native';
import React, {useMemo} from 'react';

import {useColorScheme} from 'react-native';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import Navigation from './routes/Navigation';
import {darkTheme, lightTheme} from './theme';

function App(): React.JSX.Element {
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
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

export default App;
