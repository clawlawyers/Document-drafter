import axios from "axios";

export const getSummary = async (doc_id) => {
  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/ai-drafter/summarize",
      {
        doc_id: doc_id,
      }
    );

    return res;
  } catch (e) {
    throw new Error("catch", e);
  }
};
