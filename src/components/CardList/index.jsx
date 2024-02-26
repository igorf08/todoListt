import { useState } from "react";
import axios from "axios";

export default function CardList({ tarefas, setTarefas }) {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefaEditada, setTarefaEditada] = useState(null);

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
      .then((response) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id));
      })
      .catch((error) => {
        console.error(`Ocorreu um erro com seu delete: ${error}`);
      });
  }

  function handleEdit(id, novaTarefa) {
    axios
      .put(`http://localhost:3000/tarefas/${id}`, { tarefa: novaTarefa })
      .then((response) => {
        setTarefas(
          tarefas.map((tarefa) => {
            if (tarefa.id === id) {
              return { ...tarefa, tarefa: novaTarefa };
            } else {
              return tarefa;
            }
          })
        );
        setTarefaEditada(null);
      })
      .catch((error) => {
        console.error("Ocorreu um erro ao editar a tarefa:", error);
      });
  }

  return (
    <div className="flex flex-col items-start justify-start gap-4 p-2 border-2 border-zinc-500 shadow-md w-[40%] min-h-[50%] max-h-fit rounded-md">
      <div className="flex w-[100%] justify-evenly border-b-2 border-zinc-300 pb-2">
        <input
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          className="px-2 border-2 border-zinc-400 rounded-md"
          type="text"
          placeholder="Digite sua tarefa"
        />
        <button
          onClick={handleCriarTarefas}
          className="rounded-md px-2 border-2 border-green-300 bg-green-300"
        >
          Criar
        </button>
      </div>
      <ul className="w-full flex flex-col gap-2 ">
        {tarefas && tarefas.map((tarefa) => (
          <div key={tarefa.id} className="flex gap-4">
            <li key={tarefa.id}>{tarefa.tarefa}</li>
            <div className="flex gap-2 ml-auto">
              <button
                onClick={() => handleEdit(tarefa.id, novaTarefa)}
                className="border-2 rounded-md bg-zinc-200"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(tarefa.id)}
                className="border-2 rounded-md bg-zinc-200"
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
