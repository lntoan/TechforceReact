import React from 'react';
import { View, Image, Keyboard } from 'react-native';
import { RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme, RkAvoidKeyboard } from 'react-native-ui-kitten';
import {NavigationActions} from 'react-navigation';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import firebaseApp from '../../config/firebase/firebase';

export class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.state = {
      // used to display a progress indicator if waiting for a network response.
      loading: false,
      // entered credentials
      email: 'lnt272@yahoo.com',
      password: '123456'
    }
  }

  login(){
    let toLogin = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})]
    });
    this.props.navigation.dispatch(toLogin)
  }

  signup() {
    this.setState({
      // When waiting for the firebase server show the loading indicator.
      loading: true
    });
    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.password).then(() => {
        alert('Your account was created!');
      this.setState({
        // Clear out the fields when the user logs in and hide the progress indicator.
          email: '',
          password: '',
          loading: false
      });
    }).catch((error) => {
      // Leave the fields filled when an error occurs and hide the progress indicator.
      this.setState({
        loading: false
      });
      alert("Account creation failed: " + error.message );
    });
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
    };
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={{alignItems: 'center'}}>
          {renderIcon()}
          <RkText rkType='h1'>Registration</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded' placeholder='Name'/>
            <RkTextInput rkType='rounded' placeholder='Email'/>
            <RkTextInput rkType='rounded' placeholder='Password' secureTextEntry={true}/>
            <RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true}/>
            <GradientButton style={styles.save} rkType='large' text='SIGN UP' onPress={this.signup}/>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={this.login}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    marginBottom: 10,
    height:scaleVertical(77),
    resizeMode:'contain'
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: 24,
    marginHorizontal: 24,
    justifyContent: 'space-around'
  },
  footer:{
    justifyContent:'flex-end'
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
}));
