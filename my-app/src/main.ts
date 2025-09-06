import './styles.scss'

// --- ELEMENTEK ---
const menuIcon = document.querySelector('#menu-icon') as HTMLDivElement;
const navbar = document.querySelector('.navbar') as HTMLElement;
const overlay = document.getElementById('overlay') as HTMLElement;
const scrollTopBtn = document.getElementById('scroll-to-top-arrow') as HTMLButtonElement;
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

// --- FUNKCIÓK ---
const showOverlay = () => {
    overlay.style.visibility = 'visible';
    overlay.classList.add('active');
};

const hideOverlay = () => {
    overlay.classList.remove('active');

    const handler = () => {
        if (!overlay.classList.contains('active')) {
            overlay.style.visibility = 'hidden';
        }
        overlay.removeEventListener('transitionend', handler);
    };

    overlay.addEventListener('transitionend', handler);
};

const closeMenu = () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
    hideOverlay();
};

// --- MENÜ TOGGLE ---
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

    if (navbar.classList.contains('active')) {
        showOverlay();
    } else {
        hideOverlay();
    }
};

// --- OVERLAY KATTINTÁS ---
overlay.addEventListener('click', closeMenu);

// --- SCROLL TO TOP ---
scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// --- SCROLL ANIMÁCIÓ ÉS NAVLINK AKTIVÁLÁS ---
window.addEventListener('scroll', () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`header nav a[href*="${id}"]`)?.classList.add('active');

            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // sticky header
    const header = document.querySelector('header');
    header?.classList.toggle('sticky', top > 100);

    // scrollnál bezárja a menüt, ha nyitva van
    if (navbar.classList.contains('active')) {
        closeMenu();
    }
});
