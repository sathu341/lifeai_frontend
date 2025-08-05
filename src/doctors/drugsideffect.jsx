import { Button, Card, Form } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
export default function DrugsideEffect(){
    const drugdetail=()=>{
        
    }
    return(
        <>
        <Card>
            <Card.Header>
                Find Drug Details
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Control name="drug" placeholder="drug name"/>
                    <Form.Group>
                        <Button variant="primary" onClick={drugdetail}>
                            Get Detail of Drug
                        </Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        
        </>
    )
}