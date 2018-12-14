import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Icon, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider } from '@material-ui/core';



class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebar_menu: false,

    }
  }

  render() {
    return (
      <div className="App">
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" onClick={_ => this.setState({ sidebar_menu: true })}>
              <Icon fontSize="large">menu</Icon>
            </IconButton>
            <Typography variant="h6" color="inherit">
              Residêncial IP
            </Typography>

          </Toolbar>
        </AppBar>
        <Drawer
          anchor="left"
          open={this.state.sidebar_menu}
          s
          onClose={_ => this.setState({ sidebar_menu: false })}>
          <div style={{ width: "300px", display: "flex", flexDirection: "column" }}>
            <div style={{ justifyContent: "center", display: "flex", flexDirection: "row", height: "50px", marginTop:"20px" }}>
              <Typography style={{fontSize: "18px"}}>Módulos</Typography>
            </div>
            <Divider />
            <div style={{ alignContent: "flex-start" }}>
              <List component="nav">
                {/* <ListItem button>
                  <ListItemIcon>
                    <Icon>list_view</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Gerador de Contrato" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <Icon>payment</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Gerador de Recibo" />
                </ListItem> */}
                <a href="/home">
                 <ListItem button>
                  <ListItemIcon>
                    <Icon>home</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItem>
                </a>
                <a href="/home/cadastro">
                 <ListItem button>
                  <ListItemIcon>
                    <Icon>person_add</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Cadastro de Inquilino" />
                </ListItem>
                </a>
                <a href="/home/recibo">
                <ListItem button>
                  <ListItemIcon>
                    <Icon>attach_money</Icon>
                  </ListItemIcon>
                  <ListItemText primary="Gerador de Recibos" />
                </ListItem>
                </a>
              </List>
              
              <Divider />
             
            </div>
          </div>
        </Drawer>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Sidebar;
