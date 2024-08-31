import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import AuthSlice from  './Slices/AuthSlice'
import ArticleGenerationSlice from './Slices/ArticleGenerationSlice';
import { combineReducers } from 'redux';

// const persistConfig = {
//     key: 'auth',
//     storage,
   
//   };

  const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    auth: AuthSlice,
    articleGeneration: ArticleGenerationSlice, 
    
});
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
      // AuthStatus: persistedReducer
     
  });
  
  export const persistor = persistStore(store);
  export default store;