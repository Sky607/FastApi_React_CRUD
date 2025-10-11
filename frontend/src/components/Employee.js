// Define the functional component
function  MyComponent  (props) {
  return (
    <>
    <div className="m-2 py-4 px-4 max-w-sm  bg-white rounded-xl shadow-lg sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:gap-x-6">
  <img className="object-cover rounded-full h-[100px] w-[100px] block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0" src={props.img} alt="Woman's Face" />
  <div className="text-center space-y-1 sm:text-left">
    <div className="space-y-0.5">
      <p className="text-lg text-black font-semibold">
        {props.name}
      </p>
      <p className="text-slate-500 font-medium">
       {props.role}
      </p>
    </div>
   {props.editEmployee}
     </div>
</div>
  </>
  );
  
};


// Export the component to use in other files
export default MyComponent;