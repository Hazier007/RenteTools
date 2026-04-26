import { renderToString } from "react-dom/server";
import { Router as WouterRouter } from "wouter";
import App from "./App";

export function render(url: string): string {
  return renderToString(
    <WouterRouter ssrPath={url}>
      <App />
    </WouterRouter>,
  );
}
