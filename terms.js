// Get the app container
const app = document.getElementById('app');

// Determine if the device is mobile (declared once)
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
    .terms-section {
        background-color: #000000;
        width: 100%;
        padding: 100px 20px;
        color: #FFFFFF;
        text-align: left;
    }
    .terms-section h2 {
        font-size: 48px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 40px;
        text-transform: uppercase;
    }
    .terms-section h3 {
        font-size: 24px;
        font-weight: 600;
        color: #FFFFFF;
        margin: 20px 0 10px;
    }
    .terms-section p, .terms-section ul {
        font-size: 16px;
        color: #FFFFFF;
        line-height: 1.6;
        max-width: 800px;
        margin: 10px auto;
    }
    .terms-section ul {
        padding-left: 20px;
    }
    .terms-section li {
        margin-bottom: 8px;
    }
    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .news-article {
            width: 100%; /* One article per row */
        }
        .terms-section {
            margin-top: 80px; /* Push section down on mobile */
        }
        .terms-section h2 {
            font-size: 36px;
        }
        .terms-section h3 {
            font-size: 20px;
        }
        .terms-section p, .terms-section ul {
            font-size: 14px;
        }
        footer {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .footer-left, .footer-center {
            margin-bottom: 20px;
        }
        .footer-left, .footer-right {
            text-align: center;
        }
        .footer-center ul {
            flex-direction: column;
            gap: 10px;
        }
        .footer-center ul li a {
            font-size: 12px;
        }
        .footer-right .social-links {
            flex-direction: column;
            justify-content: center;
            gap: 10px;
        }
        .footer-right .social-links img {
            width: 20px;
            height: 20px;
        }
        .footer-right p {
            font-size: 12px;
            color: #FFFFFF;
        }
        .footer-logo img {
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

// Header
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

// Terms of Service Section
const termsSection = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '100px 20px',
    marginTop: isMobile ? '60px' : '0',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
}, { class: 'terms-section' });

const termsTitle = createElement('h2', {
    fontSize: isMobile ? '36px' : '48px',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '40px',
    textTransform: 'uppercase'
}, {}, ['Terms of Service']);

const termsContent = [
    createElement('p', {}, {}, ['Effective Date: March 28, 2025']),
    createElement('p', {}, {}, ['Last Updated: March 28, 2025']),
    createElement('p', {}, {}, [
        'Welcome to Dash Studios! These Terms of Service ("Terms") govern your access to and use of our games, websites, mobile applications, social media pages, customer support services, and any other products or services provided by Dash Studios ("we," "us," or "our"), collectively referred to as the "Services." Dash Studios is a gaming studio headquartered at Lagos, Nigeria.'
    ]),
    createElement('p', {}, {}, [
        'By accessing or using our Services, you agree to be bound by these Terms and all applicable laws and regulations. If you do not agree with any part of these Terms, you must not use our Services. We encourage you to read this document carefully and contact us with any questions.'
    ]),
    createElement('h3', {}, {}, ['1. Acceptance of Terms']),
    createElement('p', {}, {}, ['1.1 Agreement: These Terms constitute a legally binding agreement between you ("you" or "User") and Dash Studios. By downloading, installing, accessing, or using our Services, you confirm that you have read, understood, and agreed to these Terms.']),
    createElement('p', {}, {}, ['1.2 Eligibility: You must be at least 8 years old (or the age of majority in your jurisdiction, if higher) to use our Services. If you are under 18 (or the applicable age of majority), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.']),
    createElement('p', {}, {}, ['1.3 Updates: We may update these Terms from time to time. We will notify you of significant changes via email, in-game notices, or our website. Your continued use of the Services after such changes constitutes acceptance of the updated Terms.']),
    createElement('h3', {}, {}, ['2. License to Use Our Services']),
    createElement('p', {}, {}, ['2.1 Limited License: Subject to your compliance with these Terms, Dash Studios grants you a limited, non-exclusive, non-transferable, revocable license to access and use the Services for personal, non-commercial purposes.']),
    createElement('p', {}, {}, ['2.2 Restrictions: You may not:']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Modify, reverse-engineer, decompile, or disassemble any part of the Services.']),
        createElement('li', {}, {}, ['Copy, distribute, or create derivative works from the Services without our prior written consent.']),
        createElement('li', {}, {}, ['Use the Services for any illegal, unauthorized, or commercial purpose.']),
        createElement('li', {}, {}, ['Transfer, sell, or sublicense your account or access rights to another person.'])
    ]),
    createElement('p', {}, {}, ['2.3 Ownership: All rights, title, and interest in the Services, including intellectual property (e.g., game code, artwork, music, trademarks), remain the exclusive property of Dash Studios or our licensors.']),
    createElement('h3', {}, {}, ['3. Account Creation and Management']),
    createElement('p', {}, {}, ['3.1 Registration: Some Services may require you to create an account. You agree to provide accurate, current, and complete information during registration and to keep it updated.']),
    createElement('p', {}, {}, ['3.2 Security: You are responsible for maintaining the confidentiality of your account credentials (e.g., username, password). You must notify us immediately at [Insert Email Address] if you suspect unauthorized use of your account.']),
    createElement('p', {}, {}, ['3.3 Account Termination: We reserve the right to suspend or terminate your account at our sole discretion, with or without notice, for reasons including but not limited to violation of these Terms, fraudulent activity, or inactivity for an extended period (e.g., 12 months).']),
    createElement('h3', {}, {}, ['4. User Conduct']),
    createElement('p', {}, {}, ['4.1 Acceptable Use: You agree to use the Services in a manner that is lawful, respectful, and consistent with our Community Guidelines (if applicable). Prohibited actions include:']),
    createElement('ul', {}, {}, [
        createElement('li', {}, {}, ['Engaging in cheating, hacking, or exploiting bugs in the Services.']),
        createElement('li', {}, {}, ['Using bots, scripts, or automated tools to gain an unfair advantage.']),
        createElement('li', {}, {}, ['Harassing, threatening, or abusing other users through chat, forums, or other features.']),
        createElement('li', {}, {}, ['Posting or sharing content that is obscene, defamatory, discriminatory, or otherwise offensive.']),
        createElement('li', {}, {}, ['Attempting to disrupt the Services (e.g., through DDoS attacks or malware).'])
    ]),
    createElement('p', {}, {}, ['4.2 Consequences: Violation of this section may result in warnings, temporary bans, permanent account termination, or legal action, at our discretion.']),
    createElement('h3', {}, {}, ['5. Virtual Goods and In-Game Purchases']),
    createElement('p', {}, {}, ['5.1 Virtual Items: Some Services offer virtual goods, currencies, or subscriptions ("Virtual Items"). These are licensed to you, not sold, and remain our property. You have no ownership rights in Virtual Items.']),
    createElement('p', {}, {}, ['5.2 Payments: All purchases of Virtual Items are final and non-refundable, except as required by applicable law. Payments are processed by third-party providers, and you agree to their terms.']),
    createElement('p', {}, {}, ['5.3 Loss of Access: If your account is terminated or you stop using the Services, you will lose access to Virtual Items without compensation, unless otherwise required by law.']),
    createElement('p', {}, {}, ['5.4 Pricing and Availability: We may adjust prices, availability, or features of Virtual Items at any time without notice.']),
    createElement('h3', {}, {}, ['6. User-Generated Content']),
    createElement('p', {}, {}, ['6.1 Definition: "User-Generated Content" (UGC) includes any content you create or upload to the Services, such as avatars, forum posts, or in-game creations.']),
    createElement('p', {}, {}, ['6.2 License Grant: By submitting UGC, you grant Dash Studios a worldwide, perpetual, irrevocable, royalty-free license to use, reproduce, modify, distribute, and display such content in connection with the Services.']),
    createElement('p', {}, {}, ['6.3 Responsibility: You are solely responsible for your UGC. It must not infringe on third-party rights (e.g., copyright, privacy) or violate these Terms.']),
    createElement('p', {}, {}, ['6.4 Removal: We may remove or modify UGC at our discretion, especially if it violates these Terms or applicable laws.']),
    createElement('h3', {}, {}, ['7. Intellectual Property']),
    createElement('p', {}, {}, ['7.1 Our IP: The Services, including all software, designs, logos, and content, are protected by copyright, trademark, and other intellectual property laws. You may not use our IP without prior written permission.']),
    createElement('p', {}, {}, ['7.2 DMCA Policy: If you believe your copyright has been infringed within our Services, please contact us at [Insert Email Address] with details (e.g., description of the work, location of the infringement).']),
    createElement('h3', {}, {}, ['8. Privacy']),
    createElement('p', {}, {}, ['8.1 Data Practices: Your use of the Services is also governed by our Privacy Policy, available at [Insert Privacy Policy URL]. Please review it to understand how we collect, use, and protect your personal information.']),
    createElement('h3', {}, {}, ['9. Disclaimers and Limitation of Liability']),
    createElement('p', {}, {}, ['9.1 As-Is Basis: The Services are provided "as is" and "as available," without warranties of any kind, express or implied (e.g., fitness for a particular purpose, uninterrupted access).']),
    createElement('p', {}, {}, ['9.2 No Liability for Indirect Damages: To the fullest extent permitted by law, Dash Studios, its affiliates, and licensors will not be liable for indirect, incidental, consequential, or punitive damages arising from your use of the Services (e.g., loss of data, profits, or goodwill).']),
    createElement('p', {}, {}, ['9.3 Cap on Liability: Our total liability to you for any claim related to the Services will not exceed the amount you paid us (if any) in the 12 months preceding the claim, unless otherwise required by law.']),
    createElement('p', {}, {}, ['9.4 Exceptions: Nothing in these Terms excludes or limits liability for death, personal injury, fraud, or other matters that cannot be excluded under applicable law.']),
    createElement('h3', {}, {}, ['10. Termination']),
    createElement('p', {}, {}, ['10.1 By You: You may stop using the Services at any time by uninstalling our games or deleting your account (where applicable).']),
    createElement('p', {}, {}, ['10.2 By Us: We may terminate or suspend your access to the Services at any time, with or without cause, including for violation of these Terms or if we discontinue the Services.']),
    createElement('p', {}, {}, ['10.3 Effect of Termination: Upon termination, your license to use the Services ends, and you must cease all use. Sections of these Terms that by their nature should survive (e.g., ownership, liability) will remain in effect.']),
    createElement('h3', {}, {}, ['11. Force Majeure']),
    createElement('p', {}, {}, ['11.1 No Liability: We are not liable for delays or failures in providing the Services due to events beyond our reasonable control, such as natural disasters, war, government actions, or internet outages.']),
    createElement('h3', {}, {}, ['12. Governing Law and Dispute Resolution']),
    createElement('p', {}, {}, ['12.1 Applicable Law: These Terms are governed by the laws of Nigeria, without regard to conflict of law principles.']),
    createElement('p', {}, {}, ['12.2 Disputes: Any disputes arising from these Terms or the Services will be resolved through negotiation in good faith. If unresolved within 30 days, disputes will be submitted to the exclusive jurisdiction of the courts in Lagos, Nigeria, unless otherwise required by law.']),
    createElement('p', {}, {}, ['12.3 Arbitration Option: For international users, we may, at our discretion, offer binding arbitration as an alternative, conducted in English in Lagos, Nigeria, under the rules of the Nigerian Arbitration and Conciliation Act.']),
    createElement('h3', {}, {}, ['13. Third-Party Services']),
    createElement('p', {}, {}, ['13.1 External Links: The Services may include links to third-party websites, platforms, or services (e.g., payment processors, social media). We are not responsible for their content, availability, or terms.']),
    createElement('p', {}, {}, ['13.2 Third-Party Terms: Your use of third-party services integrated with ours (e.g., app stores) is subject to their respective terms and policies.']),
    createElement('h3', {}, {}, ['14. Modifications to Services']),
    createElement('p', {}, {}, ['14.1 Changes: We may update, modify, or discontinue the Services (or parts thereof) at any time, with or without notice. This includes game updates, server shutdowns, or feature removals.']),
    createElement('p', {}, {}, ['14.2 No Obligation: We are not obligated to maintain or support the Services indefinitely.']),
    createElement('h3', {}, {}, ['15. Indemnification']),
    createElement('p', {}, {}, ['15.1 Your Responsibility: You agree to indemnify and hold Dash Studios, its affiliates, officers, employees, and agents harmless from any claims, losses, or damages (including legal fees) arising from your use of the Services, violation of these Terms, or infringement of third-party rights.']),
    createElement('h3', {}, {}, ['16. Miscellaneous']),
    createElement('p', {}, {}, ['16.1 Entire Agreement: These Terms, along with our Privacy Policy and any additional agreements (e.g., Community Guidelines), constitute the entire agreement between you and Dash Studios regarding the Services.']),
    createElement('p', {}, {}, ['16.2 Severability: If any provision of these Terms is found invalid or unenforceable, the remaining provisions will remain in full force and effect.']),
    createElement('p', {}, {}, ['16.3 No Waiver: Our failure to enforce any right or provision does not constitute a waiver of that right or provision.']),
    createElement('p', {}, {}, ['16.4 Assignment: We may assign these Terms or delegate our obligations to a third party (e.g., in a merger). You may not assign your rights or obligations without our written consent.']),
    createElement('h3', {}, {}, ['17. Contact Us']),
    createElement('p', {}, {}, ['For questions, concerns, or to report violations of these Terms, please contact us at:']),
    createElement('p', {}, {}, ['Dash Studios']),
    createElement('p', {}, {}, ['Lagos, Nigeria']),
    createElement('p', {}, {}, ['Email: support@dashstudios.tech']),
    createElement('p', {}, {}, ['Thank you for choosing Dash Studios. We hope you enjoy our Services!'])
];

termsSection.append(termsTitle, ...termsContent);

// Footer
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

// Append all sections to the app container
app.append(header, termsSection, footer);

// Start checking for image loads after content is appended
waitForImages();