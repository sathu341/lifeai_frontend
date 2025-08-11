import { MicFill, MicMuteFill, ArrowClockwise, ClipboardPlusFill } from 'react-bootstrap-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import '../App.css';
import { Button, Card, Spinner } from 'react-bootstrap';
import { fetchAssessment,extractTranscript } from './symptomapi';
import axiso from 'axios'

export default function LifeBot() {
    const [symptomsText, setSymptomsText] = useState('');
const [observationsText, setObservationsText] = useState('');
const [diagnosisResult, setDiagnosisResult] = useState(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [language, setLanguage] = useState('en-IN');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>;
  }

  const startMic = () => {
    SpeechRecognition.startListening({ continuous: true, language });
  };

  const stopMic = () => {
    SpeechRecognition.stopListening();
  };

  const speechSubmit = async () => {
  if (!transcript.trim()) return;

  setLoading(true);
  try {
   

    // Parse symptoms and observations
    const symptoms = transcript
      

    setSymptomsText(symptoms || '');
   
  } catch (error) {
    console.error(error.message);
    setResult({ error: error.message });
  }
  setLoading(false);
};

//Diagnose
const diagnoseSubmit = async () => {
  if (!symptomsText.trim()) return;

  setLoading(true);
  try {
    const response = await fetch("https://symptom-checkers.onrender.com/api/lifebot-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_input: symptomsText,
        
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    setDiagnosisResult(data.response); // diagnoses, final_symptoms, recommended_tests
  } catch (error) {
    console.error(error.message);
    setDiagnosisResult({ error: error.message });
  }
  setLoading(false);
};
const generatePdf = async (e) => {
  e.preventDefault();
  const url = "https://symptom-checkers.onrender.com/api/lifebot-generate-pdf";
 

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text:diagnosisResult,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const blob = await response.blob();

    // ✅ Create object URL directly from blob
    const pdfUrl = window.URL.createObjectURL(blob);

    // ✅ Open in new tab
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("PDF generation failed:", error.message);
  }
};


  return (
    <>
      <h3>🔮LifeBot</h3>
      <p>Microphone: {listening ? '🎤 Listening...' : '🛑 Stopped'}</p>
      <p>
        Language:
        <select
          className='language-select'
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-IN">English (India)</option>
          <option value="ml-IN">Malayalam (India)</option>
          <option value="hi-IN">Hindi (India)</option>
          <option value="fr-FR">French</option>
          <option value="es-ES">Spanish</option>
          <option value="de-DE">German</option>
          <option value="ar-SA">Arabic</option>
          <option value="ta-IN">Tamil</option>
        </select>
      </p>

      <div className='mic'>
        <MicFill className='mic-listen' onClick={startMic} />
        <MicMuteFill className='mic-listen' onClick={stopMic} />
        <ArrowClockwise className='mic-listen' onClick={resetTranscript} />
      </div>

      <div className="divider"></div>

      <div>
        <strong>Transcript:</strong>
        <div className="p-2">{transcript}</div>
      </div>

      <div className="my-3">
        <Button onClick={speechSubmit} variant='outline-success'>
          Submit Speech
        </Button>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}


  <>
    <Card className="my-3">
      <Card.Header>📜Editable Content & Enter your Content </Card.Header>
      <Card.Body>
        <textarea
          className="form-control"
          id="content"
          rows={3}
          value={symptomsText}
          onChange={(e) => setSymptomsText(e.target.value)}
        />
      </Card.Body>
    </Card>

    
    <Button variant="success" onClick={diagnoseSubmit}>
     Submit
    </Button>
  </>

{diagnosisResult && !diagnosisResult.error && (

   <Card>
    <Card.Header>
        Response
    </Card.Header>

    <Card.Body>
        <textarea
          style={{height:'auto',minHeight:'200px'}}
          className="form-control"
          rows={3}
          value={diagnosisResult}
          onChange={(e) => setDiagnosisResult(e.target.value)}
        />
    </Card.Body>
    <Card.Footer>
        <Button variant='info' onClick={generatePdf}>
             Generate
        </Button>
    </Card.Footer>
   </Card>
)}


    </>
  );
}
