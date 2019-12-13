//importação de módulos para dentro de uma const
//Todos os recursos do módulo são atribuídos à const
const express = require("express")
const bodyParser = require("body-parser")
const Firebird = require("node-firebird")

const app = express()
const porta = 14000

var options = {};
options.host = '10.1.1.154';
options.port = 3050;
options.database = 'C:\\Sistema de Clientes\\Bressaneli\\DB\\INDUSTRIAL.FDB';
options.user = 'sysmts';
options.password = 'mts';
options.lowercase_keys = false;
options.role = null;
options.pageSize = 4096;
const pool = Firebird.pool(1000000, options)

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb"}))
app.use(bodyParser.json({limit: "50mb"}))

app.get("/respostasGetString", (request, response) =>{
  response.send("Teste String")  
})

app.get("/respostasGetStringBanana", (request, response) =>{
  response.send("Teste String Banana")  
})

app.post("/envioPostString", (request, response) => {
  let parametros = request.body

  if (parametros.Idade > 10 && parametros.Idade < 18){
    response.send("Adolescente")
  } else {
    response.send("Adulto")
  }
})

app.get("/buscaUsuariosAPP", (request, response) =>{
  Firebird.attach(options, (err, db) => {
    
    if (err)
      throw console.log("Erro ao conectar com o banco de dados", err)

    db.query(`
      SELECT * FROM SYNUSUARIO
    `,[], (err, result) => {
      if(err){
        response.send(`Erro ao buscar registros (SQL) no Cadastro de Usuários em /buscaUsuariosAPP`)
        return
      } else {
        response.send(result)        
      }

      db.detach()

    })
  })
})

app.post("/enviaUsuariosParaERP", (request, response) => {
  let cod = 0;
  let dados = request.body;

  Firebird.attach(options, (err, db) => {
    if (err)
      throw console.log("Erro ao conectar com o banco de dados", err)
    
    db.transaction(Firebird.ISOLATION_READ_COMMITED, (err, transaction) => {
      pool.get((err, db) => {
        db.query('SELECT MAX(cdusuario) as cd FROM SYNUSUARIO', [], (err, data) => {
          data.forEach(cdUsuario => {
            let result = cdUsuario.CD + 1
            cod = cod + (result)

            transaction.query(`
              INSERT INTO SYNUSUARIO(
                cdUsuario,
                nmUsuario,
                deLogin,
                cdSenha,
                cnpjUsuario,
                idAtivo)
              VALUES (?,?,?,?,?,?)`,
              [
                cod,
                dados.nmUsuarioApp,
                dados.deLoginApp,
                dados.cdSenhaApp,
                dados.cnpjUsuarioApp,
                0
              ],(err, result) => {
                if (err) {
                  console.log('Erro ao inserir usuário em enviaUsuariosParaERP', err)
                  transaction.rollback()
                  response.send('Erro ao inserir usuário 1')
                  return
                } else {
                    transaction.commit(err => {
                    if (err){
                      console.log("Erro Commit")
                      response.send('Erro ao inserir usuário 2')
                    } else {
                      console.log('Commit')
                      response.send(true)
                    }
                  })
                }
              }
            )
          })
        })
      })  
    })
  })
})

app.get("/buscaParamAdmAndroid", (request, response)=>{
  Firebird.attach(options, (err, db) =>{
    if(err)
      throw console.log("Erro ao conectar com o Banco de Dados", err)

    db.query(
      `SELECT * FROM ADMANDROID`,
      [], (err, result) =>{
        if(err){
          response.send(`Erro ao buscar parâmetros (SQL) nas Configurações Mobile em /buscaParamAdmAndroid`)
          return
        } else {
          response.send(result)
        }
        db.detach()
      }
    )
  })
})


///////////////////////////////////////////////////
app.listen(porta, () => {
  console.log(`Servidor Rodando na porta ${porta}`)
})