import { createSlice } from "@reduxjs/toolkit";

const documentSlice = createSlice({
  name: "document",
  initialState: {
    docId: null,
    documentText: null,
    uploadDocText: null,
    essentialRequirements: [], // Storing the list of essential requirements
    optionalRequirements: [], // Storing the list of optional requirements
  },
  reducers: {
    setDocId: (state, action) => {
      state.docId = action.payload;
    },
    setDocumentText: (state, action) => {
      console.log("reducer", action.payload);
      state.documentText = action.payload;
    },
    setUploadDocText: (state, action) => {
      state.uploadDocText = action.payload;
    },
    setEssentialRequirements: (state, action) => {
      state.essentialRequirements = action.payload;
    },
    setOptionalRequirements: (state, action) => {
      state.optionalRequirements = action.payload;
    },
    clearDocId: (state) => {
      state.docId = ""; // or null, depending on how you handle empty states
    },
    clearDocumentState: (state) => {
      state.docId = null;
      state.documentText = null;
      state.essentialRequirements = [];
      state.optionalRequirements = [];
    },
  },
});

export const {
  setDocId,
  setDocumentText,
  setEssentialRequirements,
  setOptionalRequirements,
  clearDocId,
  clearDocumentState,
  setUploadDocText
} = documentSlice.actions;

export default documentSlice.reducer;
