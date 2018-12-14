import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Sidebar from './../Components/Sidebar/Sidebar'
import Contratos from './../Pages/Contratos/Contratos.page'
import CadastroInquilino from './../Pages/CadastroInquilino/CadastroInquilino.page'
import Recibos from './../Pages/Recibos/Recibos.page'
class Router extends Component {
  constructor() {
    super();
    this.state = { router: "", permission: false }

  }



  componentWillMount() {

    // const permission = JSON.parse(localStorage.getItem('perfil'))
    // let allUserPermission = [];
    // if (permission)
    //     permission.forEach(perfil => {
    //         allUserPermission.push(perfil.nome)
    //     });
    // const havePermission = allUserPermission.find((pfl) => pfl === 'Administrador')

    // console.log(havePermission)

    // this.setState({ permission: havePermission });

  }

  render() {
    // console.log("1", auth);
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/home/">
            <Sidebar>
              <div style={{paddingTop: "75px"}}>
                <Route path="/home/contrato" exact={true} render={(props) =><Contratos />} />
                <Route path="/home/cadastro" exact={true} render={(props) =><CadastroInquilino />} />
                <Route path="/home/recibo" exact={true} render={(props) =><Recibos />} />
              </div>
              </Sidebar>
          </Route>
          {/* <Route path="/" exact={true} render={(props) => <Login auth={auth} {...props} />} /> */}
          {/* <Route path="/" exact={true} render={(props) => <Login auth={auth} {...props} />} />
                        <Route path="/*">
                            <div>
                               
                                    
                              
                               
                                <SideBar logout={() => auth.logout()} router={this.state.router} permission={this.state.permission}>
                                    <Route path="/home/" exact={true} render={(props) => <Home auth={auth} {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/gestao-funcionarios" exact={true} render={(props) => <GestaoFuncionarios auth={auth} {...props} router={(router) => this.setState({ router })} permission={this.state.permission} />} />
                                    <Route path="/home/gestao-projetos" exact={true} render={(props) => <GestaoProjetos auth={auth} {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/cadastro-demanda" exact={true} render={(props) => <CadastroDemanda auth={auth} {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/minhas-demandas" exact={true} render={(props) => <MinhasDemandas auth={auth} {...props} router={(router) => this.setState({ router })} />} />
                                    <Route path="/home/status-report" exact={true} render={(props) => <StatusReport auth={auth} {...props} router={(router) => this.setState({ router })} />} />
                                </SideBar>
                            </div>
                        </Route> */}
        </Switch>
      </BrowserRouter>

    );
  }
}

export default Router;