import React, { Component } from "react";
import $ from 'jquery';

class Mario extends Component 
{
  
	constructor(props)
	{
		super(props);
		this.state = {x_pos: 0, y_pos:0};
	}
	
	render() {
		
		return (
				<div className="mario">
					<img src="http://res.cloudinary.com/payjo-in/image/upload/c_scale,w_24/v1502452976/1200x630bb_vokqee.jpg" width="100%" height="100%" />
				</div>
		);
	}
}
 
export default Mario;