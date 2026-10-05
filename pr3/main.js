const $btnKick = document.getElementById('btn-kick');
const $btnSpecial = document.getElementById('btn-special');
const $logo = document.querySelector('.logo');
const $log = document.getElementById('log');

// Герой
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
};

// Суперник
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
};

// Випадкове число від 1 до num
function random(num) {
    return Math.ceil(Math.random() * num);
}

// Підпис з кількістю життя
function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

// Ширина та колір прогресбару
function renderProgressbarHP(person) {
    const percent = person.damageHP / person.defaultHP * 100;

    person.elProgressbar.style.width = percent + '%';
    person.elProgressbar.classList.toggle('low', percent <= 60 && percent > 20);
    person.elProgressbar.classList.toggle('critical', percent <= 20);
}

// Перемальовуємо підпис і прогресбар однією функцією
function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

// Наносимо удар: зменшуємо життя, але не нижче нуля
function changeHP(count, person) {
    person.damageHP = Math.max(person.damageHP - count, 0);
    renderHP(person);
    addLog(`${person.name} отримує ${count} шкоди (залишилось ${person.damageHP})`);
}

function addLog(text) {
    const $li = document.createElement('li');
    $li.innerText = text;
    $log.prepend($li);
}

function setButtonsDisabled(disabled) {
    $btnKick.disabled = disabled;
    $btnSpecial.disabled = disabled;
}

function checkGameOver() {
    if (character.damageHP > 0 && enemy.damageHP > 0) {
        return;
    }

    setButtonsDisabled(true);

    let message;
    if (character.damageHP === 0 && enemy.damageHP === 0) {
        message = 'Нічия! Обидва покемони без сил.';
    } else if (enemy.damageHP === 0) {
        message = `${character.name} переміг!`;
    } else {
        message = `${enemy.name} переміг!`;
    }

    addLog(message + ' Натисніть на логотип, щоб почати знову.');
    setTimeout(() => alert(message), 50);
}

// Раунд бою: обидва суперники отримують випадкову шкоду
function fight(maxDamageToEnemy, maxDamageToCharacter) {
    changeHP(random(maxDamageToEnemy), enemy);
    changeHP(random(maxDamageToCharacter), character);
    checkGameOver();
}

function resetGame() {
    character.damageHP = character.defaultHP;
    enemy.damageHP = enemy.defaultHP;
    renderHP(character);
    renderHP(enemy);
    $log.innerHTML = '';
    setButtonsDisabled(false);
}

// Thunder Jolt звичайна атака, обидва б'ють до 20
$btnKick.addEventListener('click', () => {
    fight(20, 20);
});

// Electro Ball б'є сильніше (до 35), але і у відповідь прилітає більше (до 25)
$btnSpecial.addEventListener('click', () => {
    fight(35, 25);
});

$logo.addEventListener('click', resetGame);

resetGame();
