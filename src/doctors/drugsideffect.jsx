import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function DrugsideEffect() {
  const [drug, setDrug] = useState('');
  const [detail, setDetail] = useState({ common: [], serious: [] });
  const [loading, setLoading] = useState(false);

  const drugdetail = async (e) => {
    e.preventDefault();
    setLoading(true);
    setDetail({ common: [], serious: [] });

    try {
      const res = await axios.post("https://symptom-checkers.onrender.com/api/drug-side-effects", {
        drug_info: drug,
      });

      const fullText = res.data.side_effects || "";

      // Extract Common and Serious side effects using regex
      const commonMatch = fullText.match(/\*\*Common Side Effects:\*\*\n\n([\s\S]*?)\n\n\*\*/);
      const seriousMatch = fullText.match(/\*\*Serious Side Effects:\*\*\n\n([\s\S]*)/);

      const commonList = commonMatch
        ? commonMatch[1].split('\n').map(item => item.replace(/^- /, '').trim())
        : ["Not specified."];
      const seriousList = seriousMatch
        ? seriousMatch[1].split('\n').map(item => item.replace(/^- /, '').trim())
        : ["Not specified."];

      setDetail({ common: commonList, serious: seriousList });
    } catch (err) {
      console.error("Error fetching side effects:", err);
      setDetail({ common: ["Error fetching data."], serious: [] });
    } finally {
      setLoading(false);
    }
  };

  const waveVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    exit: { opacity: 0, x: 50 },
  };

  return (
    <>
      <Card className="my-3">
        <Card.Header>Find Drug Details</Card.Header>
        <Card.Body>
          <Form onSubmit={drugdetail}>
            <Form.Group className="mt-2">
              <Form.Control
                name="drug"
                placeholder="Enter your drug name"
                value={drug}
                onChange={(e) => setDrug(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="m-3">
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Searching...
                  </>
                ) : (
                  "Get Detail of Drug"
                )}
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <AnimatePresence>
        {(detail.common.length > 0 || detail.serious.length > 0) && !loading && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="my-3">
              <Card.Header>Drug Side Effects</Card.Header>
              <Card.Body>
                <motion.div custom={0} variants={waveVariant}>
                  <h6 className="text-success">🟢 Common Side Effects:</h6>
                  <ul>
                    {detail.common.map((item, index) => (
                      <motion.li key={index} custom={index} variants={waveVariant}>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div custom={1} variants={waveVariant}>
                  <h6 className="mt-3 text-danger">🔴 Serious Side Effects:</h6>
                  <ul>
                    {detail.serious.map((item, index) => (
                      <motion.li key={index} custom={index + 5} variants={waveVariant}>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </Card.Body>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
