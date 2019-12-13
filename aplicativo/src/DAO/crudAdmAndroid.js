import { db, criaTabelaAdmAndroid } from '../DAO/criaTabelasBanco'

let config = {}

export function insereDadosAdmAndroidAPP(dado) {
  db.transaction(tx => {
    tx.executeSql(`DROP TABLE ADMANDROID`)
    criaTabelaAdmAndroid()
    db.transaction(tx => {
      dado.forEach(dado => {
        tx.executeSql(`
        INSERT INTO 
                ADMANDROID(
                    CDCONFIG,
                    CDEST,
                    CDFIL,
                    CDFILEST,
                    CDFILFIN,
                    CDPRAZO,
                    CDPRECO,
                    CDSYSLOG,
                    CDUSUAALT,
                    CDUSUAINC,
                    DTINCALTREG,
                    DTINSERT,
                    DTSYNC,
                    IDBLOQVLVENDA,
                    IDENVIAEMAILSINC,
                    IDGERACOMIS,
                    IDGERAORC,
                    IDLIMITADESCVALMIN,
                    IDMOSTRAESTOQUE,
                    IDPRAZOPORCLIENTE,
                    IDPRAZOPORPRECO,
                    IDSYNCCLIFOR,
                    IDUSACDLISTAPRECO,
                    IDUSADESCFAT,
                    IDUSAMOTIVOTROCA,
                    IDUSAOBSITEM,
                    IDUSARKIT,
                    IDUSARPACOTE,
                    IDVALIDAATRASOFIN,
                    IDVALIDASALDODISP,
                    NUPAGESIZE,
                    PECOMISPROG,
                    PEDESCCOMIS,
                    PEDESCMAX,
                    SYNCINTERVAL,
                    TPCADCLIENTE,
                    IDUSACONTRATO,
                    IDATIVAFLEX,
                    DTINICIALFLEX
                )
            VALUES
                (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        `,
          [
            dado.CDCONFIG,
            dado.CDEST,
            dado.CDFIL,
            dado.CDFILEST,
            dado.CDFILFIN,
            dado.CDPRAZO,
            dado.CDPRECO,
            dado.CDSYSLOG,
            dado.CDUSUAALT,
            dado.CDUSUAINC,
            dado.DTINCALTREG,
            dado.DTINSERT,
            dado.DTSYNC,
            dado.IDBLOQVLVENDA,
            dado.IDENVIAEMAILSINC,
            dado.IDGERACOMIS,
            dado.IDGERAORC,
            dado.IDLIMITADESCVALMIN,
            dado.IDMOSTRAESTOQUE,
            dado.IDPRAZOPORCLIENTE,
            dado.IDPRAZOPORPRECO,
            dado.IDSYNCCLIFOR,
            dado.IDUSACDLISTAPRECO,
            dado.IDUSADESCFAT,
            dado.IDUSAMOTIVOTROCA,
            dado.IDUSAOBSITEM,
            dado.IDUSARKIT,
            dado.IDUSARPACOTE,
            dado.IDVALIDAATRASOFIN,
            dado.IDVALIDASALDODISP,
            dado.NUPAGESIZE,
            dado.PECOMISPROG,
            dado.PEDESCCOMIS,
            dado.PEDESCMAX,
            dado.SYNCINTERVAL,
            dado.TPCADCLIENTE,
            dado.IDUSACONTRATO,
            dado.IDATIVAFLEX,
            dado.DTINICIALFLEX
          ]
        )
      })
    })
  })
}

export function buscaRegistrosAdmAndroid(){
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM ADMANDROID',[], (err,data) => {
      if(data.rows.length > 0){
        data.rows._array.forEach(result => {
          config = result
        })
      } else {
      }
    })
  })
}

export {config}