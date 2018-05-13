import React, { Component } from "react";
import $ from 'jquery';

import Mario from "./Mario.js";
import Food from "./Food.js";

class Game extends Component 
{
  
	constructor(props)
	{
		super(props);
		this.state = {
			foodArr: [
				{food_pos_x:0, food_pos_y:4, food_alive:true},
				{food_pos_x:1, food_pos_y:1, food_alive:true},
				{food_pos_x:2, food_pos_y:3, food_alive:true},
				{food_pos_x:3, food_pos_y:0, food_alive:true}
			],
			marioDirCode:-1,
			mario_x_pos:2, mario_y_pos:4,
			grid_max_x:3, grid_max_y:4,
			score:0};
		
		this.daysArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		
		this.moveMario = this.moveMario.bind(this);
		this.stepRight = this.stepRight.bind(this);
		this.stepLeft = this.stepLeft.bind(this);
		this.stepUp = this.stepUp.bind(this);
		this.stepDown = this.stepDown.bind(this);
	}
	
	
	componentWillMount()
	{
		
	}
	
	componentWillUnmount()
	{
		
	}
	
	componentWillUpdate()
	{
		
	}
	
	componentDidMount()
	{
		let rowArr = [];
		rowArr.push(<tr key={0}><td colSpan="6" align="center">empty</td></tr>);
		this.setState({tblHTMLContent: rowArr});
		let selfRef = this;
		$(document).keydown(function(e){
			selfRef.moveMario(e);
		})
	}
	
	moveMario(e)
	{
		clearInterval(window.marioControl);
		//alert('Key Code: '+e.code);
		console.log(e.keyCode);

		this.state.marioDirCode = e.keyCode;
		
		let keyCodeArr = [37,38,39,40];
		let selfRef = this;
		window.marioControl = setInterval(function(){
			
			switch(selfRef.state.marioDirCode)
			{
				case 37: //'ArrowLeft'
					if(selfRef.state.mario_y_pos == 0)
					{
						console.log('Right');
						selfRef.state.marioDirCode = 39;
						selfRef.stepRight();
					}
					else
					{
						console.log('Left');
						selfRef.state.marioDirCode = 37;
						selfRef.stepLeft();
					}
					break;
				case 39: //'ArrowRight'
					if(selfRef.state.mario_y_pos == selfRef.state.grid_max_y)
					{
						console.log('Left');
						selfRef.state.marioDirCode = 37;
						selfRef.stepLeft();
					}
					else
					{
						console.log('Right');
						selfRef.state.marioDirCode = 39;
						selfRef.stepRight();
					}
					break;
				case 38: //'ArrowUp'
					if(selfRef.state.mario_x_pos == 0)
					{
						console.log('Down');
						selfRef.state.marioDirCode = 40;
						selfRef.stepDown();
					}
					else
					{
						console.log('Up');
						selfRef.state.marioDirCode = 38;
						selfRef.stepUp();
					}
					break;
				case 40: //'ArrowDown'
					if(selfRef.state.mario_x_pos == selfRef.state.grid_max_x)
					{
						console.log('Up');
						selfRef.state.marioDirCode = 38;
						selfRef.stepUp();
					}
					else
					{
						console.log('Down');
						selfRef.state.marioDirCode = 40;
						selfRef.stepDown();
					}
					break;
				default:
					//alert('Key Not Identified');
					console.log('Non-Arrow Key Pressed. No ACTION. Continuing with Previous Direction...');
					
				
			}
		}, 1000);
		
		
	}
	
	checkCollision(mario_x_pos, mario_y_pos)
	{
		let foodIndex = 0;
		let selfRef = this;
		this.state.foodArr.map((food)=>{
			
			if(food.food_pos_x === mario_x_pos && food.food_pos_y === mario_y_pos)
			{
				let fArr = selfRef.state.foodArr;
				selfRef.state.score += (fArr[foodIndex].food_alive == true)?1:0;
				fArr[foodIndex].food_alive = false;
				selfRef.setState({foodArr: fArr});
				return false;
			}
			foodIndex++;
		});
		let aliveCount = 0;
		for(let i=0;i<this.state.foodArr.length;i++)
		{
			if(this.state.foodArr[i].food_alive == true)
				aliveCount++;
		}
		if(aliveCount===0)
		{
			setTimeout(function(){location.reload();}, 2000);
		}
	}
	
	stepDown()
	{
		if(this.state.mario_x_pos < this.state.grid_max_x)
			this.setState({mario_x_pos: this.state.mario_x_pos + 1});
		this.checkCollision(this.state.mario_x_pos, this.state.mario_y_pos);
	}
	
	stepUp()
	{
		if(this.state.mario_x_pos > 0)
			this.setState({mario_x_pos: this.state.mario_x_pos - 1});
		this.checkCollision(this.state.mario_x_pos, this.state.mario_y_pos);
	}
	
	stepLeft()
	{
		if(this.state.mario_y_pos > 0)
			this.setState({mario_y_pos: this.state.mario_y_pos - 1});
		this.checkCollision(this.state.mario_x_pos, this.state.mario_y_pos);
	}
	
	stepRight()
	{
		if(this.state.mario_y_pos < this.state.grid_max_y)
			this.setState({mario_y_pos: this.state.mario_y_pos + 1});
		this.checkCollision(this.state.mario_x_pos, this.state.mario_y_pos);
	}
	
	render() {
		let editBtnText = "EDIT";
		let saveBtnText = "SAVE";
		let removeBtnText = "X";
		let btnEditClass = 'btn-primary';
		let btnSaveClass = "btn-success";
		let btnRemoveClass = 'btn-danger';
		
		const selfComp = this;
		// Accept input for M x N. M -> Rows, N -> Columns
		
		let m = 5;
		let n = 5;
		
		let tableWidth = 600;
		let cellSize = tableWidth/(n);
		
		let GameTableRows = <tbody className = 'gridTBody'>
							<tr>
								<td data-pos="1" style={{width:cellSize, height: cellSize}}>{(0==this.state.mario_x_pos && 0==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(0==this.state.mario_x_pos && 1==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(0==this.state.mario_x_pos && 2==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(0==this.state.mario_x_pos && 3==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(0==this.state.mario_x_pos && 4==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}{((0!==this.state.mario_x_pos || 4!==this.state.mario_y_pos) && this.state.foodArr[0].food_alive)?<Food/>:null}</td>
							</tr>
							<tr>
								<td style={{width:cellSize, height: cellSize}}>{(1==this.state.mario_x_pos && 0==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(1==this.state.mario_x_pos && 1==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}{((1!==this.state.mario_x_pos || 1!==this.state.mario_y_pos) && this.state.foodArr[1].food_alive)?<Food/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(1==this.state.mario_x_pos && 2==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(1==this.state.mario_x_pos && 3==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(1==this.state.mario_x_pos && 4==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
							</tr>
							<tr>
								<td style={{width:cellSize, height: cellSize}}>{(2==this.state.mario_x_pos && 0==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(2==this.state.mario_x_pos && 1==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(2==this.state.mario_x_pos && 2==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(2==this.state.mario_x_pos && 3==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}{((2!==this.state.mario_x_pos || 3!==this.state.mario_y_pos) && this.state.foodArr[2].food_alive)?<Food/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(2==this.state.mario_x_pos && 4==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
							</tr>
							<tr>
								<td style={{width:cellSize, height: cellSize}}>{(3==this.state.mario_x_pos && 0==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}{((3!==this.state.mario_x_pos || 0!==this.state.mario_y_pos) && this.state.foodArr[3].food_alive)?<Food/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(3==this.state.mario_x_pos && 1==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(3==this.state.mario_x_pos && 2==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(3==this.state.mario_x_pos && 3==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
								<td style={{width:cellSize, height: cellSize}}>{(3==this.state.mario_x_pos && 4==this.state.mario_y_pos)?<Mario style={{width:cellSize, height:cellSize}}/>:null}</td>
							</tr>
						</tbody>;
		
		let gridCellSize = 500/n;
		
		return (
				  <div>
					<h2>Game Arena</h2>
					<br/>
					{ /* For Game Statistics Grid */}
					
					<table style={{width:tableWidth}} className="table table-bordered game-stats-table" cellPadding="0" cellSpacing="0" border="0">
						<thead>
							<tr>
								<th>PLAYER NAME:</th>
								<th>Prakash Upadhyay</th>
								<th></th>
								<th></th>
								<th>SCORE:</th>
								<th>{this.state.score}</th>
							</tr>
						</thead>
					</table>
					<br/>
					
					{ /* For Game Arena Grid */}
					<table ref = {c => this.tblGameGrid = c} className="table table-bordered game-grid-table">
							{GameTableRows}
					</table>
				  </div>
		);
	}
}
 
export default Game;