import { Routes } from "@generouted/react-router";
import React from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global.css";
import { RecoilRoot } from "recoil";

function main() {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw Error("[初期化エラー] #rootが存在しません");
  }

  createRoot(rootElement).render(
    <React.StrictMode>
      <RecoilRoot>
        <Routes />
      </RecoilRoot>
    </React.StrictMode>
  );
}

main();
