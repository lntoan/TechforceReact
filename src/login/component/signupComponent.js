import React from 'react';
import { View, Image, Keyboard, ActivityIndicator } from 'react-native';
import { RkButton, RkText, RkTextInput, RkStyleSheet, RkTheme, RkAvoidKeyboard } from 'react-native-ui-kitten';
import {NavigationActions} from 'react-navigation';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';

export default class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.state = { username: '',
                   password: ''
                 };
  }

  login(){
    let toLogin = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Login'})]
    });
    this.props.navigation.dispatch(toLogin)
  }

  signup() {
    this.props.setUserName(this.state.username);
    this.props.setPassword(this.state.password);
    this.props.signup();
  }

  render() {
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
    };
    const content = this.props.authorizing ? <ActivityIndicator style={styles.activityIndicator} size="large"/> :
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
            <RkTextInput rkType='rounded'
              value={this.props.username}
              autoCapitalize="none"
              autoFocus = {true}
              onChangeText={(username) => this.setState({username})}
              placeholder='Email'/>
            <RkTextInput rkType='rounded'
              value={this.props.password}
              onChangeText={(password) => this.setState({password})}
              placeholder='Password' secureTextEntry={true}/>
            {/* <RkTextInput rkType='rounded' placeholder='Confirm Password' secureTextEntry={true}/> */}
            <GradientButton style={styles.save} rkType='large' text='SIGN UP' onPress={this.signup}/>
          </View>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Already have an account?</RkText>
              <RkButton rkType='clear'  onPress={this.login}>
                <RkText rkType='header6'> Sign in now </RkText>
              </RkButton>
            </View>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>{this.props.errorMessage}</RkText>
            </View>
          </View>
        </View>
      </RkAvoidKeyboard>;
      return (
          <View style={{flex:1,alignItems: 'stretch'}}>
              {content}
          </View>
      );
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
