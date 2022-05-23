import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";

interface IRepositoryProps {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  // https://api.github.com/users/kleberfreire/repos

  const [repositories, setRepositories] = useState<IRepositoryProps[]>([]);

  useEffect(() => {
    fetch("https://api.github.com/users/kleberfreire/repos")
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <>
      <section className="repository-list">
        <h1>Lista de Repositórios</h1>

        <ul>
          {repositories.map((repository) => (
            <RepositoryItem key={repository.name} repository={repository} />
          ))}
        </ul>
      </section>
      <section></section>
    </>
  );
}
