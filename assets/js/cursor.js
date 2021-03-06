'use strict';

const cursor = () => {
    if (Modernizr.touchevents) return;

    const follow = (obj, x, y, t) => {
        gsap.to(obj, {
            duration: t,
            ease: 'power4.out',
            x: x,
            y: y,
        });
    }

    const fade = (obj) => {
        const _tween = gsap.fromTo(obj, {
            autoAlpha: 0
        }, {
            ease: 'linear.none',
            autoAlpha: 1,
        }).pause();

        const fadeIn = dur => {
            gsap.to(_tween, {
                ease: 'power4.out'
            });
            _tween.duration(dur).play();
        }

        const fadeOut = dur => {
            gsap.to(_tween, {
                ease: 'power4.in'
            });
            _tween.duration(dur).reverse();
        }

        return {
            fadeIn,
            fadeOut
        }
    }

    const tracking = (obj, duration, fading) => {
        if (!exists(obj)) return;
        const fadeObj = fade(obj);

        document.addEventListener('mousemove', e => requestAnimationFrame(() => {
            follow(obj, e.clientX, e.clientY, duration);
        }));

        document.addEventListener('mouseover', e => {
            if (fading) fadeObj.fadeIn(0.3);
            follow(obj, e.clientX, e.clientY, 0);
        });

        document.addEventListener('mouseout', () => {
            if (fading) fadeObj.fadeOut(1);
        });
    }

    // hover states
    // ------------------------------------------------
    const sizing = (obj, size) => {
        gsap.to(obj, {
            duration: 0.5,
            ease: 'power4.out',
            width: size,
            height: size,
            top: -size / 2,
            left: -size / 2,
        });
    }

    const hover = (obj, size) => {
        if (!exists(obj)) return;
        const initSize = ß(obj).map((el) => el.offsetWidth);
        const hover = 'a, button, input';

        ß(hover).map((el) => {
            el.addEventListener('mouseenter', () => sizing(obj, size));
            el.addEventListener('mouseleave', () => sizing(obj, initSize));
        });
    }

    // execution
    // ------------------------------------------------
    tracking('#js-cursor', 0.7, 'fading');
    hover('#js-cursor', 100);
}

document.addEventListener('DOMContentLoaded', () => cursor());