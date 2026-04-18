// Инициализация Telegram
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

let balance = 1000;

const symbols = [
    { s: "🍒", w: 40 },
    { s: "🍋", w: 30 },
    { s: "🍉", w: 20 },
    { s: "⭐", w: 8 },
    { s: "💎", w: 2 } // Джекпот
];

function getSymbol() {
    let pool = [];
    symbols.forEach(sym => {
        for (let i = 0; i < sym.w; i++) pool.push(sym.s);
    });
    return pool[Math.floor(Math.random() * pool.length)];
}

function render() {
    document.getElementById("balance").innerText = balance;
}

function spin() {
    if (balance < 50) {
        show("ACCESS DENIED: LOW BALANCE"); // Киберпанк-стиль сообщения
        tg.HapticFeedback.notificationOccurred('error');
        return;
    }

    balance -= 50;
    render();
    
    // Вибрация при нажатии
    tg.HapticFeedback.impactOccurred('medium');

    // Генерируем символы для 5 барабанов
    let r1 = getSymbol();
    let r2 = getSymbol();
    let r3 = getSymbol();
    let r4 = getSymbol(); // Новый
    let r5 = getSymbol(); // Новый

    // Отрисовываем результат
    document.getElementById("r1").innerHTML = `<div class='symbol'>${r1}</div>`;
    document.getElementById("r2").innerHTML = `<div class='symbol'>${r2}</div>`;
    document.getElementById("r3").innerHTML = `<div class='symbol'>${r3}</div>`;
    document.getElementById("r4").innerHTML = `<div class='symbol'>${r4}</div>`; // Новый
    document.getElementById("r5").innerHTML = `<div class='symbol'>${r5}</div>`; // Новый

    // Проверка победы (для 5 барабанов нужна более сложная логика в V2, пока простая тройка)
    if (r1 === r2 && r2 === r3) {
        let winAmount = 500;
        if (r1 === "💎") winAmount = 5000;

        balance += winAmount;
        show("SYSTEM OVERLOAD: WIN +" + winAmount);
        
        // Эффект победы
        tg.HapticFeedback.notificationOccurred('success');
        explode();
    } else {
        show("STANDBY...");
    }
    
    render();
}

function show(t) {
    document.getElementById("win-status").innerText = t;
}

// Простой эффект вспышки
function explode() {
    document.body.style.background = "#ff00ff22";
    setTimeout(() => {
        document.body.style.background = "#000";
    }, 300);
}

// (Daily пока не используем в интерфейсе, но оставим в коде)
function daily() {
    balance += 300;
    tg.HapticFeedback.notificationOccurred('success');
    render();
    show("DAILY ACCESS: +300");
}

render();
