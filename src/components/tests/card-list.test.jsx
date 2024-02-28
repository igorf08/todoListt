/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CardList from '../CardList/'

// Não pode ser criado dois testes dentro do mesmo bloco Describe
describe("CardList",  () => {
    it("Testa o render do botão de criar.",  () => {
        const tarefas = []; 

        const setTarefas = jest.fn();

        render(<CardList  tarefas={tarefas} setTarefas={setTarefas}/>); // Renderiza o componente

        expect(screen.getByText("Criar")).toBeInTheDocument(); //Armazena o componente no screen e permite que os queries achem os valores.1 
    })
 
    it("Testa o render do input de criar tarefa", () => {
        const tarefas = []; 

        const setTarefas = jest.fn();

        render(<CardList  tarefas={tarefas} setTarefas={setTarefas}/>);

        const input = screen.getByPlaceholderText("Digite sua tarefa")

        expect(input).toBeInTheDocument()
    })


    it("Testa contador de tarefas", () => {
        const tarefas = ['1', '2']
        const setTarefas = jest.fn();
        render(<CardList tarefas={tarefas} setTarefas={setTarefas}/>)

        const tasks = screen.getByText("Você tem 2 tarefas")

        expect(tasks).toBeInTheDocument();

    })

    it("Renderiza botões de tarefas", () => {
        const tarefas = ['1']
        const setTarefas = jest.fn();

        render(<CardList tarefas={tarefas} setTarefas={setTarefas}/>)

        const taskEdit = screen.getByText("Editar")
        const taskDelete = screen.getByText("Excluir")

        expect(taskEdit).toBeInTheDocument()
        expect(taskDelete).toBeInTheDocument()
    })

})