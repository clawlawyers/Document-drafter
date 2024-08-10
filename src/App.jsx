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
import DocDrafter from "./DocDrafter/DocDrafter";
import DrafterArgs from "./DocDrafter/DrafterArgs";

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
  },
  {
    path:"/Drafter",
    element:<DocDrafter />
  },
  {
    path:"/DrafterArgs",
    element:<DrafterArgs />
  }
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
