import React from 'react'
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import IconIO from 'react-native-vector-icons/Ionicons'

import Header from '../components/Header'
import FlatListUsuarios from '../components/FlatListUsuarios'
import {buscaUsuario} from '../DAO/crudUsuarios'
import NadaEncontrado from '../components/NadaEncontrado'
import {estilos} from '../styles/EstiloInput'

export default class ListaRegistros extends React.Component {
  constructor(){    
    super()
    this.state = {
      dadosUsuarios: [],
      textoPesquisaUsuario: '',
    }
  }

  componentDidMount(){
    this.listaRegistros('')
  }

  async listaRegistros(nomeUsuario){
    this.setState({textoPesquisaUsuario: nomeUsuario})
    let retorno = await buscaUsuario(nomeUsuario)
    this.setState({dadosUsuarios: retorno})
  }

  limpaCampoPesquisa(){
    this.setState({ textoPesquisaUsuario: ''})
    this.listaRegistros('')
  }

  render(){
    return(
      <View style={{ flex : 1}}>
        <Header
          titulo='Lista de Registros'  
          voltarPara='TelaInicial'
        /> 

        <View style={{flex: 1}}>  
          <View style={estilos.viewInput}>
            <Input 
              autoFocus={true}
              placeholder='Pesquise pelo nome aqui!'
              value={this.state.textoPesquisaUsuario}
              onChangeText={(textoPesquisaUsuario) => this.listaRegistros(textoPesquisaUsuario)}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              rightIcon={
                this.state.textoPesquisaUsuario.length > 0 ?
                <TouchableOpacity onPress={() => this.limpaCampoPesquisa()}>
                  <IconIO name='md-close' size={30} color='red' />
                </TouchableOpacity>
                : null
              } 
            />            
          </View>
          {this.state.dadosUsuarios ?
            <FlatListUsuarios
              dados={this.state.dadosUsuarios}
              nomeLista={false}
            />
            : 
            <NadaEncontrado/>
          }
        </View>               
      </View>
    )
  }
}