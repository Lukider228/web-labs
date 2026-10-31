// ПР 3_6 Робота з масивами
import Pokemon from './pokemon.js';
import { random, countBtn } from './utils.js';
import { generateLog, addLog, clearLogs } from './logs.js';
import { pokemons } from './pokemons.js';

const $control = document.querySelector('.control');
const $logo = document.querySelector('.logo');

let player1;
let player2;
let enemyAttacks;

const getRandomPokemon = (exceptName) => {
    const list = pokemons.filter(item => item.name !== exceptName);
    return list[random(list.length - 1)];
};

const removeButtons = () => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.remove());
};

const setButtonsDisabled = (disabled) => {
    const allButtons = document.querySelectorAll('.control .button');
    allButtons.forEach($item => $item.disabled = disabled);
};

const attackLog = (defender, attacker) => (count) => {
    const log = generateLog(defender, attacker, count);
    console.log(log);
    addLog(log);
};

const enemyAttack = () => {
    const attack = enemyAttacks.find(item => item.count > 0);
    attack.count--;
    console.log(`${player2.name} б'є: ${attack.name}`);
    player1.changeHP(random(attack.maxDamage, attack.minDamage), attackLog(player1, player2));
};

const checkGameOver = () => {
    if (player1.isAlive() && player2.isAlive()) {
        return;
    }

    setButtonsDisabled(true);

    const message = player1.isAlive() ? `${player1.name} переміг!` : `${player2.name} переміг!`;
    addLog(message + ' Натисніть на логотип, щоб почати знову.');
    setTimeout(() => alert(message), 50);
};

const startGame = () => {
    const pokemon1 = getRandomPokemon();
    const pokemon2 = getRandomPokemon(pokemon1.name);

    player1 = new Pokemon({
        ...pokemon1,
        selectors: 'player1',
    });
    player2 = new Pokemon({
        ...pokemon2,
        selectors: 'player2',
    });
    console.log(player1, player2);

    enemyAttacks = player2.attacks.map(item => ({ ...item, count: item.maxCount }));

    clearLogs();
    removeButtons();

    player1.attacks.forEach(item => {
        const $btn = document.createElement('button');
        $btn.classList.add('button');
        $btn.innerText = item.name;
        const btnCount = countBtn(item.maxCount, $btn);
        $btn.addEventListener('click', () => {
            console.log('Click button ', $btn.innerText);
            btnCount();
            player2.changeHP(random(item.maxDamage, item.minDamage), attackLog(player2, player1));
            if (player2.isAlive()) {
                enemyAttack();
            }
            checkGameOver();
        });
        $control.appendChild($btn);
    });
};

$logo.addEventListener('click', startGame);

startGame();
