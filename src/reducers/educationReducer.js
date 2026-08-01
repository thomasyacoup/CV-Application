export function publicReducer(state, action) {
  switch (action.type) {
    case "ADD": return [...state, action.payload]; 
    case "UPDATE": return state.map(item => action.payload.id ==  item.id ? action.payload : item);
    case "REMOVE": return state.filter(item => item.id != action.payload.id);
  }
}

