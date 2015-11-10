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

function get_random_int (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_mine_coordinates(grid_size_x, grid_size_y, number_of_mines){
	var mine_coordinates_on_grid = new Array();
	for(i=0;i<number_of_mines;i++){
		var cur_mine_coordinate_x = get_random_int(0, grid_size_x-1);
		var cur_mine_coordinate_y = get_random_int(0, grid_size_y-1);
		mine_coordinates_on_grid[i] = [cur_mine_coordinate_y, cur_mine_coordinate_x];
	}
	//for debuggin purposes
	//print_array(mine_coordinates_on_grid);
	return mine_coordinates_on_grid;
}

function insert_mines_in_grid(grid, mine_coordinates_on_grid){
	for(i=0;i<mine_coordinates_on_grid.length;i++){
		var new_tile = grid[mine_coordinates_on_grid[i][0]][mine_coordinates_on_grid[i][1]];
		new_tile.set_type('mine');
		grid[mine_coordinates_on_grid[i][0]][mine_coordinates_on_grid[i][1]] = new_tile;
	}
	return grid;
}

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
						var new_tile = grid[y][x];
						new_tile.set_type('indicator');
						new_tile.set_indicator_number(num_indicators);
						grid[y][x] = new_tile;
					}
			}

		}
	}
	return grid;
}

//if an indicator is found open it and stop
//if a mine is found blow up and end the game
// var queue = [];
// queue.push(2);         // queue is now [2]
// queue.push(5);         // queue is now [2, 5]
// var i = queue.shift(); // queue is now [5]
// alert(i);              // displays 2

function open_tile(grid, x, y){
	if(grid[y][x].get_type()  == 'mine'){
		//end game and blow it up
		//reset board, do whatever
		alert('FAIL, YOU LOSE.');
	}
	if(grid[y][x].get_type()  == 'indicator'){
		var new_tile = grid[y][x].set_selected_status(true);
		grid[y][x] = new_tile;  
		//alert(grid[y][x].get_indicator_number()); 
	}
	var queue = [];
	queue.push(grid[y][x]);
	while(queue.length > 0){
			var cur_tile = queue.shift();
			y = cur_tile.get_y_coordinate();
			x = cur_tile.get_x_coordinate();

			if(grid[y][x].get_type()  == 'indicator'){
				var new_tile = grid[y][x]
				new_tile.set_selected_status(true);
				grid[y][x] = new_tile; 
			}	
			else if(grid[y][x].get_type()  == 'empty'){		
					if(y==0 && x>0 && x<grid[0].length-1){
						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down right
						if (grid[y+1][x+1].get_type()  == 'empty' && grid[y+1][x+1].get_selected_status() == false){
							var new_tile = grid[y+1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down left
						if (grid[y+1][x-1].get_type()  == 'empty' && grid[y+1][x-1].get_selected_status() == false){
							var new_tile = grid[y+1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(y == grid.length-1 && x>0 && x<grid[0].length-1){

						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left up
						if (grid[y-1][x-1].get_type()  == 'empty' && grid[y-1][x-1].get_selected_status() == false){
							var new_tile = grid[y-1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right up
						if (grid[y-1][x+1].get_type()  == 'empty' && grid[y-1][x+1].get_selected_status() == false){
							var new_tile = grid[y-1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x < grid[0].length-1 && x>0 && y<grid.length-1 && y>0){
						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left up
						if (grid[y-1][x-1].get_type()  == 'empty' && grid[y-1][x-1].get_selected_status() == false){
							var new_tile = grid[y-1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left down
						if (grid[y+1][x-1].get_type()  == 'empty' && grid[y+1][x-1].get_selected_status() == false){
							var new_tile = grid[y+1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right up
						if (grid[y-1][x+1].get_type()  == 'empty' && grid[y-1][x+1].get_selected_status() == false){
							var new_tile = grid[y-1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right down
						if (grid[y+1][x+1].get_type()  == 'empty' && grid[y+1][x+1].get_selected_status() == false){
							var new_tile = grid[y+1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x == grid[0].length-1 && y<grid.length-1 && y>0){

						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left up
						if (grid[y-1][x-1].get_type()  == 'empty' && grid[y-1][x-1].get_selected_status() == false){
							var new_tile = grid[y-1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left down
						if (grid[y+1][x-1].get_type()  == 'empty' && grid[y+1][x-1].get_selected_status() == false){
							var new_tile = grid[y+1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x == 0 && y<grid.length-1 && y>0){
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right up
						if (grid[y-1][x+1].get_type()  == 'empty' && grid[y-1][x+1].get_selected_status() == false){
							var new_tile = grid[y-1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look right down
						if (grid[y+1][x+1].get_type()  == 'empty' && grid[y+1][x+1].get_selected_status() == false){
							var new_tile = grid[y+1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x==0 && y==0){
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down right
						if (grid[y+1][x+1].get_type()  == 'empty' && grid[y+1][x+1].get_selected_status() == false){
							var new_tile = grid[y+1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x == grid[0].length-1 && y==0){
						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down
						if (grid[y+1][x].get_type()  == 'empty' && grid[y+1][x].get_selected_status() == false){
							var new_tile = grid[y+1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look down left
						if (grid[y+1][x-1].get_type()  == 'empty' && grid[y+1][x-1].get_selected_status() == false){
							var new_tile = grid[y+1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x==0 && y==grid.length-1){
						//look right
						if (grid[y][x+1].get_type()  == 'empty' && grid[y][x+1].get_selected_status() == false){
							var new_tile = grid[y][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up right
						if (grid[y-1][x+1].get_type()  == 'empty' && grid[y-1][x+1].get_selected_status() == false){
							var new_tile = grid[y-1][x+1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
					else if(x==grid[0].length-1 && y==grid.length-1){
						//look up
						if (grid[y-1][x].get_type()  == 'empty' && grid[y-1][x].get_selected_status() == false){
							var new_tile = grid[y-1][x];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look left
						if (grid[y][x-1].get_type()  == 'empty' && grid[y][x-1].get_selected_status() == false){
							var new_tile = grid[y][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
						//look up left
						if (grid[y-1][x-1].get_type()  == 'empty' && grid[y-1][x-1].get_selected_status() == false){
							var new_tile = grid[y-1][x-1];
							new_tile.set_selected_status(true);
							queue.push(new_tile);
						}
					}
			}
	}
	return grid;
}



//REVEAL HINT
//pop off item from array
function test(){
	var grid  = create_grid(10,10);
	var mines = get_mine_coordinates(10, 10, 10);
	grid = insert_mines_in_grid(grid, mines);
	grid = insert_indicators(grid);
	grid = open_tile(grid, 0,0);
	print_array(grid);
	return;
}

function print_array(array){	for(i=0; i<array.length;i++){
	for(j=0; j<array[0].length;j++){
	 		document.write(array[i][j].get_type() + ' ');
		}
		document.write('<br>');
	}
	document.write('<br>');

	for(i=0; i<array.length;i++){
		for(j=0; j<array[0].length;j++){
	 		document.write(array[i][j].get_indicator_number() + ' ');
		}
		document.write('<br>');
	}
	document.write('<br>');

	for(i=0; i<array.length;i++){
		for(j=0; j<array[0].length;j++){
	 		document.write(array[i][j].get_selected_status() + ' ');
		}
		document.write('<br>');
	}
	document.write('<br>');
}