import { Container,Row,Col,Button, Card, Form, FloatingLabel } from "react-bootstrap"
import { JournalMedical } from "react-bootstrap-icons"
import { useState } from "react"
import axios from "axios"
import '../App.css'
import { useContext } from "react"
import contextdes from "../contextvar"
export default function TreatmentPlan(){
    const [disease,setDisease]=useState("")
    const [result,setResult]=useState("")
    const {diseasname}=useContext(contextdes)
    const getTreatment=()=>{
       try{
             axios.post("https://symptom-checkers.onrender.com/api/treatment",
                {disease_name:disease}
             ,{headers:{'Content-Type':'application/json'}})
             .then((res)=>{
                 setResult(res.data.treatment_plan)
             })
             .catch(err => console.log(err))
       }
       catch(err){
        console.error(err)
       }
    }
    return(
        <>
        <Container>
            <Row>
                <Col>
                 <Card>
                    <Card.Header>
                       <JournalMedical/> Treament Plan For Disease
                    </Card.Header>
                    <Card.Body>
                        <Form>
                           
                               
                                    <Form.Control type="text" onChange={(e)=> setDisease(e.target.value)}
                                    name="disease" required/>

                             
                                
                                {diseasname}
                            
                            <Form.Group className="m-3">
                                <Button variant="primary" onClick={getTreatment}>
                                    Get Treatment
                                </Button>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                 </Card>
                
                </Col>
            </Row>
           { result && 
  <Row>
    <Col>
      <Card>
        <Card.Header>
          Treatment Plan Suggestion
        </Card.Header>
        <Card.Body>
          <ul className="plan">
            {result.split(/\n|\r/).filter(line => line.trim() !== "").map((item, index) => (
              <li className="planlist" key={index}>{item.trim()}</li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </Col>
  </Row>
}
        </Container>
        </>
    )
}