import React, { Component } from 'react'
import { Button, Icon, Typography, TextField, MenuItem, Divider, Card } from '@material-ui/core';
import * as axios from 'axios';
import server from '../../../Config/server'
import { Row, Col, notification } from 'antd'
import 'antd/dist/antd.css';

export default class CadastroInquilino extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      residencialIp: "",
      apartamento: "",
      tempoAlocacao: "",
      pendencias: [],
      diaPagamentoTexto: ["PRIMEIRO", "DOIS", "TRÊS", "QUATRO", "CINCO", "SEIS", "SETE", "OITO", "NOVE", "DEZ",
        "ONZE", "DOZE", "TREZE", "CATORZE", "QUINZE", "DEZESSEIS", "DEZESEITE", "DEZOITO", "DEZENOVE", "VINTE", "VINTE E UM",
        "VINTE E DOIS", "VINTE E TRÊS", "VINTE E QUATRO", "VINTE E CINCO", "VINTE E SEIS", "VINTE E SETE", "VINTE E OITO", "VINTE E NOVE",
        "TRINTA", "TRINTA E UM"],
      valor: "",
      valorTexto: "",
      taxa: "",
      taxaTexto: "",


      listaResidenciais: [],
      listaApartamento: [],
      listaAnos: [],
    }
    this.initialState = this.state;
    this.ano = new Date().getFullYear()
  }

  componentWillMount() {
    axios.get(server + 'api/v1/service/residencial')
      .then(x => {
        const data = x.data.sort((a, b) => (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0))
        this.setState({ listaResidenciais: data })
      })
      .catch(error => {
        return notification['error']({
          message: 'Erro',
          description: 'Erro na comunicação com o servidor.',
        });
      })
  }


  handleChangeIp = (event) => {
    event.preventDefault();
    // event.stopProgation();
    const residencialIp = event.target.value
    this.setState({ residencialIp, apartamento: "" })
    console.log(event.target.value)
    axios.get(server + 'api/v1/service/apartamento/' + residencialIp)
      .then(x => {
        console.log(x.data);
        x.data.sort((a, b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
        this.setState({ listaApartamento: x.data })
      })
      .catch(error => {
        return notification['error']({
          message: 'Erro',
          description: 'Erro na comunicação com o servidor.',
        });
      })
  }

  handleSalvar = async _ => {
    if ((!this.state.nome) || (!this.state.residencialIp) || (!(this.state.apartamento)) ||
      (!this.state.diaPagamento) || (!this.state.diaPagamentoTexto) || (!this.state.valor) ||
      (!this.state.valorTexto) || (!this.state.taxa) || (!this.state.taxaTexto))
      return notification['error']({
        message: 'Erro',
        description: 'Preencha todos os campos obrigatórios.',
      });
    const inquilino = {
      nome: this.state.nome,
      cpf: "",
      rg: "",
      naturalidade: "",
      contrato: "",
      tipoContrato: "",
      terminoContrato: "",
      inicioContrato: "",
      vencimento: this.state.diaPagamento,
      valor: this.state.valor,
      valorTexto: this.state.valorTexto,
      taxa: this.state.taxa,
      taxaTexto: this.state.taxaTexto,
      ip: this.state.residencialIp,
      apartamento: this.state.apartamento,
      residencialIp: "IP " + this.state.residencialIp + " " + this.state.apartamento,
      pendencias: this.state.pendencias
    }
    const exist = await axios.get(server + 'api/v1/service/inquilino/' + inquilino.residencialIp)
    console.log(exist.data)
    if (exist.data.inquilino.length > 0)
      return notification['warning']({
        message: 'Atenção',
        description: 'Já existe um inquilino para o apartamento ' + inquilino.residencialIp + '.',
        key: "update",
        btn:
          <Button variant="contained" type="primary" size="small" onClick={() => {
            notification.close('update')
            axios.put(server + 'api/v1/service/inquilino/' + exist.data.inquilino[0]._id, inquilino)
              .then(x => {
                if (x.data)
                  return notification['success']({
                    message: 'Sucesso',
                    description: 'Inquilino cadastrado com sucesso.',
                  });
              })
              .catch(error => {
                console.log(error);
                return notification['error']({
                  message: 'Erro',
                  description: 'Erro ao enviar os dados para o servidor.',
                });
              })
          }}>
            Sobreescrever
          </Button>

      });

    axios.post(server + 'api/v1/service/inquilino', inquilino)
      .then(x => {
        if (x.data)
          return notification['success']({
            message: 'Sucesso',
            description: 'Inquilino cadastrado com sucesso.',
          });
      })
      .catch(error => {
        console.log(error);
        return notification['error']({
          message: 'Erro',
          description: 'Erro ao enviar os dados para o servidor.',
        });
      })
  }

  render() {
    //const nacionalidade = ["Afegão", "Africano", "Alemão", "Americano", "Argentino", "Asiático", "Australiano", "Austríaco", "Belga", "Brasileiro", "Britânico", "Canadense", "Chileno", "Chinês", "Colombiano", "Coreano", "Croata", "Dinamarquês", "Egípcio", "Escocês", "Eslovaco", "Espanhol", "Europeu", "Filipino", "Finlandês", "Francesa", "Francês", "Francês", "Grego", "Holandês", "Indiano", "Inglês", "Iraniano", "Iraquiano", "Italiano", "Japonês", "Mexicano", "Norueguês", "Paquistanês", "Polonês", "Português", "Russo", "Sueco", "Sul-Africano", "Sul-Coreano", "Turco", "Árabe"]
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>

        {!this.state.hidden &&
          <Card style={{ width: "80%", paddingBottom: "30px", marginBottom: "50px" }}>
            <Row>
              <Typography variant="h6" style={{ marginTop: "15px", marginLeft: "15px" }}>GERADOR DE RECIBOS</Typography>
              <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
              {/* <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>APARTAMENTO</Typography> */}
            </Row>
            <Row >
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Residêncial IP"
                  //helperText="Selecione o Residêncial IP"
                  margin="dense"
                  //variant="outlined"
                  style={{ width: "225px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'residencial',
                    id: 'residencial-simple',
                  }}
                  //variant="filled"
                  value={this.state.residencialIp}
                  onChange={event => this.handleChangeIp(event)}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {
                    this.state.listaResidenciais.map((residencial, index) => {
                      return (<MenuItem key={index} value={residencial.nome}>{"I.P " + residencial.nome}</MenuItem>)
                    })
                  }
                </TextField>
              
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Nº Apartamento"
                  //helperText="Selecione o Residêncial IP"
                  margin="dense"
                  //variant="outlined"
                  style={{ width: "225px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'apartamento',
                    id: 'apartamento-simple',
                  }}
                  //variant="filled"
                  value={this.state.apartamento}
                  onChange={event => this.setState({ apartamento: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {
                    this.state.listaApartamento.map((residencial, index) => {
                      return (<MenuItem key={index} value={residencial.apartamento}>{residencial.apartamento}</MenuItem>)
                    })
                  }
                </TextField>           
            </Row>

            <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
            {/* <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>PENDÊNCIAS</Typography> */}
            <Button variant="contained" color="secondary" style={{ marginLeft: "15px" }}>CONFIRMAR</Button>     
            <Row>
              {this.state.pendencias.map((pendencia, index) => {
                return (
                  <Row key={index} style={{ marginLeft: "15px" }}>
                    <Col span="2">
                      <Typography variant="subtitle2" style={{ marginTop: "25px" }}>
                        {pendencia}
                      </Typography>
                    </Col>
                    <Col span="2">
                      <Button variant="contained" color="primary" size="small" style={{ marginTop: "15px", marginLeft: "22px" }}
                        onClick={_ => { this.setState({ pendencias: this.state.pendencias.filter((ele, ind) => { return (ind !== index) }) }) }}>
                        <Icon>delete</Icon>
                      </Button>
                    </Col>
                  </Row>
                )
              })}
            </Row>
          </Card>
        }
        <Button className="btn-save" variant="fab" color="secondary" aria-label="Add" style={{ position: "fixed", bottom: "25px", right: "35px" }}
          onClick={async _ => {
            this.handleSalvar()

          }}
        >
          <Icon>print</Icon>
        </Button>
        <Button className="btn-save" variant="fab" color="primary" aria-label="Add" style={{ position: "fixed", bottom: "25px", right: "105px" }}
          onClick={async _ => {
            await this.setState(this.initialState)
          }}
        >
          <Icon>clear</Icon>
        </Button>
        {/* <SpeedDial
          ariaLabel="SpeedDial example"
          //className={speedDialClassName}
          // hidden={hidden}
          icon={<Icon>speed_dial</Icon>}
          onBlur={()=>this.setState({open: false})}
          onClick={()=>this.setState({open: true})}
          onClose={()=>this.setState({open: false})}
          onFocus={()=>this.setState({open: true})}
          onMouseEnter={()=>this.setState({open: true})}
          onMouseLeave={()=>this.setState({open: false})}
          open={this.state.open}
          // direction={direction}
        >
          {actions.map(action => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={this.handleClick}
            />
          ))}
        </SpeedDial> */}


      </div >
    )
  }
}


const actions = [
  { icon: <Icon>file_copy</Icon>, name: 'Copy' },
  { icon: <Icon>save</Icon>, name: 'Save' },
  { icon: <Icon>print</Icon>, name: 'Print' },
  { icon: <Icon>share</Icon>, name: 'Share' },
  { icon: <Icon>delete</Icon>, name: 'Delete' },
];