import { useState } from 'react'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import PasswordChange from './Pages/PasswordChange'
import ForgotPassword from './Pages/ForgotPassword'
import EmailConfirmation from './Pages/EmailConfirmation'
import ArticleGeneration from './Pages/ArticleGeneration'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/Store'

import PublicRoutes from './Routes/PublicRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import Demo from './Pages/Demo'


function App() {

  return (
  

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>

              {/* <Route path="/" element={<Home />} /> */}

              {<Route path='/login' element={<PublicRoutes />}>
                <Route index element={<Login />} />
              </Route>}

              {<Route path='/forgot-password' element={<PublicRoutes />}>
                <Route index element={<ForgotPassword />} />
              </Route>}

              {<Route path='/verify-email' element={<PublicRoutes />}>
                <Route index element={<EmailConfirmation />} />
              </Route>}

              {<Route path='/' element={<PrivateRoutes />}>
                <Route index element={<Home />} />
              </Route>}


              {<Route path='/password-change' element={<PrivateRoutes />}>
                <Route index element={<PasswordChange />} />
              </Route>}

              {<Route path='/article-generation' element={<PrivateRoutes />}>
                <Route index element={<ArticleGeneration />} />
              </Route>}

              {<Route path='/demo' element={<PrivateRoutes />}>
                <Route index element={<Demo />} />
              </Route>}


              {/* <Route path="/login" element={<Login />} /> */}
              
              {/* <Route path="/password-change" element={<PasswordChange />} /> */}
              {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}

              {/* <Route path="/article-generation" element={<ArticleGeneration />} /> */}

              {/* <Route path="/verify-email" element={<EmailConfirmation />} /> */}

            </Routes>
          </Router>
        </PersistGate>
      </Provider >

  )
}

export default App
