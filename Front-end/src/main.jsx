import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { GoogleOAuthProvider } from "@react-oauth/google"
import { SocketProvider } from './util/NotifySocketContext';
import { StrictMode } from 'react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SocketProvider>

      <GoogleOAuthProvider clientId='914371032098-fiucf9n409fm0ka4gfpvnnt0kucs1itb.apps.googleusercontent.com' >

        <StrictMode>
          <App />
        </StrictMode>

      </GoogleOAuthProvider>

    </SocketProvider>
);


