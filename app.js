// Get the app container
const app = document.getElementById('app');

// Set black background for entire page
document.body.style.backgroundColor = '#000000';

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

// Hero Section - Scrollable, not fixed
const hero = createElement('section', {
    className: 'hero',
    width: '100vw',
    height: '100vh', // Full viewport height, but scrolls
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#000000',
    position: 'relative', // Relative positioning for normal flow
    marginTop: '10vh' // Space below fixed header
});

// Function to set the appropriate background image
function setBackgroundImage() {
    if (window.innerWidth <= 768) {
        hero.style.backgroundImage = 'url(assets/hero-background-mobile.jpg)';
        hero.style.backgroundSize = 'cover';
        hero.style.backgroundPosition = 'center top';
    } else {
        hero.style.backgroundImage = 'url(assets/hero-background.jpg)';
        hero.style.backgroundSize = 'cover';
    }
}

// Set initial background
setBackgroundImage();

// Update background when window is resized
window.addEventListener('resize', setBackgroundImage);

// Download Button - Responsive Sizing, scrolls with hero
const downloadButton = createElement('button', {
    className: 'download-button',
    backgroundColor: '#FFFFFF',
    border: '1px solid #000000',
    color: '#000000',
    padding: '1.5vh 3vw',
    borderRadius: '2.5vh',
    cursor: 'pointer',
    fontSize: '2.5vh',
    position: 'absolute', // Positioned relative to hero
    zIndex: '10',
    animation: 'pulse 2s infinite',
    transition: 'transform 0.3s ease, background-color 0.3s ease',
    boxSizing: 'border-box',
    minWidth: '30vw',
    fontWeight: 'bold',
    textTransform: 'uppercase'
}, {}, ['Download Now']);

// Function to set button position and size
function setButtonPosition() {
    if (window.innerWidth <= 768) {
        downloadButton.style.left = '8%';
        downloadButton.style.bottom = '38%';
        downloadButton.style.transform = 'translateX(-50%)';
        downloadButton.style.minWidth = '40vw';
        downloadButton.style.fontSize = '2vh';
        downloadButton.style.padding = '2vh 5vw';
    } else {
        downloadButton.style.left = '11%';
        downloadButton.style.bottom = '15%';
        downloadButton.style.transform = 'none';
        downloadButton.style.minWidth = '10vw';
        downloadButton.style.fontSize = '2vh';
        downloadButton.style.padding = '2vh 4vw';
    }
}

// Set initial button position
setButtonPosition();

downloadButton.addEventListener('click', () => window.open('https://urlgeni.us/nounshuntgame', '_blank'));

downloadButton.addEventListener('mouseenter', () => {
    downloadButton.style.transform = window.innerWidth <= 768 ? 'translateX(-50%) scale(1.1)' : 'scale(1.1)';
    downloadButton.style.backgroundColor = '#F0F0F0';
});
downloadButton.addEventListener('mouseleave', () => {
    downloadButton.style.transform = window.innerWidth <= 768 ? 'translateX(-50%) scale(1)' : 'scale(1)';
    downloadButton.style.backgroundColor = '#FFFFFF';
});

window.addEventListener('resize', setButtonPosition);

hero.append(downloadButton);

// Content container for all sections below header
const contentContainer = createElement('div', {
    position: 'relative',
    backgroundColor: '#000000',
    zIndex: '2'
});

// Games Section
const games = createElement('section', {
    className: 'games',
    backgroundColor: '#000000',
    width: '100vw',
    padding: '5vh 2vw',
    textAlign: 'left',
    overflow: 'hidden'
});
const gamesTitle = createElement('h2', {
    fontSize: '4vh',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '4vh',
    maxWidth: '90vw',
    margin: '0 auto 4vh auto'
}, {}, ['Our Games']);
const gameImagesContainer = createElement('div', {
    className: 'games-container',
    maxWidth: '90vw',
    margin: '0 auto',
    position: 'relative',
    overflowX: 'hidden' // Prevent horizontal overflow
});

const gameImages = [
    { src: 'nouns-hunt.jpg', alt: 'Nouns Hunt', link: 'nounshunt.html' },
    { src: 'nouns-attack.jpg', alt: 'Nouns Attack', hasTag: true }
].map(image => {
    const imageWrapper = createElement('div', { 
        position: 'relative',
        display: 'inline-block' // Ensures wrapper fits image size
    });

    const imageElement = createElement('img', {
        borderRadius: '1vh'
    }, { src: `assets/${image.src}`, alt: image.alt });

    imageElement.addEventListener('mouseenter', () => {
        imageElement.style.border = '0.2vh solid #FFFFFF';
    });
    imageElement.addEventListener('mouseleave', () => {
        imageElement.style.border = 'none';
    });

    let imgContainer = imageElement;
    if (image.link) {
        const linkElement = createElement('a', 
            { display: 'block' }, 
            { href: image.link, target: '_blank', rel: 'noopener noreferrer' }
        );
        linkElement.appendChild(imageElement);
        imgContainer = linkElement;
    }

    if (image.hasTag) {
        const tag = createElement('span', {
            position: 'absolute',
            top: '1vh',
            left: '1vw',
            backgroundColor: '#555555',
            color: '#FFFFFF',
            padding: '0.5vh 1vw',
            borderRadius: '0.5vh',
            fontSize: '1.2vh',
            fontWeight: '500',
            zIndex: '10'
        }, {}, ['Closed Beta Testing']);
        imageWrapper.appendChild(tag);
    }

    imageWrapper.appendChild(imgContainer);
    return imageWrapper;
});

// Function to adjust games layout based on screen size
function adjustGamesLayout() {
    if (window.innerWidth <= 768) {
        gameImagesContainer.style.display = 'flex';
        gameImagesContainer.style.flexDirection = 'column';
        gameImagesContainer.style.gap = '4vh';
        gameImagesContainer.style.alignItems = 'center';
        gameImages.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = '100vw';
            img.style.maxHeight = '40vh';

            const tag = wrapper.querySelector('span');
            if (tag) {
                tag.style.left = '7vw';
            }
        });
    } else {
        gameImagesContainer.style.display = 'grid';
        gameImagesContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
        gameImagesContainer.style.gap = '4vw';
        gameImages.forEach(wrapper => {
            const img = wrapper.querySelector('img');
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = '100%';

            const tag = wrapper.querySelector('span');
            if (tag) {
                tag.style.left = '1vw';
            }
        });
    }
}

// Initial layout setup
gameImagesContainer.append(...gameImages);
games.append(gamesTitle, gameImagesContainer);

// News & Events Section
const newsEvents = createElement('section', {
    className: 'news-events',
    backgroundColor: '#000000',
    width: '100vw',
    padding: '5vh 5vw'
});

const newsHeader = createElement('div', {
    className: 'news-header',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '4vh'
});

const newsTitle = createElement('h2', {
    fontSize: '4vh',
    fontWeight: '700',
    color: '#FFFFFF'
}, {}, ['News & Events']);

const seeMoreButton = createElement('button', {
    backgroundColor: '#333333',
    color: '#FFFFFF',
    padding: '1vh 3vw',
    borderRadius: '2vh',
    border: 'none',
    fontSize: '2vh',
    fontWeight: '500',
    cursor: 'pointer',
    textTransform: 'uppercase',
    animation: 'pulse 2s infinite',
    transition: 'transform 0.3s ease, background-color 0.3s ease'
}, {}, ['See More']);

seeMoreButton.addEventListener('mouseenter', () => {
    seeMoreButton.style.transform = 'scale(1.1)';
    seeMoreButton.style.backgroundColor = '#444444';
});
seeMoreButton.addEventListener('mouseleave', () => {
    seeMoreButton.style.transform = 'scale(1)';
    seeMoreButton.style.backgroundColor = '#333333';
});

newsHeader.append(newsTitle, seeMoreButton);

const newsContent = createElement('div', {
    className: 'news-content'
});

// Main Article
const mainArticle = createElement('div', {
    className: 'main-article',
    cursor: 'pointer',
    marginBottom: '3vh',
    opacity: '0',
    transform: 'scale(0.9)',
    transition: 'opacity 0.5s ease, transform 0.5s ease'
});

const mainImageWrapper = createElement('div', {
    width: '100%',
    height: 'auto',
    overflow: 'hidden',
    borderRadius: '1vh',
    marginBottom: '1vh'
});

const mainArticleImage = createElement('img', {
    width: '100%',
    height: 'auto',
    borderRadius: '1vh',
    display: 'block',
    transition: 'transform 0.3s ease'
}, { src: 'assets/news-main.jpg', alt: 'Main News Article' });

mainImageWrapper.appendChild(mainArticleImage);

const mainArticleTag = createElement('span', {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: '#00D4FF',
    color: '#000000',
    padding: '0.5vh 1vw',
    borderRadius: '0.5vh',
    fontSize: '1.5vh',
    fontWeight: '500',
    marginRight: '1vw'
}, {}, [
    createElement('span', { marginRight: '0.5vw' }, {}, ['📰']),
    'NEWS'
]);

const mainArticleTitle = createElement('h3', {
    fontSize: '2.5vh',
    fontWeight: '600',
    color: '#FFFFFF',
    display: 'inline',
    transition: 'color 0.3s ease'
}, {}, ['Nouns Hunt v2.0 Out Now!']);

const mainArticleTitleWrapper = createElement('div', { 
    display: 'flex', 
    alignItems: 'center',
    flexWrap: 'wrap'
});
mainArticleTitleWrapper.append(mainArticleTag, mainArticleTitle);

mainArticle.append(mainImageWrapper, mainArticleTitleWrapper);

// Smaller Articles
const smallerArticles = createElement('div', {
    className: 'smaller-articles',
    display: 'grid',
    gap: '2vh'
});

const smallArticlesData = [
    { title: 'Nouns Hunt Release Trailer', tag: 'VIDEO', tagIcon: '🎥', src: 'news-3-2.jpg', link: 'https://example.com/news-3' },
    { title: '/Dev Insights: Building Nouns Hunt', tag: 'EXCL: DASH STUDIOS', tagIcon: '🧠', src: 'news-1.jpeg', link: 'https://example.com/news-1' },
    { title: 'UC Launch: Dash Studios', tag: 'NEWS', tagIcon: '📰', src: 'news-4.jpg', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7221409228941328386' },
    { title: 'B-School Disrupt SF 2024', tag: 'NEWS', tagIcon: '📰', src: 'news-2.jpg', link: 'https://www.linkedin.com/feed/update/urn:li:activity:7261874551175684096' }
];

const smallArticles = smallArticlesData.map(article => {
    const articleContainer = createElement('div', {
        display: 'flex',
        gap: '2vw',
        background: 'rgba(42, 42, 42, 0.8)',
        backdropFilter: 'blur(0.5vh)',
        borderRadius: '1vh',
        padding: '1.5vh',
        boxShadow: '0 0.2vh 1vh rgba(0, 0, 0, 0.3)',
        cursor: 'pointer',
        transition: 'background 0.3s ease, transform 0.3s ease',
        opacity: '0',
        transform: 'scale(0.9)'
    });

    const articleImage = createElement('img', {
        width: '30vw',
        height: '20vw',
        minWidth: '30vw',
        minHeight: '20vw',
        borderRadius: '1vh',
        objectFit: 'cover',
        transition: 'transform 0.3s ease, filter 0.3s ease'
    }, { src: `assets/${article.src}`, alt: article.title });

    const articleText = createElement('div', { 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
        flex: '1'
    });

    const articleTag = createElement('span', {
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: article.tag === 'EXCL: DASH STUDIOS' ? '#FFC400' : article.tag === 'NEWS' ? '#00D4FF' : article.tag === 'VIDEO' ? '#FF4500' : '#FFC400',
        color: '#000000',
        padding: '0.5vh 1vw',
        borderRadius: '0.5vh',
        fontSize: '1.5vh',
        fontWeight: '500',
        marginBottom: '1vh'
    }, {}, [
        createElement('span', { marginRight: '0.5vw' }, {}, [article.tagIcon]),
        article.tag
    ]);

    const articleTitle = createElement('h4', {
        fontSize: '2vh',
        fontWeight: '200',
        color: '#FFFFFF',
        margin: '0',
        transition: 'color 0.3s ease'
    }, {}, [article.title]);

    articleText.append(articleTag, articleTitle);
    articleContainer.append(articleImage, articleText);

    articleContainer.addEventListener('mouseenter', () => {
        articleImage.style.transform = 'scale(1.05)';
        articleImage.style.filter = 'brightness(1.1)';
        articleTitle.style.color = '#E0E0E0';
        articleContainer.style.background = 'rgba(60, 60, 60, 0.8)';
        articleContainer.style.transform = 'translateY(-0.5vh)';
    });
    articleContainer.addEventListener('mouseleave', () => {
        articleImage.style.transform = 'scale(1)';
        articleImage.style.filter = 'brightness(1)';
        articleTitle.style.color = '#FFFFFF';
        articleContainer.style.background = 'rgba(42, 42, 42, 0.8)';
        articleContainer.style.transform = 'translateY(0)';
    });
    articleContainer.addEventListener('click', () => window.open(article.link, '_blank'));

    return articleContainer;
});

smallerArticles.append(...smallArticles);
newsContent.append(mainArticle, smallerArticles);
newsEvents.append(newsHeader, newsContent);

// Function to adjust news layout based on screen size
function adjustNewsLayout() {
    if (window.innerWidth <= 768) {
        // Mobile layout - maintain PC arrangement but stacked vertically
        newsContent.style.display = 'flex';
        newsContent.style.flexDirection = 'column';
        newsContent.style.gap = '3vh';
        
        // Main article - full width
        mainArticle.style.width = '100%';
        mainArticle.style.marginBottom = '3vh';
        
        // Smaller articles container - matches PC layout but stacked
        smallerArticles.style.display = 'flex';
        smallerArticles.style.flexDirection = 'column';
        smallerArticles.style.gap = '3vh';
        smallerArticles.style.width = '100%';
        
        // Small articles - maintain PC styling but full width
        smallArticles.forEach(article => {
            article.style.display = 'flex';
            article.style.flexDirection = 'row';
            article.style.width = '100%';
            article.style.gap = '2vh';
            article.style.alignItems = 'center';
            
            const img = article.querySelector('img');
            if (img) {
                // Maintain aspect ratio similar to PC
                img.style.width = '30%';
                img.style.height = 'auto';
                img.style.minWidth = '30%';
                img.style.minHeight = 'auto';
                img.style.objectFit = 'cover';
            }
            
            // Text container
            const textContainer = article.querySelector('.article-text');
            if (textContainer) {
                textContainer.style.width = '70%';
            }
        });
        
        // Reset other styles
        newsHeader.style.maxWidth = '100%';
        newsHeader.style.margin = '0 auto 4vh auto';
        newsContent.style.maxWidth = '100%';
        newsContent.style.margin = '0';
        
    } else {
        // PC layout - keep original perfect implementation
        newsHeader.style.maxWidth = '1200px';
        newsHeader.style.margin = '0 auto 40px auto';
        
        newsContent.style.display = 'flex';
        newsContent.style.gap = '20px';
        newsContent.style.maxWidth = '1200px';
        newsContent.style.margin = '0 auto';
        
        mainArticle.style.flex = '2';
        mainArticle.style.marginBottom = '0';
        
        smallerArticles.style.flex = '1';
        smallerArticles.style.display = 'flex';
        smallerArticles.style.flexDirection = 'column';
        smallerArticles.style.gap = '20px';
        
        // Adjust image sizes for PC
        smallArticles.forEach(article => {
            article.style.flexDirection = 'row';
            article.style.width = '';
            const img = article.querySelector('img');
            if (img) {
                img.style.width = '150px';
                img.style.height = '100px';
                img.style.minWidth = '150px';
                img.style.minHeight = '100px';
            }
        });
    }
}

// Set up intersection observers for animations
const setupObservers = () => {
    const mainObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                mainObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    mainObserver.observe(mainArticle);

    const articleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                articleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    smallArticles.forEach(article => articleObserver.observe(article));
};

// Initial setup
adjustNewsLayout();
setupObservers();

// Update on resize
window.addEventListener('resize', adjustNewsLayout);

// Footer (Black Background)
const footer = createElement('footer', {
    className: 'footer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2vh 5vw',
    backgroundColor: '#000000',
    borderTop: '1px solid #333'
});

const footerLeft = createElement('div', { className: 'footer-left' });
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

const footerCenter = createElement('div', { className: 'footer-center' });
const footerNav = createElement('ul', { 
    className: 'footer-nav',
    display: 'flex', 
    listStyle: 'none', 
    gap: '2vw' 
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
    textAlign: 'right' 
});

const socialLinks = createElement('div', {
    className: 'social-links',
    display: 'flex',
    justifyContent: 'center',
    gap: '1.5vw',
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
        width: '2.4vw',
        height: '2.4vw',
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

const email = createElement('p', { fontSize: '2vh', margin: '0.5vh 0', color: '#FFFFFF' }, {}, ['All Rights Reserved']);
const copyright = createElement('p', { fontSize: '2vh', margin: '0.5vh 0', color: '#FFFFFF' }, {}, ['© 2025 Dash Studios Inc.']);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);

// Append all sections to the content container
contentContainer.append(hero, games, newsEvents, footer);

// Append header and content container to the app
app.append(header, contentContainer);

// Apply layout adjustments initially and on resize
adjustGamesLayout();
window.addEventListener('resize', adjustGamesLayout);

// Start checking for image loads after content is appended
waitForImages();