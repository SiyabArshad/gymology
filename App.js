import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,ActivityIndicator,SafeAreaView} from 'react-native';
import React from 'react';
import * as Font from "expo-font";

import { LogBox } from 'react-native';
import Onboard from './src/Screens/Onboard';
import Login from './src/Screens/Login';
import Signup from './src/Screens/Signup';
import Forgotpass from './src/Screens/Forgotpass';
import Home from './src/Screens/Home';
import UpdateProfile from './src/Screens/UpdateProfile';
import Chat from './src/Screens/Chat';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import colors from './src/configs/colors';
const Stack = createNativeStackNavigator();
import TabNavigation from './src/Components/TabNavigation';
import NearGym from './src/Screens/NearGym';
import { AuthContext,AuthProvider,useAuth } from './src/context/Authemtication';
export default function App() {
  LogBox.ignoreAllLogs()
  const [fontsLoaded, error] = Font.useFonts({
    'Nunito-Black': require('./assets/fonts/Nunito-Black.ttf'),
    'Nunito-Bold': require('./assets/fonts/Nunito-Bold.ttf'),
    'Nunito-ExtraBold': require('./assets/fonts/Nunito-ExtraBold.ttf'),
    'Nunito-Light': require('./assets/fonts/Nunito-Light.ttf'),
    'Nunito-Medium': require('./assets/fonts/Nunito-Medium.ttf'),
    'Nunito-Regular': require('./assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('./assets/fonts/Nunito-SemiBold.ttf'),
    'RobotoMono-Bold': require('./assets/fonts/RobotoMono-Bold.ttf'),
    'RobotoMono-Light': require('./assets/fonts/RobotoMono-Light.ttf'),
    'RobotoMono-Medium': require('./assets/fonts/RobotoMono-Medium.ttf'),
    'RobotoMono-Regular': require('./assets/fonts/RobotoMono-Regular.ttf'),
    'RobotoMono-SemiBold': require('./assets/fonts/RobotoMono-SemiBold.ttf'),
    'RobotoMono-Thin': require('./assets/fonts/RobotoMono-Thin.ttf'),
  });
  
  if(!fontsLoaded)
  {
    return(
      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size={24} color={colors.primary}/>
      </View>
    )
  }
  return (
    <AuthProvider>
    <NavigationContainer >
      <StatusBar/>
    <Routes/>
    </NavigationContainer>
    </AuthProvider>
  );
}
const Routes=()=>{
  const {user}=useAuth()
  return(
<Stack.Navigator initialroute="onboard" screenOptions={{headerShown:false}} >
{
  user?
  <>
      <Stack.Screen name="home" component={TabNavigation}/>
      <Stack.Screen name='edit' component={UpdateProfile}/>
      <Stack.Screen name='chat' component={Chat}/>
      <Stack.Screen name='gym' component={NearGym}/>
  </>
  :
  <>
  <Stack.Screen name="onboard" component={Onboard} />
      <Stack.Screen name='signup' component={Signup}/>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="forgot" component={Forgotpass}/>
  </>
}
    </Stack.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
