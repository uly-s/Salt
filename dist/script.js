var term = new Terminal();
term.open(document.getElementById('terminal'));

var curr_line = '';
var entries = [];
var currPos = 0;
var pos = 0;	

term.on('key', (key, ev) => {
    console.log(key.charCodeAt(0));
    if (key.charCodeAt(0) == 13)
        term.write('\n');
    term.write(key);
});