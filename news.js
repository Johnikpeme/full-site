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

// Header (Same as Previous Pages)
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
    height: '40px',
    width: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease'
}, { src: 'assets/logo.png', alt: 'Logo' });

logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: '0', behavior: 'smooth' });
});

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

// News Section (White Background)
const newsSection = createElement('section', {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: '100px 20px', // Extra padding to account for fixed header
    textAlign: 'center'
});

// News/Events Title
const newsTitle = createElement('h2', {
    fontSize: '48px',
    fontWeight: '700',
    color: '#000000',
    marginBottom: '60px',
    textTransform: 'uppercase'
}, {}, ['News/Events']);

// News Articles Data (5 articles)
const newsArticles = [
    { img: 'news-main.jpg', title: 'Nouns Hunt v2.0 Out Now!', date: 'April 11, 2025', desc: 'Nouns Hunt v2.0 releases with new updates like Public Multiplayer and AI Powered Database. Enjoy Nouns Hunt like never before.', link: 'https://example.com/news1' },
    { img: 'news-3.jpg', title: 'Nouns Hunt Release Trailer', date: 'April 11, 2025', desc: 'Watch the official trailer for Nouns Hunt’s big update.', link: 'https://example.com/news3' },
    { img: 'slide10.jpg', title: 'Dev Insights: Building Nouns Hunt', date: 'February 28, 2025', desc: 'Behind-the-scenes look at creating our flagship game.', link: 'https://example.com/news5' },
    { img: 'news-2.jpg', title: 'B-School Disrupt SF 2024', date: 'November 4, 2024', desc: 'Dash Studios shines at this year’s tech event in San Francisco.', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7261874551175684096' },
    { img: 'news-4.jpg', title: 'UC Launch: Dash Studios', date: 'July 23, 2024', desc: 'Dash Studios emerges as a finalist at UC Launch, Spring 2024.', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7221409228941328386' },
];

// Function to create news articles dynamically
function renderNews() {
    newsSection.innerHTML = ''; // Clear section before rendering
    newsSection.appendChild(newsTitle);

    const newsContainer = createElement('div', {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '40px',
        maxWidth: '1200px',
        margin: '0 auto'
    });

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768; // Mobile: <768px (1 article per row), Desktop: 2 per row

    for (let i = 0; i < newsArticles.length; i++) {
        const article = newsArticles[i];
        const articleWrapper = createElement('div', {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'transform 0.3s ease',
            width: isMobile ? '100%' : '45%',
            backgroundColor: '#CBC3E3',
            padding: '20px',
            borderRadius: '15px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        });

        const articleImage = createElement('img', {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '10px',
            marginBottom: '20px',
            transition: 'transform 0.3s ease'
        }, { src: `assets/${article.img}`, alt: article.title });

        const articleTitle = createElement('h3', {
            fontSize: '24px',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '10px'
        }, {}, [article.title]);

        const articleDate = createElement('p', {
            fontSize: '14px',
            color: '#666666',
            marginBottom: '10px'
        }, {}, [article.date]);

        const articleDesc = createElement('p', {
            fontSize: '16px',
            color: '#333333',
            marginBottom: '20px',
            lineHeight: '1.5'
        }, {}, [article.desc]);

        const readMore = createElement('a', {
            display: 'flex',
            alignItems: 'center',
            color: '#000000',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.3s ease'
        }, { href: article.link, target: '_blank' });

        const readMoreText = createElement('span', { marginRight: '5px' }, {}, ['Read More']);
        const arrowIcon = createElement('img', {
            width: '16px',
            height: '16px'
        }, { src: 'assets/arrow_right.png', alt: 'Read More Arrow' });

        readMore.append(readMoreText, arrowIcon);

        articleWrapper.addEventListener('mouseenter', () => {
            articleImage.style.transform = 'scale(1.05)';
            readMore.style.color = '#555555';
        });
        articleWrapper.addEventListener('mouseleave', () => {
            articleImage.style.transform = 'scale(1)';
            readMore.style.color = '#000000';
        });

        articleWrapper.append(articleImage, articleTitle, articleDate, articleDesc, readMore);
        newsContainer.appendChild(articleWrapper);
    }

    newsSection.appendChild(newsContainer);
}

// Initial render
renderNews();
window.addEventListener('resize', renderNews); // Re-render on window resize

fadeInOnScroll(newsSection);



// Footer (Same as Previous Pages)
const footer = createElement('footer', {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#000000',
    borderTop: '1px solid #333'
});

const footerLeft = createElement('div', {});
const footerLogo = createElement('div', { cursor: 'pointer' });
const footerLogoLink = createElement('a', {});
const footerLogoIcon = createElement('img', {
    height: '40px',
    width: 'auto',
    display: 'block',
    transition: 'transform 0.5s ease'
}, { src: 'assets/logo.png', alt: 'Logo' });

footerLogoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: '0', behavior: 'smooth' });
});

footerLogoLink.addEventListener('mouseenter', () => {
    footerLogoIcon.style.animation = 'spin 0.5s ease-in-out';
});

footerLogoLink.appendChild(footerLogoIcon);
footerLogo.appendChild(footerLogoLink);
footerLeft.appendChild(footerLogo);

const footerCenter = createElement('div', {});
const footerNav = createElement('ul', {
    display: 'flex',
    listStyle: 'none',
    gap: '20px'
});

const footerLinks = [
    { text: 'TERMS OF SERVICE', href: 'terms.html' },
    { text: 'PRIVACY', href: 'privacy.html' }
].map(link => {
    const li = createElement('li', {});
    const a = createElement('a', {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '14px',
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

const footerRight = createElement('div', { textAlign: 'right' });
footerRight.className = 'footer-right';

const socialLinks = createElement('div', {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginBottom: '10px'
});

const socialMedia = [
    { platform: 'X', src: 'twitter.png', href: 'https://x.com' },
    { platform: 'Instagram', src: 'instagram.png', href: 'https://instagram.com' },
    { platform: 'YouTube', src: 'youtube.png', href: 'https://youtube.com' },
    { platform: 'LinkedIn', src: 'linkedin.png', href: 'https://linkedin.com' }
].map(social => {
    const a = createElement('a', {
        display: 'inline-block',
        transition: 'transform 0.3s ease, filter 0.3s ease'
    }, { href: social.href, target: '_blank' });

    const img = createElement('img', {
        width: '24px',
        height: '24px',
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

const email = createElement('p', { fontSize: '14px', margin: '5px 0' }, {}, ['All Rights Reserved']);
const copyright = createElement('p', { fontSize: '14px', margin: '5px 0' }, {}, ['© 2025 Dash Studios Inc.']);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);
fadeInOnScroll(footer);

// Append all sections to the app container
app.append(header, newsSection, footer);

// Start checking for image loads after content is appended
waitForImages();