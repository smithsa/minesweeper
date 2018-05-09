//global variables
var selected_color = '#ccc'
var number_of_tiles_not_mines = 0;
var number_of_selected_tiles = 0;
var is_game_over = false;
var mine_coordinates_hints = [];
var selected_coordinates = []

/*
Function: Representive of a tile on the game grid. Holds information about a game tile.
Parameters: The Type of tile {type}, an x coordinate of the tile {x}, an x coordinate of the tile {y}
*/
function Tile (type, x, y) {
     this.type = type; 	//valid types are mine, empty, and indicator
     this.indicator_number =  0;
     this.is_selected = false;
     this.get_type = get_type;
     this.y_coordinate = y;
     this.x_coordinate = x;
     this.get_indicator_number = get_indicator_number;
     this.get_selected_status = get_selected_status;
     this.get_x_coordinate = get_x_coordinate;
     this.get_y_coordinate = get_y_coordinate;
     this.set_type = set_type;
     this.set_indicator_number = set_indicator_number;
     this.set_selected_status = set_selected_status;
     this.set_x_coordinate = set_x_coordinate;
     this.set_y_coordinate = set_y_coordinate;
     //setters and getters
	function get_type() {
    	return this.type;
 	}	
 	function set_type(new_type) {
    	this.type = new_type;
 	}
	function get_indicator_number() {
     	return this.indicator_number;
 	}
	function set_indicator_number(new_num) {
     	this.indicator_number = new_num;
 	}
 	function get_selected_status(){
 		return this.is_selected;
 	}
 	function set_selected_status(new_status){
 		this.is_selected = new_status;	
 	}
 	function get_x_coordinate(){
 		return this.x_coordinate;
 	}
 	function get_y_coordinate(){
 		return this.y_coordinate;
 	}
 	function set_x_coordinate(new_x){
 		this.x_coordinate = new_x;
 	}
 	function set_y_coordinate(new_y){
 		this.y_coordinate = new_y;
 	}
}

/*
Function: Creates the game grid
Parameters: Width of the game grid {x}, height of the game grid {y}
Returns: An array representative of the game grid
*/
function create_grid(x,y){
	var grid = new Array();
	for(i=0; i<y; i++){
		var grid_x = new Array()
		for(j=0; j<x; j++){
			grid_x[j] = new Tile('empty',j,i); 
		}
		grid[i] = grid_x;
	}
	return grid;
}

/*
Function: Generates a random integer
Parameters: The minmum range of the random integer {min}, the maximum range of the random integer {max} 
Returns: An array representative of the game grid
*/
function get_random_int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
Function: Generates a 2D array of mine coordinates, the coordinates them selves are stored in arrays
Parameters: The width of the game grid created {grid_size_x}, the height of the game grid created {grid_size_y}, the number of mines in the game {number_of_mines}
Returns: A 2D array of mine coordinates
*/
function get_mine_coordinates(grid_size_x, grid_size_y, number_of_mines){
	number_of_tiles_not_mines = (grid_size_x * grid_size_y) - number_of_mines;
	var mine_coordinates_on_grid = new Array();
	for(i=0;i<number_of_mines;i++){
		var cur_mine_coordinate_x = get_random_int(0, grid_size_x-1);
		var cur_mine_coordinate_y = get_random_int(0, grid_size_y-1);
		mine_coordinates_on_grid[i] = [cur_mine_coordinate_y, cur_mine_coordinate_x];
	}
	return mine_coordinates_on_grid;
}

/*
Function: Inserts mines into the current game grid
Parameters: The current game grid {grid}, a 2D of array of mine coordinate(refer to function get_mine_coordinates) {mine_coordinates_on_grid}
Returns: An array representative of the game grid with mines now placed on the grid
*/
function insert_mines_in_grid(grid, mine_coordinates_on_grid){
	for(i=0;i<mine_coordinates_on_grid.length;i++){
		var new_tile = grid[mine_coordinates_on_grid[i][0]][mine_coordinates_on_grid[i][1]];
		new_tile.set_type('mine');
		grid[mine_coordinates_on_grid[i][0]][mine_coordinates_on_grid[i][1]] = new_tile;
	}
	return grid;
}

/*
Function: Counts the number of mines surrounding every tile on the game grid (refered to as indicators). Inserts these indicators into the current game grid
by setting the indicator number for each game tile if it's indicator number is greater than 0
Parameters: The current game grid {grid}
Returns: An array representative of the game grid with newly updated tiles that have their indicator number set if greater than 0
*/
function insert_indicators(grid){
	for(y=0;y<grid.length;y++){
		for(x=0;x<grid[0].length;x++){
			num_indicators = 0;
			if(grid[y][x].get_type() != 'mine'){
					if(y==0 && x>0 && x<grid[0].length-1){
						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down right
						if (grid[y+1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look down left
						if (grid[y+1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(y == grid.length-1 && x>0 && x<grid[0].length-1){

						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look left up
						if (grid[y-1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right up
						if (grid[y-1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x < grid[0].length-1 && x>0 && y<grid.length-1 && y>0){
						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look left up
						if (grid[y-1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look left down
						if (grid[y+1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right up
						if (grid[y-1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right down
						if (grid[y+1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x == grid[0].length-1 && y<grid.length-1 && y>0){

						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look left up
						if (grid[y-1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look left down
						if (grid[y+1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x == 0 && y<grid.length-1 && y>0){
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look right up
						if (grid[y-1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look right down
						if (grid[y+1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x==0 && y==0){
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down right
						if (grid[y+1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x == grid[0].length-1 && y==0){
						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look down
						if (grid[y+1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look down left
						if (grid[y+1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x==0 && y==grid.length-1){
						//look right
						if (grid[y][x+1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look up right
						if (grid[y-1][x+1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					else if(x==grid[0].length-1 && y==grid.length-1){
						//look up
						if (grid[y-1][x].get_type() == 'mine'){
							num_indicators++;
						}
						//look left
						if (grid[y][x-1].get_type() == 'mine'){
							num_indicators++;
						}
						//look up left
						if (grid[y-1][x-1].get_type() == 'mine'){
							num_indicators++;
						}
					}
					if(num_indicators > 0){
						new_tile = grid[y][x];
						new_tile.set_type('indicator');
						new_tile.set_indicator_number(num_indicators);
						grid[y][x] = new_tile;
					}
			}

		}
	}
	return grid;
}

/*
Function: Opens the selected tile
Parameters: the x coordinate of the selected tile {x}, the y coordinate of the selected tile {y},the current game grid {grid}
Returns: An array representative of the game grid, with an updated status of selected/opend game tiles
*/
function open_tile(x, y, grid){
	if(is_game_over){
		return false;
	}
	var cur_tile_coor = '';
	var new_tile = '';
	var queue = [];
	var original_coordinates = x+","+y
	if(grid[y][x].get_type()  == 'mine'){
			is_game_over = true;
			change_tile_color(x,y,"red");
			alert("Sorry, you lose. Try again!");
			document.getElementById('lose-audio').play();
			document.getElementById('mine-audo').play();
	}
	else if(grid[y][x].get_type()  == 'indicator'){
		new_tile = grid[y][x];
		new_tile.set_selected_status(true);
		change_tile_color(x,y,selected_color);
		number_of_selected_tiles++;
		reveal_indicator_number(x,y, grid);
		grid[y][x] = new_tile;
	}
	else{
		queue.push(grid[y][x]);
		while(queue.length > 0){
				var cur_tile = queue.shift();
				y = cur_tile.get_y_coordinate();
				x = cur_tile.get_x_coordinate();
				if(grid[y][x].get_selected_status && grid[y][x].get_type()  != 'mine' && is_in_array(x+","+y, selected_coordinates)==false){
					selected_coordinates.push(x+","+y);
					number_of_selected_tiles++;
					console.log(x+","+y);
				}	
				if(grid[y][x].get_type()  == 'indicator'){
					new_tile = grid[y][x];
					new_tile.set_selected_status(true);
					change_tile_color(x,y,selected_color);
					reveal_indicator_number(x,y, grid);
				}	
				else if(grid[y][x].get_type() != 'mine'){
						if(y==0 && x>0 && x<grid[0].length-1){
							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look down right
							if (grid[y+1][x+1].get_type()  != 'mine' && grid[y+1][x+1].get_selected_status() == false){
								new_tile = grid[y+1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y+1,selected_color);
								reveal_indicator_number(x+1,y+1, grid);
								queue.push(new_tile);
							}
							//look down left
							if (grid[y+1][x-1].get_type()  != 'mine' && grid[y+1][x-1].get_selected_status() == false){
								new_tile = grid[y+1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y+1,selected_color);
								reveal_indicator_number(x-1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(y == grid.length-1 && x>0 && x<grid[0].length-1){

							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look left up
							if (grid[y-1][x-1].get_type()  != 'mine' && grid[y-1][x-1].get_selected_status() == false){
								new_tile = grid[y-1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y-1,selected_color);
								reveal_indicator_number(x-1,y-1, grid);
								queue.push(new_tile);
							}
							//look right up
							if (grid[y-1][x+1].get_type()  != 'mine' && grid[y-1][x+1].get_selected_status() == false){
								new_tile = grid[y-1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y-1,selected_color);
								reveal_indicator_number(x+1,y-1, grid);
								queue.push(new_tile);
							}
						}
						else if(x < grid[0].length-1 && x>0 && y<grid.length-1 && y>0){
							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look left up
							if (grid[y-1][x-1].get_type()  != 'mine' && grid[y-1][x-1].get_selected_status() == false){
								new_tile = grid[y-1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y-1,selected_color);
								reveal_indicator_number(x-1,y-1, grid);
								queue.push(new_tile);
							}
							//look left down
							if (grid[y+1][x-1].get_type()  != 'mine' && grid[y+1][x-1].get_selected_status() == false){
								new_tile = grid[y+1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y+1,selected_color);
								reveal_indicator_number(x-1,y+1, grid);
								queue.push(new_tile);
							}
							//look right up
							if (grid[y-1][x+1].get_type()  != 'mine' && grid[y-1][x+1].get_selected_status() == false){
								new_tile = grid[y-1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y-1,selected_color);
								reveal_indicator_number(x+1,y-1, grid);
								queue.push(new_tile);
							}
							//look right down
							if (grid[y+1][x+1].get_type()  != 'mine' && grid[y+1][x+1].get_selected_status() == false){
								new_tile = grid[y+1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y+1,selected_color);
								reveal_indicator_number(x+1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(x == grid[0].length-1 && y<grid.length-1 && y>0){

							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look left up
							if (grid[y-1][x-1].get_type()  != 'mine' && grid[y-1][x-1].get_selected_status() == false){
								new_tile = grid[y-1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y-1,selected_color);
								reveal_indicator_number(x-1,y-1, grid);
								queue.push(new_tile);
							}
							//look left down
							if (grid[y+1][x-1].get_type()  != 'mine' && grid[y+1][x-1].get_selected_status() == false){
								new_tile = grid[y+1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y+1,selected_color);
								reveal_indicator_number(x-1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(x == 0 && y<grid.length-1 && y>0){
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look right up
							if (grid[y-1][x+1].get_type()  != 'mine' && grid[y-1][x+1].get_selected_status() == false){
								new_tile = grid[y-1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y-1,selected_color);
								reveal_indicator_number(x+1,y-1, grid);
								queue.push(new_tile);
							}
							//look right down
							if (grid[y+1][x+1].get_type()  != 'mine' && grid[y+1][x+1].get_selected_status() == false){
								new_tile = grid[y+1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y+1,selected_color);
								reveal_indicator_number(x+1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(x==0 && y==0){
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look down right
							if (grid[y+1][x+1].get_type()  != 'mine' && grid[y+1][x+1].get_selected_status() == false){
								new_tile = grid[y+1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y+1,selected_color);
								reveal_indicator_number(x+1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(x == grid[0].length-1 && y==0){
							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look down
							if (grid[y+1][x].get_type()  != 'mine' && grid[y+1][x].get_selected_status() == false){
								new_tile = grid[y+1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y+1,selected_color);
								reveal_indicator_number(x,y+1, grid);
								queue.push(new_tile);
							}
							//look down left
							if (grid[y+1][x-1].get_type()  != 'mine' && grid[y+1][x-1].get_selected_status() == false){
								new_tile = grid[y+1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y+1,selected_color);
								reveal_indicator_number(x-1,y+1, grid);
								queue.push(new_tile);
							}
						}
						else if(x==0 && y==grid.length-1){
							//look right
							if (grid[y][x+1].get_type()  != 'mine' && grid[y][x+1].get_selected_status() == false){
								new_tile = grid[y][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y,selected_color);
								reveal_indicator_number(x+1,y, grid);
								queue.push(new_tile);
							}
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look up right
							if (grid[y-1][x+1].get_type()  != 'mine' && grid[y-1][x+1].get_selected_status() == false){
								new_tile = grid[y-1][x+1];
								new_tile.set_selected_status(true);
								change_tile_color(x+1,y-1,selected_color);
								reveal_indicator_number(x+1,y-1, grid);
								queue.push(new_tile);
							}
						}
						else if(x==grid[0].length-1 && y==grid.length-1){
							//look up
							if (grid[y-1][x].get_type()  != 'mine' && grid[y-1][x].get_selected_status() == false){
								new_tile = grid[y-1][x];
								new_tile.set_selected_status(true);
								change_tile_color(x,y-1,selected_color);
								reveal_indicator_number(x,y-1, grid);
								queue.push(new_tile);
							}
							//look left
							if (grid[y][x-1].get_type()  != 'mine' && grid[y][x-1].get_selected_status() == false){
								new_tile = grid[y][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y,selected_color);
								reveal_indicator_number(x-1,y, grid);
								queue.push(new_tile);
							}
							//look up left
							if (grid[y-1][x-1].get_type()  != 'mine' && grid[y-1][x-1].get_selected_status() == false){
								new_tile = grid[y-1][x-1];
								new_tile.set_selected_status(true);
								change_tile_color(x-1,y-1,selected_color);
								reveal_indicator_number(x-1,y-1, grid);
								queue.push(new_tile);
							}
						}
				}
		}
	}
	
	if(number_of_selected_tiles == number_of_tiles_not_mines){
		is_game_over = true;
		alert("Congrats you won!");
		document.getElementById('win-audio').play();
	}
	return grid;
}

/*
Function: Changes the color of the given tile
Parameters: the x coordinate of the tile whose color is changing {x}, the y coordinate of the tile whose color is changing {y}, the color you wish to change the tile to {color}
*/
function change_tile_color(x,y,color) {
   document.getElementById(y+"-"+x).style.backgroundColor = color;
}

/*
Function: Reveals the indicator number on the game grid
Parameters: the x coordinate of the tile whose indicator number to show{x}, the y coordinate of the tile whose indicator number to show {y}, the current game grid {grid}
Returns: A boolean, true upon success of changing the tile, false otherwise
*/
function reveal_indicator_number(x,y,grid){
	var tile = grid[y][x];
	if(tile.get_type() == 'indicator'){
		var indicator_number = tile.get_indicator_number();
		var node = document.getElementById('num-'+y+"-"+x);
      	node.style.visibility= 'visible';
      	return true;
  	}
  	return false;
}

/*
Function: Reveals a hint on the game grid of where a mine is by changing the tile that the mine resides in red
Returns: A boolean, true upon success of changing the tile, false otherwise
*/
function reveal_hint(){
	//reveal a mine on the board make the grid glow, and make it selected
	if(mine_coordinates_hints.length > 0){
		var hint = mine_coordinates_hints.pop();
		var x = hint[1];
		var y = hint[0];
		change_tile_color(x,y,'orange');
		return true;
	}
	alert("No more hints, go to work!");
	return false
}

/*
Function: Draws the game board to the html document
Parameters: the width if the game grid {x}, the height of the game grid {y}, the current game grid {grid}
*/
function draw_game_board(x, y, grid){
	var indicator_number = 0;
	var node = document.getElementById("game-board");
	for(i=0;i<y;i++){
		for(j=0;j<x;j++){
			indicator_number = grid[i][j].get_indicator_number();
			node.innerHTML = node.innerHTML +'<div class="tile" id="'+i+'-'+j+'"><p class="indicator_number" id="num-'+i+'-'+j+'">'+indicator_number+'</p></div>';
		}
		node.innerHTML = node.innerHTML +'<div class="row-spacer"></div>';
	}
}

/*
Function: Creates and generates a new game grid
Parameters: the width if the game grid {x}, the height of the game grid {y}, the current number of mines in the game {number_of_mines}
*/
function create_new_game(x,y,number_of_mines){
	var grid  = create_grid(x,y);
	var mines = get_mine_coordinates(x, y, number_of_mines);
	mine_coordinates_hints = mines;
	var node = document.getElementById("game-board");
	grid = insert_mines_in_grid(grid, mines);
	grid = insert_indicators(grid);
	draw_game_board(x, y, grid);
	return grid;
}

function is_in_array(value, the_array){
	for(i=0;i<the_array.length;i++){
		if(value === the_array[i]){
			return true;
		}
	}
	return false;
}
function debug(array){	
	var node = document.getElementById("game-board");
	node.innerHTML = node.innerHTML + "<br>"
	for(i=0; i<array.length;i++){
		for(j=0; j<array[0].length;j++){
		 		node.innerHTML = node.innerHTML + array[i][j].get_type() + ' ';
			}
			node.innerHTML = node.innerHTML +'<br>';
		}
	node.innerHTML = node.innerHTML +'<br>';

	for(i=0; i<array.length;i++){
		for(j=0; j<array[0].length;j++){
	 		node.innerHTML = node.innerHTML + array[i][j].get_indicator_number() + ' ';
		}
		node.innerHTML = node.innerHTML +'<br>';
	}
	node.innerHTML = node.innerHTML +'<br>';

	for(i=0; i<array.length;i++){
		for(j=0; j<array[0].length;j++){
	 		node.innerHTML = node.innerHTML + array[i][j].get_selected_status() + ' ';
		}
		node.innerHTML = node.innerHTML +'<br>';
	}
	node.innerHTML = node.innerHTML +'<br>';
}