import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StatusBar from './src/components/StatusBar';
import Header from './src/components/Header';
import Routes from './src/Routes';


export default class App extends React.Component {
  render(){
    return (
      <View style={{flex : 1}}>
        <StatusBar/>  
        <Routes/>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
  // container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center'
  // },
// });
