/** @jest-environment jsdom */
// import {render, screen} from "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CardList from "../CardList"


//Não pode ser criado dois testes dentro do mesmo bloco Describe
describe("CardList", () => {
    it("Tem de renderizar corretamente na tela.", () => {
        render(<CardList />);

        expect(screen.getByText("Criar")).toBeInTheDocument();
    })
})