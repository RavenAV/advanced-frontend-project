import { Button, ButtonVariant } from "./Button";
import { render, screen } from "@testing-library/react";

describe('Button', () => {
    test('Test render', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    });

    test('Test clear theme', () => {
        render(<Button variant={'clear'}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass('clear')
        screen.debug()
    });
});
