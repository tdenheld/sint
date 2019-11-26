'use strict';

const ß = (node, element) => {
    const obj = element || document;
    const qs = obj.querySelectorAll(node);
    return Array.from(qs);
}

const exists = node => {
    return document.body.contains(document.querySelector(node));
}

const isHidden = node => {
    return window.getComputedStyle(node).display === 'none';
}

const valueInArray = (value, array) => {
    return array.includes(value);
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const input = () => {
    const input = document.querySelector('[data-type="input"]');
    const overlay = document.querySelector('[data-type="overlay"]');
    const delay = Modernizr.touchevents ? 0.3 : 0.1;

    input.addEventListener('keyup', () => {
        if (input.value === '0906') {
            input.blur();
            gsap.fromTo(overlay, {
                display: 'flex',
                x: '100vw',
            },{
                duration: 0.7,
                delay: delay,
                ease: 'power4.inOut',
                opacity: 1,
                x: 0,
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    input();
});