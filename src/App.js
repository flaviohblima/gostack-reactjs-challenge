import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('repositories').then(response => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        try {
            const response = await api.post('repositories/', {
                title: `Repositório para o desafio ${new Date().toLocaleTimeString()}`,
                url: "https://github.com/flaviohblima/gostack-nodejs-challenge",
                techs: ["Node.js", "Yarn", "Express"]
            });

            const repository = response.data;

            setRepositories([...repositories, repository]);
        } catch (error) {
            console.error("An error ocurred trying to create Repository");
        }
    }

    async function handleRemoveRepository(id) {
        try {
            const response = await api.delete('repositories/' + id);
            console.log(response.status);

            const filteredRepositories = repositories.filter(repository => repository.id !== id);
            setRepositories(filteredRepositories);
        } catch (error) {
            console.error("An error ocurred trying to delete Repository " + id);
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}

                        <button onClick={() => handleRemoveRepository(repository.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
