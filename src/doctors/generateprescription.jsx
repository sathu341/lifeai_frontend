import { MicFill, MicMuteFill, ArrowClockwise, ClipboardPlusFill } from 'react-bootstrap-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import '../App.css';
import { Button, Card, Spinner } from 'react-bootstrap';

export default function GeneratePrescriiption(){
      const [transText, settransText] = useState('');
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
    settransText(transcript)
  };

//Diagnose
const generateP = async () => {
  setLoading(true);
  try {
    const response = await fetch("https://symptom-checkers.onrender.com/api/generate-prescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        transcript: transText
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const blob = await response.blob();
    const pdfUrl = window.URL.createObjectURL(blob);

    // Open PDF in new tab
    window.open(pdfUrl, "_blank");

    // OR — download automatically:
    // const link = document.createElement("a");
    // link.href = pdfUrl;
    // link.download = "prescription.pdf";
    // link.click();

  } catch (error) {
    console.error("Error generating PDF:", error.message);
    setDiagnosisResult({ error: error.message });
  }
  setLoading(false);
};


    return(
        <>
        <Card>
            <Card.Header>Generate Prescription</Card.Header>
            <Card.Body>
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
            </Card.Body>
        </Card>
     
          <div>
        <strong>Transcript:</strong>
        <div className="p-2">{transcript}</div>
      </div>
      <div className="divider"></div>
          <Card className="my-3">
      <Card.Header>Edit Your Transcript Here!</Card.Header>
      <Card.Body>
        <textarea
          className="form-control"
          rows={3}
          value={transText}
          onChange={(e) => settransText(e.target.value)}
        />
      </Card.Body>
    </Card>
      

      <div className="my-3">
        <Button onClick={generateP} variant='primary'>
         Generate Perscription
        </Button>
      </div>

      {loading && <Spinner animation="border" variant="primary" />}
       {diagnosisResult}
        
        </>
    )
}