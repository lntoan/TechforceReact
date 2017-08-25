import React from 'react';
import { View, Image, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import { RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { connect } from 'react-redux';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';


export default class loginComponent extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
    this.state = { username: '',
                   password: '',
                   user: null
                 };
  }

  componentDidMount() {
    this.props.setErrorMessage('');
    //MessageBarManager.registerMessageBar(this.refs.alert);
    this._setupGoogleSignin();
  }

  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true });
      await GoogleSignin.configure({
        iosClientId: '490454164094-r4n1ofpbq8v34beejmpnq1cvr5a1tp1r.apps.googleusercontent.com',
        webClientId: '490454164094-puj4nom4h97sdukqhtfmvhthjs1vqdoa.apps.googleusercontent.com',
        offlineAccess: false
      });

      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  _signIn1() {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done();
  }

  componentWillUnmount() {
    this.props.setErrorMessage('');
    //MessageBarManager.unregisterMessageBar();
  }

  login = param => e =>{

      this.props.setUserName(this.state.username);
      this.props.setPassword(this.state.password);
      switch (param) {
          case 'firebase':
            this.props.firebaseLogin();
            break;
          case 'facebook':
            this.props.facebookLogin();
            break;
          case 'google':
            this._signIn1();
            //this.props.googleLogin();
            break;
        }
      //this.props.login(param);
  }

  signUp(){
    let toSignUp = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'SignUp'})]
    });
    this.props.navigation.dispatch(toSignUp);

    // chuyen man hinh
    // this.props.navigation.dispatch({ type: 'Login' });
    // this.props.navigation.navigate('Home')
  }

  _renderImage(image) {
    let contentHeight = scaleModerate(375, 1);
    let height = Dimensions.get('window').height - contentHeight;
    let width = Dimensions.get('window').width;

    if (RkTheme.current.name === 'light')
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1.png')}/>);
    else
      image = (<Image style={[styles.image, {height, width}]}
                      source={require('../../assets/images/backgroundLoginV1DarkTheme.png')}/>);
    return image;
  }
  //login = () => {
  // login = param => e =>{
  //     console.log('loi ne');
  //     this.props.setUserName(this.state.username);
  //     this.props.setPassword(this.state.password);
  //     console.log('loi loi');
  //     console.log(param);
  //     this.props.login(param);
  // }


  render() {
    let image = this._renderImage();
    const content = this.props.authorizing ? <ActivityIndicator style={styles.activityIndicator} size="large"/> :
    <RkAvoidKeyboard
      onStartShouldSetResponder={ (e) => true}
      onResponderRelease={ (e) => Keyboard.dismiss()}
      style={styles.screen}>
      {image}
      <View style={styles.container}>
        <View style={styles.buttons}>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero accentColor'>{FontAwesome.twitter}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero accentColor' onPress={this.login('google')}>{FontAwesome.google}</RkText>
          </RkButton>
          <RkButton style={styles.button} rkType='social'>
            <RkText rkType='awesome hero accentColor' onPress={this.login('facebook')}>{FontAwesome.facebook}</RkText>
          </RkButton>
        </View>
        <RkTextInput rkType='rounded' placeholder='Username'
          value={this.props.username}
          autoCapitalize="none"
          autoFocus = {true}
          onChangeText={(username) => this.setState({username})}/>
        <RkTextInput rkType='rounded' placeholder='Password'
          value={this.props.password}
          onChangeText={(password) => this.setState({password})}
          secureTextEntry={true}/>
        <GradientButton onPress={this.login('firebase')} rkType='large' style={styles.save} text='LOGIN'/>
        <View style={styles.footer}>
          <View style={styles.textRow}>
            <RkText rkType='primary3'>Don’t have an account?</RkText>
            <RkButton rkType='clear'>
              <RkText rkType='header6' onPress={this.signUp}> Sign up now </RkText>
            </RkButton>
          </View>
        </View>
        <View style={styles.textRow}>
          <RkText rkType='primary3'>{this.props.errorMessage}</RkText>
        </View>
      </View>
    </RkAvoidKeyboard>;
    return (
        <View style={{flex:1,alignItems: 'stretch'}}>
            {content}
            <GoogleSigninButton
              style={{width: 48, height: 48}}
              size={GoogleSigninButton.Size.Icon}
              color={GoogleSigninButton.Color.Dark}
              onPress={this._signIn1.bind(this)}/>
        </View>
    );
  }
}

let styles = RkStyleSheet.create(theme => ({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    resizeMode: 'cover',
    marginBottom: scaleVertical(10),
  },
  container: {
    paddingHorizontal: 17,
    paddingBottom: scaleVertical(22),
    alignItems: 'center',
    flex: -1
  },
  footer: {
    justifyContent: 'flex-end',
    flex: 1
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24)
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   }
}));
