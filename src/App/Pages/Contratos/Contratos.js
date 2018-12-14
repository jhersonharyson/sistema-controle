import React, { Component } from 'react'
import { Button, Icon, Typography, TextField, MenuItem, FormControl, Input, InputLabel, Divider, Card } from '@material-ui/core';
import MaskedInput from 'react-text-mask';
import { Row, } from 'antd'
import ContratroTemplate1 from './ContratoTemplate1'
// import 'antd/dist/antd.css';

export default class Contratos extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nome: "",
      nacionalidade: "",
      estadoCivil: "",
      profissao: "",
      cpf: "",
      rg: "",
      orgaoEmissor: "",
      residencialIp: "",
      apartamento: "",
      tempoAlocacao: "",
      dataInicio: "",
      dataTermino: "",
      diaPagemnto: "",
      diaPagamentoExtenso: "",
      valorAluguel: "",
      valorAluguelExtenso: "",
      taxa: "",
      taxaExtenso: "",

    }


  }
  render() {
    const nacionalidade = ["Afegão", "Africano", "Alemão", "Americano", "Argentino", "Asiático", "Australiano", "Austríaco", "Belga", "Brasileiro", "Britânico", "Canadense", "Chileno", "Chinês", "Colombiano", "Coreano", "Croata", "Dinamarquês", "Egípcio", "Escocês", "Eslovaco", "Espanhol", "Europeu", "Filipino", "Finlandês", "Francesa", "Francês", "Francês", "Grego", "Holandês", "Indiano", "Inglês", "Iraniano", "Iraquiano", "Italiano", "Japonês", "Mexicano", "Norueguês", "Paquistanês", "Polonês", "Português", "Russo", "Sueco", "Sul-Africano", "Sul-Coreano", "Turco", "Árabe"]
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>

        {!this.state.hidden &&
          <Card style={{ width: "58%", paddingBottom: "15px" }}>
            <Row>
              <Typography variant="h5" style={{ textAlign: "center", marginTop: "15px" }}>Formulário de Emissão de Contrato</Typography>
              {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", flexWrap: "wrap" }}> */}

              {/* <Divider style={{ marginTop: "15px", marginBottom: "15px" }} /> */}
              <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
              <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>Dados do Locatário</Typography>
              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                <TextField
                  id="outlined-dense"
                  label="Nome"

                  fullWidth
                  margin="dense"
                  //variant="filled"
                  style={{ maxWidth: "300px", marginLeft: "15px", }}
                  //helperText="Nome completo do locatário"
                  value={this.state.nome}
                  onChange={event => this.setState({ nome: event.target.value })}
                />

                <TextField
                  id="outlined-select-currency"
                  select

                  label="Nacionalidade"
                  margin="dense"
                  //variant="filled"
                  style={{ minWidth: "150px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'nacionalidade',
                    id: 'nacionalidade-simple',
                  }}
                  value={this.state.nacionalidade}
                  onChange={event => this.setState({ nacionalidade: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  {nacionalidade.map((nacionalidade) => {
                    return <MenuItem value={nacionalidade + "(a)"}>{nacionalidade}</MenuItem>
                  })
                  }
                </TextField>

                <TextField
                  id="outlined-select-currency"
                  select

                  label="Estado Civil"
                  margin="dense"
                  //variant="filled"
                  style={{ minWidth: "150px", marginLeft: "15px" }}
                  inputProps={{
                    name: 'estado-civil',
                    id: 'estado-civil-simple',
                    style: { minWidth: "250px" }
                  }}
                  value={this.state.estadoCivil}
                  onChange={event => this.setState({ estadoCivil: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="casado">Casado(a)</MenuItem>
                  <MenuItem value="divorciado">Divorciado(a)</MenuItem>
                  <MenuItem value="solteiro">Solteiro(a)</MenuItem>
                  <MenuItem value="separdo">Separado(a)</MenuItem>
                  <MenuItem value="viúvo">Viúvo(a)</MenuItem>
                </TextField>
              </Row>
              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                <TextField
                  label="Profissão"

                  margin="dense"
                  style={{ width: "237px", marginLeft: "15px" }}
                  //variant="filled"
                  value={this.state.profissao}
                  onChange={event => this.setState({ profissao: event.target.value })}
                />
                <FormControl >
                  <InputLabel htmlFor="cpf" style={{ paddingLeft: "16px", paddingTop: "6px" }}>CPF</InputLabel>
                  <Input
                    label="CPF"
                    id="cpf"
                    margin="dense"
                    inputComponent={this.TextMaskCustomCpf}
                    style={{ width: "120px", marginLeft: "15px", top: "8px" }}
                    //variant="filled"
                    value={this.state.cpf}
                    onChange={event => this.setState({ cpf: event.target.value })}
                  />
                </FormControl>
                <FormControl >
                  <InputLabel htmlFor="cpf" style={{ paddingLeft: "18px", paddingTop: "6px" }}>RG</InputLabel>
                  <Input
                    label="RG"

                    id="rg"
                    inputComponent={this.TextMaskCustomRg}
                    style={{ width: "90px", marginLeft: "15px",  top: "8px"  }}
                    value={this.state.rg}
                    onChange={event => this.setState({ rg: event.target.value })}
                    //variant="outlined"
                    //variant="filled"
                    margin="dense"

                  />
                  </FormControl>

                  <TextField
                    label="Orgão Emissor"
                    id="oe"

                    margin="dense"
                    style={{ width: "140px", marginLeft: "15px" }}
                    // inputComponent={this.TextMaskCustomRg}
                    //variant="outlined"
                    //variant="filled"
                    value={this.state.orgaoEmissor}
                    onChange={event => this.setState({ orgaoEmissor: event.target.value })}
                  />
              </Row>
              </Row>
              <Divider style={{ marginTop: "15px", marginBottom: "15px" }} />
              <Typography variant="subtitle2" style={{ marginLeft: "15px" }}>Dados do Contrato</Typography>

              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>

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
                  onChange={event => this.setState({ residencialIp: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="IP I">IP I</MenuItem>
                  <MenuItem value="IP II">IP II</MenuItem>
                  <MenuItem value="IP III">IP III</MenuItem>
                  <MenuItem value="IP IV">IP IV</MenuItem>
                  <MenuItem value="IP V">IP V</MenuItem>
                </TextField>


                <TextField
                  label="Nº Apartamento"

                  style={{ marginLeft: "18px", width: "225px" }}
                  //variant="outlined"
                  //variant="filled"
                  margin="dense"
                  value={this.state.apartamento}
                  onChange={event => this.setState({ apartamento: event.target.value })}
                />
                <TextField
                  id="outlined-select-currency"
                  select

                  label="Tempo de Alocação"
                  //helperText="Selecione o tempo de contrato"
                  margin="dense"
                  //variant="outlined"
                  style={{ width: "225px", marginLeft: "18px" }}
                  inputProps={{
                    name: 'residencial',
                    id: 'residencial-simple',
                    style: { minWidth: "25px" }
                  }}
                  //variant="filled"
                  value={this.state.tempoAlocacao}
                  onChange={event => this.setState({ tempoAlocacao: event.target.value })}
                >
                  <MenuItem value="">
                    <em>Selecione</em>
                  </MenuItem>
                  <MenuItem value="6">6 meses</MenuItem>
                  <MenuItem value="12">12 meses</MenuItem>
                </TextField>
              </Row>

              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginLeft: "5px" }}>

                <TextField
                  id="dia-pagamento"
                  label="Dia Pagamento"

                  type="number"
                  style={{ width: "150px", marginLeft: "18px" }}
                  margin="dense"
                  //variant="filled"
                  value={this.state.diaPagemnto}
                  onChange={event => this.setState({ diaPagemnto: event.target.value })}
                />
                <TextField
                  label="Dia Pagamento (por extenso)"


                  style={{ marginLeft: "18px", width: "245px" }}
                  margin="dense"
                  //variant="filled"
                  value={this.state.diaPagamentoExtenso}
                  onChange={event => this.setState({ diaPagamentoExtenso: event.target.value })}
                />
                <FormControl margin="normal" style={{ margin: "4px", marginLeft: "30px", /*backgroundColor: "#e8e8e8", borderTopRightRadius: "3px", borderTopLeftRadius: "3px",*/ }}>
                  <InputLabel htmlFor="data-vigencia" >Data Início</InputLabel>
                  <Input
                    id="data-vigencia"
                    margin="dense"
                    inputComponent={this.TextMaskCustomCalendar}
                    style={{ width: "120px", height: "33px" }}
                    value={this.state.dataInicio}
                    onChange={event => this.setState({ dataInicio: event.target.value })}
                  />
                </FormControl>

                <FormControl style={{ margin: "4px", marginLeft: "20px", /*backgroundColor: "#e8e8e8", borderTopRightRadius: "3px", borderTopLeftRadius: "3px", */ }}>
                  <InputLabel htmlFor="data-vigencia" >Data Término</InputLabel>
                  <Input

                    id="data-vigencia"
                    margin="dense"
                    inputComponent={this.TextMaskCustomCalendar}
                    style={{ width: "130px", height: "33px" }}
                    //variant="filled"

                    value={this.state.dataTermino}
                    onChange={event => this.setState({ dataTermino: event.target.value })}

                  />
                </FormControl>
              </Row>
              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginLeft: "17px" }}>
                <TextField
                  id="aluguel"
                  label="Valor Aluguel"

                  type="number"
                  style={{ width: "150px" }}

                  margin="dense"
                  //variant="filled"
                  value={this.state.valorAluguel}
                  onChange={event => this.setState({ valorAluguel: event.target.value })}
                />
                <TextField
                  id="aluguel-extenso"
                  label="Valor Aluguel (por extenso)"

                  style={{ width: "245px", marginLeft: "22px" }}

                  margin="dense"
                  //variant="filled"
                  value={this.state.valorAluguelExtenso}
                  onChange={event => this.setState({ valorAluguelExtenso: event.target.value })}
                />

                <TextField
                  id="taxa"
                  label="Taxa"

                  type="number"
                  style={{ width: "110px", marginLeft: "25px" }}

                  margin="dense"
                  //variant="filled"
                  value={this.state.taxa}
                  onChange={event => this.setState({ taxa: event.target.value })}

                />
                <TextField
                  id="taxa-extenso"
                  label="Taxa (por extenso)"

                  style={{ width: "140px", marginLeft: "25px" }}

                  margin="dense"
                  value={this.state.taxaExtenso}
                  onChange={event => this.setState({ taxaExtenso: event.target.value })}
                //variant="filled"

                />

              </Row>

          </Card>
            }
        {this.state.hidden &&
              <div>
                <ContratroTemplate1 state={{...this.state, endereco: "av. pedro miranda", bairro: "sacramenta"}} className="contrato" />
                <Button className="btn-print" variant="fab" color="secondary" aria-label="Add" style={{ position: "fixed", bottom: "25px", right: "100px" }}
                  onClick={async _ => {
                    await this.setState({ hidden: false })
                  }}
                >
                  <Icon>arrow_left</Icon>
                </Button>
              </div>
            }
            <Button className="btn-print" variant="fab" color="secondary" aria-label="Add" style={{ position: "fixed", bottom: "25px", right: "25px" }}
              onClick={async _ => {
                await this.setState({ hidden: true })
                window.print()
              }}
            >
              <Icon>print</Icon>
            </Button>


      </div >
    )
        }
      
  TextMaskCustomCalendar = (props) => {
    const {inputRef, ...other } = props
        return (
      <MaskedInput
          {...other}
          ref={inputRef}
          mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}

        />
        );
      }
  TextMaskCustomCpf = (props) => {
    const {inputRef, ...other } = props
        return (
      <MaskedInput
          {...other}
          ref={inputRef}
          mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}

        />
        );
      }
  TextMaskCustomRg = (props) => {
    const {inputRef, ...other } = props
        return (
      <MaskedInput
          {...other}
          ref={inputRef}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}

        />
        );
      }
  TextMaskCustomMonetario = (props) => {
    const {inputRef, ...other } = props
        return (
      <MaskedInput
          {...other}
          ref={inputRef}
          mask={[/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}

        />
        );
      }
    
    }
    
    
