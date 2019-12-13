import React from 'react'
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import IconIO from 'react-native-vector-icons/Ionicons'

import Header from '../components/Header'

export default class ListaUsuariosApp extends React.Component {
  constructor(){
    super()
  }

  render(){
    return(
      <View style={{ flex : 1}}>
        <Header
          titulo={this.props.dados}  
          voltarPara='TelaInicial'
        />          
      </View>
    )
  }
}