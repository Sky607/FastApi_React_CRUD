import {useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
export default function useFetch(url,{method,headers,body}={}){
const [data,setData] = useState();
const[error,setError] = useState()
const navigate=useNavigate()
function request(){
    fetch(url,{method:method,headers:headers,body:JSON.stringify(body)}).then(response=>{
        if(!response.ok){
            throw(response.status)
        }
      return  response.json()}).then(data=>setData(data)).catch(e=>{
            setError(e)
        })

    }
function appendData(newData){
    fetch(url,{method: 'POST',headers:headers,body:JSON.stringify(newData)})
    .then((response)=>{
        if(response.status===401){
        navigate('/login')
        }
        if(!response.ok){
            throw response.status
        }
        return response.json()
    }).then((d)=>{
        const submitted=Object.values(d)[0]
        const newState={...data}
        Object.values(newState)[0].push(submitted)
      setData(newState)})
    .catch((e)=>{
        setError(e)
    })
}
return {request,appendData,data,error}
}