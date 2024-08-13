import { useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import "./App.css";
import Hero from "./Home/Hero/Hero";
import Upload from "./Home/Upload";
import Snippets from "./Snippets/Snippets";
import SummaryDialog from "./components/Dialogs/SummaryDialog";
import FavourDialog from "./components/Dialogs/FavourDialog";
import DirectionDialog from "./components/Dialogs/DirectionDialog";
import NeutralDialog from "./components/Dialogs/NeutralDialog";
import DocDrafter from "./DocDrafter/DocDrafter";
import DrafterArgs from "./DocDrafter/DrafterArgs";
import DocType from "./DocType/DocType";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Hero></Hero>,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "/Snippets",
    element: <Snippets />,
    children: [
      {
        path: "",
        element: <Snippets />,
      },
      {
        path: "Summary/:id",
        element: <SummaryDialog />,
      },
      {
        path: "Neutral/:id",
        element: <NeutralDialog />,
      },
      {
        path: "Favour/:id",
        element: <FavourDialog />,
      },
      {
        path: "Direction/:id",
        element: <DirectionDialog />,
      },
    ],
  },
  {
    path: "/Drafter",
    element: <DocDrafter />,
    children: [
      {
        path: "DrafterArgs",
        element: <DrafterArgs />,
      },
    ],
  },
  {
    path: "/DocType",
    element: <DocType />,
    children: [],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <BrowserRouter router={router}></BrowserRouter>
    </>
  );
}

export default App;
