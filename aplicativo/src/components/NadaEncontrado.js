import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import IconIO from 'react-native-vector-icons/Ionicons'

export default props=>(
  <View style = {estilos.estiloViewPrincipal}>
    <View>
      <Text style = {estilos.textoViewPrincipal}>Nada Encontrado</Text>
    </View>

    <View>
      <IconIO name = 'md-alert' size = {80} color = 'orange'/>
    </View>
  </View>
)

const estilos = StyleSheet.create({
  estiloViewPrincipal : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },

  textoViewPrincipal : {
    fontSize : 22,
    color : '#192a56'
  }
})