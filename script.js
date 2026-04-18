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
    { s: "💎", w: 2 } // Шанс выпадения джекпота
];

// Функция случайного выбора символа с весами
function getSymbol() {
    let pool = [];
    symbols.forEach(sym => {
        for (let i = 0; i < sym.w; i++) pool.push(sym.s);
    });
    return pool[Math.floor(Math.random() * pool.length)];
}

// Обновление экрана
function render() {
    document.getElementById("balance").innerText = balance;
}

// Основная функция спина
function spin() {
    if (balance < 50) {
        show("NO MONEY");
        tg.HapticFeedback.notificationOccurred('error');
        return;
    }

    balance -= 50;
    render();
    
    // Вибрация при нажатии
    tg.HapticFeedback.impactOccurred('medium');

    // Генерируем символы
    let r1 = getSymbol();
    let r2 = getSymbol();
    let r3 = getSymbol();

    // Отрисовываем результат
    document.getElementById("r1").innerHTML = `<div class='symbol'>${r1}</div>`;
    document.getElementById("r2").innerHTML = `<div class='symbol'>${r2}</div>`;
    document.getElementById("r3").innerHTML = `<div class='symbol'>${r3}</div>`;

    // Проверка победы
    if (r1 === r2 && r2 === r3) {
        let winAmount = 500;
        if (r1 === "💎") winAmount = 5000;

        balance += winAmount;
        show("WIN +" + winAmount);
        
        // Эффект победы
        tg.HapticFeedback.notificationOccurred('success');
        explode();
    } else {
        show("TRY AGAIN");
    }
    
    render();
}

function show(t) {
    document.getElementById("win").innerText = t;
}

// Простой эффект вспышки при выигрыше
function explode() {
    document.body.style.background = "#ff00ff44";
    setTimeout(() => {
        document.body.style.background = "#05010a";
    }, 300);
}

// Бонусная кнопка
function daily() {
    balance += 300;
    tg.HapticFeedback.notificationOccurred('success');
    render();
    show("DAILY +300");
}

// Первый запуск
render();
