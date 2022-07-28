import { FC, useEffect, useState } from "react";
import {Switch, Route} from "react-router-dom";
import About from "./Components/About/About";
import Cart from "./Components/Cart/Cart";
import Home from "./Components/Home/Home";
import Nav from "./Components/Nav/Nav";
import Sidebar from "./Components/Sidebar/Sidebar";
import { AnimatePresence } from "framer-motion";
import Menubar from "./Components/Menubar/Menubar";
import { useAuth0 } from "@auth0/auth0-react";

import { signInWithCustomToken } from "firebase/auth";
import { auth } from "./lib/firebase"; 



const App:FC = () => {

  //variables
  const { loginWithRedirect, logout, user, isAuthenticated, getIdTokenClaims, getAccessTokenSilently } = useAuth0();
  const [isSelectedMenu, setIsSelectedMenu] = useState<boolean>(false);
  const [isEmailChecker, setIsEmailChecker] = useState<boolean>(false);

  //func types

  let logIn: () => void
  let logOut: () => void
  let selectionMenu: () => void;

  //functionalities

  logIn = () => {
    const response = loginWithRedirect()
    console.log(response);
  }

  logOut = () => {
    logout({returnTo: window.location.origin})
  }

  selectionMenu = () => {
    isSelectedMenu ? setIsSelectedMenu(false) : setIsSelectedMenu(true);
  }



  useEffect(() => {
    const authenticate = async() => {
      const claims = await getIdTokenClaims();
      const response = await fetch('http://localhost:3001/firebase', {
        headers: {
          'Authorization': `Bearer ${claims?.__raw}`
        }
      })
      console.log(response)
    }
    isAuthenticated && authenticate();
  }, [isAuthenticated])  



  return (
    <div className="App">
      <AnimatePresence>
        {isSelectedMenu && <Menubar selectionMenu={selectionMenu}/>}
      </AnimatePresence>

      <div className="z-0">
        <Nav logIn={logIn} selectionMenu={selectionMenu}/>
        
        <div className="grid grid-cols-6">
          <div className="col-span-1">
            <Sidebar logOut={logOut}/>
          </div>

          <div className="col-span-6 md:col-span-5 overflow-y-scroll" style={{height: '88vh'}}>
            <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route exact path="/cart">
                  <Cart/>
                </Route>
                { window.screen.width < 768 &&
                  <Route exact path="/about">
                    <About/>
                  </Route>
                }
                
                <Route exact path="/:token">
                  <Home/>
                </Route>
                
            </Switch>
          </div>
        </div>
      </div>
    
    </div>
    
  );
}

export default App;
