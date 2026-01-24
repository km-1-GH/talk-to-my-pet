const root = document.getElementById('menu')
export const teachButton = document.getElementById('teachButton')
export const talkButton = document.getElementById('talkButton')

export function open() {
    root.hidden = false;
}

export function close() {
    root.hidden = true;
}
