import React, {Component} from 'react';
import {Link, useHref, withRouter, forwardRef} from 'react-router-dom';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Form} from 'reactstrap';


class ClientEdit extends Component {

    emptyItem = {
        name: '',
        email: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/clients/${this.props.match.params.id}`)).json();
            this.setState({item: client});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;

        await fetch('/clients' + (item.id ? '/' + item.id : ''), {
            method: (item.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/');
    }

    async handleCancel(event) {
        this.props.history.push('/');
    }

    render() {

        const {item} = this.state;
        const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;

        return (


            <Form  >
                <div className="card col-12">
                    <h5>{title}</h5>
                    <div className="formgrid grid ">



                        <div className="field  col-7">
                        <span className="p-float-label">
                            <InputText  id="name"  name="name"  value={item.name || ''} onChange={this.handleChange}
                                       className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />
                            <label htmlFor="name">Name</label>
                        </span>
                        </div>

                        <div className="field  col-7">
                        <span className="p-float-label ">
                            <InputText id="email" name="email" value={item.email || ''} onChange={this.handleChange}
                                       className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                            />
                            <label htmlFor="email">Email</label>
                        </span>
                        </div>

                        <div className="p-inputgroup  col-12">
                            <Button color="primary" className="m-1 border-round " onClick={this.handleSubmit}>Save</Button>
                            <Button color="secondary" className="m-1 border-round "  onClick={this.handleCancel}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </Form>


        )
    }
}

export default withRouter(ClientEdit);