// src/api/symptomApi.js
export async function fetchAssessment(symptoms) {
  console.log("Fetching assessment for symptoms:", JSON.stringify({ symptoms }));

  const res = await fetch("https://symptom-checkers.onrender.com/api/diagnose", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ symptoms }),
  });

  console.log("API response status:", res.status); // ✅ Fixed

  if (!res.ok) {
    const errorText = await res.text(); // to see error message
    console.error("API error response:", errorText);
    throw new Error("API error: " + res.status);
  }

  const data = await res.json(); // ✅ Safely await json
  console.log("API response data:", data);
  return data; // { diagnoses, final_symptoms, recommended_tests }
}


export async function extractTranscript(speech) {
  const res = await fetch("https://symptom-checkers.onrender.com/api/extract", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript: speech }), // ✅ corrected key name
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error("API error: " + errorText);
  }

  return await res.json(); // contains extracted_info
}
