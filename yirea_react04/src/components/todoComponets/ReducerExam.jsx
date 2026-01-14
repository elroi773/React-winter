import { useReducer } from "react";
function reducer(state, action) {
    switch(action.type){
        case "INCREASE" : 
            return state + action.data;
        case "DECREASE":
            return state - action.data;
        default:
            return state;
    }
}
// const initialState = {value: 0};

export default function ReducerExam() { 
    //useReducer는 상태 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.
    //dispatch는 액션을 발생시키는 함수 
    //dispatch에게 액션 객체를 전달하면 reducer가 호출된다.
    //state 변경은 reducer가 반환하는 값으로 대체된다.
    //useReducer는 복잡한 상태 로직을 다룰 때 유용하다.

    //action 객체는 type 속성을 반드시 가져야 한다.
    //action 객체는 상태 업데이트에 필요한 추가 데이터를 가질 수 있다.
    //액션 객체를 생성하는 함수를 액션 생성자라고 한다.

    
    // const [state, dispatch] = useReducer(reducer, initialState);
    const [state, dispatch] = useReducer(reducer, 0);
    const onClickPlus = () =>{
        dispatch({type: "INCREASE", data:1})
    };
    const onClickMinus = () =>{
        dispatch({type: "DECREASE", data: 1})
    }
    return (
        <div>
            <h1>{state.value}</h1>
            <button onClick={onClickPlus}>+</button>
            <button onClick={onClickMinus}>-</button>
        </div>
    );
}