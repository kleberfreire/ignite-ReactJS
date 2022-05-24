import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { createServer } from "miragejs";

createServer({
  routes() {
    this.namespace = "/api";
    this.get("/transactions", function () {
      return {
        data: [
          {
            id: 1,
            title: "Desenvolvimento de site",
            value: 12000,
            category: "Venda",
            date: "01/01/2020",
          },

          {
            id: 2,
            title: "Aluguel",
            value: -1000,
            category: "Pagamento",
            date: "01/01/2020",
          },
        ],
      };
    });
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
