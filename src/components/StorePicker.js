import React from 'react';
import PropTypes from "prop-types";
import {getFunName} from '../helpers';

export default class StorePicker extends React.Component {
    static propTypes  = {
        history: PropTypes.object
    };
    //Create a reference to get the input from the form.
    myInput = React.createRef();

    goToStore = (e) => {
        //this is to prevent the form submission from refreshing the page.
        e.preventDefault();
        //TODO: get the text from the input and then change the page.
        const storeName = this.myInput.value.value;

        /*Because storePicker is a child of the router we have access to the method Push. from props history */
        this.props.history.push(`/store/${storeName}`);
    }

    render() {
        return (
            <form  onSubmit = {this.goToStore} className="store-selector">
                <h2>Please enter a store</h2>
                <input ref = {this.myInput} type="text" required placeholder="Store Name" defaultValue = {getFunName()} />
                <button type="submit">Visit Store -> </button>
            </form>

        );
    }
}