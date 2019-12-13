import React from 'react'
import {View, StyleSheet, Platform} from 'react-native'

export default props => (
  <View style = {Platform.OS === "android" ? estilo.viewPrincipal : estilo.viewPrincipalApple}/>
)

const estilo = StyleSheet.create({
  viewPrincipal : {
    backgroundColor : "#40739e",
    height : 30,
    width : "100%"
  },

  viewPrincipalApple : {
    backgroundColor : "#FFF",
    height : 25,
    width : "100%"
  }

})