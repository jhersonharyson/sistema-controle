import React, { Component } from 'react'
import { Button, Icon, Typography, TextField, MenuItem, Divider, Card, List } from '@material-ui/core';
import * as axios from 'axios';
import server from '../../../Config/server'
import { Row, notification } from 'antd'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment'
import 'antd/dist/antd.css';

export default class Recibos extends Component {
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
      mes: ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"],
      valor: "",
      valorTexto: "",
      taxa: "",
      taxaTexto: "",


      listaResidenciais: [],
      listaApartamento: [],
      listaAnos: [],
      inquilino: { pendencias: [] },

      open: false,
      recibo: false,
      loading: false,
      diasAtrasados: 0,
      juros: 0,
      valorReajustado: 0,
      valorReajustadoTexto: "",
      dataMaisAntiga: "",

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

  componentDidMount() {
    notification.config({
      // placement: "bottomRight",
      duration: 15,
      top: 100
    })
  }


  handleChangeIp = async (event) => {
    event.preventDefault();
    // event.stopProgation();
    const residencialIp = event.target.value
    this.setState({ residencialIp, apartamento: "" })
    console.log(event.target.value)
    const x = await axios.get(server + 'api/v1/service/residencial/' + residencialIp.replace('IP ', '').split(' ')[0])
    console.log(x.data.endereco);
    this.setState({ end: x.data.endereco })
    axios.get(server + 'api/v1/service/apartamento/' + residencialIp)
      .then(x => {
        console.log(x.data);
        x.data.sort((a, b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0))
        this.setState({ listaApartamento: x.data })
      })
      .catch(error => {
        console.log(error)
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
      pendencias: this.state.pendencias,

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

  handleConfirmar = async () => {
    if (!this.state.apartamento)
      return notification['error']({
        message: 'Erro',
        description: 'Preencha todos os campos.',
      });
    await this.setState({
      diasAtrasados: 0,
      juros: 0,
      valorReajustado: 0,
      valorReajustadoTexto: "",
      dataMaisAntiga: ""
    })
    this.setState({ loading: true });
    try {
      const x = await axios.get(server + `api/v1/service/inquilino/IP ${this.state.residencialIp} ${this.state.apartamento}`)
      console.log(x.data);
      await this.setState({ open: true, inquilino: x.data })
      const now = new Date();
      const dataAtual = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
      const len = this.state.inquilino.pendencias.length;
      const pendencias = this.state.inquilino.pendencias
      let dataMaisAntiga;
      let data1, data2
      if (len === 1) {
        dataMaisAntiga = pendencias[0];
        await this.setState({ dataMaisAntiga: `${this.state.inquilino.vencimento}/${dataMaisAntiga}` })
        console.log(this.state.dataMaisAntiga);
        moment.locale('pt-br');
        data1 = moment(this.state.dataMaisAntiga, 'DD/MM/YYYY');
        data2 = moment(dataAtual, 'DD/MM/YYYY');
        const diff = data2.diff(data1, 'days');
        console.log(diff)
        await this.setState({ diasAtrasados: diff });
        if (diff > 0) {
          const valor = this.state.inquilino.valor
          const juros = valor * 0.1 + valor * 0.01 * this.state.diasAtrasados;
          await this.setState({ valorReajustado: (valor + juros), juros })
        }
      } else if (len > 1) {
        for (let i = 0; i < len - 1; i++) {
          // this.state.inquilino.pendencias
          const partesData1 = pendencias[i].split("/");
          const partesData2 = pendencias[i + 1].split("/");
          data1 = new Date(partesData1[1], partesData1[0] - 1, this.state.inquilino.vencimento);
          data2 = new Date(partesData2[1], partesData2[0] - 1, this.state.inquilino.vencimento);
          if (data1 < data2) {
            console.log(pendencias[i]);
            dataMaisAntiga = this.state.inquilino.vencimento + "/" + pendencias[i]
          }
          else {
            console.log(pendencias[i + 1]);
            dataMaisAntiga = this.state.inquilino.vencimento + "/" + pendencias[i + 1]
          }
        }
        this.setState({ dataMaisAntiga })
        //formato do brasil 'pt-br'
        moment.locale('pt-br');
        //setando data1
        data1 = moment(dataMaisAntiga, 'DD/MM/YYYY');
        //setando data2
        data2 = moment(dataAtual, 'DD/MM/YYYY');
        //tirando a diferenca da data2 - data1 em dias
        const diff = data2.diff(data1, 'days');
        console.log(diff)
        await this.setState({ diasAtrasados: diff });
        const valor = this.state.inquilino.valor
        const juros = valor * 0.1 + valor * 0.01 * this.state.diasAtrasados;

        await this.setState({ valorReajustado: (valor + juros), juros })
      } else {
        this.setState({ dataMaisAntiga: `${this.state.inquilino.vencimento}/${now.getMonth() + 1}/${now.getFullYear()}` })
        moment.locale('pt-br');
        data1 = moment(`${this.state.inquilino.vencimento}/${now.getMonth() + 1}/${now.getFullYear()}`, 'DD/MM/YYYY');
        data2 = moment(dataAtual, 'DD/MM/YYYY');
        const diff = data2.diff(data1, 'days');
        await this.setState({ diasAtrasados: diff });
        if (diff > 0) {
          const valor = this.state.inquilino.valor
          const juros = valor * 0.1 + valor * 0.01 * this.state.diasAtrasados;
          await this.setState({ valorReajustado: (valor + juros), juros })
        } else {
          await this.setState({ valorReajustado: this.state.inquilino.valor })
        }
      }

    }
    catch (error) {
      console.log(error)
      return notification['error']({
        message: 'Erro',
        description: 'Erro na comunicação com o servidor.',
      });
    }
    this.setState({ loading: false });

  }

  handleGerarRecibo = async () => {
    if (!this.state.valorReajustadoTexto)
      return notification['error']({
        message: 'Erro',
        description: 'Preencha o campo de confirmação.',
      })
    this.setState({ recibo: true })
  }
  render() {
    //const nacionalidade = ["Afegão", "Africano", "Alemão", "Americano", "Argentino", "Asiático", "Australiano", "Austríaco", "Belga", "Brasileiro", "Britânico", "Canadense", "Chileno", "Chinês", "Colombiano", "Coreano", "Croata", "Dinamarquês", "Egípcio", "Escocês", "Eslovaco", "Espanhol", "Europeu", "Filipino", "Finlandês", "Francesa", "Francês", "Francês", "Grego", "Holandês", "Indiano", "Inglês", "Iraniano", "Iraquiano", "Italiano", "Japonês", "Mexicano", "Norueguês", "Paquistanês", "Polonês", "Português", "Russo", "Sueco", "Sul-Africano", "Sul-Coreano", "Turco", "Árabe"]
    return (
      <div style={{ display: "flex", justifyContent: "center" }} >

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
            <Button onClick={_ => this.handleConfirmar()} loading={this.state.loading.toString()} variant="contained" color="secondary" style={{ marginLeft: "15px" }}>CONFIRMAR</Button>

          </Card>
        }

        <Dialog
          open={this.state.open}
          keepMounted
          maxWidth="sm"
          fullWidth
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {`IP ${this.state.residencialIp} ${this.state.apartamento}`}
          </DialogTitle>
          <Divider />
          <List component="nav" style={{ marginLeft: "40px", color: "black" }}>
            <Row>
              <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                <strong>Nome: </strong> {this.state.inquilino.nome}
              </DialogContentText>

              {this.state.inquilino.pendencias.length > 0 &&
                <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                  <strong>Pendencias: </strong><span style={{ color: "red" }}>{this.state.inquilino.pendencias.map(pen => {
                    return " " + pen
                  })}
                  </span>
                </DialogContentText>
              }
              <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                <strong>Dia de Vencimento: </strong>{this.state.inquilino.vencimento}
              </DialogContentText>
              {this.state.diasAtrasados > 0 &&
                <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                  <strong>Dias atrasados:  </strong>{this.state.diasAtrasados}
                </DialogContentText>
              }
              <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                <strong>Valor do Aluguel</strong>: R$ {this.state.inquilino.valor}
              </DialogContentText>

              {this.state.diasAtrasados > 0 &&
                <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                  <strong>Juros Totais: </strong>: R$ {this.state.juros}
                </DialogContentText>
              }

              <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
                <strong>Valor da Taxa: </strong>R$  {this.state.inquilino.taxa}
              </DialogContentText>
            </Row>
          </List>
          <Divider />
          <DialogActions>
            <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
              {this.state.valorReajustado === 0 ? <span>
                <strong>Total: R$ </strong> {(this.state.inquilino.valor + this.state.inquilino.taxa)}</span>
                : <span><strong>Valor Total: <span style={{ color: "green" }}>R$ {(this.state.valorReajustado + this.state.inquilino.taxa)}</span></strong></span>
              }
            </DialogContentText>
          </DialogActions>
          <Divider />
          <DialogActions style={{ justifyContent: "center" }}>
            <DialogContentText id="alert-dialog-slide-description" style={{ color: "black" }}>
              <strong>
                Eu recebi a quantia de R$ {this.state.valorReajustado} ( <TextField placeholder="Insira o valor por extenso" value={this.state.valorReajustadoTexto} style={{ marginTop: "-5px" }} onChange={(event) => this.setState({ valorReajustadoTexto: event.target.value })}></TextField> reais ) <br />
                mais a taxa no valor de R$ {this.state.inquilino.taxa} ( {this.state.inquilino.taxaTexto} reais )
                  referente a {this.state.dataMaisAntiga.substring(3)}
              </strong>
            </DialogContentText>
          </DialogActions>
          <Divider />
          <DialogActions>


            <Button onClick={() => this.setState({ open: false })} color="secondary" position="left">
              ALTERAR VALOR
            </Button>
            <Button onClick={() => this.setState({ open: false })} color="primary">
              CANCELAR
            </Button>
            <Button onClick={_ => this.handleGerarRecibo()} color="primary">
              GERAR RECIBO
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.recibo}
          keepMounted
          maxWidth="md"
          fullWidth
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"RECIBO"}
          </DialogTitle>
          <DialogContent id="recibo-print">
            <div style={{ width: "100%", border: "5px solid black", textAlign: "center" }}>
              <strong><big><big>RESIDÊNCIAL I.P.</big></big></strong><br />
              <span>Av. Pedro Miranda, 139 - CEP: 66085-005</span> <br />
              <span>FONE: (91) 98333-9601 / WhatsApp: (91) 98931-6082</span> <br />
              <span>Pedreira – Belém /PA</span>
            </div>
            <p style={{ textAlign: "center", fontSize: "20px", marginTop: "30px", fontWeight: "bolder" }}>
              <span><strong>RECIBO DE ALUGUEL</strong></span>
            </p>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`R$ ${this.state.valorReajustado}`}</span>
            </div>
            <div>
              Recebemos do(a) <strong>Sr(a) {this.state.inquilino.nome}</strong>,
              a importância supra de <strong>R$ {this.state.valorReajustado}({this.state.valorReajustadoTexto} reais) </strong>
              referente ao pagamento do <strong>ALUGUEL</strong> do  Apto. {this.state.inquilino.apartamento}, do imóvel
              situado no Residencial IP {this.state.inquilino.ip}, localizado {this.state.end} -
              Belém(PA), correspondente ao mês de {this.state.mes[parseInt(this.state.dataMaisAntiga.split('/')[1]) - 1]}.
            </div>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`Belém ${new Date().getDate()} de ${this.state.mes[(new Date().getMonth())]} de ${new Date().getFullYear()}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50px" }}>
              <div style={{ textAlign: "center", marginRight: "50px" }}>
                ____________________________<br />
                LOCADOR(A)
                </div>
              <div style={{ textAlign: "center", marginLeft: "50px" }}>
                ____________________________<br />
                RECEPCIONISTA
                </div>
            </div>
            <h1>

            </h1>
            <div style={{ width: "100%", border: "5px solid black", textAlign: "center" }}>
              <strong><big><big>RESIDÊNCIAL I.P.</big></big></strong><br />
              <span>Av. Pedro Miranda, 139 - CEP: 66085-005</span> <br />
              <span>FONE: (91) 98333-9601 / WhatsApp: (91) 98931-6082</span> <br />
              <span>Pedreira – Belém /PA</span>
            </div>
            <p style={{ textAlign: "center", fontSize: "20px", marginTop: "30px", fontWeight: "bolder" }}>
              <span><strong>RECIBO DE ALUGUEL</strong></span>
            </p>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`R$ ${this.state.valorReajustado}`}</span>
            </div>
            <div>
              Recebemos do(a) <strong>Sr(a) {this.state.inquilino.nome}</strong>,
              a importância supra de <strong>R$ {this.state.valorReajustado}({this.state.valorReajustadoTexto} reais) </strong>
              referente ao pagamento do <strong>ALUGUEL</strong> do  Apto. {this.state.inquilino.apartamento}, do imóvel
              situado no Residencial IP {this.state.inquilino.ip}, localizado {this.state.end} -
              Belém(PA), correspondente ao mês de {this.state.mes[parseInt(this.state.dataMaisAntiga.split('/')[1]) - 1]}.
            </div>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`Belém ${new Date().getDate()} de ${this.state.mes[(new Date().getMonth())]} de ${new Date().getFullYear()}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50px" }}>
              <div style={{ textAlign: "center" }}>
                ____________________________<br />
                RECEPCIONISTA
                </div>
            </div>
            <h1>

            </h1>
            <div style={{ width: "100%", border: "5px solid black", textAlign: "center" }}>
              <strong><big><big>RESIDÊNCIAL I.P.</big></big></strong><br />
              <span>Av. Pedro Miranda, 139 - CEP: 66085-005</span> <br />
              <span>FONE: (91) 98333-9601 / WhatsApp: (91) 98931-6082</span> <br />
              <span>Pedreira – Belém /PA</span>
            </div>
            <p style={{ textAlign: "center", fontSize: "20px", marginTop: "30px", fontWeight: "bolder" }}>
              <span><strong>RECIBO DE TAXA DE ÁGUA</strong></span>
            </p>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`R$ ${this.state.inquilino.taxa}`}</span>
            </div>
            <div>
              Recebemos do(a) <strong>Sr(a) {this.state.inquilino.nome}</strong>,
              a importância supra de <strong>R$ {this.state.inquilino.taxa}({this.state.inquilino.taxaTexto} reais) </strong>
              referente ao pagamento da <strong>TAXA DE ÁGUA</strong> do  Apto. {this.state.inquilino.apartamento}, do imóvel
              situado no Residencial IP {this.state.inquilino.ip}, localizado {this.state.end} -
              Belém(PA), correspondente ao mês de {this.state.mes[parseInt(this.state.dataMaisAntiga.split('/')[1]) - 1]}.
            </div>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`Belém ${new Date().getDate()} de ${this.state.mes[(new Date().getMonth())]} de ${new Date().getFullYear()}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50px" }}>
              <div style={{ textAlign: "center", marginRight: "50px" }}>
                ____________________________<br />
                LOCADOR(A)
                </div>
              <div style={{ textAlign: "center", marginLeft: "50px" }}>
                ____________________________<br />
                RECEPCIONISTA
                </div>
            </div>
            <h1>

            </h1>
            <div style={{ width: "100%", border: "5px solid black", textAlign: "center" }}>
              <strong><big><big>RESIDÊNCIAL I.P.</big></big></strong><br />
              <span>Av. Pedro Miranda, 139 - CEP: 66085-005</span> <br />
              <span>FONE: (91) 98333-9601 / WhatsApp: (91) 98931-6082</span> <br />
              <span>Pedreira – Belém /PA</span>
            </div>
            <p style={{ textAlign: "center", fontSize: "20px", marginTop: "30px", fontWeight: "bolder" }}>
              <span><strong>RECIBO DE TAXA DE ÁGUA</strong></span>
            </p>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`R$ ${this.state.inquilino.taxa}`}</span>
            </div>
            <div>
              Recebemos do(a) <strong>Sr(a) {this.state.inquilino.nome}</strong>,
              a importância supra de <strong>R$ {this.state.inquilino.taxa}({this.state.inquilino.taxaTexto} reais) </strong>
              referente ao pagamento da <strong>TAXA DE ÁGUA</strong> do  Apto. {this.state.inquilino.apartamento}, do imóvel
              situado no Residencial IP {this.state.inquilino.ip}, localizado {this.state.end} -
              Belém(PA), correspondente ao mês de {this.state.mes[parseInt(this.state.dataMaisAntiga.split('/')[1]) - 1]}.
            </div>
            <div style={{ textAlign: "right", fontSize: "18px", fontWeight: "bolder" }}>
              <span>{`Belém ${new Date().getDate()} de ${this.state.mes[(new Date().getMonth())]} de ${new Date().getFullYear()}`}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "50px" }}>
              <div style={{ textAlign: "center" }}>
                ____________________________<br />
                RECEPCIONISTA
                </div>
            </div>

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({ recibo: false })} color="secondary" position="left">
              CANCELAR
            </Button>
            <Button onClick={() => {
              let recibo = document.getElementById('recibo-print').innerHTML;
              var style = "<style>";
              style = style + "table {width: 100%;font: 20px Calibri;}";
              style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
              style = style + "padding: 2px 3px;text-align: center;}";
              style = style + "@media print { h1 {page-break-before: always; }}";
              style = style + "</style>";
              // CRIA UM OBJETO WINDOW
              var win = window.open('', '', 'height=700,width=700');
              win.document.write('<html><head>');
              win.document.write('<title></title>');   // <title> CABEÇALHO DO PDF.
              win.document.write(style);                                     // INCLUI UM ESTILO NA TAB HEAD
              win.document.write('</head>');
              win.document.write('<body>');
              win.document.write(recibo);                          // O CONTEUDO DA TABELA DENTRO DA TAG BODY
              win.document.write('</body></html>');
              // win.document.close(); 	                                         // FECHA A JANELA
              win.print();

            }} color="primary">
              SALVAR E IMPRIMIR
            </Button>
          </DialogActions>
        </Dialog>
      </div >
    )
  }
}


// const actions = [
//   { icon: <Icon>file_copy</Icon>, name: 'Copy' },
//   { icon: <Icon>save</Icon>, name: 'Save' },
//   { icon: <Icon>print</Icon>, name: 'Print' },
//   { icon: <Icon>share</Icon>, name: 'Share' },
//   { icon: <Icon>delete</Icon>, name: 'Delete' },
// ];