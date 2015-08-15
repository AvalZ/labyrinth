// Labyrinth class
function Labyrinth(start) {
  this.rooms = [];
  this.doors = [];
  
  this.currentRoom = start;
  console.log(this.currentRoom);
}

Labyrinth.prototype.go = function(direction) {
  this.currentRoom = this.currentRoom[direction].visit();
};

function Room(north, west, south, east) {
  this.id = Room.prototype.getUniqueId();
  this.treasures = [ {'name': 'culo di gomma'}];
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

Room.prototype.printWest = function() { console.log(this.west); };
Room.prototype.id = 0;
Room.prototype.getUniqueId = function() { return Room.prototype.id++; };
Room.prototype.visit = function() {
  console.log(this.description);
  console.log("Direzioni possibili: ");
  console.log("north - " + this.north);
  console.log("west - " + this.west);
  console.log("south - " + this.south);
  console.log("east - " + this.east);
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
    l.go(d.toString().trim());
  });
  
  
// var express = require('express');
// var CircularJSON = require('circular-json');
// var app = express();

// app.get('/', function(request, response) {
  //console.log(room1);
// });

// app.listen(3000);