import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Master } from "../components/Layout/Master";

describe("Master Layout", () => {
    it("renders children correctly", () => {
        render(
            <Master>
                <div>Test Content</div>
            </Master>
        );
        expect(screen.getByText("Test Child")).toBeInTheDocument();
        expect(screen.getByText("Gestión de Personas")).toBeInTheDocument();
    });

    it("renders navigation links", () => {
        render(
            <Master>
                <div>Test Content</div>
            </Master>
        );
        expect(screen.getByText("Inicio")).toBeInTheDocument();
        expect(screen.getByText("Personas")).toBeInTheDocument();
        expect(screen.getByText("Crear Persona")).toBeInTheDocument();
    });

    it("renders footer", () => {
        render(
            <Master>
                <div>Test Content</div>
            </Master>
        );
        expect(screen.getByText("&copy; 2025 CRUD con React + JAVA + SQLite. ")).toBeInTheDocument();
    });
});
