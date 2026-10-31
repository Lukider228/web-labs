export const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min;

export const countBtn = (count = 6, $btn) => {
    const name = $btn.innerText;
    $btn.innerText = `${name} (${count})`;

    return () => {
        count--;
        console.log(`${name}: залишилось ${count}`);
        $btn.innerText = `${name} (${count})`;
        if (count <= 0) {
            $btn.disabled = true;
        }
        return count;
    };
};
