import "./App.css";

import React from "react";

import useConfig from "../components/useConfig";
import logo from "./logo.svg";

import './App.css';
import { StateProvider } from './core/app-context';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './core/theme';
import MainPage from "./pages/MainPage";
import Routes from "./core/routes";

/**
 * Our Web Application
 */
export default function App() {
  const config = useConfig();
  return (
    <StateProvider>
      <ChakraProvider theme={theme}>
        <Routes />
      </ChakraProvider>
    </StateProvider>
  );
}
