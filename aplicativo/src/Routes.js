import React from 'react'
import {Router, Stack, Scene} from 'react-native-router-flux'
import TelaInicial from './views/TelaInicial'
import ListaRegistros from './views/ListaRegistros'
import ListaUsuariosApp from './views/ListaUsuariosApp'

export default ()=>(
  <Router>
    <Stack hideNavBar = {true}>
      <Scene key='TelaInicial' component={TelaInicial} initial/>
      <Scene key='ListaRegistros' component={ListaRegistros}/>
      <Scene key='ListaUsuariosApp' component={ListaUsuariosApp}/>
    </Stack>
  </Router>
)