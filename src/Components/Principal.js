import React from 'react';
import { forwardRef } from 'react';
import { Container, Table,AppBar, IconButton } from '@material-ui/core';
import MaterialTable from 'material-table';
import MenuIcon from '@material-ui/icons/Menu';
import { AddBox, ArrowDownward, FirstPage, LastPage, Search, ChevronLeft, ChevronRight, Clear, Check, Delete } from "@material-ui/icons";
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
const config = {
    headers: {'Access-Control-Allow-Origin': '*'}
};
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
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
            { title: 'EMAIL', field: 'correo_electronico'  },
            { title: 'Acciones', field: 'action'  }
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

    index() {
        axios.get(`http://localhost:3333/api/v1/usuarios`)
        .then(res => {
            const rows = res.data.data;
            console.log(rows);
            this.setState({ rows });
        })
    }

    create (data) {
        axios.post(`http://localhost:3333/api/v1/usuarios`, data )
        .then(res => {
          console.log(res);
          console.log(res.data);
          return res.data;
        });
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
                    icons={tableIcons}
                    data={this.state.rows}
                    editable={{
                        onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            this.create(newData);
                            resolve();
                            setTimeout(()=>{
                                
                                this.index();
                            })
                        })
                    }}
                    />
        </Container>
        </div>
      );
    }
  }