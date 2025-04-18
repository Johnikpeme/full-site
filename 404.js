// Get the app container
const app = document.getElementById('app');

// Determine if the device is mobile
const isMobile = window.innerWidth <= 768;

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
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 30px;
        background-color: #000000;
        border-bottom: 1px solid #333;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }
    .nav-links {
        list-style: none;
        display: flex;
        align-items: center;
        padding: 0;
        margin: 0;
    }
    .nav-links li {
        margin: 0 15px;
        display: inline-block;
    }
    .nav-links a {
        color: #ffffff;
        text-decoration: none;
        font-size: 16px;
        padding-bottom: 5px;
        display: inline-block;
        text-transform: uppercase;
        transition: border-bottom 0.3s ease, color 0.3s ease;
    }
    .nav-links a:hover {
        border-bottom: 3px solid #ffffff;
        color: #e0e0e0;
        animation: bounce 0.4s ease;
    }
    .hamburger {
        display: none;
        flex-direction: column;
        justify-content: space-between;
        width: 25px;
        height: 20px;
        cursor: pointer;
    }
    .hamburger span {
        width: 100%;
        height: 3px;
        background-color: #ffffff;
        transition: all 0.3s ease;
    }
    footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px 50px;
        background-color: #000000;
        border-top: 1px solid #333;
    }
    .error-section {
        background-color: #000000;
        width: 100%;
        padding: 100px 20px;
        color: #ffffff;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: calc(100vh - 200px);
        justify-content: center;
    }
    .error-section h2 {
        font-size: 48px;
        font-weight: 700;
        color: #ffffff;
        margin-bottom: 20px;
        text-transform: uppercase;
    }
    .error-section p {
        font-size: 18px;
        color: #ffffff;
        margin: 10px 0 20px;
        max-width: 600px;
    }
    .error-section .lottie-player {
        width: 300px;
        height: 300px;
        margin: 20px 0;
    }
    .error-section button {
        background-color: transparent;
        border: 2px solid #ffffff;
        color: #ffffff;
        padding: 10px 20px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 16px;
        text-transform: uppercase;
        transition: background-color 0.3s ease, transform 0.3s ease;
    }
    .error-section button:hover {
        background-color: rgba(255, 255, 255, 0.1);
        transform: scale(1.05);
    }
    #loading-screen {
        background-color: #ffffff;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #loading-screen.hidden {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    /* Animation keyframes */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    @keyframes wobble {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .error-section {
            margin-top: 80px;
            padding: 60px 20px;
        }
        .error-section h2 {
            font-size: 36px;
        }
        .error-section p {
            font-size: 16px;
        }
        .error-section .lottie-player {
            width: 200px;
            height: 200px;
        }
        .error-section button {
            font-size: 14px;
            padding: 8px 16px;
        }
        .hamburger {
            display: flex;
        }
        .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            background-color: #000000;
            padding: 20px;
        }
        .nav-links.active {
            display: flex;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -7px);
        }
        footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        footer > div:nth-child(1), footer > div:nth-child(2) {
            margin-bottom: 20px;
        }
        footer > div:nth-child(1), footer > div:nth-child(3) {
            text-align: center;
        }
        footer > div:nth-child(2) > ul {
            flex-direction: column;
            gap: 10px;
        }
        footer > div:nth-child(2) > ul > li > a {
            font-size: 12px;
        }
        footer > div:nth-child(3) > div {
            flex-direction: column;
            justify-content: center;
            gap: 10px;
        }
        footer > div:nth-child(3) > div > a > img {
            width: 20px;
            height: 20px;
        }
        footer > div:nth-child(3) > p {
            font-size: 12px;
            color: #ffffff;
        }
        footer > div:nth-child(1) > div > a > img {
            height: 30px;
        }
    }
`;
document.head.appendChild(styleSheet);

// Create loading screen
const loadingScreen = createElement('div', {
    backgroundColor: '#ffffff',
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '2000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}, { id: 'loading-screen' });
const loadingImage = createElement('img', {}, { src: 'assets/loading-animation.gif', alt: 'Loading...' });
loadingScreen.appendChild(loadingImage);
document.body.appendChild(loadingScreen);

// Hide app content initially
app.style.display = 'none';

// Function to wait for all images and Lottie animations to load
function waitForResources() {
    const images = document.querySelectorAll('img');
    const lottiePlayers = document.querySelectorAll('dotlottie-player');
    let loadedCount = 0;
    const totalResources = images.length + lottiePlayers.length;

    if (totalResources === 0) {
        loadingScreen.classList.add('hidden');
        app.style.display = 'block';
        setTimeout(() => loadingScreen.remove(), 500);
        return;
    }

    const checkAllLoaded = () => {
        loadedCount++;
        if (loadedCount === totalResources) {
            loadingScreen.classList.add('hidden');
            app.style.display = 'block';
            setTimeout(() => loadingScreen.remove(), 500);
        }
    };

    images.forEach(img => {
        if (img.complete) {
            checkAllLoaded();
        } else {
            img.addEventListener('load', checkAllLoaded);
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                checkAllLoaded();
            });
        }
    });

    lottiePlayers.forEach(player => {
        player.addEventListener('ready', checkAllLoaded);
        player.addEventListener('error', () => {
            console.warn(`Failed to load Lottie animation: ${player.getAttribute('src')}`);
            checkAllLoaded();
        });
    });
}

// Header (Same as provided)
const header = createElement('header', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#000000',
    borderBottom: '1px solid #333',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '1000'
});

const headerLeft = createElement('div', {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
});

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
const navLinks = createElement('ul', {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center'
});
navLinks.className = 'nav-links';
const navItems = ['WHO WE ARE', 'CAREERS', 'NEWS'].map(text => {
    const li = createElement('li', { margin: '0 15px', display: 'inline-block' });
    const a = createElement('a', {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '16px',
        paddingBottom: '5px',
        display: 'inline-block',
        textTransform: 'uppercase',
        transition: 'border-bottom 0.3s ease, transform 0.3s ease, color 0.3s ease'
    }, { 
        href: text === 'WHO WE ARE' ? 'who-we-are.html' : (text === 'CAREERS' ? 'careers.html' : 'news.html') 
    }, [text]);

    a.addEventListener('mouseenter', () => {
        a.style.borderBottom = '3px solid #FFFFFF';
        a.style.color = '#E0E0E0';
        a.style.animation = 'bounce 0.4s ease';
    });
    a.addEventListener('mouseleave', () => {
        a.style.borderBottom = 'none';
        a.style.color = '#FFFFFF';
        a.style.animation = 'none';
    });

    li.appendChild(a);
    return li;
});
navLinks.append(...navItems);
nav.appendChild(navLinks);

headerLeft.append(logo, nav);

const headerRight = createElement('div', { display: 'flex', alignItems: 'center' });
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
    marginRight: '2vw',
    animation: 'pulse 2s infinite',
    transition: 'transform 0.3s ease, background-color 0.3s ease'
}, {}, [
    createElement('span', { marginRight: '0.5vw', fontSize: '1.4vh' }, {}, ['💬']),
    'Get in touch'
]);

getInTouch.addEventListener('click', () => {
    window.location.href = 'mailto:support@dashstudios.tech';
});

function setGetInTouchStyles() {
    if (window.innerWidth <= 768) {
        getInTouch.style.marginRight = '12vw';
        getInTouch.style.fontSize = '1.8vh';
        getInTouch.style.padding = '1.5vh 3vw';
    } else {
        getInTouch.style.marginRight = '2vw';
        getInTouch.style.fontSize = '2.2vh';
        getInTouch.style.padding = '1vh 2vw';
    }
}

setGetInTouchStyles();
window.addEventListener('resize', setGetInTouchStyles);

getInTouch.addEventListener('mouseenter', () => {
    getInTouch.style.transform = 'scale(1.1)';
    getInTouch.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
});
getInTouch.addEventListener('mouseleave', () => {
    getInTouch.style.transform = 'scale(1)';
    getInTouch.style.backgroundColor = 'transparent';
});

const hamburger = createElement('div', {});
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

// 404 Error Section
const errorSection = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '100px 20px',
    marginTop: isMobile ? '60px' : '0',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    justifyContent: 'center'
}, { class: 'error-section' });

const errorTitle = createElement('h2', {
    fontSize: isMobile ? '36px' : '48px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    textTransform: 'uppercase'
}, {}, ['404 - Page Not Found']);

const errorMessage = createElement('p', {
    fontSize: isMobile ? '16px' : '18px',
    color: '#ffffff',
    margin: '10px 0 20px',
    maxWidth: '600px'
}, {}, ['Oops! The page you’re looking for doesn’t exist. Let’s get you back to the action!']);

const lottiePlayer = createElement('dotlottie-player', {
    width: isMobile ? '200px' : '300px',
    height: isMobile ? '200px' : '300px',
    margin: '20px 0'
}, {
    src: 'assets/404-animation.json',
    background: 'transparent',
    speed: '1',
    loop: 'true',
    autoplay: 'true'
});

const homeButton = createElement('button', {}, {}, ['Back to Home']);
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

errorSection.append(errorTitle, errorMessage, lottiePlayer, homeButton);

// Footer (Same as provided)
const footer = createElement('footer', {
    display: 'flex',
    justifyContent: isMobile ? 'center' : 'space-between',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    padding: isMobile ? '20px' : '20px 50px',
    backgroundColor: '#000000',
    borderTop: '1px solid #333'
});

const footerLeft = createElement('div', {
    textAlign: isMobile ? 'center' : 'left',
    marginBottom: isMobile ? '20px' : '0'
});
const footerLogo = createElement('div', { cursor: 'pointer' });
const footerLogoLink = createElement('a', {}, { href: 'index.html' });
const footerLogoIcon = createElement('img', {
    height: isMobile ? '30px' : '40px',
    width: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease'
}, { src: 'assets/logo.png', alt: 'Logo' });

footerLogoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
});

footerLogoLink.addEventListener('mouseenter', () => {
    footerLogoIcon.style.animation = 'spin 0.5s ease-in-out';
});

footerLogoLink.appendChild(footerLogoIcon);
footerLogo.appendChild(footerLogoLink);
footerLeft.appendChild(footerLogo);

const footerCenter = createElement('div', {
    textAlign: isMobile ? 'center' : 'center',
    marginBottom: isMobile ? '20px' : '0'
});
const footerNav = createElement('ul', {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    listStyle: 'none',
    gap: isMobile ? '10px' : '20px',
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
        fontSize: isMobile ? '12px' : '14px',
        textTransform: 'uppercase',
        transition: 'color 0.3s ease, transform 0.3s ease'
    }, { href: link.href }, [link.text]);

    a.addEventListener('mouseenter', () => {
        a.style.color = '#E0E0E0';
        a.style.animation = 'bounce 0.4s ease';
    });
    a.addEventListener('mouseleave', () => {
        a.style.color = '#FFFFFF';
        a.style.animation = 'none';
    });

    li.appendChild(a);
    return li;
});

footerNav.append(...footerLinks);
footerCenter.appendChild(footerNav);

const footerRight = createElement('div', {
    textAlign: isMobile ? 'center' : 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: isMobile ? 'center' : 'flex-end'
});

const socialLinks = createElement('div', {
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    justifyContent: isMobile ? 'center' : 'flex-end',
    gap: isMobile ? '10px' : '15px',
    marginBottom: '10px'
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
        width: isMobile ? '20px' : '24px',
        height: isMobile ? '20px' : '24px',
        display: 'block',
        transition: 'transform 0.3s ease'
    }, { src: `assets/${social.src}`, alt: `${social.platform} Logo` });

    a.appendChild(img);

    a.addEventListener('mouseenter', () => {
        img.style.animation = 'wobble 0.5s ease';
        img.style.filter = 'brightness(1.2)';
    });
    a.addEventListener('mouseleave', () => {
        img.style.animation = 'none';
        img.style.filter = 'brightness(1)';
    });

    return a;
});

socialLinks.append(...socialMedia);

const email = createElement('p', {
    fontSize: isMobile ? '12px' : '14px',
    margin: '5px 0',
    color: '#FFFFFF'
}, {}, ['All Rights Reserved']);
const copyright = createElement('p', {
    fontSize: isMobile ? '12px' : '14px',
    margin: '5px 0',
    color: '#FFFFFF'
}, {}, ['© 2025 Dash Studios Inc.']);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);

// Append all sections to the app container
app.append(header, errorSection, footer);

// Start checking for resource loads after content is appended
waitForResources();