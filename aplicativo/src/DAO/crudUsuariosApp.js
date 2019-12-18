import { db, criaTabelaUsuarioAPP } from './criaTabelasBanco'
import UUID from 'uuid/v1'
import { Alert } from 'react-native'

export function insereUsuarioApp(dados) {
  return new Promise(result => {
    db.transaction(tx => {
      tx.executeSql(`
        INSERT INTO usuariosAPP(
          cdUsuario, 
          nmUsuario, 
          deLogin, 
          cdSenha, 
          cnpjUsuario, 
          statusUsuario
        ) 
        VALUES(?, ?, ?, ?, ?, ?)`,
        [
          UUID().replace(/-/g, ''),
          dados.nmUsuario,
          dados.deLogin,
          dados.cdSenha,
          dados.cnpjUsuario,
          2
        ], (err, data) => {
          result(true)
        }
      )
    })
  })
}

// export function buscaUsuarioApp() {
// return new Promise(result => {
// db.transaction(tx => {
// tx.executeSql(`SELECT * FROM usuariosAPP`, [], (err, data) => {
// if (data.rows.length > 0) {
// result(data.rows._array)
// } else {
// result(false)
// }
// })
// })
// })
// }       

export function buscaRegistrosSinc(nmUsuario) {
  return new Promise(result => {
    db.transaction(tx => {
      tx.executeSql(`
        SELECT
          *
        FROM
          usuariosAPP
        WHERE 
          statusUsuario = 2 and
          nmUsuario like ?
        ORDER BY 
          nmUsuario
      `, ['%'+nmUsuario+'%'], (err, data) => {
        if (data.rows.length > 0) {
          result(data.rows._array)
        } else {
          result(false)
        }
      })
    })
  })
}

export function atualizaStatusUsuariosApp() {
  db.transaction(tx => {
    tx.executeSql(`
      UPDATE
        usuariosApp
      SET
        statusUsuario = ?  
    `, [3], (err, data) => {
      Alert.alert('Aviso', 'Dados atualizados com sucesso!')
    })
  })
}

export function atualizaUsuario(dado){
  console.log(dado.cdUsuario)
  db.transaction(tx => {
    tx.executeSql(`
      UPDATE
        usuariosAPP
      SET
        nmUsuario = ?,
        deLogin = ?,
        cdSenha = ?,
        cnpjUsuario = ?
      WHERE
        cdUsuario = ?
    `, [dado.nmUsuario, dado.deLogin, dado.cdSenha, dado.cnpjUsuario, dado.cdUsuario], (err, data)=>{
      console.log('cheguei')
    })
  })
}

export function deletaUsuario(idUsuario){
  db.transaction(tx => {
    tx.executeSql(`
      DELETE FROM
        usuariosApp
      WHERE
        cdUsuario = ?
    `, [idUsuario], (err, data) => {})
  })
}