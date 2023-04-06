import React from 'react';
import Navigator from './Navigator';
import {EstudanteProvider} from '../context/EstudanteProvider';
import {AuthUserProvider} from '../context/AuthUserProvider';

const Providers = () => {
  return (
    <AuthUserProvider>
      <EstudanteProvider>
        <Navigator />
      </EstudanteProvider>
    </AuthUserProvider>
  );
};

export default Providers;
