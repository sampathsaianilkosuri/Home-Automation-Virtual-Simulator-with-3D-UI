import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import AppLayout from './components/layout/AppLayout';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <AppLayout />
    </Provider>
  );
}

export default App;