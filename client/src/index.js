import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { Auth0Provider } from "@auth0/auth0-react";
import BooksProvider from './components/BooksContext';
import  ThemeProvider from './components/ThemeContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Auth0Provider
    domain="dev-xhs6s7vmewmk7kug.us.auth0.com"
    clientId="ZC3uzXBDGM9u2sfqZn8QvWjRoydPWlpk"
    redirectUri={window.location.origin}
    >
    <ThemeProvider>  
    <BooksProvider>
    <App />
    </BooksProvider>
    </ThemeProvider> 
    </Auth0Provider>
  // </React.StrictMode>
);

