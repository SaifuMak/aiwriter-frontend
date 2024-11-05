import { useState } from 'react'
import Home from './Pages/Home/Home'
import Login from './Pages/Login'
import PasswordChange from './Pages/PasswordChange'
import ForgotPassword from './Pages/ForgotPassword'
import EmailConfirmation from './Pages/EmailConfirmation'
import ArticleGeneration from './Pages/ArticleGeneration'
import Plagiarism from './Pages/Plagiarism'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './Redux/Store'

import PublicRoutes from './Routes/PublicRoutes'
import PrivateRoutes from './Routes/PrivateRoutes'
import UnrestrictedRoutes from './Routes/UnrestrictedRoutes'

import Demo from './Pages/Demo'
import ArticleGenerate2 from './Pages/ArticleGenerate2'
import ArticleRewriter from './Pages/ArticleRewriter'
import WorkSheet from './Pages/WorkSheet'
import { Toaster, toast } from 'sonner';
import WriterStep from './Pages/WriterStep'
import PaymentSuccessPage from './Pages/PaymentSuccessPage'

import Signup from './Pages/Signup'

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

              {<Route path='/' element={<UnrestrictedRoutes />}>
                <Route index element={<Home />} />
              </Route>}


              {<Route path='/payment-success' element={<UnrestrictedRoutes />}>
                <Route index element={<PaymentSuccessPage />} />
              </Route>}

              
              {<Route path='/password-change' element={<PrivateRoutes />}>
                <Route index element={<PasswordChange />} />
              </Route>}

              {<Route path='/article-generation' element={<UnrestrictedRoutes />}>
                <Route index element={<ArticleGeneration />} />
              </Route>}

              {<Route path='/quick-article-generation' element={<PrivateRoutes />}>
                <Route index element={<ArticleGenerate2 />} />
              </Route>}

              {<Route path='/plagiarism-checker' element={<PrivateRoutes />}>
                <Route index element={<Plagiarism />} />
              </Route>}

              {<Route path='/demo' element={<PrivateRoutes />}>
                <Route index element={<Demo />} />
              </Route>}

              {<Route path='/work' element={<PrivateRoutes />}>
                <Route index element={<WorkSheet />} />
              </Route>}

              {<Route path='/choose-article-writer' element={<PrivateRoutes />}>
                <Route index element={<WriterStep />} />
              </Route>}

              {<Route path='/article-rewriter' element={<PrivateRoutes />}>
                <Route index element={<ArticleRewriter />} />
              </Route>}

              {<Route path='/register' element={<UnrestrictedRoutes />}>
                <Route index element={<Signup />} />
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
