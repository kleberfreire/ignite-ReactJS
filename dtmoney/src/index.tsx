import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";

import { createServer, Model } from "miragejs";

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: "Desenvolvimento de site",
          amount: 12000,
          category: "Venda",
          type: "deposit",
          createdAt: new Date("2021-01-03 10:00:00"),
        },
        {
          id: 2,
          title: "Aluguel",
          amount: 1000,
          category: "Pagamento",
          type: "withdraw",
          createdAt: new Date("2021-04-10 18:00:00"),
        },
      ],
    });
  },

  routes() {
    this.namespace = "/api";
    this.get("/transactions", () => {
      return this.schema.all("transaction");
    });
    this.post("/transactions", (schema, request) => {
      let data = JSON.parse(request.requestBody);
      data.createdAt = new Date();
      console.log("data -", data);

      return schema.create("transaction", data);
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
