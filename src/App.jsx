import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/Login";
 const router = createBrowserRouter([
   {  
    path: "/",
    element:  <><Navbar /><Home /></>,
  },
   {  
    path: "/signup",
    element:  <><Signup/></>,
  },
   {  
    path: "/login",
    element:  <><Login/></>,
  },
]);

function App() {
  return (
<>
    <RouterProvider router={router} />
</>
  );
}

export default App;
