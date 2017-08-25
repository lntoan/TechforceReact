import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerNavigator,addNavigationHelpers, StackNavigator } from 'react-navigation';
import { withRkTheme } from 'react-native-ui-kitten';
import { AppRoutes } from '../config/navigation/routesBuilder';
import * as Screens from '../screens';
import { bootstrap } from '../config/bootstrap';
import track from '../config/analytics';
import {data} from '../data';
import LoginButton from '../../src/login/component/loginComponent';
import LoginV1Container from '../login/container/loginContainer';
import SignUpContainer from '../login/container/signupContainer'

bootstrap();
data.populateRealm();

let SideMenu = withRkTheme(Screens.SideMenu);
const routeConfiguration = {
  First: {
    screen: Screens.SplashScreen
  },
  Login:{
    screen: LoginV1Container//Screens.LoginV1
  },
  SignUp:{
    screen: SignUpContainer
  },
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        contentComponent: (props) => <SideMenu {...props}/>
      })
  }
};

const stackNavigatorConfigusration = {
    initialRouteName: 'First',
    headerMode: 'none',
};

export const AppNavigator = StackNavigator(routeConfiguration, stackNavigatorConfigusration);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);
