
const rnnyReducer = (state, action) => {

    switch (action.type) {
      case 'LOAD_RNNYNEWS':
        return action.payload.results || [];
        break;
      default:
        return state || [];
    }
}

export default rnnyReducer;
