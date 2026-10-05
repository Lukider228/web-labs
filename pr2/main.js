// Завдання 1

const firstRow = 'Slow and steady wins the race';
const secondRow = 'You can say that again';

// Підрахунок кількості заданої літери в рядку (без урахування регістру)
function countLetter(row, letter) {
    let count = 0;
    const target = letter.toLowerCase();

    for (let i = 0; i < row.length; i++) {
        if (row.charAt(i).toLowerCase() === target) {
            count++;
        }
    }

    return count;
}

// Повертає рядок, у якому більше літер (за замовчуванням "a")
function getRow(firstRow, secondRow, letter = 'a') {
    const firstCount = countLetter(firstRow, letter);
    const secondCount = countLetter(secondRow, letter);

    if (firstCount === secondCount) {
        return `Кількість літер "${letter}" однакова (${firstCount})`;
    }

    return firstCount > secondCount ? firstRow : secondRow;
}

console.log(getRow(firstRow, secondRow)); // 'You can say that again'
document.getElementById('row-result').textContent = getRow(firstRow, secondRow);

// Завдання під * (можна ввести будь-яку літеру)
document.getElementById('btn-letters').addEventListener('click', () => {
    const letter = prompt('Введіть літеру для підрахунку:', 'a');

    if (letter === null) {
        return;
    }

    if (letter.length !== 1) {
        alert('Потрібно ввести рівно один символ!');
        return;
    }

    const first = prompt('Введіть перший рядок:', firstRow);
    if (first === null) return;

    const second = prompt('Введіть другий рядок:', secondRow);
    if (second === null) return;

    alert(
        `Літера "${letter}":\n` +
        `у першому рядку: ${countLetter(first, letter)}\n` +
        `у другому рядку: ${countLetter(second, letter)}\n\n` +
        `Результат: ${getRow(first, second, letter)}`
    );
});


// Завдання 2

// Приймає телефон у форматах +380XXXXXXXXX, 80XXXXXXXXX, 0XXXXXXXXX
// і повертає його у вигляді +38 (0XX) XXX-XX-XX
function formattedPhone(phone) {
    const digits = String(phone).replace(/[\s()-]/g, '');
    let local; // 10 цифр, що починаються з 0

    if (/^\+380\d{9}$/.test(digits)) {
        local = digits.slice(3);
    } else if (/^\+?80\d{9}$/.test(digits)) {
        local = digits.slice(digits.length - 10);
    } else if (/^0\d{9}$/.test(digits)) {
        local = digits;
    } else {
        return 'Неправильний формат номера телефону';
    }

    const code = local.slice(0, 3);
    const part1 = local.slice(3, 6);
    const part2 = local.slice(6, 8);
    const part3 = local.slice(8, 10);

    return `+38 (${code}) ${part1}-${part2}-${part3}`;
}

const phones = ['+380664567890', '+80664567890', '80971234567', '0671234567', '12345'];
const phoneList = document.getElementById('phone-results');

phones.forEach((phone) => {
    const result = formattedPhone(phone);
    console.log(phone, '->', result);

    const li = document.createElement('li');
    li.innerHTML = `<code>${phone}</code> -> <span class="result">${result}</span>`;
    phoneList.appendChild(li);
});

// Завдання під * (введення номера через prompt)
document.getElementById('btn-phone').addEventListener('click', () => {
    const phone = prompt('Введіть номер телефону (напр. 0671234567):');

    if (phone === null) {
        return;
    }

    alert(formattedPhone(phone));
});
