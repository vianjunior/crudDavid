import React from 'react'
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'
import IconIO from 'react-native-vector-icons/Ionicons'

import Header from '../components/Header'
import FlatListUsuarios from '../components/FlatListUsuarios'
import NadaEncontrado from '../components/NadaEncontrado'
import { buscaRegistrosSinc } from '../DAO/crudUsuariosApp'
import ModalAddUsuario from '../components/ModalUsuario'
import { deletaUsuario } from '../DAO/crudUsuariosApp'
import { estilos } from '../styles/EstiloInput'

export default class ListaUsuariosApp extends React.Component {
  constructor() {
    super()
    this.state = {
      dadosUsuariosApp: [],
      abrirModal: false,
      dadosEditar: false,
      tipoModal: null,
      textoPesquisaUsuario: '',
    }
  }

  componentDidMount() {
    this.listaRegistros('')
  }

  async listaRegistros(nomeUsuario) {
    this.setState({textoPesquisaUsuario: nomeUsuario})
    let retorno = await buscaRegistrosSinc(nomeUsuario)
    this.setState({ dadosUsuariosApp: retorno })
  }

  limpaCampoPesquisa(){
    this.setState({ textoPesquisaUsuario: ''})
    this.listaRegistros('')
  }

  confirmaDeletaUsuario(idUsuario, nomeUsuario) {
    Alert.alert('Aviso', `Deseja realmente deletar o usuário: ${nomeUsuario}`,
      [
        {
          text: 'Sim',
          onPress: () => this.efetivaDeletUsuario(idUsuario)
        },
        {
          text: 'Não'
        }
      ]
    )

  }

  efetivaDeletUsuario(idUsuario) {
    deletaUsuario(idUsuario)
    this.listaRegistros('')
  }

  atualizaUsuario(dados) {
    this.setState({ dadosEditar: dados, tipoModal: 'editar', abrirModal: true })
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          titulo={this.props.dados}
          voltarPara='TelaInicial'
          mostraIconeSinc={true}
          mostraIconeAdd={true}
          abrirModal={() => this.setState({ tipoModal: 'novo', abrirModal: true })}
        />
        <View style={{ flex: 1 }}>
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

          <ModalAddUsuario
            abrirModal={this.state.abrirModal}
            fechar={() => this.setState({ abrirModal: false })}
            atualizaLista={() => this.listaRegistros('')}
            tipoModal={this.state.tipoModal}
            dadosUsuario={this.state.dadosEditar}
          />
          {this.state.dadosUsuariosApp ?
            <FlatListUsuarios
              dados={this.state.dadosUsuariosApp}
              nomeLista={true}
              editarUsuario={(usuario) => this.atualizaUsuario(usuario)}
              deletaUsuario={(idUsuario, nomeUsuario) => this.confirmaDeletaUsuario(idUsuario, nomeUsuario)}
            />
            :
            <NadaEncontrado />
          }
        </View>
      </View>
    )
  }
}