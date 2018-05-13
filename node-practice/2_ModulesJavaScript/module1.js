function myFunction()
{
	console.log("Called Module1...");
}
var myString = "Module-1 String";

/* Use following Syntax to make this members available in other NodeJS files. */

module.exports.myFunction = myFunction; // No Paranthesis here, as we're not calling.
module.exports.myString = myString;