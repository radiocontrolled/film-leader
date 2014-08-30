var w = window.innerWidth;
var h = window.innerHeight;

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

var countdown = [10,9,8,7,6,5,3,2,1];

var text = d3.select("section svg")
			.append("text")
			.attr({
				"x":w/2,
				"y":h/2
			})
			.text("10")



/*add a circle for every speck, 
 * whose radius will be the value of each
 * element in the specks array
 */
var nodes = canvas.selectAll("circle")
	.data(specks)
	.enter()
	.append("circle")
	.attr({
		"r":function(d){
			return d;
		},
		"fill":"#7f8c8d"
	})

//initialize a force layout
var force = d3.layout.force()
     	.nodes(specks)
     	.size([w, h])
    	.start();
    	
force.on("tick", function() {
		nodes
		.attr({
			"cx": function(d) { 
				return d*Math.random()*w; 
			},
			"cy": function(d) {
				return d*Math.random()*h;
			}
		})
		.call(force.drag);
});