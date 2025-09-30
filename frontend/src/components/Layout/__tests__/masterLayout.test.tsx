import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Master } from "../Master";

describe("Master Layout", () => {
    it("renders children correctly", () => {
        render(
            <Master>
                <div>Test Content</div>
            </Master>
        );
        expect(screen.getByText("Test Content")).toBeInTheDocument();
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
        expect(screen.getByText("Regiones")).toBeInTheDocument();
        expect(screen.getByText("Comunas")).toBeInTheDocument();
        expect(screen.getByText("Acerca de")).toBeInTheDocument();
    });

    it("renders footer", () => {
        render(
            <Master>
                <div>Test Content</div>
            </Master>
        );
        expect(screen.getByText("© 2025 CRUD con React + JAVA + SQLite.")).toBeInTheDocument();
    });

    it("renders main content area", () => {
        render(
            <Master>
                <div>Custom Content</div>
            </Master>
        );

        const mainContent = screen.getByText("Custom Content");
        expect(mainContent.closest("main")).toBeInTheDocument();
    });

    it("has correct CSS classes", () => {
        const { container } = render(
            <Master>
                <div>Content</div>
            </Master>
        );

        expect(container.querySelector(".master-layout")).toBeInTheDocument();
        expect(container.querySelector(".master-header")).toBeInTheDocument();
        expect(container.querySelector(".master-nav")).toBeInTheDocument();
        expect(container.querySelector(".master-content")).toBeInTheDocument();
        expect(container.querySelector(".master-footer")).toBeInTheDocument();
    });
});
