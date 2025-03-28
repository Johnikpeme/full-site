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

// Optimized fade-in animation for sections on scroll
const fadeInOnScroll = (element) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease-out';
    observer.observe(element);
};

// Header (Sticky, Black Background)
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

const headerLeft = createElement('div', { display: 'flex', alignItems: 'center', gap: '20px' });
const logo = createElement('div', { cursor: 'pointer' });
const logoLink = createElement('a', {}, { href: 'index.html' });
const logoIcon = createElement('img', {
    height: '40px',
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
    const li = createElement('li', { margin: '0 15px', display: 'inline-block' });
    const a = createElement('a', {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '16px',
        paddingBottom: '5px',
        display: 'inline-block',
        textTransform: 'uppercase',
        transition: 'border-bottom 0.3s ease, transform 0.3s ease, color 0.3s ease'
    }, { href: text === 'WHO WE ARE' ? 'who-we-are.html' : (text === 'CAREERS' ? 'careers.html' : 'news.html') }, [text]);

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

// Main Content Sections (White Background)
const mainContent = createElement('main', { backgroundColor: '#FFFFFF', padding: '0 0 50px' });

// Hero Section (Full-Screen Slideshow)
const heroSection = createElement('section', { 
    position: 'relative', 
    height: '100vh', 
    width: '100%', 
    overflow: 'hidden' 
});

// Slideshow Container
const slideshowContainer = createElement('div', { 
    position: 'absolute', 
    top: '0', 
    left: '0', 
    width: '100%', 
    height: '100%' 
});

// Array of 10 images (replace with your actual image paths)
const slideImages = [
    'assets/news-2.jpg',
    'assets/slide2.jpg',
    'assets/slide8.jpg',
    'assets/news-main-1.jpeg',
    'assets/slide5.jpg',
    'assets/slide6.jpg',
    'assets/slide7.jpg',
    'assets/slide3.jpg',
    'assets/slide9.jpg'
];

// Create slides
const slides = slideImages.map((src, index) => {
    const slide = createElement('div', { 
        className: 'hero-slide',
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: index === 0 ? '1' : '0', // First slide visible
        transition: 'opacity 1s ease-in-out'
    });

    const img = createElement('img', { 
        width: '100%', 
        height: '100%', 
        objectFit: 'cover' 
    }, { src: src, alt: `Slide ${index + 1}` });

    slide.appendChild(img);
    return slide;
});

slideshowContainer.append(...slides);

// Dark Overlay
const overlay = createElement('div', { 
    position: 'absolute', 
    top: '0', 
    left: '0', 
    width: '100%', 
    height: '100%', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Light dark overlay
});

heroSection.append(slideshowContainer, overlay);

// Slideshow Logic
let currentSlide = 0;
const totalSlides = slides.length;

function showNextSlide() {
    slides[currentSlide].style.opacity = '0'; // Fade out current
    currentSlide = (currentSlide + 1) % totalSlides; // Move to next slide
    slides[currentSlide].style.opacity = '1'; // Fade in next
}

// Auto-slide every 5 seconds
setInterval(showNextSlide, 5000);

// Our Story Section
const ourStory = createElement('section', { 
    padding: '50px 0', 
    backgroundColor: '#F5F5F5' // Light gray background like Riot's
});

const storyContainer = createElement('div', { 
    maxWidth: '1200px', 
    margin: '0 auto', 
    display: 'flex', 
    flexWrap: 'wrap', 
    gap: '40px', 
    alignItems: 'center' 
});

// Left: Image
const mediaWrapper = createElement('div', { 
    flex: '1 1 40%', 
    minWidth: '300px', 
    position: 'relative', 
    overflow: 'hidden' 
});

const storyMedia = createElement('img', { 
    width: '100%', 
    height: 'auto', 
    maxHeight: '400px', 
    objectFit: 'contain'
}, { src: 'assets/diversity_faces.gif'});

mediaWrapper.appendChild(storyMedia);

// Right: Title and Description
const storyText = createElement('div', { 
    flex: '1 1 50%', 
    minWidth: '300px', 
    color: '#333333' 
});

const storyTitle = createElement('h2', { 
    className: 'section-title', 
    fontSize: '48px', 
    fontWeight: '700', 
    color: '#000000', 
    textTransform: 'uppercase', 
    letterSpacing: '2px', 
    marginBottom: '20px' 
}, {}, ['WHO WE ARE.']);

const storyContent = createElement('div', { 
    fontSize: '18px', 
    lineHeight: '1.6', 
    color: '#333333' 
}, {}, [
    createElement('p', { marginBottom: '15px' }, {}, ['Dash Studios was founded with a mission to bring African stories to life through gaming. Our focus is Africa first, driving both game development and publishing to showcase the continent’s rich narratives.']),
    createElement('p', {}, {}, ['We believe African developers have powerful stories to tell, and we serve as the bridge that connects those stories to a global audience, breaking barriers and redefining the gaming landscape.'])
]);

storyText.append(storyTitle, storyContent);

// Assemble the section
storyContainer.append(mediaWrapper, storyText);
ourStory.appendChild(storyContainer);
fadeInOnScroll(ourStory);

// Leadership Section
const leadership = createElement('section', { 
    padding: '50px 0', 
    backgroundColor: '#F5F5F5' 
});

const leadershipTitle = createElement('h2', { 
    className: 'section-title', 
    textAlign: 'center',
    marginBottom: '30px',
    color: '#000', 
    fontSize: '36px',
    fontWeight: 'bold' 
}, {}, ['LEADERSHIP']);

// Team Grid (Side-by-side alignment)
const teamGrid = createElement('div', { 
    className: 'team-grid', 
    display: 'flex', 
    flexWrap: 'wrap', 
    justifyContent: 'center', 
    gap: '30px' 
});

const teamMembers = [
    { 
        name: 'John Ikpeme', 
        role: 'Chief Executive Officer', 
        img: 'johnikpeme.jpg', 
        bio: 'Setting the vision, strategy, and direction for Dash Studios.',
        linkedin: 'https://www.linkedin.com/in/john-i-02b82397/' 
    },
    { 
        name: 'Goodness O.', 
        role: 'Co-Founder & C.P.O', 
        img: 'goodness.jpg', 
        bio: 'Overseeing product and experiences, ensuring that our titles reflect our brand promises.',
        linkedin: 'https://www.linkedin.com/in/goodnessomogbadegun/' 
    },
    { 
        name: 'James Ohia', 
        role: 'Co-Founder & C.T.O', 
        img: 'james.jpg', 
        bio: 'Leads the development/programming team to create seamless gameplay.',
        linkedin: 'https://www.linkedin.com/in/james-ohia/' 
    },
    { 
        name: 'Ephraim Duvbiama', 
        role: 'Co-Founder & C.F.O', 
        img: 'ephraim.jpg', 
        bio: 'Overseeing the business of game development and keeping the studio healthy',
        linkedin: 'https://www.linkedin.com/in/ephraim-duvbiama/' 
    }
];

const teamCards = teamMembers.map(member => {
    const card = createElement('div', { 
        className: 'team-card',
        width: '300px', 
        textAlign: 'center',
        backgroundColor: '#FFF',
        padding: '20px',
        borderRadius: '10px', 
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between', 
        height: '450px' 
    });

    const img = createElement('img', { 
        width: '100%', 
        borderRadius: '10px', 
        height: '200px', 
        objectFit: 'cover' 
    }, { src: `assets/${member.img}`, alt: member.name });

    const name = createElement('h3', { 
        className: 'name', 
        color: '#1A1A1A',
        marginBottom: '5px',
        fontSize: '20px',
        fontWeight: '800'
    }, {}, [member.name]);

    const role = createElement('p', { 
        className: 'role', 
        fontWeight: '500',
        color: '#666666',
        marginBottom: '10px',
        fontSize: '14px'
    }, {}, [member.role]);
    
    const bio = createElement('p', { 
        className: 'bio', 
        color: '#000', 
        fontSize: '14px', 
        lineHeight: '1.5', 
        textAlign: 'center',
        height: '80px',
        overflow: 'hidden',
        marginBottom: '10px'
    }, {}, [member.bio]);

    const linkedinLink = document.createElement('a');
    linkedinLink.href = member.linkedin;
    linkedinLink.target = '_blank';
    linkedinLink.rel = 'noopener noreferrer';

    const linkedinIcon = createElement('img', { 
        width: '32px', 
        height: '32px', 
        cursor: 'pointer'
    }, { src: 'assets/linkedin-b.png', alt: 'LinkedIn' });

    linkedinLink.appendChild(linkedinIcon);

    const iconWrapper = createElement('div', { 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        marginTop: 'auto',
        paddingTop: '10px' 
    });

    iconWrapper.appendChild(linkedinLink);
    card.append(img, name, role, bio, iconWrapper);
    return card;
});

teamGrid.append(...teamCards);
leadership.append(leadershipTitle, teamGrid);
fadeInOnScroll(leadership);

// Our Commitments Section
const commitments = createElement('section', { 
    className: 'commitments-section',
    padding: '50px 0', 
    backgroundColor: '#FFFFFF'
});

const commitmentsTitle = createElement('h2', { 
    className: 'section-title', 
    textAlign: 'center',
    marginBottom: '40px', 
    color: '#000', 
    fontSize: '36px',
    fontWeight: 'bold' 
}, {}, ['OUR COMMITMENTS']);

const commitmentsContainer = createElement('div', { 
    className: 'commitments-container',
    display: 'flex', 
    flexDirection: 'column',
    width: '100%' // Full-width container
});

const commitmentItems = [
    { name: 'Africa First', img: 'africa-first2.jpg', bio: 'We prioritize games and developers that reflect African culture and stories, bringing them to a global audience.' },
    { name: 'Player Focused', img: 'slide8.jpg', bio: 'Putting players first, crafting immersive experiences that prioritise fun, fairness, education and engagement.' },
    { name: 'Community Driven', img: 'africa-first.jpg', bio: 'Building a community-driven gaming ecosystem where players connect, create, and thrive together.' },
    { name: 'Social Impact', img: 'social.jpg', bio: 'Educating and informing young Africans and global gamers about African history, stories and cultural heritage through our games.' },
    { name: 'Sustainability', img: 'sustain.jpg', bio: 'Committed to eco-friendly practices in game development and community impact.' }
];

let expandedCardIndex = 0;

const commitmentCards = commitmentItems.map((item, index) => {
    const card = createElement('div', { 
        className: 'commitment-card', // Add class for styling
        width: '100%', // Full-width card
        textAlign: 'center',
        background: 'rgba(0, 0, 0, 0.9)',
        height: index === expandedCardIndex ? '250px' : '120px',
        transition: 'height 0.3s ease',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        cursor: 'pointer',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden'
    });

    const imgWrapper = createElement('div', { 
        width: '30%', 
        height: '100%',
        overflow: 'hidden'
    });

    const img = createElement('img', { 
        width: '100%', 
        height: '100%',
        objectFit: 'cover', 
        display: 'block'
    }, { src: `assets/${item.img}`, alt: item.name });

    imgWrapper.append(img);

    const contentWrapper = createElement('div', { 
        width: '60%',
        padding: '20px',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#FFFFFF'
    });

    const name = createElement('h3', { 
        color: '#FFFFFF', 
        marginBottom: '5px',
        fontSize: '20px',
        fontWeight: '800',
        textTransform: 'uppercase'
    }, {}, [item.name]);

    const bio = createElement('p', { 
        className: 'commitment-bio',
        color: '#FFFFFF', 
        lineHeight: '1.5',
        display: index === expandedCardIndex ? 'block' : 'none'
    }, {}, [item.bio]);

    contentWrapper.append(name, bio);

    const plusIcon = createElement('div', {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#FFFFFF', 
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'opacity 0.3s ease',
        opacity: index === expandedCardIndex ? '0' : '1',
        marginRight: '20px'
    }, {}, ['+']);

    card.append(imgWrapper, contentWrapper, plusIcon);

    card.addEventListener('click', () => {
        if (index !== expandedCardIndex) {
            const prevCard = commitmentsContainer.children[expandedCardIndex];
            prevCard.style.height = '120px';
            prevCard.children[1].children[1].style.display = 'none';
            prevCard.children[2].style.opacity = '1';

            card.style.height = '250px';
            bio.style.display = 'block';
            plusIcon.style.opacity = '0';

            expandedCardIndex = index;
        }
    });

    return { card, name };
});

function updateFontSizes() {
    commitmentCards.forEach(({ name }) => {
        name.style.fontSize = window.innerWidth <= 768 ? '14px' : '20px';
    });
}

updateFontSizes();
window.addEventListener('resize', updateFontSizes);

commitmentsContainer.append(...commitmentCards.map(item => item.card));
commitments.append(commitmentsTitle, commitmentsContainer);
fadeInOnScroll(commitments);


// Append heroSection before other sections
mainContent.append(heroSection, ourStory, leadership, commitments);

// Footer (Black Background)
const footer = createElement('footer', {
    className: 'footer', // Add class for styling
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 50px',
    backgroundColor: '#000000',
    borderTop: '1px solid #333'
});

const footerLeft = createElement('div', { className: 'footer-left' });
const footerLogo = createElement('div', { cursor: 'pointer' });
const footerLogoLink = createElement('a', {}, { href: 'index.html' });
const footerLogoIcon = createElement('img', {
    height: '40px',
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
    className: 'footer-nav', // Add class for styling
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

const footerRight = createElement('div', { 
    className: 'footer-right', 
    textAlign: 'right' 
});

const socialLinks = createElement('div', {
    className: 'social-links', // Add class for styling
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
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

const email = createElement('p', { fontSize: '14px', margin: '5px 0', color: '#FFFFFF' }, {}, ['All Rights Reserved']);
const copyright = createElement('p', { fontSize: '14px', margin: '5px 0', color: '#FFFFFF' }, {}, ['© 2025 Dash Studios Inc.']);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);
fadeInOnScroll(footer);

// Append all sections to the app container
app.append(header, mainContent, footer);

// Start checking for image loads after content is appended
waitForImages();