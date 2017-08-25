import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUserName, setPassword, setUserAvatar,signup, setErrorMessage } from '../action/loginAction';
import signUpComponent  from '../component/signupComponent';
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
    signup
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(signUpComponent);
