import { useParams,Link } from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import NotFound from "../components/NotFound";
import DictionarySearch from "../components/DictionarySearch";
import useFetch from '../hooks/UseFetch.js'
import { useEffect } from "react";
    export default function Definition(){
    let {search} = useParams();
    const  {request,data:[{meanings:word}]=[{}],error} = useFetch("https://api.dictionaryapi.dev/api/v2/entries/en/"+search) 
    useEffect(()=>{
        request()
       },[])
    if(error === 404){
        return (
        <>      <NotFound />
            <Link to='/dictionary'>Search another term</Link>
        </>)
    }
    if(error){
        return (
        <>    <p>something went wrong,try again </p>
            <Link to='/dictionary'>Search another term</Link>
            
        </>)
    }
  
return (
<>
{word ?(
    <>    
        <h1>Here is  a definition</h1>
       { word.map((meaning) =>{
        return (
        <p key={uuidv4()}>
        {meaning.partOfSpeech+ ': '} 
        {meaning.definitions[0].definition}
        </p>
        );
    })}
    <p>Search new word:</p>
    <DictionarySearch />
</>
):null}


</>
)}