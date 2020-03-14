export function vm$(target) {
    return document.querySelector(target);
}

export function vm$$(target) {
    return document.querySelectorAll(target);
}

export function classAdd(target, className) {
    target.classList.add(className);
}

export function classRemove(target, className) {
    target.classList.remove(className);
}