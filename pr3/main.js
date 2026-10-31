// ПР 3_5 Модулі. Класи
import Pokemon from './pokemon.js';
import random from './utils.js';
import { generateLog, addLog, clearLogs } from './logs.js';

const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logo = document.querySelector('.logo');

const player1 = new Pokemon({
    name: 'Pikachu',
    hp: 100,
    selectors: 'character',
});

const player2 = new Pokemon({
    name: 'Charmander',
    hp: 100,
    selectors: 'enemy',
});

console.log(player1, player2);

const setButtonsDisabled = (disabled) => {
    [$btnKick.disabled, $btnSpecial.disabled] = [disabled, disabled];
};

const clickCounter = ($btn, limit = 6) => {
    const name = $btn.dataset.name || $btn.innerText;
    $btn.dataset.name = name;
    $btn.innerText = `${name} (${limit})`;
    let count = 0;

    return () => {
        count++;
        const left = limit - count;
        console.log(`${name}: натискань ${count}, залишилось ${left}`);
        $btn.innerText = `${name} (${left})`;
        if (left <= 0) {
            $btn.disabled = true;
        }
    };
};

let kickClick;
let specialClick;

const checkGameOver = () => {
    if (player1.isAlive() && player2.isAlive()) {
        return;
    }

    setButtonsDisabled(true);

    let message;
    if (!player1.isAlive() && !player2.isAlive()) {
        message = 'Нічия! Обидва покемони без сил.';
    } else if (!player2.isAlive()) {
        message = `${player1.name} переміг!`;
    } else {
        message = `${player2.name} переміг!`;
    }

    addLog(message + ' Натисніть на логотип, щоб почати знову.');
    setTimeout(() => alert(message), 50);
};

const fight = ({ toEnemy, toCharacter }) => {
    player2.changeHP(random(toEnemy), (count) => {
        const log = generateLog(player2, player1, count);
        console.log(log);
        addLog(log);
    });
    player1.changeHP(random(toCharacter), (count) => {
        const log = generateLog(player1, player2, count);
        console.log(log);
        addLog(log);
    });
    checkGameOver();
};

const resetGame = () => {
    player1.reset();
    player2.reset();
    clearLogs();
    setButtonsDisabled(false);
    kickClick = clickCounter($btnKick);
    specialClick = clickCounter($btnSpecial);
};

const attacks = {
    kick: { toEnemy: 20, toCharacter: 20 },
    special: { toEnemy: 35, toCharacter: 25 },
};
const { kick, special } = attacks;

$btnKick.addEventListener('click', () => {
    kickClick();
    fight(kick);
});
$btnSpecial.addEventListener('click', () => {
    specialClick();
    fight(special);
});
$logo.addEventListener('click', resetGame);

resetGame();
