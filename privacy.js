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
    .privacy-section {
        background-color: #000000;
        width: 100%;
        padding: 100px 20px;
        color: #FFFFFF;
        text-align: left;
    }
    .privacy-section h2 {
        font-size: 48px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 40px;
        text-transform: uppercase;
    }
    .privacy-section h3 {
        font-size: 24px;
        font-weight: 600;
        color: #FFFFFF;
        margin: 20px 0 10px;
    }
    .privacy-section p, .privacy-section ul {
        font-size: 16px;
        color: #FFFFFF;
        line-height: 1.6;
        max-width: 800px;
        margin: 10px auto;
    }
    .privacy-section ul {
        padding-left: 20px;
    }
    .privacy-section li {
        margin-bottom: 8px;
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
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .news-article {
            width: 100%; /* One article per row */
        }
        .privacy-section h2 {
            font-size: 36px;
        }
        .privacy-section h3 {
            font-size: 20px;
        }
        .privacy-section p, .privacy-section ul {
            font-size: 14px;
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
            color: #FFFFFF;
        }
        footer > div:nth-child(1) > div > a > img {
            height: 30px;
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

// Header (Unchanged)
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

// Privacy Policy Section
const isMobile = window.innerWidth <= 768;
const privacySection = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '100px 20px',
    marginTop: isMobile ? '60px' : '0',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}, { class: 'privacy-section' });

const privacyTitle = createElement('h2', {
    fontSize: isMobile ? '36px' : '48px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '40px',
    textTransform: 'uppercase'
}, {}, ['Privacy Policy']);

const privacyContent = [
    createElement('p', {}, {}, ['Effective Date: March 28, 2025']),
    createElement('p', {}, {}, ['Last Updated: March 28, 2025']),
    createElement('p', {}, {}, [
        'Welcome to Dash Studios! We are a gaming studio based in Lagos, Nigeria, committed to creating immersive and entertaining gaming experiences for players worldwide. At Dash Studios ("we," "us," or "our"), your privacy is a top priority. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you interact with our games, websites, mobile applications, social media pages, customer support services, and any other services we provide (collectively, the "Services"). By using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.'
    ]),
    createElement('h3', {}, {}, ['1. Who We Are']),
    createElement('p', {}, {}, [
        'Dash Studios is a gaming studio headquartered at Lagos, Nigeria. We develop, publish, and operate video games and related digital content. As a data controller under the Nigeria Data Protection Regulation (NDPR) 2019, we are responsible for ensuring that your personal data is processed lawfully, fairly, and securely.'
    ]),
    createElement('h3', {}, {}, ['2. Information We Collect']),
    createElement('p', {}, {}, [
        'We collect various types of information to provide, improve, and personalize our Services. The information we collect depends on how you interact with us and may include:'
    ]),
    createElement('h4', {}, {}, ['2.1 Information You Provide Directly']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Account Information: When you create an account to play our games or access our Services, we may collect your username, email address, password (hashed), and, optionally, your full name, date of birth, and gender.']),
        createElement('li', {}, {}, ['Payment Information: If you make purchases (e.g., in-game items, subscriptions), we collect payment details such as your name, billing address, and transaction details. Note: Payment processing is handled by third-party providers, and we do not store full credit card numbers.']),
        createElement('li', {}, {}, ['Communications: When you contact us (e.g., via email, support tickets, or surveys), we collect your name, contact details, and the content of your message.']),
        createElement('li', {}, {}, ['User-Generated Content: If you upload content (e.g., avatars, profile pictures, or forum posts), we collect that content and associated metadata.']),
        createElement('li', {}, {}, ['Promotions and Events: If you participate in contests, giveaways, or events, we may collect your name, contact details, and any additional information required for participation.'])
    ]),
    createElement('h4', {}, {}, ['2.2 Information Collected Automatically']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Device and Usage Data: We collect information about your device and how you use our Services, including IP address, device type (e.g., mobile, PC, console), operating system and version, browser type (if applicable), unique device identifiers (e.g., IDFA, Android ID), game version and settings, time zone and language preferences, gameplay data (e.g., scores, progress, session duration, interactions).']),
        createElement('li', {}, {}, ['Analytics Data: We use analytics tools to track how you engage with our Services, such as pages visited, features used, and crash reports.']),
        createElement('li', {}, {}, ['Cookies and Similar Technologies: On our websites or browser-based Services, we use cookies, web beacons, and tracking pixels to enhance functionality, analyze usage, and deliver personalized ads. You can manage cookie preferences via your browser settings.'])
    ]),
    createElement('h4', {}, {}, ['2.3 Information from Third Parties']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Social Media Integration: If you log in via a social media account (e.g., Facebook, Google), we may receive your profile name, email, and friend list (if permitted by you).']),
        createElement('li', {}, {}, ['Partners and Advertisers: We may receive data from advertising networks, analytics providers, or other partners to improve our Services or target ads.']),
        createElement('li', {}, {}, ['Publicly Available Information: We may collect information from public sources (e.g., social media profiles) if you link them to our Services.'])
    ]),
    createElement('h4', {}, {}, ['2.4 Special Categories of Data']),
    createElement('p', {}, {}, [
        'We do not intentionally collect sensitive personal data (e.g., health information, biometric data, or political opinions) unless you voluntarily provide it (e.g., in a support message). If you are under 8 (or the applicable age of consent in your jurisdiction), please do not use our Services without parental consent.'
    ]),
    createElement('h3', {}, {}, ['3. How We Use Your Information']),
    createElement('p', {}, {}, ['We use your information for the following purposes:']),
    createElement('h4', {}, {}, ['3.1 To Provide and Operate Our Services']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Create and manage your account.']),
        createElement('li', {}, {}, ['Process payments and deliver in-game purchases.']),
        createElement('li', {}, {}, ['Enable multiplayer features, leaderboards, and social interactions.']),
        createElement('li', {}, {}, ['Provide customer support and respond to inquiries.'])
    ]),
    createElement('h4', {}, {}, ['3.2 To Improve and Develop Our Services']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Analyze gameplay data to fix bugs, optimize performance, and enhance user experience.']),
        createElement('li', {}, {}, ['Conduct research and development for new games, features, or updates.']),
        createElement('li', {}, {}, ['Monitor server performance and prevent technical issues.'])
    ]),
    createElement('h4', {}, {}, ['3.3 To Personalize Your Experience']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Customize game content, recommendations, and offers based on your preferences and behavior.']),
        createElement('li', {}, {}, ['Deliver location-based features (e.g., regional events) if you share your location.'])
    ]),
    createElement('h4', {}, {}, ['3.4 For Marketing and Communication']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Send you updates, newsletters, or promotional offers about our games and Services (you can opt out anytime).']),
        createElement('li', {}, {}, ['Display targeted ads within our games or on third-party platforms.']),
        createElement('li', {}, {}, ['Invite you to participate in surveys, beta tests, or events.'])
    ]),
    createElement('h4', {}, {}, ['3.5 For Security and Legal Compliance']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Detect and prevent fraud, cheating, or unauthorized access (e.g., hacking, bot usage).']),
        createElement('li', {}, {}, ['Enforce our Terms of Service and Community Guidelines.']),
        createElement('li', {}, {}, ['Comply with legal obligations, such as tax reporting or responding to lawful requests from authorities.'])
    ]),
    createElement('h4', {}, {}, ['3.6 Other Purposes']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Aggregate data for statistical analysis (e.g., to understand player demographics).']),
        createElement('li', {}, {}, ['Any other purpose disclosed to you at the time of collection, with your consent where required.'])
    ]),
    createElement('h3', {}, {}, ['4. Legal Basis for Processing (NDPR and Beyond)']),
    createElement('p', {}, {}, [
        'Under the NDPR and other applicable laws, we process your data based on:'
    ]),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Consent: Where you explicitly agree (e.g., marketing emails, optional features).']),
        createElement('li', {}, {}, ['Contract: To fulfill our agreement with you (e.g., providing the game after account creation).']),
        createElement('li', {}, {}, ['Legitimate Interests: For purposes like improving our Services, preventing fraud, or personalizing content, provided your rights are not overridden.']),
        createElement('li', {}, {}, ['Legal Obligation: To comply with laws or protect our rights.'])
    ]),
    createElement('h3', {}, {}, ['5. How We Share Your Information']),
    createElement('p', {}, {}, ['We do not sell your personal data. However, we may share it in these cases:']),
    createElement('h4', {}, {}, ['5.1 With Service Providers']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Third-party vendors (e.g., cloud hosting, payment processors, analytics firms) who process data on our behalf under strict confidentiality agreements.']),
        createElement('li', {}, {}, ['Examples: AWS (hosting), Stripe (payments), Google Analytics (usage tracking).'])
    ]),
    createElement('h4', {}, {}, ['5.2 With Business Partners']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Advertising networks to deliver targeted ads (you can opt out via game settings).']),
        createElement('li', {}, {}, ['Co-developers or publishers if we collaborate on a game.'])
    ]),
    createElement('h4', {}, {}, ['5.3 With Other Players']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Your username, avatar, and gameplay stats may be visible to others in multiplayer or social features.'])
    ]),
    createElement('h4', {}, {}, ['5.4 For Legal Reasons']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['To comply with court orders, subpoenas, or government requests.']),
        createElement('li', {}, {}, ['To protect our rights, property, or safety, or that of our users or the public.'])
    ]),
    createElement('h4', {}, {}, ['5.5 In Business Transfers']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['If Dash Studios is involved in a merger, acquisition, or asset sale, your data may be transferred to the new entity, with notice to you where required.'])
    ]),
    createElement('h3', {}, {}, ['6. Data Retention']),
    createElement('p', {}, {}, [
        'We keep your personal data only as long as necessary:'
    ]),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Active Accounts: Account and gameplay data are retained while you use our Services.']),
        createElement('li', {}, {}, ['Inactive Accounts: If you stop using our Services, we may retain data for up to 2 years (or as required by law) before deletion, unless you request earlier removal.']),
        createElement('li', {}, {}, ['Legal Requirements: Transaction records may be kept for 7 years for tax or audit purposes.']),
        createElement('li', {}, {}, ['Anonymized Data: We may retain anonymized data indefinitely for analytics.'])
    ]),
    createElement('h3', {}, {}, ['7. Your Rights']),
    createElement('p', {}, {}, [
        'Under the NDPR and other applicable laws, you have rights regarding your data:'
    ]),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Access: Request a copy of the personal data we hold about you.']),
        createElement('li', {}, {}, ['Rectification: Ask us to correct inaccurate or incomplete data.']),
        createElement('li', {}, {}, ['Deletion: Request deletion of your data (subject to legal exceptions).']),
        createElement('li', {}, {}, ['Restriction: Limit how we process your data in certain cases.']),
        createElement('li', {}, {}, ['Portability: Receive your data in a structured, machine-readable format.']),
        createElement('li', {}, {}, ['Objection: Object to processing based on legitimate interests (e.g., marketing).']),
        createElement('li', {}, {}, ['Withdraw Consent: Opt out of optional data uses at any time.'])
    ]),
    createElement('p', {}, {}, [
        'To exercise these rights, contact us at support@dashstudios.tech. We’ll respond within 7 days (or as required by law). You may need to verify your identity.'
    ]),
    createElement('h3', {}, {}, ['8. International Data Transfers']),
    createElement('p', {}, {}, [
        'As a global gaming studio, we may transfer your data outside Nigeria (e.g., to servers in the US or EU). We ensure such transfers comply with NDPR requirements, using safeguards like Standard Contractual Clauses or adequacy decisions where applicable.'
    ]),
    createElement('h3', {}, {}, ['9. Security Measures']),
    createElement('p', {}, {}, [
        'We use industry-standard measures to protect your data, including:'
    ]),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Encryption of data in transit (e.g., SSL/TLS) and at rest.']),
        createElement('li', {}, {}, ['Access controls and authentication for our staff.']),
        createElement('li', {}, {}, ['Regular security audits and updates.']),
        createElement('li', {}, {}, ['Firewalls and intrusion detection systems.'])
    ]),
    createElement('p', {}, {}, [
        'However, no system is 100% secure. If a breach occurs, we’ll notify you and relevant authorities as required by law.'
    ]),
    createElement('h3', {}, {}, ['10. Children’s Privacy']),
    createElement('p', {}, {}, [
        'Our Services are not intended for children under 8 (or the applicable age of consent). We do not knowingly collect data from children without parental consent. If we learn we’ve collected such data, we’ll delete it promptly. Parents can contact us to review or remove their child’s data.'
    ]),
    createElement('h3', {}, {}, ['11. Third-Party Links and Services']),
    createElement('p', {}, {}, [
        'Our Services may contain links to third-party websites, ads, or services (e.g., social media platforms). We’re not responsible for their privacy practices. Review their policies before sharing data.'
    ]),
    createElement('h3', {}, {}, ['12. Cookies and Tracking']),
    createElement('p', {}, {}, [
        'We use cookies and similar technologies for:'
    ]),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Essential Functions: Login sessions, game performance.']),
        createElement('li', {}, {}, ['Analytics: Usage trends, crash reports.']),
        createElement('li', {}, {}, ['Advertising: Personalized ads.'])
    ]),
    createElement('p', {}, {}, [
        'Manage preferences in your device or browser settings. Disabling cookies may limit functionality.'
    ]),
    createElement('h3', {}, {}, ['13. Changes to This Policy']),
    createElement('p', {}, {}, [
        'We may update this Privacy Policy to reflect changes in our practices or legal requirements. We’ll notify you of significant changes via email, in-game notices, or our website. Continued use of our Services after changes implies acceptance.'
    ]),
    createElement('h3', {}, {}, ['14. Contact Us']),
    createElement('p', {}, {}, [
        'For questions, complaints, or to exercise your rights, reach us at:'
    ]),
    createElement('p', {}, {}, [
        'Dash Studios'
    ]),
    createElement('p', {}, {}, [
        'Lagos, Nigeria'
    ]),
    createElement('p', {}, {}, [
        'Email: support@dashstudios.tech'
    ]),
    createElement('p', {}, {}, [
        'You may also lodge a complaint with the Nigeria Data Protection Commission (NDPC) if you believe we’ve mishandled your data.'
    ]),
    createElement('h3', {}, {}, ['15. Additional Information for Specific Regions']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['EU/EEA Users (GDPR): You have additional rights like lodging complaints with your local data protection authority.']),
        createElement('li', {}, {}, ['US Users: We comply with state laws like the CCPA where applicable. Contact us for details.'])
    ]),
    createElement('p', {}, {}, [
        'This Privacy Policy reflects Dash Studios’ commitment to protecting your privacy while delivering exceptional gaming experiences. Thank you for trusting us with your data!'
    ])
];

privacySection.append(privacyTitle, ...privacyContent);

// Footer (Adapted from terms.html)
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
app.append(header, privacySection, footer);

// Start checking for image loads after content is appended
waitForImages();