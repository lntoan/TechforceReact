import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserName, setPassword, setUserAvatar,firebaseLogin,
  facebookLogin,
  googleLogin,
  setErrorMessage,
  setUser } from '../action/loginAction';
import loginComponent  from '../component/loginComponent';

const mapStateToProps = (state) => {
  return {
    authorizing: state.loginReducer.authorizing,
    authorized: state.loginReducer.authorized,
    errorMessage: state.loginReducer.errorMessage
  }
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    dispatch,
    setUserName,
    setPassword,
    setUserAvatar,
    setErrorMessage,
    setUser,
    firebaseLogin,
    facebookLogin,
    googleLogin
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(loginComponent);
