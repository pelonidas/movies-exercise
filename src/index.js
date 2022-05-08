import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {configureStore} from "@reduxjs/toolkit";
import movieReducer from './features/movie'

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = configureStore({
    reducer: {
        movie: movieReducer,
    }
})
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>

);

reportWebVitals();
