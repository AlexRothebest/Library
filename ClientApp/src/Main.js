import React, { Component } from 'react';
import axios from 'axios';

import Navbar from './components/NavBar';


class Main extends Component {
	render = () => {
		return (
			<div>
				<Navbar />
			</div>
		)
	}
}


axios.interceptors.response.use(
	response => response ? response : null,
	error => {
		alert('Error occured');
	}
);


export default Main;