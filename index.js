var Benchmark = require('benchmark');

var suite = new Benchmark.Suite;

var size = 10000;
var uint8 = new Uint8Array(size);
for(var i=0;i<size;i++){
    uint8[i] = random('a'.charCodeAt(0), 'z'.charCodeAt(0));
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// add tests
suite
    .add('for', function() {
        var counter = '';
        for(var i=0;i<size;i++) counter += String.fromCharCode(uint8[i]);
        //console.log('for: ' + counter);
    })
    .add('map', function() {
        var counter = uint8.map(c => String.fromCharCode(c)).join('');
        //console.log('map: ' + counter);
    })
// add listeners
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
// run async
    .run({ 'async': true });
