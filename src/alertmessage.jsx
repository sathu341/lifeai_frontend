  import { ToastContainer, toast } from 'react-toastify'; 
  import { useEffect } from 'react';
  export default function MessageBox({message}){
     const msg=() => toast(message.content)
     useEffect(()=>{
        msg()
     },[message])
    return(
        <>
         <ToastContainer />
        </>
    )

  }