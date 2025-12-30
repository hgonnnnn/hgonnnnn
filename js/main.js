$(function () {
    /* 스크롤 시 부드럽게 */
    const lenis = new Lenis({
        duration: 1.2,   // 스크롤 속도
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    })
    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    /* aos */
    AOS.init();

    /* 메인비주얼 마우스 효과 */
    const visual = document.querySelector('.visual');
    const objs = {
        left: document.querySelector('.object .left'),
        center: document.querySelector('.object .center'),
        right: document.querySelector('.object .right'),
    };
    visual.addEventListener('mousemove', (e) => {
        const { innerWidth, innerHeight } = window;

        const x = (e.clientX / innerWidth) - 0.5;
        const y = (e.clientY / innerHeight) - 0.5;

        objs.left.style.transform =
            `translate3d(${x * 60}px, ${y * 40}px, 0)`;

        objs.center.style.transform =
            `translateX(50%) translate3d(${x * 30}px, ${y * 20}px, 0)`;

        objs.right.style.transform =
            `translate3d(${x * -50}px, ${y * 35}px, 0)`;
    });

    /* 텍스트 타이핑 효과 */
const el = document.querySelector('.typing-sub');

/* PC / 모바일 텍스트 분리 */
const textPC = `보는 순간 느껴지고, <br>쓰는 순간 이해되는 디자인.`;
const textMO = `보는 순간 느껴지고, <br>쓰는 순간 이해되는 <br>디자인.`;

let items = [];
let index = 0;

let typingSpeed = 70;
const startDelay = 700;

/* 반응형 텍스트 선택 */
function getTypingText() {
    return window.innerWidth <= 400 ? textMO : textPC;
}

function setup() {
    el.innerHTML = '';
    items = [];
    index = 0;

    /* 모바일에서는 살짝 빠르게 */
    typingSpeed = window.innerWidth <= 400 ? 55 : 70;

    const originalHTML = getTypingText();

    originalHTML.split(/(<br\s*\/?>)/gi).forEach(part => {
        if (part.match(/<br/i)) {
            const br = document.createElement('br');
            br.style.display = 'none';
            el.appendChild(br);
            items.push(br);
        } else {
            [...part].forEach(char => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                el.appendChild(span);
                items.push(span);
            });
        }
    });
}

function typeOnce() {
    if (index < items.length) {
        const item = items[index];

        if (item.tagName === 'BR') {
            item.style.display = 'block';
            index++;
            typeOnce(); // 줄바꿈은 딜레이 없이
        } else {
            item.classList.add('show');
            index++;
            setTimeout(typeOnce, typingSpeed);
        }
    } else {
        // 타이핑 종료 → 커서 표시
        el.classList.add('cursor-on');
    }
}

/* 초기 실행 */
setup();
setTimeout(typeOnce, startDelay);

/* 리사이즈 대응 (PC ↔ 모바일 전환 시 재실행) */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        el.classList.remove('cursor-on');
        setup();
        setTimeout(typeOnce, startDelay);
    }, 300);
});


    /* gsap 스크롤 이벤트 */
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".sec02",
            start: "top top",
            end: "+=150%",
            scrub: true,
            pin: true,
            anticipatePin: 1,
            // markers: true
        }
    });

    /* 이미지 확대 + 블러 제거 */
    tl.to(".sec02 .bg01", {
        width: "120vw",
        height: "120vh",
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power2.out"
    }, 0)

        /* big_txt 자연스럽게 사라짐 */
        .to(".sec02 .big_txt", {
            opacity: 0,
            y: -50,
            duration: 0.6,
            ease: "power2.out"
        }, 0.2)

        /* scroll_box 등장 */
        .to(".sec02 .scroll_box p", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, 0.6)

        .to(".sec02 .scroll_box span", {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
        }, 0.8);

    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({
        scrollTrigger: {
            trigger: ".sec03",
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            // markers: true
        }
    })
        .to(".sec03 .img_wrap .top", {
            x: 900,
            ease: "none"
        }, 0)
        .to(".sec03 .img_wrap .btm", {
            x: -900,
            ease: "none"
        }, 0);
        ScrollTrigger.refresh();
});