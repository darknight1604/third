import React from 'react';

import Providers from './components/providers';
import Navigation from './routes/Navigation';

function App(): React.JSX.Element {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}

export default App;
