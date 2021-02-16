
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Splash from './src/screens/splash';
import Login from './src/screens/login'; 
import WeatherReportList from './src/screens/weatherList';


const App=createStackNavigator({

  //Splash:{screen:Splash,navigationOptions:{headerShown:false}},
  Login:{screen:Login,navigationOptions:{headerShown:false}},
  WeatherReportList:{screen:WeatherReportList,navigationOptions:{}}

});

export default createAppContainer(App);