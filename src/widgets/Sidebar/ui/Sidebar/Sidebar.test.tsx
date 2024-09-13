import {fireEvent, render, screen} from "@testing-library/react";
import {Sidebar} from "./Sidebar";
import {renderWithTranslation} from "shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe('Sidebar', () => {
    test('sidebar test', () => {
        renderWithTranslation(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    });

    test('with toggle', () => {
        renderWithTranslation(<Sidebar />)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')
    });
});