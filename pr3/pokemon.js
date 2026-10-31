class Pokemon {
    constructor({ name, hp, selectors }) {
        this.name = name;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.elHP = document.getElementById(`health-${selectors}`);
        this.elProgressbar = document.getElementById(`progressbar-${selectors}`);

        this.renderHP();
    }

    renderHPLife = () => {
        const { elHP, damageHP, defaultHP } = this;
        elHP.innerText = damageHP + ' / ' + defaultHP;
    }

    renderProgressbarHP = () => {
        const { elProgressbar, damageHP, defaultHP } = this;
        const percent = damageHP / defaultHP * 100;

        elProgressbar.style.width = percent + '%';
        elProgressbar.classList.toggle('low', percent <= 60 && percent > 20);
        elProgressbar.classList.toggle('critical', percent <= 20);
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    changeHP = (count, cb) => {
        this.damageHP = Math.max(this.damageHP - count, 0);
        this.renderHP();
        cb && cb(count);
    }

    reset = () => {
        this.damageHP = this.defaultHP;
        this.renderHP();
    }

    isAlive = () => this.damageHP > 0;
}

export default Pokemon;
