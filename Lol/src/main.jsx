

import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeProvider from './context/RecipeContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <RecipeProvider>
      <App />
      <ToastContainer />
    </RecipeProvider>
  </BrowserRouter>
);
