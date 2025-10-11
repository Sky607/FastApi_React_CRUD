import { useNavigate } from "react-router-dom"
import { useState } from "react"
export default function DictionarySearch(){
    const [word,setWord]=useState();
    const navigate=useNavigate()
return(
    <form className="my-3 flex space-between space-x-3 " 
    onSubmit={()=>{
        navigate("/dictionary/" + word)
    }}>
    <input className="shrink min-w-0 rounded p-2 hover:bd-blue-700"type="text" placeholder="search..." onChange={(e)=>{
        setWord(e.target.value)
    }
    }/>
    <button className=' bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 rounded'>Search</button>
    </form >
)
}