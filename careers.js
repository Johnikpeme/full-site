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
        font-family: 'Arial', sans-serif;
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
    .job-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
        padding: 40px 20px;
        max-width: 1200px;
        margin: 0 auto;
        background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%);
    }
    .job-listing {
        background: #ffffff;
        border-radius: 12px;
        padding: 30px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        border-left: 4px solid #4A90E2;
    }
    .job-listing:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
    }
    .job-listing::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: linear-gradient(90deg, #4A90E2, #50C878);
        transition: transform 0.3s ease;
    }
    .job-listing:hover::before {
        transform: scaleX(1.1);
    }
    .job-title {
        font-size: 28px;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 15px;
        line-height: 1.2;
        position: relative;
        z-index: 1;
    }
    .job-description {
        font-size: 16px;
        color: #4a4a4a;
        margin-bottom: 25px;
        line-height: 1.6;
        font-weight: 400;
    }
    .job-details {
        font-size: 14px;
        color: #6b6b6b;
        margin-bottom: 20px;
        line-height: 1.5;
        display: flex;
        flex-wrap: wrap;
        gap: 15px;
    }
    .job-detail-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    .job-detail-item span {
        font-weight: 500;
        color: #4A90E2;
    }
    .apply-button {
        background: linear-gradient(90deg, #4A90E2, #50C878);
        border: none;
        color: #ffffff;
        padding: 12px 24px;
        border-radius: 50px;
        cursor: pointer;
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
        transition: all 0.3s ease;
        align-self: flex-start;
        position: relative;
        overflow: hidden;
    }
    .apply-button:hover {
        background: linear-gradient(90deg, #357ABD, #3DA65F);
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .apply-button::after {
        content: '→';
        margin-left: 8px;
        font-size: 18px;
        transition: transform 0.3s ease;
    }
    .apply-button:hover::after {
        transform: translateX(5px);
    }
    /* Header and Navigation */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2vh 3vw;
        background-color: #000000;
        border-bottom: 1px solid #333;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 1000;
    }
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #000000;
        padding: 20px;
    }
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
    }
    .hamburger span {
        width: 25px;
        height: 3px;
        background-color: #ffffff;
        margin: 2px 0;
        transition: all 0.3s ease;
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
    /* Footer */
    .footer-nav {
        list-style: none;
        display: flex;
        gap: 2vw;
        padding: 0;
    }
    /* Animations */
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-3px); }
    }
    @keyframes wobble {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(5deg); }
        75% { transform: rotate(-5deg); }
        100% { transform: rotate(0deg); }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .news-article {
            width: 100%; /* One article per row */
        }
        .job-container {
            grid-template-columns: 1fr;
            padding: 20px;
        }
        .job-listing {
            padding: 20px;
        }
        .job-title {
            font-size: 24px;
        }
        .job-description {
            font-size: 14px;
        }
        .apply-button {
            width: 100%;
            text-align: center;
        }
        .nav-links {
            display: none;
        }
        .nav-links.active {
            display: flex;
        }
        .hamburger {
            display: flex;
        }
        .footer {
            flex-direction: column;
            text-align: center;
        }
        .footer-nav {
            flex-direction: column;
            gap: 1vh;
        }
        .social-links {
            flex-direction: column;
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
    marginRight: '2vw',
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
        getInTouch.style.marginRight = '12vw';
        getInTouch.style.fontSize = '1.8vh';
        getInTouch.style.padding = '1.5vh 3vw';
    } else {
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
    marginLeft: '-1vw'
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

// Open Roles Section
const openRoles = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '120px 20px',
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

const rolesTitle = createElement('h2', {
    fontSize: '56px',
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: '50px',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    background: 'linear-gradient(90deg, #4A90E2, #50C878)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
}, {}, ['Open Roles']);

// Job Listing
const jobContainer = createElement('div', { className: 'job-container' });

const jobListing = createElement('div', { className: 'job-listing' });
const jobTitle = createElement('h3', { className: 'job-title' }, {}, ['Backend Developer (Nakama + Go)']);
const jobDescription = createElement('p', { className: 'job-description' }, {}, [
    'We’re seeking a skilled Backend Engineer to own our Nakama + Go backend, focusing on troubleshooting, performance optimization, and scaling for production. You’ll work closely with our team to stabilize the server, enhance gameplay, and ensure seamless real-time player experiences.'
]);

// Add job details for more context
const jobDetails = createElement('div', { className: 'job-details' }, {}, [
    createElement('div', { className: 'job-detail-item' }, {}, [
        createElement('span', {}, {}, ['Location:']),
        ' Remote'
    ]),
    createElement('div', { className: 'job-detail-item' }, {}, [
        createElement('span', {}, {}, ['Type:']),
        ' 3-Month Contract'
    ]),
    createElement('div', { className: 'job-detail-item' }, {}, [
        createElement('span', {}, {}, ['Experience:']),
        ' 3+ years'
    ])
]);

const applyButton = createElement('a', { className: 'apply-button' }, { 
    href: 'https://forms.gle/vChjrFkPTkNV29fZ9', 
    target: '_blank' 
}, ['Apply Now']);

jobListing.append(jobTitle, jobDescription, jobDetails, applyButton);
jobContainer.append(jobListing);
openRoles.append(rolesTitle, jobContainer);
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