import dispatcher from "./dispatcher.js";

export function createProduct(data)
{
	dispatcher.dispatch({
		type:"CREATE_PRODUCT",
		data
	});
}

export function removeProduct(data)
{
	dispatcher.dispatch({
		type:"REMOVE_PRODUCT",
		data
	});
}