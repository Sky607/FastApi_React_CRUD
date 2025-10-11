import { useContext, useEffect ,useState} from "react"
import { baseUrl } from "../shared"
import AddCustomer from "./AddCustomers"
import { useNavigate ,Link} from "react-router-dom"
import {LoginContext} from "../App"
import useFetch from "../hooks/UseFetch"
export default function Customers(){
   // const[LoggedIn,setLoggedIn]=useContext(LoginContext)
    //const [customer,setCustomers] =useState()
    const {request,appendData,data:{ customers} ={}}=useFetch(baseUrl + 'api/customer',
        {method:'GET',
        headers:{'Content-Type': 'application/json',
            Authorization: 'Bearer  ' + localStorage.getItem('access'),
        }})
        useEffect(()=>{
            request()
        },[])
// useEffect(()=>{
//     console.log(customers)
// },[])
    
    function AddCustomers(name ,industry){
       appendData({name:name,industry:industry})
    }
   

    return (
        <>
        {customers ? 
        (<>
        <p className="text-lg text-black font-semibold"> It is a customer list</p>
        {
        customers.map((users)=> {
            return(
               <Link to={`/customers/${users.id}`}><p key={users.id}>{users.industry}</p></Link>
                )})}</>):null}
                <AddCustomer AddCustomers={AddCustomers}/>
    </>
)
}
