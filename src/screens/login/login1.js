import React from 'react';
import { View, Image, Dimensions, Keyboard } from 'react-native';
import { RkButton, RkText, RkTextInput, RkAvoidKeyboard, RkStyleSheet, RkTheme } from 'react-native-ui-kitten';
import {NavigationActions} from 'react-navigation';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { setUserName, setPassword,setUserAvatar,login } from '../../login/action/loginAction';
import { connect } from 'react-redux';

export class LoginV1 extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.login = this.login.bind(this);
  }

  signUp(){
    let toSignUp = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'SignUp'})]
    });
    this.props.navigation.dispatch(toSignUp)
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
  login = () => {
    this.props.username = 'le ngoc toan';
    console.log(this.props);
  }
  render() {
    let image = this._renderImage();

    return (
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
              <RkText rkType='awesome hero accentColor'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero accentColor'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>
          <RkTextInput rkType='rounded' placeholder='Username' submitAction={setUserName}/>
          <RkTextInput rkType='rounded' placeholder='Password' submitAction={setPassword} secureTextEntry={true}/>
          <GradientButton onPress={this.login} rkType='large' style={styles.save} text='LOGIN'/>
          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear'>
                <RkText rkType='header6' onPress={this.signUp}> Sign up
                  now </RkText>
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
  }
}));
