
var inputs = readline().split(' ');
const W = parseInt(inputs[0]);
const H = parseInt(inputs[1]);

var start = []
var result={};
var end = [];
var endKey = {};

var pipes = [];

for (let i = 0; i < H; i++) {
    if (i === 0) {
        // Lane starts
        start = readline().split('  ')
        
    } else if (i < H - 1) {
        pipes[i-1] = [];
        item = readline().split('|')
        
        for (var f = 1; f <= item.length; f++) {
            if (item[f] == "--") {
                pipes[i-1].push([f-1, f])
            }
        }
    } else {
        // Line ends
        end = readline().split('  ')
    }
}


for (var st = 0; st < start.length; st++) {
    pos = st;
    for (var pi = 0; pi < pipes.length;pi++) {
        levels = pipes[pi]
        
        for (var vi = 0; vi < levels.length;vi++) {
            cur = levels[vi];
        
            if (cur[0] == pos) {
                pos = cur[1];
                break;
            } else if (cur[1] == pos) {
                pos = cur[0];
                break;
            }
        }
    }
    print(start[st] + end[pos])
}
