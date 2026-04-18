const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();
tg.setBackgroundColor('#0a0a0f');

let balance = 2500;
let combo = 0;
let level = 1;

const symbols = ['🍒','🍉','🍋','⭐','7️⃣','🔥','⚡'];

function initReels() {
    document.querySelectorAll('.reel-inner').forEach(reel => {
        let html = '';
        for (let i = 0; i < 25; i++) {
            html += `<div class="symbol">${symbols[Math.floor(Math.random()*symbols.length)]}</div>`;
        }
        reel.innerHTML = html;
    });
}

function spin() {
    const cost = 100;
    if (balance < cost) {
        showWin("Недостаточно монет!", "#ff0066");
        return;
    }

    balance -= cost;
    updateBalance();

    // Анимация спина (упрощённая, но эффектная)
    document.querySelectorAll('.reel-inner').forEach((reel, i) => {
        const delay = i * 300;
        reel.style.transition = `transform ${2.2 + i*0.4}s cubic-bezier(0.25, 0.1, 0.25, 1)`;
        reel.style.transform = `translateY(-${1500 + Math.random()*600}px)`;
    });

    setTimeout(() => {
        // Финальные символы
        const res = [symbols[Math.floor(Math.random()*symbols.length)], 
                     symbols[Math.floor(Math.random()*symbols.length)], 
                     symbols[Math.floor(Math.random()*symbols.length)]];

        document.getElementById('reel1').innerHTML = `<div class="symbol" style="font-size:62px">${res[0]}</div>`;
        document.getElementById('reel2').innerHTML = `<div class="symbol" style="font-size:62px">${res[1]}</div>`;
        document.getElementById('reel3').innerHTML = `<div class="symbol" style="font-size:62px">${res[2]}</div>`;

        if (res[0] === res[1] && res[1] === res[2]) {
            const win = cost * 15;
            balance += win;
            combo++;
            showWin(`JACKPOT! +${win}`, "#ffff00");
            tg.HapticFeedback.impactOccurred("heavy");
        } else {
            combo = Math.max(0, combo - 1);
            showWin("Попробуй ещё раз", "#888");
        }
        updateBalance();
    }, 2800);
}

function showWin(text, color) {
    const msg = document.getElementById('win-message');
    msg.textContent = text;
    msg.style.color = color;
    setTimeout(() => msg.textContent = '', 3000);
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('combo').textContent = combo;
}

// Telegram Stars покупка
document.getElementById('buy-btn').addEventListener('click', () => {
    tg.openInvoice({
        title: "Neon Pack",
        description: "5000 монет + бонус",
        payload: "neon_pack_5000",
        currency: "XTR",
        prices: [{label: "5000 монет", amount: 350}]
    });
});

tg.onEvent('invoiceClosed', (e) => {
    if (e.status === 'paid') {
        balance += 5000;
        updateBalance();
        showWin("Покупка прошла! +5000", "#00ff9d");
    }
});

document.getElementById('spin-btn').addEventListener('click', spin);
document.getElementById('reward-btn').addEventListener('click', () => {
    // Здесь позже подключишь реальную рекламу
    showWin("Смотрим рекламу...", "#00ffff");
    setTimeout(() => {
        balance += 250;
        updateBalance();
        showWin("+250 монет за просмотр!", "#00ff9d");
    }, 1200);
});

// Запуск
initReels();
updateBalance();
document.getElementById('user-info').innerHTML = `Привет, ${tg.initDataUnsafe.user?.first_name || 'Neon Hunter'}!`;

console.log('%cNEON SPIN — трендовый Telegram Mini App 2026 готов!', 'color:#00ff9d; font-size:16px');
