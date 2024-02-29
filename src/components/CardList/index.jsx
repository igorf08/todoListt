/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";

export default function CardList({ tarefas, setTarefas }) {
  useEffect(() => {
    setNumTarefas(tarefas.length);
  }, [tarefas]);

  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefaEditada, setTarefaEditada] = useState("");
  const [numTarefas, setNumTarefas] = useState(null);

  function handleCriarTarefas() {
    if (novaTarefa.trim() !== "") {
      axios
        .post("http://localhost:3000/tarefas", { tarefa: novaTarefa })
        .then((response) => {
          setTarefas([...tarefas, response.data]);
          setNovaTarefa("");
        });
    }
  }

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/tarefas/${id}`)
      .then(() => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      })
      .catch((error) => {
        console.error(`Ocorreu um erro com seu delete: ${error}`);
      });
  }

  function handleEdit(id) {
    if (tarefaEditada.trim() === "") {
      alert("O campo de edição está vazio.");
      return;
    }
    
    axios
      .put(`http://localhost:3000/tarefas/${id}`, { tarefa: tarefaEditada })
      .then(() => {
        setTarefas(
          tarefas.map((tarefa) => {
            if (tarefa.id === id) {
              return { ...tarefa, tarefa: tarefaEditada };
            } else {
              return tarefa;
            }
          })
        );
        setTarefaEditada("");
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao editar a tarefa:", error);
      });
  }

  return (
    <div className="flex flex-col items-start justify-start gap-4 p-2 border-2 border-gray-800 shadow-md w-[40%] bg-zinc-500 min-h-[50%] max-h-fit rounded-md">
      <div className="flex w-[100%] justify-evenly border-b-2 border-zinc-600 pb-2">
        <input
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          className="px-2 border-2 border-zinc-700 bg-zinc-300 rounded-md placeholder:font-medium"
          type="text"
          placeholder="Digite sua tarefa"
        />
        <input
          value={tarefaEditada}
          onChange={(e) => setTarefaEditada(e.target.value)}
          className="px-2 border-2 border-zinc-700 bg-zinc-300 rounded-md placeholder:font-medium"
          type="text"
          placeholder="Edite sua tarefa"
        />
        <button
          onClick={handleCriarTarefas}
          className="rounded-md px-2 bg-zinc-300"
        >
          Criar
        </button>
      </div>
      <div className="flex justify-between w-full h-8 font-semibold">
        {tarefas.length > 0 && <p>Minhas tarefas:</p>}
        {tarefas.length === 1 ? (
          <p>Você tem {numTarefas} tarefa</p>
        ) : (
          <p>Você tem {numTarefas} tarefas</p>
        )}

        {/* {tarefas.length >= 2 && } */}
      </div>
      <ul className="w-full flex flex-col gap-2 ">
        {tarefas &&
          tarefas.map((tarefa) => (
            <div key={tarefa.id} className="flex gap-4">
              <li key={tarefa.id}>{tarefa.tarefa}</li>
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={() => handleEdit(tarefa.id)}
                  className="hover:opacity-80 transition-all border-2 rounded-md bg-zinc-200"
                  aria-label="Editar"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(tarefa.id)}
                  className="hover:opacity-80 transition-all border-2 rounded-md bg-zinc-200"
                  aria-label="Excluir"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
      </ul>
    </div>
  );
}
