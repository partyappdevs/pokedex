import React from "react";
import {
  Outlet,
  BrowserRouter,
  Routes as RouteList,
  Route,
} from "react-router-dom";
import { AuthProvider } from "../context/loginContext";
import Layout from "../views/Layout";
import Login from "../views/Login";
import Pokedex from "../views/Pokedex";
import Pokemon from "../views/Pokemon";
import Register from "../views/Register";
import ProtectedRoute from "./ProtectedRoute";

export default function Routes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <RouteList>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Pokedex />} />
            {/* <Route path="pokemon/:id" element={<Pokemon />} /> */}
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </RouteList>
      </BrowserRouter>
    </AuthProvider>
  );
}
