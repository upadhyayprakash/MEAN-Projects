import React, { Component } from "react";
import $ from 'jquery';

import * as ProductAction from "./ProductAction.js";

class AddProduct extends Component 
{
  
	constructor(props)
	{
		super(props);
		this.state = {codeName: '', productName: '', quantity: '', expiryDate: ''};
		
		this.addProductCancelled = this.addProductCancelled.bind(this);
		this.createProduct = this.createProduct.bind(this);
	}
	
	addProductCancelled()
	{
		console.log("Product Add action cancelled...");
		this.props.hideForm();
	}
	
	createProduct()
	{
		if(this.state.productName !== '' && this.state.quantity !== '' && this.state.productName !== '')
			ProductAction.createProduct({productName:this.state.productName, quantity:this.state.quantity, expiryDate:this.state.expiryDate});
		this.props.hideForm();
	}
	
	
	render() {
		
		return (
				<div className="modalContainer">
					<div className="addProductModal">
						<h5 className="modal-title">Add New Product</h5>
						<input type="text" className="form-control" value={this.state.productName} onChange = {(e,newValue) => this.setState({productName:e.target.value})} placeholder="Enter Product Name"/><br/>
						<input type="text" className="form-control" value={this.state.quantity} onChange = {(e,newValue) => this.setState({quantity:e.target.value})} placeholder="Enter Quantity"/><br/>
						<input type="date" className="form-control" value={this.state.expiryDate} onChange = {(e,newValue) => this.setState({expiryDate:e.target.value})} title="Select Product Expiry Date"/><br/>
						<button className="add-product-btn btn btn-success" onClick={this.createProduct}>CONFIRM</button>
						<button className="add-product-btn btn btn-danger" onClick={this.addProductCancelled}>CANCEL</button>
					</div>
				</div>
		);
	}
}
 
export default AddProduct;