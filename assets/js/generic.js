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

const checkLocalStorage = (value) => {
    if (localStorage.getItem(value)) return localStorage.getItem(value).trim();
}

const removeAllChilds = node => {
    while (node.firstChild) node.removeChild(node.firstChild);
}

const splitWords = (node) => {
    if (!exists(node)) return;
    ß(node).map((el) => el.style.visibility = 'visible');

    var tl = new TimelineMax,
        st = new SplitText(node, {
            type: 'words'
        }),
        chars = st.words;

    tl.staggerFrom(chars, 0.9, {
        opacity: 0,
        y: -15,
        autoCSS: true,
        ease: Back.easeOut,
    }, 0.03, '+=0');
}

const toggle = () => {
    const obj = '.js-toggle';
    if (!exists(obj)) return;
    ß(obj).map((el) => el.onclick = () => el.classList.toggle('is-active'));
}

const scrollToObject = () => {
    const obj = '.js-scroll-to';
    if (!exists(obj)) return;

    ß(obj).map((el) => el.onclick = () => {
        const target = el.getAttribute('href');
        if (!exists(target)) return;
        TweenMax.to(window, .8, {
            ease: Power3.easeInOut,
            scrollTo: {
                y: target,
                offsetY: offset,
                autoKill: false,
            }
        });
        return false;
    });
}

const input = () => {
    const input = document.querySelector('[data-type="input"]');

    input.addEventListener('keyup', () => {
        if (input.value === '0906') {
            TweenMax.fromTo('[data-type="overlay"]', 0.7, {
                opacity: 0.9,
                x: innerWidth,
                display: 'none'
            }, {
                ease: Power4.easeInOut,
                opacity: 1,
                x: 0,
                display: 'flex'
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    toggle();
    scrollToObject();
    input();
});


// body scroll lock object
// ------------------------------------------------------------
const bodyScroll = {
    body: document.querySelector('body'),
    main: document.querySelector('main'),
    scrollPos: 0,

    lock() {
        this.scrollPos = window.scrollY;
        this.body.style.position = 'fixed';
        this.body.style.top = -this.scrollPos + 'px';
        this.body.style.overflowY = 'hidden';
        this.body.style.width = '100%';
        this.body.style.backfaceVisibility = 'hidden';
    },
    unlock() {
        this.body.removeAttribute('style');
        this.main.removeAttribute('style');
        window.scrollTo({
            top: this.scrollPos,
        });
    }
}
Object.seal(bodyScroll);