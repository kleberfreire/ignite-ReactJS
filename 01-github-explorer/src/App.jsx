import { RepositoryList } from "./components/RepositoryList";
import "./styles/global.scss";

const repository = {
  name: "Form in ReactJS",
  description: "Um formulário simples em ReactJS",
  html_url: "teste",
};

export function App() {
  return (
    <div>
      <RepositoryList repository={repository} />
    </div>
  );
}
