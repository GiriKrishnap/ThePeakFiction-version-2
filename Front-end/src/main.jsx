import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"

import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID} >
    <StrictMode>
      <App />
    </StrictMode>
  </GoogleOAuthProvider>

);


