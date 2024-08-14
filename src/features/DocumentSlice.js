// src/features/documentSlice.js

import { createSlice } from '@reduxjs/toolkit';

const documentSlice = createSlice({
  name: 'document',
  initialState: {
    docId: null,
    documentText: null,
  },
  reducers: {
    setDocId: (state, action) => {
      state.docId = action.payload;
    },
    setDocumentText: (state, action) => {
      console.log("set doc text " , action.payload)
      state.documentText = action.payload;
    },
  },
});

export const { setDocId, setDocumentText } = documentSlice.actions;

export default documentSlice.reducer;
