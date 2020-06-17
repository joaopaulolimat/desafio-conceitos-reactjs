import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRespositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRespositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repository ${Date.now()}`,
      url: "https://github.com/joaopaulolimat/desafio-conceitos-node",
      techs: ["Node.js", "React.js"]
    });

    const repository = response.data;

    setRespositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);

    if (response.status === 204) {
      setRespositories(repositories.filter(repository => repository.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <>
            <li key={repository.id}>{repository.title}
              <button onClick={() => handleRemoveRepository(`${repository.id}`)} >
                Remover
            </button>
            </li>
          </>
        )
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
