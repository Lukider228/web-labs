// ПР 3_2 Області видимості
// весь код в IIFE, щоб змінні не попадали в глобальну область (window)
(function () {
    const $btnKick = document.getElementById('btn-kick');
    const $btnSpecial = document.getElementById('btn-special');
    const $logo = document.querySelector('.logo');
    const $log = document.getElementById('log');

    // методи спільні для character і enemy
    // this це той об'єкт, який викликав метод (character.renderHP() -> this = character)

    function renderHPLife() {
        this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
    }

    function renderProgressbarHP() {
        const percent = this.damageHP / this.defaultHP * 100;

        this.elProgressbar.style.width = percent + '%';
        this.elProgressbar.classList.toggle('low', percent <= 60 && percent > 20);
        this.elProgressbar.classList.toggle('critical', percent <= 20);
    }

    function renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    function changeHP(count) {
        this.damageHP = Math.max(this.damageHP - count, 0);
        this.renderHP();
        addLog(`${this.name} отримує ${count} шкоди (залишилось ${this.damageHP})`);
    }

    function reset() {
        this.damageHP = this.defaultHP;
        this.renderHP();
    }

    function isAlive() {
        return this.damageHP > 0;
    }

    // об'єкти

    const character = {
        name: 'Pikachu',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-character'),
        elProgressbar: document.getElementById('progressbar-character'),
        renderHPLife,
        renderProgressbarHP,
        renderHP,
        changeHP,
        reset,
        isAlive,
    };

    const enemy = {
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy'),
        elProgressbar: document.getElementById('progressbar-enemy'),
        renderHPLife,
        renderProgressbarHP,
        renderHP,
        changeHP,
        reset,
        isAlive,
    };

    // допоміжні функції

    // Function Expression, створюється тільки коли до неї дійде код
    const random = function (num) {
        return Math.ceil(Math.random() * num);
    };

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
        if (character.isAlive() && enemy.isAlive()) {
            return;
        }

        setButtonsDisabled(true);

        let message;
        if (!character.isAlive() && !enemy.isAlive()) {
            message = 'Нічия! Обидва покемони без сил.';
        } else if (!enemy.isAlive()) {
            message = `${character.name} переміг!`;
        } else {
            message = `${enemy.name} переміг!`;
        }

        addLog(message + ' Натисніть на логотип, щоб почати знову.');
        setTimeout(() => alert(message), 50);
    }

    // Раунд бою: обидва суперники отримують випадкову шкоду
    function fight(maxDamageToEnemy, maxDamageToCharacter) {
        enemy.changeHP(random(maxDamageToEnemy));
        character.changeHP(random(maxDamageToCharacter));
        checkGameOver();
    }

    function resetGame() {
        character.reset();
        enemy.reset();
        $log.innerHTML = '';
        setButtonsDisabled(false);
    }

    // Thunder Jolt звичайна атака, обидва б'ють до 20
    $btnKick.addEventListener('click', () => fight(20, 20));

    // Electro Ball б'є сильніше (до 35), але і у відповідь прилітає більше (до 25)
    $btnSpecial.addEventListener('click', () => fight(35, 25));

    $logo.addEventListener('click', resetGame);

    resetGame();
})();
