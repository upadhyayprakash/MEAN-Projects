import React, { Component } from "react";
import $ from 'jquery';

import ProductStore from "./ProductStore.js";
import * as ProductAction from "./ProductAction.js";

import AddProduct from "./AddProduct.js";

class Products extends Component 
{
  
	constructor(props)
	{
		super(props);
		this.state = {productArr: ProductStore.getProducts(), addProductPopupVisible: false};
		
		this.daysArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		
		this.removeProduct = this.removeProduct.bind(this);
		this.showAddProduct = this.showAddProduct.bind(this);
		this.handleHideForm = this.handleHideForm.bind(this);
		this.showEditProduct = this.showEditProduct.bind(this);
		this.saveProdData = this.saveProdData.bind(this);
		
	}
	
	// When Item is marked as 'DONE'
	/*
	onMarkDone(orderId, prodId)
	{
		console.log('Marking as DONE for Order: ' + orderId + ' | Product: '+prodId);
		console.log('Current Object is:');
		window.variable = this;
		console.log(this);
		let dataJSon = {"order_id": orderId, "prod_id": prodId};
		$.ajax({
			url: "http://localhost:3000/api/orders/setProductDone",
			method: 'POST',
			data: JSON.stringify(dataJSon),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(result){
				console.log(result);				
			},
			error: function(err){
				alert('ERROR: '+err);
			}
		});
	}
	*/
	
	componentWillMount()
	{
		ProductStore.on("prodStoreChange", () =>{
			this.setState({productArr: ProductStore.getProducts()});
		});
	}
	
	componentWillUnmount()
	{
		
	}
	
	componentWillUpdate()
	{
		//alert();
		if (typeof(Storage) !== "undefined")
		{
			localStorage.setItem("prodArr", JSON.stringify(this.state.productArr));
		}
	}
	
	componentDidMount()
	{
		let rowArr = [];
		rowArr.push(<tr key={0}><td colSpan="6" align="center">empty</td></tr>);
		this.setState({tblHTMLContent: rowArr});
		
		this.tblProductRef = this.tblProductRef;
	}
	
	showAddProduct()
	{
		this.setState({addProductPopupVisible: true});
	}
	
	removeProduct(productCodeName)
	{
		ProductAction.removeProduct({codeName:productCodeName});
	}
	
	handleHideForm()
	{
		this.setState({addProductPopupVisible:false})
	}
	
	showEditProduct(codeName)
	{
		console.log(this.state.productArr);
		let prodArr = this.state.productArr;
		let stateIndex = -1;
		for(let i=0;i<prodArr.length;i++)
		{
			if(prodArr[i].codeName === codeName)
			{
				stateIndex = i;
				break;
			}
		}
		
		prodArr[stateIndex].editMode = true;
		
		this.setState({productArr: prodArr});
		
		//this.state.productArr[stateIndex].editMode = true;
		
		console.log('Product Code Name: ');
		console.log(codeName);
		console.log(this.tblProductRef);
		let overallTRs = this.tblProductRef.getElementsByTagName('tr');
		
		let rowIndex = 0;
		$.each(overallTRs, function(){
			if(codeName === $(this).find('td')[0].innerHTML)
				return false;
			rowIndex++;
		});
		
		console.log('Row Collection: ');
		console.log(overallTRs);
		let currentRowTDs = overallTRs[rowIndex].getElementsByTagName('td');
		
		let tdIndex = 0;
		$.each(currentRowTDs, function () {
						if(tdIndex === 1)
						{
							let prodNameVal = $(this).html();
							let idProdNameStr = "editProdName-"+codeName;
							let inputProdName = $('<input id='+idProdNameStr+' type="text" />');
							inputProdName.val(prodNameVal);
							$(this).html(inputProdName);
						}
						
						if(tdIndex === 2)
						{
							let qntyVal = $(this).html();
							let idQntyStr = "editQnty-"+codeName;
							let inputQnty = $('<input id='+idQntyStr+' type="text" />');
							inputQnty.val(qntyVal);
							$(this).html(inputQnty);
						}
						
						if(tdIndex === 3)
						{
							window.dateVal = $(this).html();
							dateVal = new Date(dateVal);
							
							let idDateStr = "editDate-"+codeName;
							
							let dateValue = ("0"+(dateVal.getDate()).toString()).slice(-2);
							let monthValue = ("0"+(dateVal.getMonth()+1).toString()).slice(-2);
							let dateStr = dateVal.getFullYear().toString() +"-"+monthValue+"-"+dateValue;
							
							var inputDateEle = document.createElement("INPUT");
							inputDateEle.setAttribute("type", "date");
							inputDateEle.setAttribute("value", dateStr); //"2014-02-09"
							inputDateEle.setAttribute("id",idDateStr);
							
							$(this).html(inputDateEle);
						}
						tdIndex++;
                  });
	}
	
	saveProdData(codeName)
	{
		let newProdName = $('#editProdName-'+codeName).val();
		console.log($(this).parent());//.remove('#editProdName-'+codeName);
		let newQnty = $('#editQnty-'+codeName).val();
		$(this).parent().remove('#editQnty-'+codeName);
		let newDate = $('#editDate-'+codeName).val();
		$(this).parent().remove('#editDate-'+codeName);
		
		// Removing the Input Elements
		let overallTRs = this.tblProductRef.getElementsByTagName('tr');
		
		let rowIndex = 0;
		$.each(overallTRs, function(){
			if(codeName === $(this).find('td')[0].innerHTML)
				return false;
			rowIndex++;
		});
		
		let currentRowTDs = overallTRs[rowIndex].getElementsByTagName('td');
		
		let tdIndex = 0;
		$.each(currentRowTDs, function () {
			if(tdIndex === 1)
			{
				let idProdNameStr = "editProdName-"+codeName;
				$(this).empty(idProdNameStr);
				$(this).html(newProdName);
			}
			
			if(tdIndex === 2)
			{
				let idQntyStr = "editQnty-"+codeName;
				$(this).empty(idQntyStr);
				$(this).html(newQnty);
			}
			
			if(tdIndex === 3)
			{
				let idDateStr = "editDate-"+codeName;
				$(this).empty(idDateStr);
				$(this).html(new Date(newDate).toDateString());
			}
			
			tdIndex++;
		});
		
		
		console.log("New Data: \n"+newProdName+", "+newQnty+", "+newDate);
		
		let prodArrData = this.state.productArr;
		
		for(let i=0;i<prodArrData.length;i++)
		{
			if(prodArrData[i].codeName === codeName)
			{
				prodArrData[i].productName = newProdName;
				prodArrData[i].quantity = newQnty;
				prodArrData[i].expiryDate = newDate;
				prodArrData[i].editMode = false;
				break;
			}
		}
		
		this.setState({productArr: prodArrData});
		
	}
  
	render() {
		let editBtnText = "EDIT";
		let saveBtnText = "SAVE";
		let removeBtnText = "X";
		let btnEditClass = 'btn-primary';
		let btnSaveClass = "btn-success";
		let btnRemoveClass = 'btn-danger';
		
		const selfComp = this;
		const ProductList = this.state.productArr.map((product) => {
			return 		<tr key={product.codeName}>
							<td>{product.codeName}</td>
							<td>{product.productName}</td>
							<td>{product.quantity}</td>
							<td>{new Date(product.expiryDate).toDateString()}</td>
							<td>
								{
									(product.editMode === true)?<button onClick={selfComp.saveProdData.bind(this, product.codeName)}  className={"btn "+ btnSaveClass}>{saveBtnText}</button> : <button onClick={selfComp.showEditProduct.bind(this, product.codeName)}  className={"btn "+ btnEditClass}>{editBtnText}</button>
								}
							</td>
							<td><button onClick={selfComp.removeProduct.bind(this, product.codeName)}  className={"btn "+ btnRemoveClass}>{removeBtnText}</button></td>
						</tr>;
		});
		
		const AddProductPopup = this.state.addProductPopupVisible == true?<AddProduct hideForm={this.handleHideForm}/>:null;
		return (
				  <div>
					<h2>Product Listing</h2>
					<br/>
					<button className="add-product-btn btn btn-success" onClick={this.showAddProduct}>ADD PRODUCT</button>
					<table className="table table-bordered product-table">
						<thead>
							<tr>
								<th>CODE NAME</th>
								<th>PRODUCT NAME</th>
								<th>QUANTITY</th>
								<th>EXPIRY DATE</th>
								<th>CHANGE/SAVE</th>
								<th>REMOVE</th>
							</tr>
						</thead>
						<tbody ref = {c => this.tblProductRef = c} >
						
							{ProductList}
						
						</tbody>
					</table>
					{AddProductPopup}
				  </div>
		);
	}
}
 
export default Products;