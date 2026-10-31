class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elName = document.getElementById(`name-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, img, selectors, attacks = [] }) {
        super(selectors);

        this.name = name;
        this.type = type;
        this.defaultHP = hp;
        this.damageHP = hp;
        this.attacks = attacks;

        this.elName.innerText = name;
        this.elImg.src = img;
        this.elImg.alt = name;

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

    isAlive = () => this.damageHP > 0;
}

export default Pokemon;
