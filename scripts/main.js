
// MODEL
var model = Snap("#model");

// "pollster", "year", "poll.date", "cand1_pct", "cand2_pct", "cand1_actual", "cand2_actual"
var data = [
	["ABC News/Washington Post",2000,"2000-11-04",45,48,48.38,47.87,3.51,0.51,-3],
	["ABC News/Washington Post",2004,"2004-10-30",48,49,48.27,50.73,1.46,-2.46,-1],
	["ABC News/Washington Post",2008,"2008-11-02",53,44,52.92,45.66,1.74,7.26,9],
	["ABC News/Washington Post",2012,"2012-11-03",50,47,51.00647842,47.14987728,0.856601138,3.856601138,3],
	["CBS News/New York Times",2000,"2000-11-05",45,44,48.38,47.87,0.49,0.51,1],
	["CBS News/New York Times",2004,"2004-10-31",47,49,48.27,50.73,0.46,-2.46,-2],
	["CBS News/New York Times",2008,"2008-11-01",51,42,52.92,45.66,1.74,7.26,9],
	["CBS News/New York Times",2012,"2012-10-27",48,47,51.00647842,47.14987728,2.856601138,3.856601138,1],
	["Gallup",2000,"2000-11-06",45,47,48.38,47.87,2.51,0.51,-2],
	["Gallup",2004,"2004-10-30",47,49,48.27,50.73,0.46,-2.46,-2],
	["Gallup",2008,"2008-11-01",53,42,52.92,45.66,3.74,7.26,11],
	["Gallup",2012,"2012-11-03",48,49,51.00647842,47.14987728,4.856601138,3.856601138,-1],
	["George Washington University (Battleground)",2000,"2000-11-06",41,46,48.38,47.87,5.51,0.51,-5],
	["George Washington University (Battleground)",2004,"2004-11-01",41,47,48.27,50.73,3.54,-2.46,-6],
	["George Washington University (Battleground)",2008,"2008-11-03",49,44,52.92,45.66,2.26,7.26,5],
	["George Washington University (Battleground)",2012,"2012-10-31",48,48,51.00647842,47.14987728,3.856601138,3.856601138,0],
	["Greenberg Quinlan Rosner (Democracy Corps)",2000,"2000-10-31",45,45,48.38,47.87,0.51,0.51,0],
	["Greenberg Quinlan Rosner (Democracy Corps)",2004,"2004-10-30",48,47,48.27,50.73,3.46,-2.46,1],
	["Greenberg Quinlan Rosner (Democracy Corps)",2008,"2008-11-01",51,44,52.92,45.66,0.26,7.26,7],
	["Greenberg Quinlan Rosner (Democracy Corps)",2012,"2012-11-03",49,45,51.00647842,47.14987728,0.143398862,3.856601138,4],
	["IBD/TIPP",2000,"2000-11-05",46,47.9,48.38,47.87,2.41,0.51,-1.9],
	["IBD/TIPP",2004,"2004-10-31",45.3,48.6,48.27,50.73,0.84,-2.46,-3.3],
	["IBD/TIPP",2008,"2008-11-01",47.5,43,52.92,45.66,2.76,7.26,4.5],
	["IBD/TIPP",2012,"2012-11-04",50.3,48.7,51.00647842,47.14987728,2.256601138,3.856601138,1.6],
	["Rasmussen Reports/Pulse Opinion Research",2000,"2000-11-05",40,49,48.38,47.87,9.51,0.51,-9],
	["Rasmussen Reports/Pulse Opinion Research",2004,"2004-10-31",48.5,50.2,48.27,50.73,0.76,-2.46,-1.7],
	["Rasmussen Reports/Pulse Opinion Research",2008,"2008-11-02",52,46,52.92,45.66,1.26,7.26,6],
	["Rasmussen Reports/Pulse Opinion Research",2012,"2012-11-03",48,49,51.00647842,47.14987728,4.856601138,3.856601138,-1],
	["Zogby Analytics, telephone",2000,"2000-11-05",48,46,48.38,47.87,1.49,0.51,2],
	["Zogby Analytics, telephone",2004,"2004-11-01",49.1,49.4,48.27,50.73,2.16,-2.46,-0.3],
	["Zogby Analytics, telephone",2008,"2008-11-02",54.1,42.7,52.92,45.66,4.14,7.26,11.4],
	["Zogby Analytics, telephone",2012,"2012-10-30",48.7,48.5,51.00647842,47.14987728,3.656601138,3.856601138,0.2],
];

// Parsing the data...
var pollsters = [];
for(var i=0;i<data.length;i+=4){

	var pollster = {};
	pollsters.push(pollster);

	// metadata
	pollster.name = data[i][0];

	// Years
	pollster.years = [];
	for(var j=0;j<4;j++){
		var row = data[i+j];
		var year = {
			year: row[1],
			date: row[2],
			dem: row[3]-row[5],
			rep: row[4]-row[6],
		};
		pollster.years.push(year);
	}

}

// Draw lines
var demX = 162;
var repX = 162+275;
var offY = 50;
var bg = model.group(
	model.rect(demX-1,offY,2,450).attr({fill:"#ddd"}),
	model.rect(repX-1,offY,2,450).attr({fill:"#ddd"}),
	model.rect(50,offY,225,3).attr({fill:"#333"}),
	model.rect(325,offY,225,3).attr({fill:"#333"})
);

// Draw dots
var SCALE = 13;
var ANIM_SPEED = 150;
var ROW_HEIGHT = 95;

var linesSVG = model.group();
var dotsSVG = model.group();

// Class
function Pollster(pollster){

	var self = this;
	self.pollster = pollster;

	// Mouse funcs
	self.onMouseOver = function(error,x,y,align){
		for(var i=0;i<self.dots.length;i++){
			var dot = self.dots[i];
			dot.animate({opacity:1},ANIM_SPEED,mina.easeinout);
		}
		self.demLine.animate({opacity:1},ANIM_SPEED,mina.easeinout);
		self.repLine.animate({opacity:1},ANIM_SPEED,mina.easeinout);

		// Tooltip
		tooltip.show(pollster.name,error,x,y,align);

	};
	self.onMouseOut = function(){
		for(var i=0;i<self.dots.length;i++){
			var dot = self.dots[i];
			dot.animate({opacity:0.3},ANIM_SPEED,mina.easeinout);
		}
		self.demLine.animate({opacity:0},ANIM_SPEED,mina.easeinout);
		self.repLine.animate({opacity:0},ANIM_SPEED,mina.easeinout);

		// Tooltip
		tooltip.hide();

	};

	// My Dots
	self.dots = [];	

	// My Line Paths
	self.demPath = "";
	self.repPath = "";

	// Each year!
	for(var j=0;j<4;j++){

		var year = pollster.years[j];

		// Move or Line to?
		self.demPath += (j==0) ? "M" : "L";
		self.repPath += (j==0) ? "M" : "L";

		// Dem dot
		var x = year.dem*SCALE;
		var y = (j+1)*ROW_HEIGHT;
		x+=demX;
		y+=offY;
		var dot = dotsSVG.circle(x,y,8).attr({fill:"#2727cc", opacity:0.15});
		(function(error,x,y){
			dot.mouseover(function(){
				self.onMouseOver(error,x,y,1);
			});
		})(year.dem,x,y);
		dot.mouseout(self.onMouseOut);
		self.dots.push(dot);
		self.demPath += Math.round(x)+","+Math.round(y);

		// Rep dot
		var x = year.rep*SCALE;
		var y = (j+1)*ROW_HEIGHT;
		x+=repX;
		y+=offY;
		var dot = dotsSVG.circle(x,y,8).attr({fill:"#cc2727", opacity:0.3});
		(function(error,x,y){
			dot.mouseover(function(){
				self.onMouseOver(error,x,y,-1);
			});
		})(year.rep,x,y);
		dot.mouseout(self.onMouseOut);
		self.dots.push(dot);
		self.repPath += Math.round(x)+","+Math.round(y);

	}

	// Draw paths
	self.demLine = linesSVG.path(self.demPath).attr({fill:"none",stroke:"#2727cc",strokeWidth:3,opacity:0});
	self.repLine = linesSVG.path(self.repPath).attr({fill:"none",stroke:"#cc2727",strokeWidth:3,opacity:0});

}
for(var i=0;i<pollsters.length;i++){
	new Pollster(pollsters[i]);
}

// Draw Labels
var labelsSVG = model.group();
labelsSVG.attr({
	fill: "#333",
	"text-anchor": "middle",
	"font-size": 20
});
labelsSVG.text(demX,offY,"DEMOCRATS").attr({
	"font-size": 30,
	dy: "-3px"
});
labelsSVG.text(repX,offY,"REPUBLICANS").attr({
	"font-size": 30,
	dy: "-3px"
});
labelsSVG.text(300,offY+ROW_HEIGHT*1,"2000").attr({dy:"5px"});
labelsSVG.text(300,offY+ROW_HEIGHT*2,"2004").attr({dy:"5px"});
labelsSVG.text(300,offY+ROW_HEIGHT*3,"2008").attr({dy:"5px"});
labelsSVG.text(300,offY+ROW_HEIGHT*4,"2012").attr({dy:"5px"});

// Tooltips
function Tooltip(){

	var self = this;

	// SVG
	var svg = model.group();
	svg.attr({
		fill: "#ddd",
		"text-anchor": "middle",
		"font-size": 16,
		"dominant-baseline": "central",
		opacity:0
	});

	// BG
	var block = svg.rect(-50, -20, 100, 60, 20, 20);
	block.attr({
		fill: "rgba(30,30,30,0.80)"
	});

	// Label
	var pollsterName = svg.text(0, 0, "tooltip!");
	var errorAmount = svg.text(0, 20, "off by...");

	// Show
	self.show = function(name,error,x,y,align){

		// name
		pollsterName.attr({
			text: name
		});

		// error
		var errorMessage;
		error = Math.round(error);
		if(error<0){
			errorMessage = "underestimated by "+Math.abs(error)+"%";
		}else if(error>0){
			errorMessage = "overestimated by "+error+"%";
		}else{
			errorMessage = "exactly on target!";
		}
		errorAmount.attr({
			text: errorMessage
		});


		// the block size
		var width = Math.max(pollsterName.node.clientWidth, errorAmount.node.clientWidth)+30;
		block.attr({
			x: -width/2,
			width: width
		});

		// Transform, where...
		var tx = x + align*((width/2)+15);
		var ty = y - 10;
		svg.transform("translate("+tx+","+ty+")");

		// show it!
		self.SHOULD_BE_SHOWING = true;
		svg.attr({display:"block"});
		svg.animate({opacity:1},ANIM_SPEED,mina.easeinout);

	};

	self.SHOULD_BE_SHOWING = false;
	self.hide = function(){
		self.SHOULD_BE_SHOWING = false;
		svg.animate({opacity:0},ANIM_SPEED,mina.easeinout,function(){
			if(!self.SHOULD_BE_SHOWING) svg.attr({display:"none"});
		});
	};

}
var tooltip = new Tooltip();

