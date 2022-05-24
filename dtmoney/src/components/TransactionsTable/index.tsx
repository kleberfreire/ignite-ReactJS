import { useEffect } from "react";

import { api } from "../../services/api";

import { Container } from "./styles";

export function TransactionsTable() {
  useEffect(() => {
    api.get("/transactions").then((data) => console.log(data.data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Desenvolvimento de site</td>
            <td className="deposit">R$ 12.000,00</td>
            <td>Venda</td>
            <td>01/01/2020</td>
          </tr>
          <tr>
            <td>Aluguel</td>
            <td className="withdraw">-R$ 1.000,00</td>
            <td>pagamento</td>
            <td>01/01/2020</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
