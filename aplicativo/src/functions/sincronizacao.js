import { Alert } from 'react-native'
import axios from 'axios'
import {insereDadosAdmAndroidAPP, buscaRegistrosAdmAndroid} from '../DAO/crudAdmAndroid'
import {insereUsuario} from '../DAO/crudUsuarios'
import {buscaRegistrosSinc, atualizaStatusUsuariosApp} from '../DAO/crudUsuariosApp'

export function sincronizacao(){
  sincronizaAdmAndroid()
  sincronizaUsuarios()  
}

function sincronizaAdmAndroid(){
  axios.get('http://10.1.1.154:14000/buscaParamAdmAndroid') 
    .then(resp => {
      if(resp.data == 'Erro ao buscar parâmetros (SQL) nas Configurações Mobile em /buscaParamAdmAndroid') {
        Alert.alert('Aviso', resp.data)
      } else {
        insereDadosAdmAndroidAPP(resp.data)
        setTimeout(() => {
          buscaRegistrosAdmAndroid()
          alert('Deu boa')
        }, 2000);
      }  
    })
}

function sincronizaUsuarios(){
  axios.get('http://10.1.1.154:14000/buscaUsuariosAPP') 
    .then(resp => {
      if(resp.data == 'Erro ao buscar registros (SQL) no Cadastro de Usuários em /buscaUsuariosAPP') {
        Alert.alert('Aviso', resp.data)
      } else {
        insereUsuario(resp.data)
      }
    })
    .catch(err => {
      Alert.alert('Erro', 'Erro ao buscar usuários')
    })
}

export async function enviaUsuariosERP(){
  let result = await buscaRegistrosSinc('')

  if(result.length > 0) {
    axios.post('http://10.1.1.154:14000/enviaUsuariosParaERP', {usuario:result})
    
    .then(resp =>{
      if(resp.data != 'Erro ao inserir usuário'){
        atualizaStatusUsuariosApp()
        sincronizaUsuarios()
      }else{
        Alert.alert('Aviso', 'Falha ao sincronizar registros')
      }
    })
  }else{
    Alert.alert('Aviso!', 'Não existem registros para serem sincronizados')
  }
}
