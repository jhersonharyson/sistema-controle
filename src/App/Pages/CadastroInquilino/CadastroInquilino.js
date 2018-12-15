import React, { Component } from 'react'
import { Button, Icon, Typography, TextField, MenuItem, Divider, Card } from '@material-ui/core';

import MaskedInput from 'react-text-mask';
import * as axios from 'axios';
import server from '../../../Config/server'
import { Row, Col, notification } from 'antd'
// import ContratroTemplate1 from './ContratoTemplate1'
import 'antd/dist/antd.css';

export default class CadastroInquilino extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      //nacionalidade: "",
      //estadoCivil: "",
      //profissao: "",
      //cpf: "",
      //rg: "",
      //orgaoEmissor: "",
      residencialIp: "",
      apartamento: "",
      tempoAlocacao: "",
      dataInicio: "",
      //dataTermino: "",
      diaPagamento: "",
      diaPagamentoTexto: ["PRIMEIRO", "DOIS", "TRÊS", "QUATRO", "CINCO", "SEIS", "SETE", "OITO", "NOVE", "DEZ",
        "ONZE", "DOZE", "TREZE", "CATORZE", "QUINZE", "DEZESSEIS", "DEZESEITE", "DEZOITO", "DEZENOVE", "VINTE", "VINTE E UM",
        "VINTE E DOIS", "VINTE E TRÊS", "VINTE E QUATRO", "VINTE E CINCO", "VINTE E SEIS", "VINTE E SETE", "VINTE E OITO", "VINTE E NOVE",
        "TRINTA", "TRINTA E UM"],
      valor: "",
      valorTexto: "",
      taxa: "",
      taxaTexto: "",

      mesPendencia: "",
      anoPendencia: "",
      pendencias: [],


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
        const data = x.data.sort((a, b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
        this.setState({ listaResidenciais: data })
      })
      .catch(error => {
        return notification['error']({
          message: 'Erro',
          description: 'Erro na comunicação com o servidor.',
        });
      })
  }

  componentDidMount() {
    let anos = []
    for (let i = 0; i < 10; i++)
      anos.push(this.ano - i)
    this.setState({ listaAnos: anos })
    notification.config({
      // placement: "bottomRight",
      duration: 15,
      top: 100
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
        const data = x.data.sort((a, b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
        this.setState({ listaApartamento: data })
      })
      .catch(error => {
        return notification['error']({
          message: 'Erro',
          description: 'Erro na comunicação com o servidor.',
        });
      })
  }
  handleAdicionaPendencia = async _ => {
    let pendencias = this.state.pendencias
    if ((!this.state.mesPendencia) || (!this.state.anoPendencia))
      return notification['error']({
        message: 'Erro',
        description: 'Preencha o mês e o ano da pendência corretamente.',
      });
    pendencias.push(this.state.mesPendencia + "/" + this.state.anoPendencia)
    await this.setState({ pendencias })
    this.setState({ mesPendencia: "", anoPendencia: "" });

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
    if (exist.data)
      return notification['warning']({
        message: 'Atenção',
        description: 'Já existe um inquilino para o apartamento ' + inquilino.residencialIp + '.',
        key: "update",
        btn:
          <Button variant="contained" type="primary" size="small" onClick={() => {
            notification.close('update')
            axios.put(server + 'api/v1/service/inquilino/' + exist.data._id, inquilino)
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
              <Typography variant="h6" style={{ marginTop: "15px", marginLeft: "15px" }}>CADASTRO DE INQUILINO</Typography>
              <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
              <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>DADOS DE LOCAÇÃO</Typography>
              <TextField
                id="outlined-dense"
                label="Nome"
                fullWidth
                margin="dense"
                style={{ width: "97%", marginLeft: "15px", marginRight: "15px" }}
                // helperText="Nome completo do locatário"

                value={this.state.nome}
                onChange={event => this.setState({ nome: event.target.value })}
              />

              <Row >

              </Row>
            </Row>
            <Row >
              <Col spen="8">
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
              </Col>
              <Col spen="8">
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
              </Col>
              <Col spen="8">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Dia Vencimento"
                  margin="dense"

                  style={{ minWidth: "225px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'dia-vencimento',
                    id: 'dia-vencimento-simple',
                  }}
                  value={this.state.diaPagamento}
                  onChange={event => this.setState({ diaPagamento: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {
                    [...Array(31).keys()].map((dia) => {
                      return (<MenuItem key={dia} value={dia + 1}>{dia + 1}</MenuItem>)
                    })
                  }
                </TextField>
              </Col>
            </Row>

            <Row>
              <TextField
                id="aluguel"
                label="Valor Aluguel"

                type="number"
                style={{ width: "225px", marginLeft: "15px" }}

                margin="dense"
                //variant="filled"
                value={this.state.valor}
                onChange={event => this.setState({ valor: event.target.value })}
              />
              <TextField
                id="aluguel-extenso"
                label="Valor Aluguel (por extenso)"

                style={{ width: "225px", marginLeft: "15px" }}

                margin="dense"
                //variant="filled"
                value={this.state.valorTexto}
                onChange={event => this.setState({ valorTexto: event.target.value })}
              />
            </Row>
            <Row>

              <TextField
                id="taxa"
                label="Taxa"

                type="number"
                style={{ width: "225px", marginLeft: "15px" }}

                margin="dense"
                //variant="filled"
                value={this.state.taxa}
                onChange={event => this.setState({ taxa: event.target.value })}

              />
              <TextField
                id="taxa-extenso"
                label="Taxa (por extenso)"

                style={{ width: "225px", marginLeft: "15px" }}

                margin="dense"
                value={this.state.taxaTexto}
                onChange={event => this.setState({ taxaTexto: event.target.value })}
              //variant="filled"

              />

            </Row>
            <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
            <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>PENDÊNCIAS</Typography>
            <Row>


              <Col spen="8">
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Mês"
                  margin="dense"

                  style={{ minWidth: "105px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'mes-pendencia',
                    id: 'mes-pendencia-simple',
                  }}
                  value={this.state.mesPendencia}
                  onChange={event => this.setState({ mesPendencia: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {
                    [...Array(12).keys()].map((mes) => {
                      return (<MenuItem key={mes} value={mes > 8 ? mes + 1 : "0" + (mes + 1)}>{mes > 8 ? mes + 1 : "0" + (mes + 1)}</MenuItem>)
                    })
                  }
                </TextField>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Ano"
                  margin="dense"

                  style={{ minWidth: "105px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'ano-pendencia',
                    id: 'ano-pendencia-simple',
                  }}
                  value={this.state.anoPendencia}
                  onChange={event => this.setState({ anoPendencia: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {
                    this.state.listaAnos.map((ano) => {
                      return (<MenuItem key={ano} value={ano}>{ano}</MenuItem>)
                    })
                  }
                </TextField>
                <Button variant="contained" color="secondary" size="small"
                  style={{ marginTop: "15px", marginLeft: "22px" }}
                  onClick={_ => this.handleAdicionaPendencia()} >
                  <Icon style={{ marginRight: "5px" }}>add_circle_outline</Icon> ADCIONAR
                </Button>
              </Col>
            </Row>
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
          <Icon>save</Icon>
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

  TextMaskCustomCalendar = (props) => {
    const { inputRef, ...other } = props
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}

      />
    );
  }
  TextMaskCustomCpf = (props) => {
    const { inputRef, ...other } = props
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}

      />
    );
  }
  TextMaskCustomRg = (props) => {
    const { inputRef, ...other } = props
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}

      />
    );
  }
  TextMaskCustomMonetario = (props) => {
    const { inputRef, ...other } = props
    return (
      <MaskedInput
        {...other}
        ref={inputRef}
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}

      />
    );
  }

}


// const actions = [
//   { icon: <Icon>file_copy</Icon>, name: 'Copy' },
//   { icon: <Icon>save</Icon>, name: 'Save' },
//   { icon: <Icon>print</Icon>, name: 'Print' },
//   { icon: <Icon>share</Icon>, name: 'Share' },
//   { icon: <Icon>delete</Icon>, name: 'Delete' },
// ];