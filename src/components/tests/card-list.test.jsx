/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CardList from '../CardList/'

// Não pode ser criado dois testes dentro do mesmobloco Describe
describe("CardList", () => {
    it("Testa o render do botão de criar.", () => {
        render(<CardList/>); // Renderiza o componente

        expect(screen.getByText("Criar")).toBeInTheDocument(); //Armazena o componente no screen e permite que os queries achem os valores.1 
    })
 
    it("Testa o render do input de criar tarefa", () => {
        render(<CardList/>);

        const input = screen.getByPlaceholderText("Digite sua tarefa")

        expect(input).toBeInTheDocument()
    })

})