// ПР 3_3 Робота з DOM, деструктуризація, лог бою
(function () {
    const $btnKick = document.getElementById('btn-kick');
    const $btnSpecial = document.getElementById('btn-special');
    const $logo = document.querySelector('.logo');
    const $logs = document.getElementById('logs');

    function renderHPLife() {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = damageHP + ' / ' + defaultHP;
    }

    function renderProgressbarHP() {
        const { elProgressbar, damageHP, defaultHP } = this;
        const percent = damageHP / defaultHP * 100;

        elProgressbar.style.width = percent + '%';
        elProgressbar.classList.toggle('low', percent <= 60 && percent > 20);
        elProgressbar.classList.toggle('critical', percent <= 20);
    }

    function renderHP() {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    function changeHP(count, attacker) {
        this.damageHP = Math.max(this.damageHP - count, 0);
        this.renderHP();
        addLog(generateLog(this, attacker, count));
    }

    function reset() {
        this.damageHP = this.defaultHP;
        this.renderHP();
    }

    function isAlive() {
        return this.damageHP > 0;
    }

    const methods = { renderHPLife, renderProgressbarHP, renderHP, changeHP, reset, isAlive };

    const character = {
        name: 'Pikachu',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-character'),
        elProgressbar: document.getElementById('progressbar-character'),
        ...methods,
    };

    const enemy = {
        name: 'Charmander',
        defaultHP: 100,
        damageHP: 100,
        elHP: document.getElementById('health-enemy'),
        elProgressbar: document.getElementById('progressbar-enemy'),
        ...methods,
    };

    const random = function (num) {
        return Math.ceil(Math.random() * num);
    };

    function generateLog({ name, damageHP, defaultHP }, { name: attackerName }, count) {
        const logs = [
            `${name} згадав щось важливе, але несподівано ${attackerName}, не тямлячи себе від переляку, вдарив у передпліччя ворога.`,
            `${name} поперхнувся, і за це ${attackerName} з переляку наніс прямий удар коліном у лоб ворога.`,
            `${name} забувся, але в цей час нахабний ${attackerName}, прийнявши вольове рішення, нечутно підійшовши ззаду, вдарив.`,
            `${name} прийшов до тями, але несподівано ${attackerName} випадково наніс найпотужніший удар.`,
            `${name} поперхнувся, але в цей час ${attackerName} неохоче роздробив кулаком <вирізано цензурою> противника.`,
            `${name} здивувався, а ${attackerName}, похитнувшись, вліпив підлий удар.`,
            `${name} висякався, але несподівано ${attackerName} провів дроблячий удар.`,
            `${name} похитнувся, і раптом нахабний ${attackerName} без причини вдарив у ногу противника.`,
            `${name} засмутився, як раптом несподівано ${attackerName} випадково вліпив стопою в живіт суперника.`,
            `${name} намагався щось сказати, але раптом несподівано ${attackerName} від нудьги розбив брову супернику.`,
        ];
        const text = logs[random(logs.length) - 1];

        return `${text} -${count} [${damageHP}/${defaultHP}]`;
    }

    function addLog(text) {
        const $p = document.createElement('p');
        $p.innerText = text;
        $logs.insertBefore($p, $logs.children[0]);
    }

    function setButtonsDisabled(disabled) {
        [$btnKick.disabled, $btnSpecial.disabled] = [disabled, disabled];
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

    function fight({ toEnemy, toCharacter }) {
        enemy.changeHP(random(toEnemy), character);
        character.changeHP(random(toCharacter), enemy);
        checkGameOver();
    }

    function resetGame() {
        character.reset();
        enemy.reset();
        $logs.innerHTML = '';
        setButtonsDisabled(false);
    }

    const attacks = {
        kick: { toEnemy: 20, toCharacter: 20 },
        special: { toEnemy: 35, toCharacter: 25 },
    };
    const { kick, special } = attacks;

    $btnKick.addEventListener('click', () => fight(kick));
    $btnSpecial.addEventListener('click', () => fight(special));
    $logo.addEventListener('click', resetGame);

    resetGame();
})();
