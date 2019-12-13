import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Card} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'

import Header from '../components/Header'
import { criaTabelaUsuario, criaTabelaAdmAndroid, criaTabelaUsuarioAPP } from '../DAO/criaTabelasBanco'
import {sincronizacao} from '../functions/sincronizacao'

export default class TelaInicial extends React.Component{

  componentDidMount(){
    criaTabelaUsuario()
    criaTabelaUsuarioAPP()
    criaTabelaAdmAndroid()
  }

  render(){
    return(
      <View>
        <Header
          titulo = "Tela Incial"
          voltarPara = {false}          
        /> 
        <TouchableOpacity onPress={()=>Actions.replace('ListaRegistros')}>
          <Card containerStyle={estilos.conteinerCard}>
            <View>
              <Text>Lista Registros</Text>
            </View>
          </Card>
        </TouchableOpacity>     

        <TouchableOpacity onPress={()=>Actions.replace('ListaUsuariosApp', {dados: 'Lista Usuários App'})}>
          <Card containerStyle={estilos.conteinerCard}>
            <View>
              <Text>Lista Usuários APP</Text>
            </View>
          </Card>
        </TouchableOpacity> 

        <TouchableOpacity onPress={()=>sincronizacao()}>
          <Card containerStyle={estilos.conteinerCard}>
            <View>
              <Text>Sincronizar Registros</Text>
            </View>
          </Card>
        </TouchableOpacity>         
      </View>
    )
  }
}

const estilos = StyleSheet.create({
    conteinerCard :{
      borderRadius : 10,
      borderWidth: 2,
      borderColor : '#273c75'
    }
})