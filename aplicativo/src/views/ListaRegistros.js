import React from 'react'
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import IconIO from 'react-native-vector-icons/Ionicons'

import Header from '../components/Header'
import FlatListUsuarios from '../components/FlatListUsuarios'
import {buscaUsuario} from '../DAO/crudUsuarios'
import NadaEncontrado from '../components/NadaEncontrado'

export default class ListaRegistros extends React.Component {
  constructor(){    
    super()
    this.state = {
      dadosUsuarios: []
    }
  }

  componentDidMount(){
    this.listaRegistros()
  }

  async listaRegistros(){
    let retorno = await buscaUsuario()
    this.setState({dadosUsuarios: retorno})
  }

  render(){
    return(
      <View style={{ flex : 1}}>
        <Header
          titulo='Lista de Registros'  
          voltarPara='TelaInicial'
        />   
        {this.state.dadosUsuarios ?
          <FlatListUsuarios
            dados={this.state.dadosUsuarios}
          />
          : 
          <NadaEncontrado/>
        }               
      </View>
    )
  }
}