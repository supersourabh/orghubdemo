import React from 'react';

const  myFunction=()=> {
    setTimeout(showPage, 3000);
  }
  
  function showPage() {
    //document.getElementById("loader").style.display = "none";
    //document.getElementById("myDiv").style.display = "block";
  }




export default function LoadingBox(props){
  const height = props.para
  

    return (
    <div className='loading' >
    
        <i className = 'fa fa-spinner fa-spin'> </i> 

    </div>

    )}