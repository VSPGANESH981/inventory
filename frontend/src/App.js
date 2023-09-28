import * as React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import AppBar from './pages/AppBar';
import ThirdParty from "./pages/ThirdParty";
import Inventory from "./pages/Inventory";
import Auth from "./pages/Auth";
import { Profile } from "./pages/Profile";
import { useAuth } from "./contexts/auth";

export default function App() {  
  const {currentUser} =useAuth();
  return (
  <>
    <AppBar />
    <Routes>
      <Route >
        {currentUser &&<Route path="/" element={
            <div className="App">
              <Profile />
            </div>
          } />
        }
        {!currentUser &&<Route path="/" element={
            <div className="App">
              <Auth />
            </div>
          } />
        }
          <Route path="/third-party" element={
            <div className="App">
                <ThirdParty/>
            </div>
            } />
            <Route path="/inventory" element={
              <div className="App">
                  <Inventory/>
              </div>
              } />
            {! currentUser &&
            <Route path="/login" element={
            <div className="App">
                <Auth/>
            </div>
            } />
          }
          {currentUser &&  <Route path="/profile" element={
            <div className="App">
                <Profile/>
            </div>
            } />
          }
          <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  </>
  );
}
//export default App;
