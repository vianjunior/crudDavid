import { db, criaTabelaUsuario } from './criaTabelasBanco'

export function insereUsuario(data){
  db.transaction(tx => {
    tx.executeSql('DROP TABLE USUARIOS')
    criaTabelaUsuario()
    db.transaction(tx => {
      data.forEach(dado => {
        tx.executeSql(`
        INSERT INTO 
            usuarios(
            cdUsuario,
            nmUsuario,
            deLogin,
            cdSenha,
            cnpjUsuario,
            statusUsuario
            )
        VALUES(?, ?, ?, ?, ?, ?)`,
          [dado.CDUSUARIO, dado.NMUSUARIO, dado.DELOGIN, dado.CDSENHA, dado.CNPJUSUARIO, dado.IDATIVO], (err, data) => {            
          }        
        )
      })
    })
  })
}

export function buscaUsuario(nomeUsuario){
  return new Promise(result => {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM usuarios
                    WHERE
                      nmUsuario LIKE ?
                    ORDER BY cdUsuario`,['%'+nomeUsuario+'%'],(err, data) => {
        if (data.rows.length > 0){
          result(data.rows._array)
        } else {
          result(false)
        }
      })
    })
  })
}