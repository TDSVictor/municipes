import React from 'react'
import ReactDOM from 'react-dom/client'
import Principal from './App.jsx'
import './App.css'
import * as firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyBPeGY2Qp8nEnUcmaeA_u58rGfEh78gmzk",
  authDomain: "municipes-29f8e.firebaseapp.com",
  projectId: "municipes-29f8e",
  storageBucket: "municipes-29f8e.appspot.com",
  messagingSenderId: "52346922279",
  appId: "1:52346922279:web:56790fe20d5498c09f3502"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Principal />
  </React.StrictMode>,
)
