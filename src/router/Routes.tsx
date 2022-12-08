import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Pokedex from "../views/Pokedex";
import Pokemon from "../views/Pokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      { index: true, element: <Pokedex /> },
      { path: "pokemon/:id", element: <Pokemon /> },
    ],
  },
]);
export default function Routes() {
  return <RouterProvider router={router} />;
}
