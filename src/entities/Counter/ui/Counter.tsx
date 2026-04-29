import { Button } from "@/widgets/Button"
import { useCounterActions } from "../model/slice/counterSlice"
import { useCounterValue } from "../model/selectors/getCounterValue/getCounterValue"

export const Counter = () => {
    const counterValue = useCounterValue()
    const { decrement, increment } = useCounterActions()

    const handleIncrement = () => {
        increment()
    }

    const handleDecrement = () => {
        decrement()
    }

    return (
        <div>
            <h1 data-testid="value-title">{counterValue}</h1>
            <Button
                onClick={handleIncrement}
                data-testid="increment-btn"
            >
                increment
            </Button>
            <Button
                onClick={handleDecrement}
                data-testid="decrement-btn"
            >
                decrement
            </Button>
        </div>
    )
}