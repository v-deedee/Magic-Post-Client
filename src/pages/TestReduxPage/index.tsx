import { connect } from "react-redux";
import { Component } from "react";
import { inc, dec, setCount } from "../../store/index"
import { Dispatch } from "@reduxjs/toolkit";

export interface ITestReduxPageProps extends IReduxState, IReduxAction {}

export interface ITestReduxPageState {
    localStateProperty: string;
}

class TestReduxPage extends Component<ITestReduxPageProps, ITestReduxPageState> {
    state: ITestReduxPageState = {
        localStateProperty: "Initial Value",
    };

    handleUpdateLocalState = () => {
        // Update localStateProperty using setState
        this.setState({
            localStateProperty: "New Value",
        });
    };

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update localStateProperty when input value changes
        this.setState({
            localStateProperty: event.target.value,
        });
    };
    

    render() {
        const {count, inc, dec, resetCount} = this.props
        const { localStateProperty } = this.state;

        return (
            <div>
                <p>Count: {count}</p>
                <p>Local State: {localStateProperty}</p>
                <button onClick={() => inc()}>Increment</button> <br/>
                <button onClick={() => dec()}>Decrement</button> <br/>
                <button onClick={() => resetCount()}>Reset</button> <br/>
                <button onClick={this.handleUpdateLocalState}>Update Local State</button>
                <form>
                    <label>
                        Update Local State:
                        <input
                            type="text"
                            value={localStateProperty}
                            onChange={this.handleInputChange}
                        />
                    </label>
                </form>
            </div>

        
        );
    }
}

interface IReduxState {
    count: number,
}

const mstp = (state: RootState): IReduxState => {return {
    count: state.counter.count
}};

interface IReduxAction {
    inc: () => void
    dec: () => void
    resetCount: () => void
}

const mdtp = (dispatch: Dispatch): IReduxAction => {return {
    inc: () => dispatch(inc()),
    dec: () => dispatch(dec()),
    resetCount: () => dispatch(setCount(0))

}};

export default connect(mstp,mdtp)(TestReduxPage);