const tg = window.Telegram.WebApp;
tg.expand();

let balance = 1000;

const symbols = [
{ s:"🍒", w:40 },
{ s:"🍋", w:30 },
{ s:"🍉", w:20 },
{ s:"⭐", w:8 },
{ s:"💎", w:2 } // jackpot
];

// weighted RNG
function getSymbol(){
let pool = [];
symbols.forEach(sym=>{
for(let i=0;i<sym.w;i++) pool.push(sym.s);
});
return pool[Math.floor(Math.random()*pool.length)];
}

function render(){
document.getElementById("balance").innerText = balance;
}

function spin(){

if(balance < 50){
show("NO MONEY");
return;
}

balance -= 50;

let r1 = getSymbol();
let r2 = getSymbol();
let r3 = getSymbol();

document.getElementById("r1").innerHTML = `<div class='symbol'>${r1}</div>`;
document.getElementById("r2").innerHTML = `<div class='symbol'>${r2}</div>`;
document.getElementById("r3").innerHTML = `<div class='symbol'>${r3}</div>`;

// WIN LOGIC
if(r1===r2 && r2===r3){
let win = 500;

if(r1==="💎") win = 5000; // jackpot

balance += win;
show("WIN +" + win);
explode();
} else {
show("lose");
}

render();
}

function show(t){
document.getElementById("win").innerText = t;
}

// particles (simple version)
function explode(){
document.body.style.background = "#ff00ff22";
setTimeout(()=>document.body.style.background="#05010a",300);
}

function daily(){
balance += 300;
render();
show("DAILY +300");
}

render();
