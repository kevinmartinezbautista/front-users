import React from 'react';
import { Container, Table,AppBar, IconButton } from '@material-ui/core';
import MaterialTable from 'material-table';
import MenuIcon from '@material-ui/icons/Menu';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};

export class Principal extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
          value: "hello",
          rows:[],
          columns:[
            { title: 'ID', field: 'id_usuario' },
            { title: 'NOMBRE', field: 'nombre' },
            { title: 'PRIMER APELLIDO', field: 'primer_apellido'},
            { title: 'SEGUNDO APELLIDO', field: 'segundo_apellido'},
            { title: 'EMAIL', field: 'correo_electronico'  }
          ]
         };
    }
    
    componentDidMount() {
        axios.get(`http://localhost:3333/api/v1/usuarios`)
        .then(res => {
            const rows = res.data.data;
            console.log(rows);
            this.setState({ rows });
        })
        
    }

 
    render() {
      return (
        <div>
        <div className={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start"  color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={{
                        flexGrow: 1,
                        }}>
                        Usuarios
                    </Typography>
                    
                    </Toolbar>
                </AppBar>
            </div>
        <Container maxWidth="lg">
                <MaterialTable
                    title="Administración de usuarios"
                    columns={this.state.columns}
                    data={this.state.rows}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                            resolve();
                            this.setState((prevState) => {
                                const data = [...prevState.data];
                                data.push(newData);
                                return { ...prevState, data };
                            });
                            }, 600);
                        })
                    }}
                    />
        </Container>
        </div>
      );
    }
  }