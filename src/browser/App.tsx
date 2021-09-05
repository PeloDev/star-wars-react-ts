import "./App.css";

import React, { useContext, useEffect, useState } from "react";

import logo from "./logo.svg";

import './App.css';
import { StateProvider } from './core/app-context';
import { ChakraProvider } from "@chakra-ui/react";
import theme from './core/theme';
import MainPage from "./pages/MainPage";
import Routes from "./core/routes";
import ConfigContext from "../components/ConfigContext";
import NotFound from "./pages/NotFoundPage";
import config from "../server/config";
import CharacterProfilePage from "./pages/CharacterProfilePage";

/**
 * Our Web Application
 */

enum EPage {
  mainDefault = "mainDefault",
  mainPage = "mainPage",
  characterPage = "characterPage",
  notFound = "404",
  loading = "loading"
}

export default function App() {

  // const [context, dispatch] = useContext(ConfigContext);
  const context = useContext(ConfigContext);
  const [route, setRoute] = useState<string | null>(null);
  const [page, setPage] = useState<EPage>(EPage.loading);

  useEffect(() => {
    if (context)
      if (context)
        setRoute(context.app.ROUTE);
  }, [context]);

  useEffect(() => {
    if (route) {
      let newPage: EPage = EPage.notFound;
      if (route === '/') {
        newPage = EPage.mainDefault;
      } else if (route.split('/').length - 1 === 1 && !isNaN(Number(route.split('/')[1]))) {
        newPage = EPage.mainPage;
      } else if (route.includes('/character/')) {
        newPage = EPage.characterPage
      }
      setPage(newPage);
    }
  }, [route]);

  return (
    <StateProvider>
      <ChakraProvider theme={theme}>
        {
          page === EPage.mainDefault
            ? <MainPage />
            : page === EPage.mainPage 
            ? <MainPage /*page={route ? Number(route.split('/')[1]) : 1}*/ />
            : page === EPage.characterPage 
            ? <CharacterProfilePage characterID={route ? route.split('/')[2] : "-"} />
              : <NotFound route={route} />
        }
      </ChakraProvider>
    </StateProvider>
  );
}
