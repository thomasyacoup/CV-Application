export function publicReducer(state, action) {
  switch (action.type) {
    case "ADD": return [...state, action.payload]; 
    case "UPDATE": return state.map((item, index) => action.payload.index == index ? action.payload : item);
    case "REMOVE": return state.filter((items, index) => index != action.payload.index);
  }
}

