import './styles.scss'

// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon') as HTMLDivElement;
let navbar = document.querySelector('.navbar');

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navbar!.classList.toggle('active');

}


// scroll sections

// scroll to top button
let scrollTopBtn = document.getElementById('scroll-to-top-arrow') as HTMLButtonElement;

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*='+ id + ']')?.classList.add('active');
            });
            // active sections for animation on scroll //
            sec.classList.add('show-animate');
        }

        else {
            sec.classList.remove('show-animate');
        }

    })

    // sticky header
    let header = document.querySelector('header');

    header?.classList.toggle('sticky', window.scrollY > 100)

    // remove toggle icon and navbar when click navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar!.classList.remove('active');


}