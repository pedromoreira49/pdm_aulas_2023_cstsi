import React from 'react';
import Navigator from './Navigator';
import { EstudanteProvider } from '../context/EstudanteProvider';

const Providers = () => {
    return(
        <EstudanteProvider>
            <Navigator />
        </EstudanteProvider>
    )
}

export default Providers;
