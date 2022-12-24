import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import BooksProvider from './components/BooksContext';
import { MenuProvider } from './components/MenuContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
const domain= process.env.REACT_APP_AUTH0_DOMAIN;
const clientId= process.env.REACT_APP_AUTH0_CLIENT_ID;
root.render(
    <Auth0Provider
    domain={domain} clientId={clientId}
    redirectUri={window.location.origin}
    > 
    <MenuProvider>
    <BooksProvider>
    <App />
    </BooksProvider>
    </MenuProvider>
    </Auth0Provider>
);

