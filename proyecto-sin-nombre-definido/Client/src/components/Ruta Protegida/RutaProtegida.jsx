import React from "react";
import { Route, Navigate } from "react-router-dom";

const RutaProtegida = ({ children, token}) => {
    if (!token) {
        return <Navigate to="/" replace />
      }
      return children
};

export default RutaProtegida;
