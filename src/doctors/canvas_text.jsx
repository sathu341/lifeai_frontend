import { useRef, useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function HandwritingToText() {
  const canvasRef = useRef(null);
  const isDrawing = useRef(false);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set up white background initially
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const getMousePos = (e) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const startDrawing = (e) => {
      isDrawing.current = true;
      const { x, y } = getMousePos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!isDrawing.current) return;
      const { x, y } = getMousePos(e);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    const stopDrawing = () => {
      isDrawing.current = false;
      ctx.closePath();
    };

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseleave', stopDrawing);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', stopDrawing);
      canvas.removeEventListener('mouseleave', stopDrawing);
    };
  }, []);

  const handleClear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setExtractedText('');
  };

  const handleSubmit = () => {
    setLoading(true);
    const canvas = canvasRef.current;
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('file', blob, 'handwriting.png');

      axios
        .post('https://symptom-checkers.onrender.com/api/extract-text', formData)
        .then((res) => {
          setExtractedText(res.data.text || 'No text found');
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, 'image/png');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h4>📝 Draw on Canvas</h4>
      <canvas
        ref={canvasRef}
        width={800}
        height={400}
        style={{ border: '2px solid #000', cursor: 'crosshair' }}
      />
      <div className="my-3">
        <Button variant="danger" className="me-2" onClick={handleClear}>
          Clear
        </Button>
        <Button variant="success" onClick={handleSubmit} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Extract Text'}
        </Button>
      </div>

      {extractedText && (
        <div>
          <h5>🧠 Extracted Text:</h5>
          <p style={{ whiteSpace: 'pre-wrap' }}>{extractedText}</p>
        </div>
      )}
    </div>
  );
}
