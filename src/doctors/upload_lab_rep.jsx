import { useState } from "react";
import { Button, Card, Form, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

export default function LabReportInterpreter() {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "https://symptom-checkers.onrender.com/api/interpret-lab-report/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSummary(res.data.summary || "No summary returned.");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-4 my-4 shadow">
      <h4>🧪 Upload Lab Report for Interpretation</h4>
      <Form onSubmit={handleUpload}>
        <Form.Group className="my-3">
          <Form.Label>Select PDF or Image file</Form.Label>
          <Form.Control
            type="file"
            accept=".pdf, .jpg, .jpeg, .png"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Upload & Analyze"}
        </Button>
      </Form>

      {summary && (
        <Alert variant="success" className="mt-4">
          <Alert.Heading>📝 Report Summary</Alert.Heading>
          <p>{summary}</p>
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="mt-4">
          <strong>Error:</strong> {error}
        </Alert>
      )}
    </Card>
  );
}
