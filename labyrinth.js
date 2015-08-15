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

function Room(north, west, south, east) {
  this.id = Room.prototype.getUniqueId();
  this.treasures = [];
  this.north = north;
  this.west = west;
  this.south = south;
  this.east = east;
  
  this.description = "";
}

function Door(front, back, open) {
  this.front = front;
  this.back = back;
  
  this.open = open;
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
  
  
// var express = require('express');
// var CircularJSON = require('circular-json');
// var app = express();

// app.get('/', function(request, response) {
  //console.log(room1);
// });

// app.listen(3000);
