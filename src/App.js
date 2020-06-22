import React, { useState, useEffect } from "react";
import api from "./services/api";
import "./styles.css";

import Header from './components/Header'

function App() {
  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `repository ${Date.now()}`,
    });

    const repository = response.data;
    setRepositores([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const filterRepo = repositories.filter((repo) => repo.id !== id);
    console.log(filterRepo);
    setRepositores(filterRepo);
  }

  return (
    <>
      <Header title="Repositories from test bootcamp" />
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;