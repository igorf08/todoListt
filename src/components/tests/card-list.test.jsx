/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CardList from '../CardList/'
import userEvent from '@testing-library/user-event'

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


        const taskDelete = screen.getByText("Excluir")
        const taskEdit = screen.getByText("Editar")

        expect(taskEdit).toBeInTheDocument()
        expect(taskDelete).toBeInTheDocument()
    })

    it("Testa botão de excluir", async () => {
        const tarefas = [{ id: 1, tarefa: 'Tarefa 1' }];
        
        render(<CardList tarefas={tarefas} />);
        
        const deleteBtn = screen.getByText('Excluir');
        await userEvent.click(deleteBtn);
        
        // Verifica se o texto após a exclusão não está presente
        expect(screen.queryByText(`Você tem ${tarefas.length} tarefa.`)).not.toBeInTheDocument()
    });
})