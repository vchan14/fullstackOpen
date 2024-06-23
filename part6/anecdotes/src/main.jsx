import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import App from './App'
import {configureStoreObj} from "./store.js";



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={configureStoreObj}>
    <App />
  </Provider>
)

/**
 *
 * Install Redux Toolkit for the project.
 * Move the Redux store creation into the file store.js
 * and use Redux Toolkit's configureStore to create the store.
 *
 * Change the definition of the filter reducer and
 * action creators to use the Redux Toolkit's createSlice function.
 *
 * Also, start using Redux DevTools to debug the application's state easier.
 */