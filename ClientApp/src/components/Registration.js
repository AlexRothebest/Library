import React, { Component } from 'react';
import axios from 'axios';


class Registration extends Component {
    registerUser = (event) => {
        event.preventDefault();

        let form = event.target;

        let username = form.querySelector('input[name="username"]').value;
        let password = form.querySelector('input[name="password"]').value;

        axios.post('/api/registration', {
            username,
            password
        }).then(response => {
            console.log(response);
        });
    }

    render = () => {
        return (
            <main>
                <h1>Registration</h1>

                <form className="form-centered" onSubmit={this.registerUser}>
                    <input type="text" name="username" placeholder="Username" required />
                    <input type="password" name="password" placeholder="Password" required />

                    <button>Register</button>
                </form>
            </main>
        )
    }
}

export default Registration;