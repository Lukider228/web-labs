import random from './utils.js';

const $logs = document.getElementById('logs');

export function generateLog({ name, damageHP, defaultHP }, { name: attackerName }, count) {
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

export const addLog = (text) => {
    const $p = document.createElement('p');
    $p.innerText = text;
    $logs.insertBefore($p, $logs.children[0]);
};

export const clearLogs = () => {
    $logs.innerHTML = '';
};
