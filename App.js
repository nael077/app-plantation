import * as React from 'react';
import { createStackNavigator, createAppContainer} from 'react-navigation';
import * as firebase from 'firebase';
import SignUpScreen from './components/Signup';
import ProfileScreen from './components/ProfileScreen';
import LoginScreen from './Login';
import MainScreen from './Main';
import DetailScreen from './DetailScreen'

const AppNavigator = createStackNavigator(
  {
    Main: MainScreen,
    Login: LoginScreen,
    SignUp: SignUpScreen,
    Details: DetailScreen,
    Profile: ProfileScreen
  },
  { 
    initialRouteName: "Login" 
  }
); 

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyC1Lp3YJUMihdBOqGrInGJq3YbjZguhlnE",
      authDomain: "app-vegetacao-ceara.firebaseapp.com", 
      projectId: "app-vegetacao-ceara",
      storageBucket: "app-vegetacao-ceara.appspot.com",
      messagingSenderId: "792834641244",
      appId: "1:792834641244:web:3ba4b5e467e687d8594599"
  };
  
  if(!firebase.apps.length)
    firebase.initializeApp(config);
  }
  
  render() {
    return (<AppContainer />);
  }
}