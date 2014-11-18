var events = require('events');

function Door(colour){
    this.colour = colour;
    events.EventEmitter.call(this); // executes the constructor of the event emitter

    this.open = function(){ //whenever the door will be opened, this event will be emitted.
        this.emit('open'); // emitting an event of type open
    };
}

Door.prototype = new events.EventEmitter;
var frontdoor = new Door('blue');

//listener
frontdoor.on('open',function(){
    console.log('ring ring');
});

frontdoor.open();