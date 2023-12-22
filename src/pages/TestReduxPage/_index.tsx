import { useDispatch, useSelector } from "react-redux"
import { inc, dec, setCount } from "../../store/index"

const TestReduxPage: React.FC = () => {
    const dispatch = useDispatch()
    const count = useSelector((state: RootState) => state.counter.count)

    return (
        <div>
            <div>
                <p>Count: {count}</p>
                <button onClick={() => dispatch(inc())}>Increment</button>
                <button onClick={() => dispatch(dec())}>Decrement</button>
                <button onClick={() => dispatch(setCount(0))}>Reset</button>
            </div>

        </div>
    )
}

export default TestReduxPage
