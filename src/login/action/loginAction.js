import firebaseApp from '../../config/firebase/firebase';
import DeviceInfo from 'react-native-device-info';
import { Platform } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export const setUserName = (username) => ({
    type: 'SET_USER_NAME',
    username
});

export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    password
});

export const setUserAvatar = (avatar) => ({
    type: 'SET_USER_AVATAR',
    avatar: avatar && avatar.length > 0 ? avatar : 'https://abs.twimg.com/sticky/default_profile_images/default_profile_3_400x400.png'
});

export const setErrorMessage = (errorMessage) => ({
    type: 'LOGIN_ERROR_MESSAGE',
    errorMessage
});

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const startAuthorizing = () => ({
    type: 'USER_START_AUTHORIZING'
});

export const userAuthorized = () => ({
    type: 'USER_AUTHORIZED'
});

export const userNoExist = () => ({
    type: 'USER_NO_EXIST'
});

export const firebaseLogin = () => {
    return function (dispatch, getState) {
        dispatch(setErrorMessage(''));
        dispatch(startAuthorizing());
        firebaseApp.auth().signInWithEmailAndPassword(getState().loginReducer.username, getState().loginReducer.password
        ).then((userData) =>
          {
            dispatch(userAuthorized());
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
          }
        ).catch((error) =>
          {
            dispatch(userAuthorized());
            dispatch(setErrorMessage(error.message))
            console.log(error);
          });
    }
}

export const googleLogin = () => {

    return function (dispatch, getState) {
      dispatch(setErrorMessage(''));
      dispatch(startAuthorizing());
      //const user = await GoogleSignin.currentUserAsync();
      const user =  getState().loginReducer.user;
      console.log('thong tin user');
      console.log(user);
      if (user == null){
        GoogleSignin.signIn()
        .then((user) => {
          // create a new firebase credential with the token
          const credential = firebaseApp.auth.GoogleAuthProvider.credential(user.idToken,user.accessToken);
          console.log('credential');
          console.log(credential);
          // login with credential
          firebaseApp.auth().signInWithCredential(credential
          ).then((userData) =>
            {
              console.log('da login thanh cong');
              dispatch(userAuthorized());
              dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }
          ).catch((error) =>
            {
              dispatch(userAuthorized());
              dispatch(setErrorMessage(error.message))
              console.log(error);
              alert(error);
            });
        })
        .catch((error) => {
          dispatch(userAuthorized());
          dispatch(setErrorMessage(error.message))
          console.log('WRONG SIGNIN',error);
          alert(error);
        })
        .done();
      }else {
        console.log('le ngoc toan');
        const credential = firebaseApp.auth.GoogleAuthProvider.credential(user.idToken,user.accessToken);
        console.log(credential);
        // login with credential

        firebaseApp.auth().signInWithCredential(credential
        ).then((userData) =>
          {
            dispatch(userAuthorized());
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
          }
        ).catch((error) =>
          {
            dispatch(userAuthorized());
            dispatch(setErrorMessage(error.message))
            console.log(error);
            alert(error);
          });
      }
    }

}

export const facebookLogin = () => {

  return function (dispatch, getState) {
      dispatch(setErrorMessage(''));
      dispatch(startAuthorizing());

      LoginManager
        .logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
          if (result.isCancelled) {
            console.log('result.isCancelled'); //continue call .then(data)
            dispatch(userAuthorized());
          }
          return AccessToken.getCurrentAccessToken();
        })
        .then(data => {
          // create a new firebase credential with the token
          console.log('user facebook data');
          console.log(data);
          const credential = firebaseApp.auth.FacebookAuthProvider.credential(data.accessToken);
          // login with credential
          firebaseApp.auth().signInWithCredential(credential
          ).then((userData) =>
            {
              dispatch(userAuthorized());
              dispatch(NavigationActions.navigate({ routeName: 'Home' }));
            }
          ).catch((error) =>
            {
              dispatch(userAuthorized());
              dispatch(setErrorMessage(error.message))
              console.log(error);
            });
        })
        // .then((currentUser) => {
        //   console.log('currentUser');
        //   console.log(currentUser);
        //   if (currentUser === 'cancelled') {
        //     console.log('cancelled');
        //     dispatch(userAuthorized());
        //   } else {
        //     // now signed in
        //     console.warn(JSON.stringify(currentUser.toJSON()));
        //     //alert('now signed in');
        //   }
        // })
        .catch((error) => {
          dispatch(userAuthorized());
          dispatch(setErrorMessage(error.message))
          console.log(error.message);
        });
  }
}

export const signup = () => {
    return function (dispatch, getState) {
        dispatch(setErrorMessage(''));
        dispatch(startAuthorizing());
        console.log(getState().loginReducer.username);
        firebaseApp.auth().createUserWithEmailAndPassword(getState().loginReducer.username, getState().loginReducer.password
      ).then(() =>
          {
            dispatch(userAuthorized());
            dispatch(NavigationActions.navigate({ routeName: 'Home' }));
          }
        ).catch((error) =>
          {
            dispatch(userAuthorized());
            dispatch(setErrorMessage(error.message))
            console.log(error);
          });
    }
}

// export const checkUserExists = () => {
//     return function (dispatch) {
//         dispatch(startAuthorizing());
//     }
// }
