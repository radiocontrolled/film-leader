var w = window.innerWidth*0.9;
var h = window.innerHeight*0.9;
var seconds = [10,9,8,7,6,5,3,2,1];
var nodes;
var text;

var canvas = d3.select("section")
			.append("svg")
			.attr({
				"width": w, 
				"height": h
			});

// generate some data that will be each speck's radius
var specks = [];
for(var i = 1; i <= 100; i++){
	specks.push(Math.round(Math.random()*5));
}

var vis = function(){
	
	/* adds/updates a text element with the current
	 * second
	 */
	var countDown = function(count){
		text = canvas.selectAll("text")
			.data(count, function(d) { return d; });
			
		text.enter()
			.append("text")
			.text(function(d){
				return d;
			})
			.attr({
				"x":w/2,
				"y":h/2
			});

		text
			.exit()
			.remove();
	};
	
	
	/*add a circle for every speck, 
	 * whose radius will be the value of each
	 * element in the specks array
	 */
	nodes = canvas.selectAll("circle")
		.data(specks)
		.enter()
		.append("circle")
		.attr({
			"r":function(d){
				return d;
			},
			"fill":"#7f8c8d"
		});

	//initialize a force layout
	var force = d3.layout.force()
	     	.nodes(specks)
	     	.size([w, h]);
	    	
	
	force.on("tick", function() {
		nodes
		.attr({
			"cx": function(d) { 
				return d*Math.random()*w; 
			},
			"cy": function(d) {
				return d*Math.random()*h;
			}
		});
	});
	
	//initial call to force layout
	force.start();
	nodes.call(force.drag);

	var count = seconds.length + 1;
	
	setInterval(function(){
		
		/*update the second shown
		 * and call the force layout
		 */
		if(count <= seconds.length + 1 && count >=0){
			countDown([count]);
			count--;
			force.start();
			nodes.call(force.drag);
		}
		else if(count == -1){
			nodes = [];
			text.remove();
		}
	
		
	},1000);
	
}();


