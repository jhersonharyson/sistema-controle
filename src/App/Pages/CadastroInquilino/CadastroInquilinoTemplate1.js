import React, { Component } from 'react'
import * as $ from 'jquery'

export default class CadastroInquilino1 extends Component {
    constructor(props) {
        super(props)
        // this.props.state = {
        //     nome: "Jherson Haryson Almeida Pereira",
        //     nacionalidade: "Brasileiro",
        //     estadoCivil: "Solteiro",
        //     profissao: "Empreendedor",
        //     cpf: "027.780.782-40",
        //     rg: "7447812",
        //     orgaoEmissor: "PC Policia Civil",
        //     residencialIp: "III",
        //     apartamento: "410-C",
        //     tempoAlocacao: "12",
        //     dataInicio: "24/08/2018",
        //     dataTermino: "24/08/2019",
        //     diaPagemnto: "24",
        //     diaPagamentoExtenso: "Vinte e Quatro",
        //     valorAluguel: "4.444",
        //     valorAluguelExtenso: "quatro mil quatrocentos e quarenta e quatro reais",
        //     taxa: "44",
        //     taxaExtenso: "Quarenta e Quatro",
        //     endereco: "Avenida PEdro Mirando 139", // Automático
        //     bairro: "Sacramenta", // automático
        // }
    }
    componentDidMount() {
        $('head').append(`<style type="text/css" media="print">
        @page {
            size: auto;
            margin: 0mm;
            margin-left: 15px;
            margin-right: 15px;
            background-color: #000;
        }

        *{
            font-family: unset;
            font-size: 14px;
        }

        @media print {
            html body div#root div div.App div div div div div div div.break {
                page-break-after: always;
            }
            html body div#root div div.App div div div div div div{
              margin-top: -50px
            }
            .MuiToolbar-root-49.MuiToolbar-regular-51.MuiToolbar-gutters-50{
                display: none;
            }
            .btn-print{
                display: none;
            }
        }
    </style>`)

    }

    render() {
        return (
            <div >
                <div style={{ paddingBottom: "30px" }}>
                    <div style={{ width: "99%", border: "3px solid black" }}>
                        <p style={{ textAlign: "center", fontSize: "20px", fontWeight: "bolder", marginBottom: "-10px" }}>
                            RESIDENCIAL I.P.</p>
                        <p style={{ textAlign: "center", fontSize: "13px" }}>
                            Av. Pedro Miranda, 139 – CEP: 66085-005<br />
                            EMAIL: <br />
                            FONE: (91) 98333-9601 / What'sApp: (91) 98931-6082<br />
                            Pedreira – Belém /PA
            </p>
                    </div>
                    <div style={{ fontWeight: "bolder", fontSize: "13px", marginLeft: "50%", marginTop: "15px" }}>
                        <u>
                            INSTRUMENTO PARTICULAR <br />
                            DE CONTRATO DE LOCAÇÃO PARA FINS COMERCIAIS.
            </u>
                    </div>
                    <p style={{ margin: "3px", fontWeight: "bold" }}>1.DAS PARTES</p>
                    <p style={{ margin: "3px", fontWeight: "bold" }}>1.1LOCADOR(A)</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>NOME LOCADOR</span>, NATURALIDADE,
                        ESTADO CIVIL, portador da carteira de identidade
            <span style={{ fontWeight: "bold" }}> nº RG ORGÃO EMISSO</span> e <span style={{ fontWeight: "bold" }}>CPF: CPF</span>,
                                                                                                                                                                                                                                                                                                                                    residente e domiciliado em Cidade Belém/PA.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>1.2.LOCATÁRIO(A)</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>{this.props.state.nome.toUpperCase()}</span>, {this.props.state.nacionalidade.toUpperCase()}, {this.props.state.estadoCivil.toUpperCase()}
                        , portador da carteira de identidade
            <span style={{ fontWeight: "bold" }}> {this.props.state.rg.toUpperCase()} {this.props.state.orgaoEmissor.toUpperCase()}</span> e <span style={{ fontWeight: "bold" }}>CPF: {this.props.state.cpf.toUpperCase()}</span>,
                                                                                                                                                                                                                                                                                                                                    residente e domiciliado nesta Cidade.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>1.3.FIADOR(A)</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        O <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> isenta o <span style={{ fontWeight: "bold" }}>LOCATÁRIO(A)</span> de <span style={{ fontWeight: "bold" }}>FIADOR(A) </span>
                        neste período da locação por este apresentar pagamento de um Caução no valor de <span style={{ fontWeight: "bold" }}>R$
                {this.props.state.valorAluguel.toUpperCase()} ({this.props.state.valorAluguelExtenso.toUpperCase()})</span>, sendo este
                                                                                                                                                                                                                            usado para compensar possíveis danos no imóvel, em caso de não haver será feita a devolução do valor.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>2.DAS DEFINIÇÕES</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>2.1 </span> As expressões abaixo, sempre que grafadas neste contrato em
                        “caixa alta”, Terão para todos os fins e efeitos de direito,
            os seguintes significados:</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>2.1.1.LOCADOR(A): </span> é a
            pessoa física detentora do imóvel; </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>2.1.2.LOCATÁRIO(A): </span> é a
            pessoa física inquilino do imóvel; </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>2.1.3.CONTRATANTES: </span> São as
                        pessoas físicas qualificadas no capítulo
            1, quando consideradas com conjunto; </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}><span style={{ fontWeight: "bold" }}>2.1.4.IMÓVEL: </span> é objeto da
                        locação, tal como descrito e
            caracterizado no capitulo 4. </p>
                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>3.DOS DOCUMENTOS</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>3.1.</span> Fazem parte integrante e inseparável do presente contrato, como
            se nele estivessem literalmente transcritos;</p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>3.1.1.</span> Instrumento de
                        vistoria que descreve minuciosamente o estado
            do <span style={{ fontWeight: "bold" }}>IMÓVEL</span>; </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>3.1.1.1. O LOCATARIO(A)</span> tem
                        prazo improrrogável de 15 (quinze) dias,
                        a contar da data da assinatura do contrato,
            para levar ao conhecimento do <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> eventuais vícios ou
                                                                                                                                                                                                                                                                                                                                    defeitos de fácil constatação, os quais não tenham sido
                                                                                                                                                                                                                                                                                                                                    percebidos por ocasião do laudo de vistoria. Vícios ocultos ou de difícil constatação podem ser comunicados
            ao <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span>
                        ao tempo em que forem efetivamente verificados pelo <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span>.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>4. DO IMÓVEL OBJETO DA LOCAÇÃO</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>4.1.</span> O objeto da presente locação é o <span style={{ fontWeight: "bold" }}>IMÓVEL
                            LOCALIZADO
                {this.props.state.endereco.toUpperCase()} RESIDENCIAL IP {this.props.state.apartamento.toUpperCase()}, BAIRRO {this.props.state.bairro.toUpperCase()}, BELEM/PA</span>.
        </p>


                    <br />
                    <p style={{ margin: "3px", fontWeight: "bold" }}> 5. DA LOCAÇÃO</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>5.1.</span> Por este instrumento e nos melhores termos do direito, o <span
                            style={{ fontWeight: "bold" }}>LOCADOR(A)</span> dá em locação ao <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        o <span style={{ fontWeight: "bold" }}>IMOVEL</span>,
                        exclusivamente para Fins Comerciais, não podendo ter outra utilização sem o consentimento por escrito do
            <span style={{ fontWeight: "bold" }}> LOCADOR(A)</span>, mediante as clausulas e condições pactuadas neste
            contrato, que os <span style={{ fontWeight: "bold" }}>CONTRATANTES</span> reciprocamente
                                                                                                                                                                                                                                                                                                                                    outorgam,aceitam e se obrigam a cumprir por si, seus herdeiros e sucessores;
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>5.2.</span> A presente locação é pactuada com base na Lei nº 8.245, de 18
                        de outubro de 1991 e legislação correlata.
        </p>

                    <div class="break"></div>

                    <p style={{ margin: "3px", textAlign: "justify", marginTop: "35px" }}>
                        <span style={{ fontWeight: "bold" }}>5.3.</span>A ocorrência de desastre desencadeado por forças da natureza ou
                        sobre-humanas tais como faixas elétricas,
                        inundações, desabamentos, abalos sísmicos, etc., ou acidentes naturais motivadas por terceiros, não
                        acarretará
            a responsabilidade solidário do <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> pelos eventos matérias ou
                                                                                                                                                                                                                                                                                                                                    pessoais acaso surgidos, com relação a
                                                                                                                                                                                                                                                                                                                                    pertences aos haveres e a segurança pessoal dos ocupantes.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>5.4.</span> Além da ocorrência de qualquer evento previsto no item
            anterior, o <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> também não se responsabiliza
            a indenizar o <span style={{ fontWeight: "bold" }}>LOCATÁRIO(A)</span>, a qualquer título que for, por danos
                                                                                                                                                                                                                                                                                                                                    materiais ou pessoais, ocasionados por roubo,
                                                                                                                                                                                                                                                                                                                                    furto, arrombamento do imóvel ou depredações provadas por distúrbios que não possam ser contidos.
        </p>

                    <br />
                    <p style={{ margin: "3px", fontWeight: "bold" }}>6. DO PRAZO, PRORROGAÇÃO E RENOVAÇÃO.</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>6.1.</span> O prazo de locação é de <span style={{ fontWeight: "bold" }}>{this.props.state.tempoAlocacao + " "}
                            ({this.props.state.tempoAlocacao.toString() === "6" ? "SEIS" : "DOZE"})</span> meses, a começar em <span style={{ fontWeight: "bold" }}>{this.props.state.dataInicio} </span>
                        e a findar de pleno direito em <span style={{ fontWeight: "bold" }}>{this.props.state.dataTermino}</span> quando o <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        deverá restituir o imóvel e as respectivas
                        chaves completamente desocupado, livre de coisas e pessoas, independente de aviso, interpelação ou
                        notificação judicial e extrajudicial.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>6.2.</span> No caso de prorrogação legal ou consensual desta locação, ficam
                        as partes com a faculdade de denunciar a
                        locação na forma e nos prazos da lei.
        </p>


                    <br />
                    <p style={{ margin: "3px", fontWeight: "bold" }}>7. DO VALOR DO ALUGUEL, PERIDIOCIDADE E FORMA DE REAJUSTAMENTO.</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>7.1.</span> O valor do aluguel é de <span style={{ fontWeight: "bold" }}>R$
                            {this.props.state.valorAluguel + " "}
                            ({this.props.state.valorAluguelExtenso.toUpperCase()}).</span>
                    </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>7.1.1.</span> O aluguel mensal será pago pelo <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>,
            em moeda brasileira de curso todo dia <span style={{ fontWeight: "bold" }}>{this.props.state.diaPagemnto} ({this.props.state.diaPagamentoExtenso.toUpperCase()})</span> de cada
                                                                                                                                                                                                                                                                                                                                    mês vencido, de segunda a segunda nos horários de 07:00hrs às 19:00hrs, no Escritório da Administração da
            <span style={{ fontWeight: "bold" }}> Residencial IP</span> situado na Av. Pedro Miranda,139 Pedreira, Belém/PA
            ou onde o <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span>
                        no futuro indicar.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>7.1.2.</span> O valor do aluguel mensal será inteiramente liquido para o
            <span style={{ fontWeight: "bold" }}> LOCADOR(A)</span>, correndo á conta do <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        as despesas a si imputadas, notadamente aquelas listadas no capitulo 8.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>7.2.</span> O valor do aluguel será reajustado a cada período de <span
                            style={{ fontWeight: "bold" }}>12 (Doze)</span>
                        meses, tomando-se por base o <span style={{ fontWeight: "bold" }}>IGP-M (Fundação Getulio Vargas)</span>, que os
            <span style={{ fontWeight: "bold" }}> CONTRATANTES</span> elegem de comum acordo
                                                                                                                                                                                                                                                                                                                                    como sendo o que melhor reflete a
            intenção dos <span style={{ fontWeight: "bold" }}>CONTRATANTES</span> no que tange á atualização monetária. Na
                                                                                                                                                                                                                                                                                                                                    falta deste índice, entretanto, devido a
                                                                                                                                                                                                                                                                                                                                    sua
                                                                                                                                                                                                                                                                                                                                    extinção ou qualquer outra deliberação
                                                                                                                                                                                                                                                                                                                                    governamental, a atualização será feita pelo Índice substitutivo do IGPM-FGV ou outro que venha a ser
                                                                                                                                                                                                                                                                                                                                    imposto
                                                                                                                                                                                                                                                                                                                                    por lei.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>7.3.</span> Se, em virtude de lei subseqüente, vier a ser admitida a
                        correção do valor do aluguel em periodicidade
                        inferior á prevista na legislação vigente á época de sua celebração, concordam as partes desde já e em
                        caráter
                        irrevogável, que a correção do aluguel e o seu indexador passarão automaticamente a ser feitos no menor
                        prazo
                        que for permitido pela lei posterior.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>8. DOS ENCARGOS DA LOCAÇÃO</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>8.1.</span> Além do <span style={{ fontWeight: "bold" }}>ALUGUEL</span>, é
            obrigações do <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        pagar as despesas de <span style={{ fontWeight: "bold" }}>ÁGUA, ENERGIA ELÉTRICA e IPTU</span>. Porém a
            <span style={{ fontWeight: "bold" }}> ÁGUA</span> é uma <span style={{ fontWeight: "bold" }}>Taxa</span> no valor de
            <span style={{ fontWeight: "bold" }}> R$ {this.props.state.taxa} ({this.props.state.taxaExtenso})</span>.Tais pagamentos deverão ser efetuados mensalmente
                                                                                                                                                                                                                                                                                                                                    até o dia de seu vencimento.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}> 9. ENTREGA DO IMÓVEL</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>9.1.</span> Se o <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        devolver o imóvel antes do 6º (Sexto) mês de locação ficará obrigado a pagar como multa
            rescisória o valor correspondente a 01 (Um) mês de aluguel. Após este prazo, caso o <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        resolva entregar o imóvel e apresente comunicação formal e escrita de sua intenção com 30(trinta) dias de
            antecedência, será isento da cobrança da multa.</p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}> 9.2. O LOCATARIO(A) </span>
                        ao devolver o <span style={{ fontWeight: "bold" }}>IMÓVEL</span>, ou por ocasião da rescisão do contrato de
                        locação, ou por quaisquer
                        das razoes aqui prevista e/ou por força de lei, deverá devolvê-lo nas condições em que o recebeu, isto é,
                        em
            perfeito estado de conservação, ressalvados os desgastes naturais do uso, conforme relatório de vistoria.</p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>9.3. </span>
                        O total encerramento da locação somente ocorrerá após a execução dos reparos no imóvel descriminados no
            relatório de vistoria de entrega, não exonerando assim, o <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        quanto ao pagamento do aluguel bem como dos dias proporcionais ate a efetiva entrega do mesmo.
        </p>

                    <br />
                    <div class="break"></div>

                    <p style={{ margin: "3px", fontWeight: "bold", marginTop: "35px" }}>10. DAS OBRIGAÇOES DO LOCATARIO(A)</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>10.1.</span> Não sublocar, parcialmente ou em sua totalidade, o imóvel,
                        assim
                        como ceder seu uso ou este contrato, a qualquer titulo, inclusive gratuito, sem a prévia e expressa
            anuência do <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span>, destinando o <span style={{ fontWeight: "bold" }}>IMOVEL</span>
                        a ser exclusivamente para residência do <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span> e seus
                        familiares.
        </p>


                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>10.2.</span>
                        Permitir que o
            LOCADOR(A), por si ou através de preposto, vistorie o <span style={{ fontWeight: "bold" }}>IMOVEL</span> a
                                                                                                                                                                                                                                                                                                                                    qualquer tempo, mediante
            combinação prévia, de dia e hora, com o <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span> para comprovar
                                                                                                                                                                                                                                                                                                                                    as condições aqui estipuladas, não podendo
            o <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span> opor-se a tais inspeções, sendo tal vistoria
                                                                                                                                                                                                                                                                                                                                    imprescindível por ocasião da restituição do
            <span style={{ fontWeight: "bold" }}> IMÓVEL</span>.
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>10.3.</span> Responder pelos danos
            causados ao <span style={{ fontWeight: "bold" }}>IMOVEL</span> pelo mau trato ou por aqueles que resultarem para
                                                                                                                                                                                                                                                                                                                                    os vizinhos do
            mau uso do <span style={{ fontWeight: "bold" }}>IMOVEL</span>, sem qualquer prejuízo deste contrato.
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>10.4.</span> Tomar conhecimento da
                        Convenção do Condomínio e seu Regimento Interno, obrigando-se a cumpri-los
                        integralmente.
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>10.5.</span> Remeter dentro de
                        72(setenta e duas) horas de seu recebimento, toda e qualquer correspondência, aviso,
            intimação ou notificação que lhe for dirigida, referente ao <span style={{ fontWeight: "bold" }}>IMOVEL </span>
                        ou a ele <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span>.
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>10.6.</span> Pagar o <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span>,
            junto e indissoluvelmente com o <span style={{ fontWeight: "bold" }}>ALUGUEL</span> subseqüente qualquer despesa
                                                                                                                                                                                                                                                                                                                                    que lhe caiba e
                                                                                                                                                                                                                                                                                                                                    tiver sido paga por aquele, aplicando-se á recusa ou demora no ressarcimento das mesmas as sanções que,
            decorriam do atraso do pagamento do <span style={{ fontWeight: "bold" }}>ALUGUEL</span>.
        </p>

                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>11. DAS OBRIGAÇOES DO LOCADOR(A)</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>11.1.</span> Comunicar o <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span>,
                        por escrito e com antecedência de, no mínimo 30(trinta) dias, para rescindir o presente contrato, por
                        quaisquer das razões aqui pactuadas e/ou fundadas em lei;
        </p>


                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>12. DAS BENFEITORIAS E DIREITO DE RETENÇÃO</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>12.1. </span> Quaisquer benfeitorias ou melhoramento dependem de
            autorização por escrito do <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> para que sejam feitas pelo
            <span style={{ fontWeight: "bold" }}> LOCATARIO(A)</span> ficando em qualquer hipótese incorporadas ao <span
                            style={{ fontWeight: "bold" }}>IMÓVEL</span>, quer sejam
            necessárias, úteis ou voluptuárias, não podendo o <span style={{ fontWeight: "bold" }}>LOCATARIO(A) </span>
                        pleitear qualquer indenização pelas mesmas ou alegar Direito de retenção do <span style={{ fontWeight: "bold" }}>IMÓVEL</span>,
            ficando inclusive facultado o <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span> o direito de exigir que
                                                                                                                                                                                                                                                                                                                                    o
            <span style={{ fontWeight: "bold" }}> LOCATARIO(A)</span> providencie a restauração do <span style={{ fontWeight: "bold" }}>IMÓVEL </span>
                        ao estado Anterior, se lhe aprouver.
        </p>



                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>12.2.</span> Em havendo a
                        autorização prevista no subitem antecedente,
                        todas as despesas com materiais e mão-de-obra
            serão de exclusiva responsabilidade do <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span>, salvo as
                                                                                                                                                                                                                                                                                                                                    despesas decorrentes de acordo realizadas entre
            os <span style={{ fontWeight: "bold" }}>CONTRATANTES</span> por escrito.
        </p>


                    <br />

                    <p style={{ margin: "3px", ontWeight: "bold" }}>13. DAS SANÇÕES</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>13.1</span> Ao inadimplemento total ou parcial das obrigações assumidas
                        neste contrato
            serão aplicadas, cumulativamente ou alternativamente, a juízo exclusivo do <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span>
                        e sem prejuízo das demais clausulas e condições, as seguintes sanções:</p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>13.1.1.</span> Perdas e danos que
            se apurem; </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>13.1.2. Multa de 10% (dez por
                            cento) pelo atraso no pagamento do
                            aluguel
                acrescido de 1% (um por cento) ao mês de juros de mora</span> tem prazo improrrogável de 15
                                                                                                                                                                                                                            (quinze)
                                                                                                                                                                                                                            dias,
            contados de forma simples e atualização monetária está com base no IPC e FIPE.</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>13.1.3.</span> Multa penal
                        correspondente a 01(um) aluguel pelo
                        infringimento de qualquer uma das cláusulas e condições ora pactuadas, exceto no caso da infração
                        prevista
                        no subitem 13.1.2, qual não se aplicará tal multa, visto que, já há outra pena estipulada;
        </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>13.1.4.</span> Pagamento de
            honorários Advocatícios e peritos do <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span> a partir do 10º
                                                                                                                                                                                                                                                                                                                                    (décimo)
                                                                                                                                                                                                                                                                                                                                    dia após o
                                                                                                                                                                                                                                                                                                                                    vencimento, desde já fixados em 10% (dez por cento), se a demanda for extrajudicial e 20% (vinte por
                                                                                                                                                                                                                                                                                                                                    cento), se
            houver demanda Judicial. </p>
                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>13.1.5.</span> Inclusão do nome do
            <span style={{ fontWeight: "bold" }}> LOCATARIO(A) </span>
                        no cadastro de proteção ao crédito SPC e SERASA em caso de atraso no
                        pagamento de aluguel e/ou encargos da locação se superior a 30 (trinta) dias.

        </p>


                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>14. DISPOSIÇÕES GERAIS</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>14.1 </span>
                        As obrigações aqui assumidas pelos CONTRATANTES perdurarão até a efetiva desocupação do <span style={{ fontWeight: "bold" }}>IMOVEL </span>
                        e a conseqüente entrega de chaves o <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span> ou procurador
                        para
                        isso nomeado;
        </p>

                    <div class="break"></div>
                    <p style={{ margin: "3px", textAlign: "justify", marginTop: "35px" }}> <span style={{ fontWeight: "bold" }}>14.2 </span>
                        Fica o <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span>, por si ou por seus propostos, desde já
                        autorizado
                        a ocupar, Independente de ação ou medida de imissão de posse, sem qualquer formalidade e sem prejuízo
                        das
            demais clausulas ou disposição legais, o IMOVEL caso venha ser abandonado pelo <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span>;
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>14.3 </span>
                        Os <span style={{ fontWeight: "bold" }}>CONTRATANTES</span> obrigam-se por si, seus herdeiros e sucessores a
                        fazer este ajuste sempre bom, firme e valioso;
        </p>



                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>14.4 </span>
                        Em caso de desapropriação do <span style={{ fontWeight: "bold" }}> IMOVEL</span>, o <span style={{ fontWeight: "bold" }}>LOCADOR(A) </span>
                        ficará exonerado de toda e qualquer responsabilidade
            decorrente deste contrato, deferindo-se o <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span> a
                                                                                                                                                                                                                                                                                                                                    faculdade
                                                                                                                                                                                                                                                                                                                                    de exigir tão-somente contra o expropriante;
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>14.5 </span>
                        Caso o <span style={{ fontWeight: "bold" }}>LOCADOR(A)</span> pretenda alienar o imóvel e não haja
                        interesse
                        por
                        parte do
            <span style={{ fontWeight: "bold" }}> LOCATARIO(A) </span>
                        em sua aquisição, obriga-se este a permitir que o imóvel objeto do presente, seja visitado pelos
                        eventuais
                        interessados na compra, cuja visitação dar-se a partir do prazo final o que
            o <span style={{ fontWeight: "bold" }}>LOCATARIO(A)</span> terá para manifestar o real interesse pela
                                                                                                                                                                                                                                                                                                                                    aquisição
                                                                                                                                                                                                                                                                                                                                    do imóvel, nos dias e horários previamente
                                                                                                                                                                                                                                                                                                                                    acertados;
        </p>

                    <p style={{ margin: "3px", textAlign: "justify" }}> <span style={{ fontWeight: "bold" }}>14.6 </span>
                        No caso de venda do imóvel, sua alienação ou transferência a qualquer Titulo a terceiros, fica o
            <span style={{ fontWeight: "bold" }}> LOCADOR(A) </span>
                        obrigado a dar conhecimento ao adquirente Da existência deste contrato, a fim de que ele seja
                        respeitado em
                        todas as suas Cláusulas até sua resolução, para os fins previstos no artigo 576 do código civil e
                        Na
                        Lei nº
                        8.245/91.

        </p>


                    <br />

                    <p style={{ margin: "3px", fontWeight: "bold" }}>15. DO FORO</p>
                    <p style={{ margin: "3px", textAlign: "justify" }}>
                        <span style={{ fontWeight: "bold" }}>15.1</span>
                        Todas as controvérsias que derivem deste contrato serão resolvidos definitivamente, e pelo foro
                        Central
                        da
                        comarca de Belém – Pará. E por estarem justos e contratados assinam o presente documento em 02
                        (Duas)
                        vias
                        de igual teor e forma, na presença de 02 (duas) testemunhas, também signatárias, para que o mesmo
                        produza
                        os efeitos de lei.
        </p>
                    <div style={{ fontWeight: "bolder" }}>
                        <div style={{ marginLeft: "50%", marginTop: "50px" }}>
                            <p>Belém (PA). ___ de ____________ de ______.</p>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "100px" }}>
                            <p>_____________________________________________<br />LOCADOR(A):__________________________<br />CPF:______________________</p>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "50px" }}>
                            <p>_____________________________________________<br />LOCATÁRIO(A):__________________________<br />CPF:______________________</p>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}
