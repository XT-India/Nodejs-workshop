var pong = pong || {};

(function(P, $){
	//Elements
	P.el = {
		pong   : $('#pong'),
		bg     : $('#bg'),
		name   : $('#name'),
		msg    : $('#msg'),
		chat   : $('output'),
		btn    : $('section button'),
		show   : $('section > i'),
		dialog : $('dialog')[0],
		score  : $('h1')
	};

	//Vars
	var ctx   = P.el.pong[0].getContext("2d"),
	    bgctx = P.el.bg[0].getContext("2d"),
	    socket,
			nump  = 80, //Number of collision particles
	    PD    = [{particles: particleArray(nump, 0)}, {particles: particleArray(nump, 1)}], //Paddle Array, [0] is left, [1] is right
			PDA   = 0, // Particles left to draw
	    keys  = {k38:false, k40:false},
	    B, //Ball Object
	    PW, //Pong Table Width
	    PH, //Pong Table Height
			pint,
	    int;

	//Setup Pong Table
	function setup() {
		//Get Dimensions of Canvas
		sendMessage('get_dimensions');

		//Send key combinations
		int = setInterval(move, 33);
	}

	//Game
	function move() {
		//Pass which key is down to server if one or both are pressed
		if(keys.k38 || keys.k40) sendMessage({"keys":keys});
	}

	function draw(p) {
		//Send Movements
		move();

		//Set Paddle/Ball Style
		ctx.fillStyle="#fff";
		ctx.globalCompositeOperation = "lighter";

		//Clear canvas
		ctx.clearRect(0,0,PW,PH);

		//Draw collision effects, if any collision
		if(p !== false) {
			PDA = nump;
			pint = setInterval(function(){ballPaddleCollision(p, ctx);}, 100);
		}

		//Draw Paddles
		ctx.fillRect(PD[0].x,PD[0].y,PD[0].w,PD[0].h);
		ctx.fillRect(PD[1].x,PD[1].y,PD[1].w,PD[1].h);

		//Draw Ball
		ctx.fillRect(B.x,B.y,B.w,B.h);
	}

	//Particles for effects
	function particle(t) {
		this.speed = {"x": Math.random()*50*(t==0?1:-1), "y": (Math.round(Math.random())==0?-1:1)*Math.random()*50};
		this.radius = Math.random()*10;
		this.life = Math.random()*30;
		this.rlife = this.life;
		this.r = Math.round(Math.random()*255);
		this.g = Math.round(Math.random()*100);
		this.b = Math.round(Math.random()*100);
	}

	//Create particles
	function particleArray(n, p) {
		var arr = [];
		while(n-- > 0) arr.push(new particle(p));
		return arr;
	}

	function randRange(from, to) {
		return Math.floor(Math.random()*(to-from+1)+from);
	}

	function ballPaddleCollision(p, ctx) {
		var i,
		    gradient,
				opacity;

		if(!PD[p]) return;

		//Draw Particles
		for(i = 0; i < PD[p].particles.length; i++) {
			var j;
			ctx.beginPath();

			if(!PD[p].particles[i].location) PD[p].particles[i].location = {"x":Math.round(p==0?(PD[p].x+PD[p].w):PD[p].x), "y":Math.round(randRange(PD[p].y, (PD[p].y + PD[p].h)))};
			j = PD[p].particles[i];
			opacity = Math.round(j.rlife/j.life*100)/100;

			gradient = ctx.createRadialGradient(j.location.x, j.location.y, 0, j.location.x, j.location.y, j.radius);
			gradient.addColorStop(0, "rgba("+j.r+", "+j.g+", "+j.b+", "+opacity+")");
			gradient.addColorStop(0.5, "rgba("+j.r+", "+j.g+", "+j.b+", "+opacity+")");
			gradient.addColorStop(1, "rgba("+j.r+", "+j.g+", "+j.b+", 0)");
			ctx.fillStyle = gradient;
			ctx.arc(j.location.x, j.location.y, j.radius, Math.PI*2, false);
			ctx.fill();

			//Move particles
			j.rlife--;
			j.location.x += j.speed.x;
			j.location.y += j.speed.y;

			//If particle is dead, reduce counter
			if(j.rlife <= 0) PDA--;

			//If we're out of particles...
			if(PDA == 0) {
				PD[p].particles = particleArray(nump, p);
				clearInterval(pint);
				break;
			}
		}
	}

	function sendMessage(msg) {
		socket.emit('receive', msg);
	}

	function receiveGameSetup(data) {
		if(data.ball){ //Get Ball and Paddle Positions
			var TPD = [data.paddle, data.oppPaddle];
			B  = data.ball;
			TPD[0].particles = PD[0].particles;
			TPD[1].particles = PD[1].particles;
			PD = TPD;

			P.el.score.html('<aside>'+data.score[0]+'</aside><aside>'+data.score[1]+'</aside>');
			draw(data.collide);
		} else if(data.canvas){ //Set the width and height of the canvas
			P.el.pong[0].width = P.el.bg[0].width = PW = data.canvas.w;
			P.el.pong[0].height = P.el.bg[0].height = PH = data.canvas.h;
		}
	}

	function showDialogMessage(d) {
		hideDialogMessage();
		$(P.el.dialog).html('<i class="close">&times;</i><p>'+d.msg+'</p>').addClass('show');
	}

	function hideDialogMessage() {
		$(P.el.dialog).removeClass('show');
	}

	function receiveChatMessage(m) {
		P.el.chat.prepend('<span>'+m+'</span>');
	}

	//Wait until whole page is loaded, then setup!
	window.onresize = setup;
	window.onload = function(){

		//Keydown Listeners
		$('body').off().keydown(function(e) {
			keys['k'+e.which] = true;
			if(e.which == 38 || e.which == 40) e.preventDefault();
		}).keyup(function(e){
			keys['k'+e.which] = false;
			if(e.which == 38 || e.which == 40) e.preventDefault();
			if(e.which == 13) {
				e.preventDefault();
				P.el.btn.click();
			}
		});
		P.el.btn.click(function() {
			if(P.el.name.val() != '' && P.el.msg.val() != '') {
				sendMessage({action: 'chat', name: P.el.name.val(), msg: P.el.msg.val()});
				P.el.msg.val('');
			}
		});
		P.el.show.click(function() {
			var $p = $(this).parent();
			if($p.hasClass('show')) $p.removeClass('show');
			else $p.addClass('show');
		});

		//Watch Message Close Buttons
		$(P.el.dialog).on('click', '.close', hideDialogMessage);

		//Connect to Socket.io and store connection in var
		socket = io.connect(window.location.origin);



		//Console Messages echo to console
		socket.on('console', function (d) { console.log(d); });

		//Bind game data to message handler
		socket.on('game', function (d) { receiveGameSetup(d); });

		//Bind confirmations to message handler
		socket.on('dialog', function (d) {
			switch(d.action){
				case 'hide':
					hideDialogMessage(d);
					break;
				default:
					showDialogMessage(d);
					break;
			}
		});

		//Bind confirmations
		socket.on('message', function (m) { receiveChatMessage(m); });

		//Setup Game
		setup();
	}
})(pong, jQuery);
