import React, {Component} from 'react';
import {connect} from 'react-redux';

import {withRouter} from 'react-router-dom';
import {DataTable} from 'primereact/datatable';
import {Toolbar} from 'primereact/toolbar';
import {ConfirmPopup, confirmPopup} from 'primereact/confirmpopup';
import {Toast} from 'primereact/toast';

import {Column} from 'primereact/column';
import {Button} from 'primereact/button';
import DetailComponent from './DetailComponent';
import { Card } from 'primereact/card';
import AppStore from "./appStore";


class ClientList extends Component {

    constructor(props) {
        super(props);
        this.state = {clients: []};
        this.remove = this.remove.bind(this);
        this.addMessages = this.addMessages.bind(this);
        this.confirm =   this.confirm.bind(this);
    }

    addMessages() {
        this.msgs.show([
            { severity: 'success', summary: 'Success', detail: 'Message Content', sticky: true }
        ]);
    }


    componentDidMount() {
        fetch('/clients')
            .then(response => response.json())
            .then(data => this.setState({clients: data}));

    }

    async remove(rowdata) {
        await fetch(`/clients/${rowdata.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedClients = [...this.state.clients].filter(i => i.id !== rowdata.id);
            this.setState({clients: updatedClients});
        }).then(() => {
        this.msgs.show([
                           {
                               severity: 'success',
                               summary: 'Success',
                               detail: `Successfuly deleted '${rowdata.name}'`,
                           sticky: false
                           },
                       ]);
        });
    }

    confirm(event, rowdata) {
        confirmPopup({
            target: event.currentTarget,
            message: `Are you sure you want to delete '${rowdata.name}'?`,
            icon: 'pi pi-exclamation-triangle',
            accept: () => this.remove(rowdata)
        });
    }

    render(){
        const actionBodyTemplate = (rowData) => (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={()=>this.props.history.push( "clients/" + rowData.id)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning"  onClick={(event)=>this.confirm(event, rowData)}  />
            </React.Fragment>
        );
        const toolBarButtons = (rowData) => (
            <React.Fragment>
                <Button label="Add" className="mr-2" onClick={()=> this.props.history.push("/clients/new")} />
                <Button label="Change state" onClick={()=> {
                   this.props.actionState1("5");

                }

                } />
            </React.Fragment>
        );

        return (
            <div>
                <ConfirmPopup />

                <Toast ref={(el) => this.msgs = el} />

                <Toolbar left={toolBarButtons}  />

                <DataTable  value={this.state.clients} responsiveLayout="scroll" stripedRows
                           sortMode="multiple"
                           filterDisplay="menu"
                           selectionMode="single"
                           resizableColumns
                >
                    <Column field="id" header="Code" sortable></Column>
                    <Column field="name" header="Name" filter  sortable></Column>
                    <Column field="email" header="Category" filter  sortable></Column>
                    <Column header="Actions" body={actionBodyTemplate} exportable={false}
                            style={{minWidth: '8rem'}}></Column>
                </DataTable>
                <Card>
                    State from state {this.props.dummyValue}
                </Card>

                <DetailComponent/>
            </div>
        )

    }
}

export default connect(
    (state) => {
        return state;
    },
    {
        actionState1: AppStore.actionState1
    }
    )(withRouter(ClientList));
