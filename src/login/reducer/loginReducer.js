const initialState = {
    username: '',
    avatar: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png',
    password: '',
    authorizing: false,
    authorized: false,
    errorMessage: ''
};

const loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SET_USER_NAME':
            return Object.assign({}, state, {
                username: action.username
            });
        case 'SET_PASSWORD':
            return Object.assign({}, state, {
                password: action.password
            });
        case 'SET_USER_AVATAR':
            return Object.assign({}, state, {
                avatar: action.avatar
            });
        case 'LOGIN_ERROR_MESSAGE':
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });
        case 'USER_START_AUTHORIZING':
            return Object.assign({}, state, {
                authorizing: true
            });
        case 'USER_AUTHORIZED':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: true
            });
        case 'USER_NO_EXIST':
            return Object.assign({}, state, {
                authorizing: false,
                authorized: false
            });

        default:
          console.log('login default');
            return state
    }
}

export default loginReducer;
