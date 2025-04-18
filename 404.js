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
        font-family: 'Sora', Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
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
        min-height: 100vh;
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
    .error-section dotlottie-player {
        width: 300px;
        height: 300px;
        margin: 20px 0;
        display: block !important;
        visibility: visible !important;
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
    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
    }
    @media (max-width: 768px) {
        .error-section {
            padding: 60px 20px;
        }
        .error-section h2 {
            font-size: 36px;
        }
        .error-section p {
            font-size: 16px;
        }
        .error-section dotlottie-player {
            width: 200px;
            height: 200px;
        }
        .error-section button {
            font-size: 14px;
            padding: 8px 16px;
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

    console.log(`Total resources to load: ${totalResources}`);
    console.log(`Images: ${images.length}, Lottie players: ${lottiePlayers.length}`);

    if (totalResources === 0) {
        console.log('No resources to load, hiding loading screen');
        loadingScreen.classList.add('hidden');
        app.style.display = 'block';
        setTimeout(() => loadingScreen.remove(), 500);
        return;
    }

    const checkAllLoaded = (resourceType, src) => {
        loadedCount++;
        console.log(`Loaded ${resourceType}: ${src} (${loadedCount}/${totalResources})`);
        if (loadedCount === totalResources) {
            console.log('All resources loaded, hiding loading screen');
            loadingScreen.classList.add('hidden');
            app.style.display = 'block';
            setTimeout(() => loadingScreen.remove(), 500);
        }
    };

    images.forEach(img => {
        if (img.complete) {
            checkAllLoaded('image', img.src);
        } else {
            img.addEventListener('load', () => checkAllLoaded('image', img.src));
            img.addEventListener('error', () => {
                console.warn(`Failed to load image: ${img.src}`);
                checkAllLoaded('image', img.src);
            });
        }
    });

    lottiePlayers.forEach(player => {
        player.addEventListener('ready', () => checkAllLoaded('Lottie', player.getAttribute('src')));
        player.addEventListener('error', () => {
            console.warn(`Failed to load Lottie animation: ${player.getAttribute('src')}`);
            checkAllLoaded('Lottie', player.getAttribute('src'));
        });
    });

    // Fallback timeout
    setTimeout(() => {
        if (loadedCount < totalResources) {
            console.warn(`Timeout: Only ${loadedCount}/${totalResources} resources loaded. Forcing loading screen hide.`);
            loadingScreen.classList.add('hidden');
            app.style.display = 'block';
            setTimeout(() => loadingScreen.remove(), 500);
        }
    }, 10000); // 10 seconds
}

// 404 Error Section
const errorSection = createElement('section', {
    backgroundColor: '#000000',
    width: '100%',
    padding: '100px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
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
    margin: '20px 0',
    display: 'block'
}, {
    src: 'https://lottie.host/3c13d768-cbea-4bd5-8395-e2e0f6365f9d/KgUtLXaPyR.lottie',
    background: 'transparent',
    speed: '1',
    loop: 'true',
    autoplay: 'true',
    renderer: 'svg'
});

// Fallback if Lottie fails
lottiePlayer.addEventListener('error', () => {
    console.warn('Lottie player failed to load animation');
    lottiePlayer.style.display = 'none';
    const fallbackText = createElement('p', {
        color: '#ffffff',
        fontSize: '16px'
    }, {}, ['Animation failed to load.']);
    errorSection.insertBefore(fallbackText, homeButton);
});

const homeButton = createElement('button', {}, {}, ['Back to Home']);
homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

errorSection.append(errorTitle, errorMessage, lottiePlayer, homeButton);

// Append only the error section to the app container
app.append(errorSection);

// Start checking for resource loads after content is appended
waitForResources();