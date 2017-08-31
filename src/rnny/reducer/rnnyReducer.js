
const rnnyReducer = (state = [], action = {}) => {

    switch (action.type) {
      case 'LOAD_RNNYNEWS':
        console.log('LOAD_RNNYNEWS + action');
        console.log(action.payload.results);
        return action.payload.results || [];
        break;
      default:
        return state;
    }
}

export default rnnyReducer;
