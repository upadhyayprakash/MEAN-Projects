import {EventEmitter} from "events";
import dispatcher from "./dispatcher.js";

class ProductStore extends EventEmitter
{
	constructor()
	{
		super();
		
		this.productArr = [{codeName:"p1", productName:"Lenovo Laptop 540T", quantity:5, expiryDate:new Date("2018-04-01"), editMode:false},{codeName:"p2", productName:"iPhone X Silver", quantity:8, expiryDate:new Date("2018-05-23"), editMode:false}];
		
		if (typeof(Storage) !== "undefined")
		{
			if(localStorage.getItem("prodArr") === 'undefined')
				localStorage.setItem("prodArr", JSON.stringify(this.productArr));
			else
				this.productArr = JSON.parse(localStorage.getItem("prodArr"));
		}
		else
		{
			alert("No Local/Session Storage Support!");
		}
		
	}
	
	getProducts()
	{
		return this.productArr;
	}
	
	createProduct(prodJSON)
	{
		let prodStr = {codeName: "p"+Date.now().toString(), productName: prodJSON.productName, quantity: prodJSON.quantity, expiryDate: prodJSON.expiryDate};
		this.productArr.push(prodStr);
		
		this.emit("prodStoreChange");
	}
	
	removeProduct(prodJSON)
	{
		let prodIndex = -1;
		for(let i = 0;i<this.productArr.length; i++)
		{
			if(prodJSON.codeName === this.productArr[i].codeName)
			{	prodIndex = i;
				break;
			}
		}
		
		if(prodIndex !== -1)
		{
			this.productArr.splice(prodIndex,1);
			this.emit("prodStoreChange");
		}
		else
			alert("Product Doesn't Exists!");
	}
	
	handleActions(action)
	{
		console.log('ACTION_TYPE: '+action.type);
		switch(action.type)
		{
			case "CREATE_PRODUCT":
				this.createProduct(action.data);
				break;
			
			case "REMOVE_PRODUCT":
				this.removeProduct(action.data);
				break;
				
			default:
				alert("ACTION_TYPE: "+action.type+" NOT DEFINED!!");
		}
	}
}

const productStore = new ProductStore;
dispatcher.register(productStore.handleActions.bind(productStore));

window.dispatcher = dispatcher;
window.productStore = productStore;
export default productStore;