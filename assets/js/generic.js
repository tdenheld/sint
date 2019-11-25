'use strict';

const input = () => {
    const input = document.querySelector('[data-type="input"]');
    const overlay = document.querySelector('[data-type="overlay"]');

    input.addEventListener('keyup', () => {
        if (input.value === '0906') {
            input.blur();
            overlay.style.transform = 'translateX(100vw)';
            overlay.style.display = 'flex';

            gsap.to(overlay, {
                duration: 0.7,
                delay: 0.3,
                ease: 'power4.inOut',
                opacity: 1,
                x: 0
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    input();
});