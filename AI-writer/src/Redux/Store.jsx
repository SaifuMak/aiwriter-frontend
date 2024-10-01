import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import AuthSlice from  './Slices/AuthSlice'
import ArticleGenerationSlice from './Slices/ArticleGenerationSlice';
import SelectedToolSlice from './Slices/SelectedToolSlice';
import PlagiarismSlice from './Slices/PlagiarismSlice';
import NavigationSlice from './Slices/NavigationSlice';
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
    Plagiarism : PlagiarismSlice,
    SelectedTool : SelectedToolSlice,
    Navigation : NavigationSlice,
    
});
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
      // AuthStatus: persistedReducer
     
  });
  
  export const persistor = persistStore(store);
  export default store;