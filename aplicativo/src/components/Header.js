import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import IconeIO from 'react-native-vector-icons/Ionicons'
import {enviaUsuariosERP} from '../functions/sincronizacao'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={estilo.estiloViewPrincipal}>
        <View style={estilo.estiloAlinhamentoItens}>
          {
            this.props.voltarPara ?
              <View>
                <TouchableOpacity style={{padding: 15}} onPress={() => Actions.replace(this.props.voltarPara)}>
                  <IconeIO name='md-arrow-back' size={30} color="#fff" />              
                </TouchableOpacity>
              </View>
              : null
          }

          <View>
            <Text style={estilo.estiloTextoHeader}>{this.props.titulo}</Text>
          </View>

          <View style={{flexDirection:"row"}}>
            {
              this.props.mostraIconeSinc ?
                <View>
                  <TouchableOpacity style={{ padding: 10 }} onPress={()=> enviaUsuariosERP()}>                    
                    <IconeIO name='md-sync' size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                : null
            }
            {
              this.props.mostraIconeAdd ?
                <View>
                  <TouchableOpacity style={{ padding: 10 }} onPress={this.props.abrirModal}>
                    <IconeIO name='md-person-add' size={30} color="#fff" />
                  </TouchableOpacity>
                </View>
                : null
            }
          </View>


        </View>
      </View>
    )
  }
}

const estilo = StyleSheet.create({
  estiloViewPrincipal: {
    width: '100%',
    height: 60,
    backgroundColor: '#353b48',
    borderBottomColor: '#e84118',
    borderBottomWidth: 2
  },
  estiloTextoHeader: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  estiloAlinhamentoItens: {
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
    flex: 1
  }
})