import React from 'react';

import './App.css';


export default function LoadingPage(){
    document.title = "Loading - User";
    return(
        <>
         
   <div className="loading-page">
    <div className="loading-spinner"></div>
   </div>
        
        </>
    )
}