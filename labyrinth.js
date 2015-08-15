// Labyrinth class
function Labyrinth(start) {
  this.rooms = [];
  this.doors = [];
  
  this.currentRoom = start;
  this.currentRoom.visit();
}

Labyrinth.prototype.go = function(direction) {
  this.currentRoom = this.currentRoom[direction].visit();
};

// Room Class
function Room(north, west, south, east) {
  this.id = Room.prototype.getUniqueId();
  this.treasures = [];
  this.north = north;
  this.west = west;
  this.south = south;
  this.east = east;
  
  this.description = "";
}

Room.prototype.id = 0;
Room.prototype.getUniqueId = function() { return Room.prototype.id++; };
Room.prototype.visit = function() {
  console.log(" # " + this.description + " # ");
  console.log("Direzioni possibili: ");
	for (var property in this) {
		var value = this[property];
		if (this.hasOwnProperty(property) && value instanceof Room) {
			console.log("* " + property +" - " + value);
		}
	}
  return this;
};

// WalledRoom class - extends Room
function WalledRoom() {
	Room.call(this);
	this.north = new Wall();
	this.west = new Wall();
	this.south = new Wall();
	this.east = new Wall();
}

WalledRoom.prototype = Object.create(Room.prototype);
WalledRoom.prototype.constructor = Room;

// Wall class
function Wall() {
}

// Door class
function Door(front, back) {
  this.front = front;
  this.back = back;
  
  this.locked = true;
}

Door.prototype.open = function(currentRoom) {
	if (!this.locked) {
		console.log("This door is locked");
		if (currentRoom === front) {
			return back
		}
		if (currentRoom === back) {
			return front;
		}
		else {
			return false;
		}
	} else {
		if (currentRoom === front) {
			return back
		}
		if (currentRoom === back) {
			return front;
		}
		else {
			return false;
		}
	}
}

var room1 = new Room("culo", "cicciao", undefined, "cose a caso");

room1.description = "Una stanza a caso";
var room2 = new Room(room1, null);
room1.south = room2;
room2.description = "Una stanza particolarmente cessuta";

var l = new Labyrinth(room1);
l.rooms.push(room1);
l.rooms.push(room2);

// Modulo per richiedere le funzionalità di sistema
var sys = require("sys");
// process: prende il processo corrente
//    Ogni processo ha 3 "canali" base con cui comunica con l'esterno
//    stdin: standard input
//    stdout: standard output
//    stderr: standard error
// stdin: prende lo "standard input" del processo scelto
// quindi noi stiamo "scrivendo" sullo standard input del processo
// il processo recupera i dati che gli mandiamo e li elabora
var stdin = process.openStdin();
// stdin sta in ascolto per l'evento "data" e, quando arriva,
// prende il contenuto nel valore "d" passato alla funzione di callback
stdin.addListener("data", function(d) {
		var command = d.toString().trim();
		if (command === "exit" || command === "quit") process.exit();
    l.go(command);
  });
  
var express = require('express');
var app = express();

var CircularJSON = require('circular-json');
var util = require('util');

app.get('/', function(request, response) {
    response.status(200).json(util.inspect(l));
  });
app.get('/rooms', function(request, response) {
    response.status(200).json(util.inspect(l.rooms));
  });
app.get('/rooms/:id', function(request, response) {
    console.log(request.params.id);
    response.status(200).json(util.inspect(l.rooms.filter(function(element) {return element.id == request.params.id})[0]));
  });

app.listen(3000);
