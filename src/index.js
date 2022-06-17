import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import App from './pages/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <BrowserRouter>
        <App />
    </BrowserRouter>

);

{/* <React.StrictMode>
</React.StrictMode> *************** What is this, why did it cause to fail, was wrapped around Browswer Router above*/}