var maze;
var el;
var el_breedte;
var el_hoogte;

$(document).ready(function(){
	el=$("#maze-bg");
	calc_wh();
	make_maze(el_breedte,el_hoogte);
	draw_maze();

	$(window).on('resize',function(){
		if(el.width() < $(window).width() || el.height() < $(window).height()){
			calc_wh();
			expand_maze(el_breedte,el_hoogte);
			draw_maze();
		}

		el.width($(window).width());
		el.height($(window).height());
	});

	$("#button").on('click', function(){
		make_maze(el_breedte,el_hoogte);
		draw_maze();
	});
});



function calc_wh(){
	var el_content = el.hmtl;

	el.width("auto");
	el.height("auto");
	el.html('&#9585;&#9586;');

	el_breedte=Math.ceil($(window).width()/(el.width()/2));
	el_hoogte=Math.ceil($(window).height()/el.height());

	el.html(el_content);
	el.width($(window).width());
	el.height($(window).height());
}

function make_maze(w,h){
	maze = {};
	for (i = 0; i < h; i++){
		maze[i]=[];
		for (j = 0; j < w; j++){
			maze[i][j]=(Math.random()<.5?"\u2571":"\u2572");
		}
	}
}

function expand_maze(w,h){
	for (i = Object.keys(maze).length; i < h; i++){
		maze[i]=[];
		for (j = 0; j < w; j++){
			maze[i][j]=(Math.random()<.5?"\u2571":"\u2572");
		}
	}
	for (i = 0; i < Object.keys(maze).length; i++){
		for (j = Object.keys(maze[i]).length; j < w; j++){
			maze[i][j]=(Math.random()<.5?"\u2571":"\u2572");
		}
	}
}

function draw_maze(){
	el.empty();
	for(i=0;i<el_hoogte;i++){
		for(j=0;j<el_breedte;j++){
			el.append(maze[i][j]);
		}
		el.append("<br\>");
	}
}
