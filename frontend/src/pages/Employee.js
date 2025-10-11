import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import MyComponent from '../components/Employee.js';
import AddEmployee from '../components/AddEmployee.js';
import EditEmployee from '../components/EditEmployee.js';

export default function Employee() {

 const [employees,setEmployee]=useState(
  [
    {
      "id":1,
      "name":"shashi",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    },
    {
      "id":2,
      "name":"ravi",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    },
    {
      "id":3,
      "name":"rahul",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    },
    {
      "id":4,
      "name":"manoj",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    },
    {
      "id":5,
      "name":"suresh",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    },
    {
      "id":6,
      "name":"homesh",
      "role":"manager",
      "img":"https://c.pxhere.com/photos/dd/a6/business_man_businessman_corporate_suit_executive_successful_entrepreneur-675843.jpg!d"
    }
  ]
 );

 function updateEmployee(id,Newname,Newrole){
const updatedEmployee=employees.map((employee)=>{
  if(id === employee.id){
    return {...employee,name:Newname,role:Newrole}
  }
  return employee;
})
setEmployee(updatedEmployee);
 }
 function newEmployee(name,role,img){
  const newEmployee={
    id:uuidv4(),
    name:name,
    role:role,
    img:img,
  };
  setEmployee([...employees,newEmployee]);
};
  return (
   <div className="App bg-gray-300 min-h-screen">
    <div className='flex flex-wrap justify-center'>
      {employees.map((employee) => {
        const editEmployee=(
          < EditEmployee 
          id={employee.id} 
          name={employee.name}
           role={employee.role} 
           updateEmployee={updateEmployee}
           />
        )
        return (
        < MyComponent 
        key={employee.id}
        id={employee.id}
        name={employee.name} 
        role={employee.role}
        img={employee.img} 
        editEmployee={editEmployee}/>
  )})}
   
   </div>
  
 <AddEmployee newEmployee={newEmployee}/>
 </div>
 
  );
};


