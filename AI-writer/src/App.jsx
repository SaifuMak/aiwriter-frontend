import { useState } from 'react'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import PasswordChange from './Pages/PasswordChange'
import ArticleGeneration from './Pages/ArticleGeneration'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/Store'


function App() {

  return (
  

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/password-change" element={<PasswordChange />} />
              <Route path="/article-generation" element={<ArticleGeneration />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider >

  )
}

export default App
