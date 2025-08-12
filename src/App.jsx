import React,{ useState } from 'react'
import reactLogo from './assets/react.svg'
import Logo from '/logoo.svg'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/Home.jsx'
import Contact from './components/Contact.jsx'
import Menu from './components/Menu.jsx'
import SignUp from './components/SignUp.jsx'
import Feature from './components/Feature.jsx'
import Testinominials from './components/Testinominials.jsx'
import About from './components/About.jsx'
import Cart from './components/Cart.jsx'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SignIn from './components/SignIn.jsx';
import CheckoutSteps from './components/CheckoutSteps.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <>
          <Header />
          <Home/>
          <Footer/>
          </>
        }
        />
      <Route
        path="/Menu"
        element={
          <>
          <Header />
          <Menu/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/Testinominials"
        element={
          <>
          <Header />
          <Testinominials/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/Feature"
        element={
          <>
          <Header />
          <Feature/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/About"
        element={
          <>
          <Header />
          <About/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/Contact"
        element={
          <>
          <Header />
          <Contact/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/Cart"
        element={
          <>
          <Header />
          <Cart/>
          <Footer/>
          </>
        }
      />
      <Route
        path="/login"
        element={<SignIn/>}
      />
      <Route
        path="/signup"
        element={<SignUp/>}
      />
      <Route 
      path="/checkout"
      element={<CheckoutSteps/>}
      />

    </Routes>
    </BrowserRouter>
          <ToastContainer />

    </>
  )
}

export default App