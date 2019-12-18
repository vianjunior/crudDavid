import React from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native'
import { Button } from 'native-base';
import { Input, Card } from 'react-native-elements'
import { insereUsuarioApp, atualizaUsuario } from '../DAO/crudUsuariosApp.js'

export default class ModalAddUsuario extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nmUsuario: '',
      deLogin: '',
      cdSenha: '',
      confirmaSenha: '',
      cnpjUsuario: '',
      cdUsuario: '',
      tipoModal: ''
    }
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('TESTE')
  //   if (nextProps.tipoModal === 'editar') {
  //     if (nextProps.dadosUsuario.nmUsuario !== prevState.nmUsuario) {
  //       console.log(nextProps.dadosUsuario.nmUsuario)
  //       console.log(prevState.nmUsuario)
  //       return {
  //         nmUsuario: nextProps.dadosUsuario.nmUsuario,
  //         deLogin: nextProps.dadosUsuario.deLogin,
  //         cdSenha: nextProps.dadosUsuario.cdSenha,
  //         confirmaSenha: nextProps.dadosUsuario.cdSenha,
  //         cnpjUsuario: nextProps.dadosUsuario.cnpjUsuario,
  //         cdUsuario: nextProps.dadosUsuario.cdUsuario,
  //         tipoModal: nextProps.tipoModal
  //       }
  //     }
  //     //return null
  //   }
  //   return null
  // }

  UNSAFE_componentWillReceiveProps(props){
    if(props.tipoModal === 'editar'){
      this.setState({
        nmUsuario:props.dadosUsuario.nmUsuario,
        deLogin:props.dadosUsuario.deLogin,
        cdSenha:props.dadosUsuario.cdSenha,
        confirmaSenha:props.dadosUsuario.cdSenha,
        cnpjUsuario:props.dadosUsuario.cnpjUsuario,
        cdUsuario:props.dadosUsuario.cdUsuario,
        tipoModal:props.tipoModal
      })
    } else {
      this.setaEstadoInicial()
    }
  }

  acaoBtnSaveUpdate(dados) {
    if (this.state.tipoModal == 'editar') {
      atualizaUsuario(dados)
      this.setaEstadoInicial()
      Alert.alert('Aviso', 'Dados atualizados com sucesso!',
        [{
          text: 'OK',
          onPress: () => { this.props.atualizaLista(), this.props.fechar() }
        }])
    } else {
      this.validaDados(dados)
    }
  }

  validaDados(dados) {
    if (dados.nmUsuario.trim().length == 0 ||
      dados.deLogin.trim().length == 0 ||
      dados.cdSenha.trim().length == 0 ||
      dados.confirmaSenha.trim().length == 0 ||
      dados.cnpjUsuario.trim().length == 0) {
      Alert.alert('Aviso!', 'Existem campos obrigatórios não preenchidos!')
    } else {
      if (this.state.cdSenha != this.state.confirmaSenha) {
        Alert.alert('Aviso!', 'As senhas não conferem')
      } else {
        this.callInsereUsuarioApp(dados)
      }
    }
  }

  async callInsereUsuarioApp(dados) {
    let result = await insereUsuarioApp(dados)
    if (result) {
      this.props.atualizaLista()
      Alert.alert('Aviso', 'Dados inseridos com sucesso!',
        [
          {
            text: 'Ok', onPress: () => this.props.fechar()
          }
        ]
      )
    } else {
      Alert.alert('Aviso', 'Erro ao inserir usuário!',
        [
          {
            text: 'Ok', onPress: () => this.props.fechar()
          }
        ]
      )
    } 
    this.setaEstadoInicial()
  }

  setaEstadoInicial() {
    this.setState({
      nmUsuario: '',
      deLogin: '',
      cdSenha: '',
      confirmaSenha: '',
      cnpjUsuario: '',
      tipoModal: ''
    })
  }

  render() {
    return (
      <Modal onRequestClose={this.props.fechar} visible={this.props.abrirModal} transparent animationType='fade'>
        <TouchableWithoutFeedback onPress={this.props.fechar}>
          <View style={estilos.offSet} />
        </TouchableWithoutFeedback>
        <View style={{ backgroundColor: 'rgba(47, 54, 64,0.5)' }}>
          <Card title={'Adicionar Registros'} containerStyle={estilos.containerCard}>
            <View>
              <Input
                autoFocus={true}
                placeholder='Nome Usuário'
                onChangeText={(nmUsuario) => this.setState({ nmUsuario })}
                value={this.state.nmUsuario}
                onSubmitEditing={() => this.inputEmail.focus()}
                erroMessage={this.state.nmUsuario.trim().length <= 0 ? 'Campo obrigatório' : null}
              />
              <Input
                placeholder='E-mail'
                onChangeText={(deLogin) => this.setState({ deLogin })}
                value={this.state.deLogin}
                ref={ref => this.inputEmail = ref}
                onSubmitEditing={() => this.inputSenha.focus()}
                erroMessage={this.state.deLogin.trim().length <= 0 ? 'Campo obrigatório' : null}
              />
              <Input
                placeholder='Senha'
                onChangeText={(cdSenha) => this.setState({ cdSenha })}
                value={this.state.cdSenha}
                secureTextEntry={true}
                ref={ref => this.inputSenha = ref}
                onSubmitEditing={() => this.inputRepeteSenha.focus()}
                erroMessage={this.state.cdSenha.trim().length <= 0 ? 'Campo obrigatório' : null}
              />
              <Input
                placeholder='Confirma Senha'
                onChangeText={(confirmaSenha) => this.setState({ confirmaSenha })}
                value={this.state.confirmaSenha}
                secureTextEntry={true}
                ref={ref => this.inputRepeteSenha = ref}
                onSubmitEditing={() => this.inputCnpjUsuario.focus()}
                errorMessage={
                  this.state.confirmaSenha.trim().length <= 0
                    ?
                    'Campo obrigatório'
                    :
                    this.state.cdSenha != this.state.confirmaSenha
                      ?
                      'Senhas incompatíveis'
                      :
                      null
                }
              />
              <Input
                placeholder='CNPJ'
                onChangeText={(cnpjUsuario) => this.setState({ cnpjUsuario })}
                value={this.state.cnpjUsuario}
                ref={ref => this.inputCnpjUsuario = ref}
                errorMessage={this.state.cnpjUsuario.trim().length <= 0 ? 'Campo obrigatório' : null}
                maxLength={14}
              />
            </View>

            <View style={estilos.alinhaBtns}>
              <Button
                style={estilos.btnSalvar}
                rounded onPress={this.props.fechar}
                onPress={() => this.acaoBtnSaveUpdate(this.state)}
              >
                <Text>Salvar</Text>
              </Button>
              <Button style={estilos.btnFechar} rounded onPress={this.props.fechar}>
                <Text>Cancelar</Text>
              </Button>
            </View>
          </Card>
        </View>
        <TouchableWithoutFeedback onPress={this.props.fechar}>
          <View style={estilos.offSet} />
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
}

const estilos = StyleSheet.create({
  offSet: {
    flex: 1,
    backgroundColor: 'rgba(47, 54, 64,0.5)'
  },
  containerCard: {
    marginTop: 0,
    marginHorizontal: 10,
    borderRadius: 10,

  },
  btnSalvar: {
    paddingHorizontal: 30,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  alinhaBtns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15
  },
  btnFechar: {
    paddingHorizontal: 30,
    backgroundColor: 'tomato',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  }

})
