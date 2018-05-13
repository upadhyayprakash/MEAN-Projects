import React, { Component } from "react";
import $ from 'jquery';

class Food extends Component
{
  
	constructor(props)
	{
		super(props);
	}
	
	render() {
		
		return (
				<div className="food-container">
					<img src="https://res.cloudinary.com/payjo-in/image/upload/c_scale,w_24/v1502452864/mushroom-512_f9ma5t.png" width="100%" height="100%" />
				</div>
		);
	}
}
 
export default Food;