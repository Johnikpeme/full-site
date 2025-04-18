// Get the app container
const app = document.getElementById('app');

// Helper function to create elements with styles and attributes
function createElement(tag, styles = {}, attributes = {}, children = []) {
    const element = document.createElement(tag);
    Object.assign(element.style, styles);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    return element;
}

// Apply styles dynamically
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
    }
    .news-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        padding: 20px;
    }
    .news-article {
        background-color: #ffffff;
        border-radius: 8px;
        padding: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
        width: calc(50% - 20px); /* Two articles per row */
        display: flex;
        flex-direction: column;
    }
    .news-article:hover {
        transform: scale(1.02);
    }
    .news-image {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }
    .news-title {
        font-size: 18px;
        font-weight: bold;
        margin: 10px 0;
    }
    .news-description {
        font-size: 14px;
        color: #555;
    }
    .copyright {
        text-align: center;
        padding: 20px;
        font-size: 14px;
        color: #333;
    }
    
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .news-article {
            width: 100%; /* One article per row */
        }
    }
`;
document.head.appendChild(styleSheet);

// Create loading screen
const loadingScreen = createElement('div', { 
    id: 'loading-screen',
    backgroundColor: '#FFFFFF',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '2000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
});
const loadingImage = createElement('img', {}, { src: 'assets/loading-animation.gif', alt: 'Loading...' });
loadingScreen.appendChild(loadingImage);
document.body.appendChild(loadingScreen);

// Hide app content initially
app.style.display = 'none';

// Function to wait for all images to load
function waitForImages() {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;
    const totalImages = images.length;

    if (totalImages === 0) {
        loadingScreen.classList.add('hidden');
        app.style.display = 'block';
        setTimeout(() => loadingScreen.remove(), 500);
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
            if (loadedCount === totalImages) {
                loadingScreen.classList.add('hidden');
                app.style.display = 'block';
                setTimeout(() => loadingScreen.remove(), 500);
            }
        } else {
            img.addEventListener('load', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    loadingScreen.classList.add('hidden');
                    app.style.display = 'block';
                    setTimeout(() => loadingScreen.remove(), 500);
                }
            });
            img.addEventListener('error', () => {
                loadedCount++;
                if (loadedCount === totalImages) {
                    loadingScreen.classList.add('hidden');
                    app.style.display = 'block';
                    setTimeout(() => loadingScreen.remove(), 500);
                }
            });
        }
    });
}

// Fade-in animation for sections on scroll
const fadeInOnScroll = (element) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
};

// Header (Sticky, Black Background)
const header = createElement('header', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2vh 3vw',
    backgroundColor: '#000000',
    borderBottom: '1px solid #333',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    zIndex: '1000'
});

const headerLeft = createElement('div', { display: 'flex', alignItems: 'center', gap: '2vw' });
const logo = createElement('div', { cursor: 'pointer' });
const logoLink = createElement('a', {}, { href: 'index.html' });
const logoIcon = createElement('img', {
    height: '5vh',
    width: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease'
}, { src: 'assets/logo.png', alt: 'Logo' });

logoLink.appendChild(logoIcon);
logo.appendChild(logoLink);

const nav = createElement('nav', {});
const navLinks = createElement('ul', { listStyle: 'none', display: 'flex', alignItems: 'center' });
navLinks.className = 'nav-links';
const navItems = ['WHO WE ARE', 'CAREERS', 'NEWS'].map(text => {
    const li = createElement('li', { margin: '0 1.5vw', display: 'inline-block' });
    const a = createElement('a', {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '2.2vh',
        paddingBottom: '0.5vh',
        display: 'inline-block',
        textTransform: 'uppercase',
        transition: 'border-bottom 0.3s ease, transform 0.3s ease, color 0.3s ease'
    }, { href: text === 'WHO WE ARE' ? 'who-we-are.html' : (text === 'CAREERS' ? 'careers.html' : 'news.html') }, [text]);

    a.addEventListener('mouseenter', () => {
        a.style.borderBottom = '0.3vh solid #FFFFFF';
        a.style.color = '#E0E0E0';
        a.style.animation = 'bounce 0.4s ease';
    });
    a.addEventListener('mouseleave', () => {
        a.style.borderBottom = 'none';
        a.style.color = '#FFFFFF';
    });

    li.appendChild(a);
    return li;
});
navLinks.append(...navItems);
nav.appendChild(navLinks);

headerLeft.append(logo, nav);

const headerRight = createElement('div', { display: 'flex', alignItems: 'center' });
// Get in Touch Button
const getInTouch = createElement('button', {
    backgroundColor: 'transparent',
    border: '1px solid #FFFFFF',
    color: '#FFFFFF',
    padding: '1vh 2vw',
    borderRadius: '2.5vh',
    cursor: 'pointer',
    fontSize: '2.2vh',
    display: 'flex',
    alignItems: 'center',
    marginRight: '2vw', // Default for desktop
    animation: 'pulse 2s infinite',
    transition: 'transform 0.3s ease, background-color 0.3s ease'
}, {}, [
    createElement('span', { marginRight: '0.5vw', fontSize: '1.4vh' }, {}, ['💬']),
    'Get in touch'
]);

// Add click handler for email functionality
getInTouch.addEventListener('click', () => {
    window.location.href = 'mailto:support@dashstudios.tech';
});

// Function to set responsive properties for Get in Touch button
function setGetInTouchStyles() {
    if (window.innerWidth <= 768) {
        // Mobile properties
        getInTouch.style.marginRight = '12vw';
        getInTouch.style.fontSize = '1.8vh'; // Slightly smaller for mobile
        getInTouch.style.padding = '1.5vh 3vw'; // Adjust padding for mobile
    } else {
        // Desktop properties
        getInTouch.style.marginRight = '2vw';
        getInTouch.style.fontSize = '2.2vh';
        getInTouch.style.padding = '1vh 2vw';
    }
}

// Initial setup
setGetInTouchStyles();

// Update on resize
window.addEventListener('resize', setGetInTouchStyles);

// Hover effects
getInTouch.addEventListener('mouseenter', () => {
    getInTouch.style.transform = 'scale(1.1)';
    getInTouch.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
});
getInTouch.addEventListener('mouseleave', () => {
    getInTouch.style.transform = 'scale(1)';
    getInTouch.style.backgroundColor = 'transparent';
});

// Hamburger Menu
const hamburger = createElement('div', {
    marginLeft: '-1vw' // Moves it slightly to the left
});
hamburger.className = 'hamburger';
const line1 = createElement('span', {});
const line2 = createElement('span', {});
const line3 = createElement('span', {});
hamburger.append(line1, line2, line3);
headerRight.append(getInTouch, hamburger);

header.append(headerLeft, headerRight);

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Open Roles Section (No Hero Picture)
const openRoles = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '100px 20px', // Increased padding to center it vertically
    textAlign: 'center',
    minHeight: '100vh', // Full height to fill the viewport
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const rolesTitle = createElement('h2', {
    fontSize: '48px', // Bigger than before (was 36px)
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '40px',
    textTransform: 'uppercase' // Makes it "OPEN ROLES"
}, {}, ['Open Roles']);

const noRolesMessage = createElement('p', {
    fontSize: '18px',
    color: '#FFFFFF',
    maxWidth: '600px',
    margin: '0 auto',
    lineHeight: '1.5'
}, {}, ['We don’t have any open roles at this time. Try again later.']);

openRoles.append(rolesTitle, noRolesMessage);
fadeInOnScroll(openRoles);

// Footer (Black Background)
const isMobile = window.innerWidth <= 768;

const footer = createElement('footer', {
    className: 'footer',
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'space-between',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    padding: '2vh 5vw',
    backgroundColor: '#000000',
    borderTop: '1px solid #333'
});

const footerLeft = createElement('div', { 
    className: 'footer-left',
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: isMobile ? '2vh' : '0'
});
const footerLogo = createElement('div', { cursor: 'pointer' });
const footerLogoLink = createElement('a', {}, { href: 'index.html' });
const footerLogoIcon = createElement('img', {
    height: '5vh',
    width: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease'
}, { src: 'assets/logo.png', alt: 'Logo' });

footerLogoLink.addEventListener('mouseenter', () => {
    footerLogoIcon.style.animation = 'spin 0.5s ease-in-out';
});

footerLogoLink.appendChild(footerLogoIcon);
footerLogo.appendChild(footerLogoLink);
footerLeft.appendChild(footerLogo);

const footerCenter = createElement('div', { 
    className: 'footer-center',
    textAlign: isMobile ? 'center' : 'center',
    marginBottom: isMobile ? '2vh' : '0'
});
const footerNav = createElement('ul', { 
    className: 'footer-nav',
    display: 'flex', 
    flexDirection: isMobile ? 'column' : 'row',
    listStyle: 'none', 
    gap: isMobile ? '1vh' : '2vw',
    padding: '0'
});

const footerLinks = [
    { text: 'TERMS OF SERVICE', href: 'terms.html' },
    { text: 'PRIVACY', href: 'privacy.html' }
].map(link => {
    const li = createElement('li', {});
    const a = createElement('a', {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '2.2vh',
        textTransform: 'uppercase',
        transition: 'color 0.3s ease, transform 0.3s ease'
    }, { href: link.href }, [link.text]);

    a.addEventListener('mouseenter', () => {
        a.style.color = '#E0E0E0';
        a.style.animation = 'bounce 0.4s ease';
    });
    a.addEventListener('mouseleave', () => {
        a.style.color = '#FFFFFF';
    });

    li.appendChild(a);
    return li;
});

footerNav.append(...footerLinks);
footerCenter.appendChild(footerNav);

const footerRight = createElement('div', { 
    className: 'footer-right', 
    textAlign: isMobile ? 'center' : 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-end'
});

const socialLinks = createElement('div', {
    className: 'social-links',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: 'center',
    gap: isMobile ? '1vh' : '1.5vw',
    marginBottom: '1vh'
});

const socialMedia = [
    { platform: 'X', src: 'twitter.png', href: 'https://x.com/DashStudiosInc/' },
    { platform: 'Instagram', src: 'instagram.png', href: 'https://www.instagram.com/dashstudios.tech/' },
    { platform: 'YouTube', src: 'youtube.png', href: 'https://www.youtube.com/channel/UCZuLS7Q8jemturg7B3FpxPg' },
    { platform: 'LinkedIn', src: 'linkedin.png', href: 'https://www.linkedin.com/company/dash-studios-inc/' }
].map(social => {
    const a = createElement('a', {
        display: 'inline-block',
        transition: 'transform 0.3s ease, filter 0.3s ease'
    }, { href: social.href, target: '_blank' });

    const img = createElement('img', {
        width: isMobile ? '5vw' : '2.4vw',
        height: isMobile ? '5vw' : '2.4vw',
        display: 'block',
        transition: 'transform 0.3s ease'
    }, { src: `assets/${social.src}`, alt: `${social.platform} Logo` });

    a.appendChild(img);

    a.addEventListener('mouseenter', () => {
        img.style.animation = 'wobble 0.5s ease';
        img.style.filter = 'brightness(1.2)';
    });
    a.addEventListener('mouseleave', () => {
        img.style.filter = 'brightness(1)';
    });

    return a;
});

socialLinks.append(...socialMedia);

const email = createElement('p', { 
    fontSize: '2vh', 
    margin: '0.5vh 0', 
    color: '#FFFFFF' 
}, {}, ['All Rights Reserved']);
const copyright = createElement('p', { 
    fontSize: '2vh', 
    margin: '0.5vh 0', 
    color: '#FFFFFF' 
}, {}, ['© 2025 Dash Studios Inc.']);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);
fadeInOnScroll(footer);

// Append all sections to the app container
app.append(header, openRoles, footer);

// Start checking for image loads after content is appended
waitForImages();