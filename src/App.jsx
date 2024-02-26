import CardList from "./components/CardList"
import Container from "./components/Container"
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const[tarefas, setTarefas] = useState([])

  useEffect(() => {
    getTarefa();
  }, [])

  async function getTarefa() {
    const dados = await axios.get('http://localhost:3000/tarefas')
    console.log(dados.data);
    setTarefas(dados.data);
  }
  return (
    <Container>
      <CardList tarefas={tarefas} setTarefas={setTarefas}/> 
    </Container>
  )
}

export default App