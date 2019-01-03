// https://www.codingame.com/ide/puzzle/bank-robbers

const R = parseInt(readline());
const V = parseInt(readline());

var vaultTimes = [];
var vaultWork = [];

for (let i = 0; i < V; i++) {
    var inputs = readline().split(' ');
    const C = parseInt(inputs[0]);
    const N = parseInt(inputs[1]);
    
    let vowelCount = C - N;
    
    let numberCombinaison = 0;
    let vowelCombination = 0;
    if (N > 0) {
        numberCombinaison = Math.pow(10, N);
    }
    if (vowelCount > 0) {
        vowelCombination = Math.pow(5, vowelCount);
    }
    if (numberCombinaison && vowelCombination) {
        vaultTimes[i] = numberCombinaison * vowelCombination;
    } else {
        vaultTimes[i] = numberCombinaison + vowelCombination;
    }
    vaultWork[i] = -1;
}

vaultTimes = vaultTimes.filter((val)=>{
    return val > 0;
});


printErr(JSON.stringify(vaultTimes));

let completedVault = 0;
let time = 0;
let availableRobber = R;

while (completedVault != V) {
    for (var i = 0; i < vaultWork.length; i++) {
        if (vaultWork[i] != -1) {
            vaultWork[i] = vaultWork[i] + 1;
            
            if (vaultWork[i] == vaultTimes[i]) {
                availableRobber++;
                completedVault++;
            }
        } else if (vaultWork[i] == -1) {
            if (availableRobber) {
                vaultWork[i] = 0;
                availableRobber--;
            }
        }
    }
    time++;
}


// Write an action using print()
// To debug: printErr('Debug messages...');

print(time-1);