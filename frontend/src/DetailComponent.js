import React, {Component} from 'react';
import {connect} from 'react-redux';

import { Toolbar } from 'primereact/toolbar';

class DetailComponent extends Component {
    render() {
        return (
            <Toolbar right={this.props.dummyValue}   />

        );
    }
}


export default connect(
    (state) => {
        return state;
    }
    )(DetailComponent);
