import Employee from './pages/Employee.js'
import Header from './components/Header.js';
import Customers from './components/Customers.js';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Definition from './pages/definition.js';
import Dictionary from './pages/Dictionary.js';
import NotFound from './components/NotFound.js';
import Customer from './pages/Customer.js';
import Login from './pages/Login.js';
import {createContext} from 'react'
import { useState,useEffect } from 'react';
import { baseUrl } from './shared.js';
import Register from './pages/Register.js';

export const LoginContext=createContext()
export default function App() {
  
  useEffect(()=>{
    function refreshToken(){
      if(localStorage.refresh){
        const url=baseUrl+ 'api/token/refresh'
        fetch(url,{method: 'POST',headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            refresh:localStorage.refresh,
          })})
          .then(response=>response.json()).then((data)=>{
            localStorage.access=data.access
            localStorage.refresh=data.refresh
            setLoggedIn(true)
          })
      }}
    
    const minute=1000*60
    refreshToken()
    setInterval(refreshToken ,minute*3)
  },[])
    const [LoggedIn,setLoggedIn] = useState(localStorage.access)
return (
  <LoginContext.Provider value={[LoggedIn,setLoggedIn]} >
<BrowserRouter>
<Header>
<Routes>
<Route path="/employees" element={<Employee/>}/>
<Route path="/customers" element={<Customers/>}/>
<Route path="/customers/:id" element={<Customer/>}/>
<Route path="/Dictionary" element={<Dictionary/>}/>
<Route path="/Login" element={<Login/>}/>
<Route path="/Dictionary/:search" element={<Definition/>}/>
<Route path="/404" element={<NotFound/>}/>
<Route path="*" element={<NotFound/>}/>
<Route path="/register" element={<Register/>}/>
</Routes>
</Header>
</BrowserRouter>
</LoginContext.Provider>
)
}