import React, { useEffect, useState } from "react";
import { getAnswer } from "../../actions/UploadAction";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import setDocumentText, { setUploadDocText } from "../../features/DocumentSlice";

const EditSidebar = () => {
  const dispatch = useDispatch();
  const doc_id = useSelector((state) => state.document.docId);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await getAnswer(doc_id, query);
      const doc = res.data.data.fetchedData.document;
    console.log(doc);
      
      dispatch(setUploadDocText(doc));
      // dispatch(setDocumentText(doc));
    } catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4 space-y-5 w-full flex flex-col justify-between items-center rounded-md h-full">
      <section className="flex flex-col h-full items-center justify-center text-center space-y-10 overflow-y-auto">
        <h4 className="font-bold text-white text-3xl">
          Want to Edit
          <br /> Generated Document?
        </h4>
        <p>
          Ask the AI to change a part of the document. Provide proper details
          to get better results.
        </p>
      </section>
      <form
        onSubmit={handleSubmit}
        className="w-full space-x-3 flex flex-row justify-center items-center"
      >
        <input
          className="bg-white text-neutral-700 text-base font-semibold w-full rounded-md p-2"
          type="text"
          placeholder="Enter your query"
          onChange={onChange}
          readOnly={loading}
          value={query}
        />
        <button
          type="submit"
          className={`bg-green-950 ${
            loading ? "opacity-75 pointer-events-none" : ""
          } p-2 font-semibold px-4 rounded-md`}
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </main>
  );
};

export default EditSidebar;

