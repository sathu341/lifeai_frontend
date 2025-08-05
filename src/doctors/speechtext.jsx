import { MicFill, MicMuteFill, ArrowClockwise, ClipboardPlusFill } from 'react-bootstrap-icons';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';
import '../App.css';
import { Button, Card, Spinner } from 'react-bootstrap';
import { fetchAssessment,extractTranscript } from './symptomapi';

export default function SpeechText() {
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
    const apiResponse = await extractTranscript(transcript);
    const extracted = apiResponse.extracted_info;

    // Parse symptoms and observations
    const symptoms = extracted
      .split("**Symptoms:**")[1]
      ?.split("**Observations:**")[0]
      ?.split("-")
      ?.map(i => i.trim())
      .filter(Boolean)
      .join(", ");

    const observations = extracted
      .split("**Observations:**")[1]
      ?.split("-")
      ?.map(i => i.trim())
      .filter(Boolean)
      .join(", ");

    setSymptomsText(symptoms || '');
    setObservationsText(observations || '');
    setResult(apiResponse);
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
    const response = await fetch("https://symptom-checkers.onrender.com/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        symptoms: symptomsText,
        observations: observationsText || "N/A",
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    setDiagnosisResult(data); // diagnoses, final_symptoms, recommended_tests
  } catch (error) {
    console.error(error.message);
    setDiagnosisResult({ error: error.message });
  }
  setLoading(false);
};


  return (
    <>
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

 {symptomsText && (
  <>
    <Card className="my-3">
      <Card.Header>Editable Symptoms</Card.Header>
      <Card.Body>
        <textarea
          className="form-control"
          rows={3}
          value={symptomsText}
          onChange={(e) => setSymptomsText(e.target.value)}
        />
      </Card.Body>
    </Card>

    <Card className="my-3">
      <Card.Header>Editable Observations</Card.Header>
      <Card.Body>
        <textarea
          className="form-control"
          rows={3}
          value={observationsText}
          onChange={(e) => setObservationsText(e.target.value)}
        />
      </Card.Body>
    </Card>

    <Button variant="success" onClick={diagnoseSubmit}>
      Diagnose
    </Button>
  </>
)}
{diagnosisResult && !diagnosisResult.error && (
  <Card className="my-3">
    <Card.Header><ClipboardPlusFill/> Diagnosis & Test Suggestions</Card.Header>
    <Card.Body>
      {diagnosisResult.diagnosis_summary
        .split("\n")
        .filter(Boolean)
        .map((summaryLine, index) => {
          // Extract name and confidence
          const [diseaseWithNumber, confidence] = summaryLine.split("—").map(s => s.trim());
          const diseaseName = diseaseWithNumber.replace(/^\d+\.\s*/, '');

          // Find matching test suggestion
          const testBlock = diagnosisResult.test_suggestions
            .split("\n\n")
            .find(block => block.toLowerCase().includes(diseaseName.toLowerCase()));

          const tests = testBlock
            ? testBlock.split("\n").slice(1).flatMap(line => line.replace(/^[-•]\s*/, '').split(","))
            : [];

          return (
            <Card key={index} className="mb-3">
              <Card.Header>
                <strong>{diseaseName}</strong> — <span className="text-success">{confidence}</span>
              </Card.Header>
              <Card.Body>
                <strong>Recommended Tests:</strong>
                <ul>
                  {tests.map((test, i) => (
                    <li key={i}>{test.trim()}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          );
        })}
    </Card.Body>
  </Card>
)}


    </>
  );
}
