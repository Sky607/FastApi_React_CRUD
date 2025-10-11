import { useState,useContext } from "react"
import { baseUrl } from "../shared"
import { useNavigate,Link } from "react-router-dom"
import { LoginContext } from "../App"
export default function Register(){
    const [username,setUsername]=useState()
    const [password,setPassword]=useState()
    const[email,setEmail]=useState()
    const navigate=useNavigate()
function UserRegister(e){
e.preventDefault()
const url=baseUrl+'api/register';
fetch(url,{method: 'POST',headers:{
    'Content-Type': 'application/json'
},
body:JSON.stringify({
    username:username,
    email:email,
    password:password,
})
}).then((response) =>{
   if(!response.ok){
    throw new Error("something went wrong")
   }
    return response.json()}).then(data=>{
        localStorage.setItem('access',data.access)
        localStorage.setItem('refresh',data.refresh)
        navigate('/Login')
    }).catch(error => {
        console.log(error)
    })
}
return(
<div>
           <form  onSubmit={UserRegister}
        id="form-save" className="w-full max-w-sm ">
             <h2>If  Registered Please <Link to="/Login">Login </Link></h2><br/>
            <div className="md:flex md:items-center mb-6">
                <div className=" md:w-1/4">
                <label for="username"className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Username
                </label>
                </div>
                <div className="md:w-4/5"></div>
            <input id="username" className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                 type="text" value={username} onChange={(e)=>{
                setUsername(e.target.value);
            }}/>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className=" md:w-1/4">
                <label for="email"className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Email
                </label>
                </div>
                <div className="md:w-3/4"></div>
            <input id="email"className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                 type="email" value={email} onChange={(e)=>{
               setEmail(e.target.value);
            }}/>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className=" md:w-1/4">
                <label for="password"className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Password
                </label>
                </div>
                <div className="md:w-3/4"></div>
            <input id="password"className="bg-gray-200 appearance-none border-2 border-gray-200 rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                 type="password" value={password} onChange={(e)=>{
               setPassword(e.target.value);
            }}/>
            </div>
            <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">Register</button>
           
            
                  </form>
                  </div>
)}