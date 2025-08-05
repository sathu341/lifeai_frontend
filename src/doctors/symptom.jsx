
import { useEffect, useState } from "react"
import { fetchAssessment } from "./symptomapi"
export default function({transcripts}){
    const [data,setData]=useState([])
   const symptom=()=>{
      setData(fetchAssessment(transcripts.split(",").map(s => s.trim())))
    }
    return(
        <>
        <textarea clos="35" rows="5">
            {
                transcripts
            }
        </textarea>
        {data}
        </>
    )
}