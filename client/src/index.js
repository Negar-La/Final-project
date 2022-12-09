import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import BooksProvider from './components/BooksContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
    domain="dev-xhs6s7vmewmk7kug.us.auth0.com"
    clientId="ZC3uzXBDGM9u2sfqZn8QvWjRoydPWlpk"
    redirectUri={window.location.origin}
    > 
    <BooksProvider>
    <App />
    </BooksProvider>
    </Auth0Provider>
);

