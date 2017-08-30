import React from 'react';
import { View, Image, Dimensions, Keyboard, ActivityIndicator } from 'react-native';
import { RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import { NavigationActions } from 'react-navigation';
import { FontAwesome } from '../../assets/icons';
import { GradientButton } from '../../components/';
import { scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { connect } from 'react-redux';
import { GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
//import { passwordrecoveryCompoent } from './passwordrecoveryComponent';


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
                 };
  }

  componentDidMount() {
    this.props.setErrorMessage('');
    //MessageBarManager.registerMessageBar(this.refs.alert);
    this._setupGoogleSignin();
  }

  componentWillUnmount() {
    this.props.setErrorMessage('');
    //MessageBarManager.unregisterMessageBar();
  }

  _setupGoogleSignin() {
    try {
      GoogleSignin.configure({
        iosClientId: '1060525590105-fi6k49f23b2t61nm8mdlhe1ouap008qv.apps.googleusercontent.com',
        webClientId: '1060525590105-ebc2kntgl6da6kl3t2kt6ei28ikeg853.apps.googleusercontent.com',
        offlineAccess: false
      })
      .then(() => {
        GoogleSignin.currentUserAsync().then((user) => {
              console.log('USER', user);
              this.props.setUser(user);
            }).done();
      });
      //await GoogleSignin.hasPlayServices({ autoResolve: true });
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
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
            //this._signIn1();
            this.props.googleLogin();
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
