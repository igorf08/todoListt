/**
 * @jest-environment jsdom
 */
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CardList from '../CardList/'

// Não pode ser criado dois testes dentro do mesmo bloco Describe
describe("Testa a funcionalidade dos inputs", () => {
    it("Testa o render do botão de criar.", () => {
        render(<CardList/>);

        expect(screen.getByText("Criar")).toBeInTheDocument();
    })

    it("Testa o render do input de criar tarefa", () => {
        render(<CardList/>);

        expect(screen.getByPlaceholderText("Digite sua tarefa")).toBeInTheDocument()
    })
})