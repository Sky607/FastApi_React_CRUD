import { useParams,Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { baseUrl } from "../shared";

export default function Customer(){
   const {id}=useParams()
   const[customer,setCustomers]=useState()
   const [tempCustomer,setTempCustomer] =useState()
   const [changed ,setChanged] = useState(false)
   const [error,setError] = useState()
   const navigate=useNavigate()
   useEffect(() =>{
    if (!customer) return;
    if(!tempCustomer) return;
    let equal = true
    if(customer.name !== tempCustomer.name) equal =false
    if(customer.industry !== tempCustomer.industry) equal =false
    if(equal)  {setChanged(false)
         setError(undefined)}
   })
   useEffect(()=>{
    const url=baseUrl + "api/customer/"+id
    fetch(url,{headers:{"Content-Type": "application/json",
        Authorization: 'Bearer  ' + localStorage.getItem('access'),
    }}).then( (response)=>
        {
            if(!response.ok) throw new Error("something went wrong")
           else if (response.status===401){
                navigate("/login")
            }
            return response.json()

        }).then((data)=>{
        setCustomers(data.customers)
       setTempCustomer(data.customers)
    }).catch((error)=>{
        console.log(error)
    })
   },[])

   function updatedCustomer(e){
    e.preventDefault()
    const url=baseUrl+ 'api/customer/'+id
    fetch(url,{method:'POST',headers:{'Content-Type':'application/json',
        Authorization: 'Bearer  ' + localStorage.getItem('access'),
    },body:JSON.stringify(tempCustomer)})
    .then((response)=>{
        if(!response.ok)  {    
         throw new Error("something went wrong")}
        
       return  response.json()
    }).then(data=>{
        setCustomers(data.customers)
        setChanged(false)
        setError(undefined)
       
    }).catch(error=>{
        setError(error.message)
        console.log(error)
    })
   }
   return (
    <div className="p-3">
    {customer ? (
        <div>
           <form  onSubmit={(e)=>updatedCustomer(e)}
        id="form-save" className="w-full max-w-sm ">
            <div className="md:flex md:items-center mb-6">
                <div className=" md:w-1/4">
                <label for="name"className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Name
                </label>
                </div>
                <div className="md:w-4/5"></div>
            <input id="name"className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                 type="text" value={tempCustomer.name} onChange={(e)=>{
                setChanged(true)
                setTempCustomer({...tempCustomer,name:e.target.value})
            }}/>
            </div>
            <div className="md:flex md:items-center mb-6">
                <div className=" md:w-1/4">
                <label for="industry"className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Industry
                </label>
                </div>
                <div className="md:w-3/4"></div>
            <input id="industry"className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                 type="text" value={tempCustomer.industry} onChange={(e)=>{
                setChanged(true)
                setTempCustomer({...tempCustomer,industry:e.target.value})
            }}/>
            </div>
            
           
            
                  </form>
            {changed ? <div className="mb-2 mx-2 "><button  className='mr-2  bg-slate-400 hover:bg-red-400 text-white font-bold py-2 px-4 rounded'
            onClick={()=>{
                setTempCustomer({...customer})
                setChanged(false)
            }}>cancel</button> 
            <button form="form-save" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >save</button>
            </div>:null}
            
           
            <div>
            <button  className='bg-slate-800 hover:bg-red-400 text-white font-bold py-2 px-4 mb-4 rounded' onClick={()=>{
                const url =baseUrl + 'api/customer/' + id
                fetch(url,
                    {method: 'DELETE',
                    headers: {'Content-Type': 'application/json',
                        Authorization: 'Bearer  ' + localStorage.getItem('access'),
                     }}).then((response)=>{
                    if (!response.ok) {
                        throw new Error("something went wrong while deleting")
                    }
                   navigate('/customers')
                    
                }).catch((error)=>{console.log(error)})
            }}>Delete</button>
       
      
       </div>
          </div>
    ):null}
    
    <Link className="no-underline bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  rounded" to='/customers' >Go Back</Link>
    </div>
   )
}