// Get the app container
const app = document.getElementById("app");

// Helper function to create elements with styles and attributes
function createElement(tag, styles = {}, attributes = {}, children = []) {
  const element = document.createElement(tag);
  Object.assign(element.style, { fontFamily: "Lilita One" }, styles);
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
  );
  children.forEach((child) => {
    if (typeof child === "string") {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

// Header (Sticky, White Background)
const header = createElement("header", {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "2vh 3vw",
  backgroundColor: "#FFFFFF",
  borderBottom: "0.1vw solid #333",
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  zIndex: "1000",
});

const headerLeft = createElement("div", {
  display: "flex",
  alignItems: "center",
  gap: "2vw",
});
const logo = createElement("div", { cursor: "pointer" });
const logoLink = createElement("a", {}, { href: "nounshunt.html" });
const logoIcon = createElement(
  "img",
  {
    height: "4vh",
    width: "auto",
    display: "block",
    transition: "transform 0.5s ease",
  },
  { src: "assets/Asset 102@2x.png", alt: "Logo" }
);

logoLink.appendChild(logoIcon);
logo.appendChild(logoLink);

const nav = createElement("nav", {});
const navLinks = createElement("ul", {
  listStyle: "none",
  display: "flex",
  alignItems: "center",
});
navLinks.className = "nav-links";

// Function to adjust nav item font size based on screen width
function adjustNavFontSize() {
  const isMobile = window.innerWidth <= 768;
  const navItems = navLinks.querySelectorAll("a");
  navItems.forEach((item) => {
    item.style.fontSize = isMobile ? "5vw" : "2.7vw";
  });
}

const navItems = [
  { text: "GAME OVERVIEW", id: "game-overview" },
  { text: "RANKINGS", id: "rankings" },
  { text: "NEWS", id: "news" },
].map((item) => {
  const li = createElement("li", {
    margin: "0 1.5vw",
    display: "inline-block",
  });
  const a = createElement(
    "a",
    {
      color: "#000000",
      textDecoration: "none",
      paddingBottom: "0.5vh",
      display: "inline-block",
      textTransform: "uppercase",
      transition:
        "border-bottom 0.3s ease, transform 0.3s ease, color 0.3s ease",
    },
    { href: `#${item.id}` },
    [item.text]
  );

  a.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById(item.id).scrollIntoView({ behavior: "smooth" });
  });

  a.addEventListener("mouseenter", () => {
    a.style.borderBottom = "0.3vh solid #000000";
    a.style.color = "#000000";
    a.style.animation = "bounce 0.4s ease";
  });
  a.addEventListener("mouseleave", () => {
    a.style.borderBottom = "none";
    a.style.color = "#000000";
  });

  li.appendChild(a);
  return li;
});
navLinks.append(...navItems);
nav.appendChild(navLinks);

headerLeft.append(logo, nav);

const headerRight = createElement("div", {
  display: "flex",
  alignItems: "center",
  marginRight: "2vw",
});
const hamburger = createElement("div", {});
hamburger.className = "hamburger";
const line1 = createElement("span", { backgroundColor: "#000000" });
const line2 = createElement("span", { backgroundColor: "#000000" });
const line3 = createElement("span", { backgroundColor: "#000000" });
hamburger.append(line1, line2, line3);
headerRight.append(hamburger);

header.append(headerLeft, headerRight);

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
  navLinks.style.backgroundColor = navLinks.classList.contains("active")
    ? "#FFFFFF"
    : "transparent";
});

// Initial nav font size adjustment
adjustNavFontSize();

// Update nav font size on window resize
window.addEventListener("resize", adjustNavFontSize);

// Main Content Sections (White Background)
const mainContent = createElement("main", {
  backgroundColor: "#FFFFFF",
  padding: "0 0 5vh",
});

// Hero Section (Full-Screen Video)
const heroSection = document.createElement("section");
heroSection.style.position = "relative";
heroSection.style.height = "100vh";
heroSection.style.width = "100vw";
heroSection.style.overflow = "hidden";

// Create Video Container
const videoContainer = document.createElement("div");
videoContainer.style.position = "absolute";
videoContainer.style.top = "0";
videoContainer.style.left = "0";
videoContainer.style.width = "100%";
videoContainer.style.height = "100%";
videoContainer.style.overflow = "hidden";

// Create Video Element
const video = document.createElement("video");
video.style.width = "100%";
video.style.height = "100%";
video.style.objectFit = "cover";
video.setAttribute("src", "assets/mainvideo.webm");
video.setAttribute("muted", "");
video.setAttribute("loop", "");
video.setAttribute("playsinline", "");
video.setAttribute("autoplay", "");

// Create Content Container for Logo and Button
const contentContainer = createElement("div", {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2vh",
  zIndex: "10",
});

// Function to adjust sizes based on screen width
function adjustMobileSizes() {
  const isMobile = window.innerWidth <= 768;

  // Nouns Hunt Logo
  nounsHuntLogo.style.width = isMobile ? "95vw" : "50vw";
  nounsHuntLogo.style.maxWidth = isMobile ? "100vw" : "70vw";

  // Download Now Button
  downloadLink.style.padding = isMobile ? "2vh 4vw" : "1.5vh 3vw";
  downloadLink.style.fontSize = isMobile ? "4.5vw" : "1.8vw";
  downloadLink.style.borderRadius = isMobile ? "0.7vw" : "0.5vw";
}

// Add Nouns Hunt Logo with initial relative sizing
const nounsHuntLogo = createElement(
  "img",
  {
    height: "auto",
    display: "block",
  },
  { src: "assets/Asset 102@2x.png", alt: "Nouns Hunt Logo" }
);

// Add Download Now Button as a link with initial relative sizing
const downloadLink = createElement(
  "a",
  {
    backgroundColor: "#FFFFFF",
    color: "#000000",
    border: "none",
    cursor: "pointer",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "background-color 0.3s ease, transform 0.3s ease",
    display: "inline-block",
  },
  {
    href: "https://urlgeni.us/nounshuntgame",
    target: "_blank",
  },
  ["Download Now"]
);

downloadLink.addEventListener("mouseenter", () => {
  downloadLink.style.backgroundColor = "#E0E0E0";
  downloadLink.style.transform = "scale(1.05)";
});
downloadLink.addEventListener("mouseleave", () => {
  downloadLink.style.backgroundColor = "#FFFFFF";
  downloadLink.style.transform = "scale(1)";
});

// Initial size adjustment
adjustMobileSizes();

// Update sizes on window resize
window.addEventListener("resize", adjustMobileSizes);

// Dark Overlay
const overlay = document.createElement("div");
overlay.style.position = "absolute";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

// Assemble hero section
contentContainer.append(nounsHuntLogo, downloadLink);
videoContainer.appendChild(video);
heroSection.append(videoContainer, overlay, contentContainer);

// Game Info Section
const gameInfoSection = createElement("section", {
  backgroundColor: "#FFFFFF",
  padding: "5vh 5vw",
  textAlign: "center",
});

const gameTitle = createElement(
  "h1",
  {
    fontSize: "5vw", // Default for desktop
    color: "#000000",
    marginBottom: "2vh",
    textTransform: "uppercase",
  },
  {},
  ["NOUNS HUNT"]
);

const gameDescription = createElement(
  "p",
  {
    fontSize: "2vw", // Default for desktop
    color: "#333333",
    maxWidth: "80vw",
    margin: "0 auto",
    lineHeight: "1.5",
  },
  {},
  [
    "Nouns Hunt is a fast-paced word game inspired by scattergories, where players name a person, place, animal, or thing based on given categories. Play solo or challenge friends/players online in multiplayer mode, competing globally on leaderboards. With over 15+ categories and support for up to 50 players per session, this is the ultimate test of quick thinking and vocabulary skills!",
  ]
);

// Function to adjust font sizes based on screen width
function adjustGameInfoFontSizes() {
  const isMobile = window.innerWidth <= 768;
  gameTitle.style.fontSize = isMobile ? "10vw" : "5vw";
  gameDescription.style.fontSize = isMobile ? "5.5vw" : "2vw";
}

// Initial adjustment
adjustGameInfoFontSizes();

// Update font sizes on window resize
window.addEventListener("resize", adjustGameInfoFontSizes);

gameInfoSection.append(gameTitle, gameDescription);

// Game Overview Section (Slider)
const gameOverviewSection = createElement("section", {
  backgroundColor: "#FFFFFF",
  padding: "5vh 5vw",
  textAlign: "center",
});
gameOverviewSection.id = "game-overview";

const overviewTitle = createElement(
  "h2",
  {
    fontSize: "4vw",
    color: "#000000",
    textAlign: "center",
    marginBottom: "4vh",
    textTransform: "uppercase",
  },
  {},
  ["Game Overview"]
);

// Array of steps with sample text and corresponding screenshots
const steps = [
  { text: "Smash combos on Singleplayer!", img: "screenshot1.png" },
  {
    text: 'Play "Private" with friends or "Public" to compete online',
    img: "screenshot2.png",
  },
  { text: "Host or Join Game", img: "screenshot3.png" },
  {
    text: "Setup your game by choosing from a list of expanding categories",
    img: "screenshot4.png",
  },
  { text: "Invite friends to join your game", img: "screenshot5.png" },
  { text: "Pick an alphabet", img: "screenshot6.png" },
  { text: "20 seconds to answer four categories", img: "screenshot7.png" },
  { text: "Use lifelines", img: "screenshot13.png" },
  { text: "Done? Stop Everyone!", img: "screenshot13.png" },
  { text: "Plagiarism based scoring", img: "screenshot9.png" },
  { text: "Join a public game", img: "screenshot11.png" },
  { text: "Set up a public game of your own", img: "screenshot15.png" },
  { text: "Achieve Milestones!", img: "screenshot14.png" },
  { text: "Climb leaderboards!", img: "screenshot16.png" },
];

// Slider Content
const sliderContent = createElement("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transition: "opacity 0.5s ease",
});

let currentIndex = 0;

// Function to adjust font sizes based on screen width
function adjustOverviewFontSizes() {
  const isMobile = window.innerWidth <= 768;
  overviewTitle.style.fontSize = isMobile ? "7vw" : "4vw";
}

// Function to update slider content
function updateSlider() {
  const step = steps[currentIndex];

  sliderContent.innerHTML = "";

  const stepDescription = createElement(
    "p",
    {
      fontSize: window.innerWidth <= 768 ? "5.5vw" : "2vw",
      color: "#333333",
      marginBottom: "2vh",
      lineHeight: "1.5",
      textAlign: "center",
    },
    {},
    [`${currentIndex + 1}. ${step.text}`]
  );

  const navWrapper = createElement("div", {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10vw",
    marginBottom: "2vh",
  });

  const backButton = createElement(
    "button",
    {
      fontSize: window.innerWidth <= 768 ? "7vw" : "4vw",
      color: "#000000",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    {},
    ["<"]
  );
  backButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + steps.length) % steps.length;
    updateSlider();
  });

  const nextButton = createElement(
    "button",
    {
      fontSize: window.innerWidth <= 768 ? "7vw" : "4vw",
      color: "#000000",
      background: "none",
      border: "none",
      cursor: "pointer",
    },
    {},
    [">"]
  );
  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % steps.length;
    updateSlider();
  });

  const stepImage = createElement(
    "img",
    {
      width: "40vh",
      height: "auto",
      borderRadius: "1vw",
      boxShadow: "0 0.5vh 1vw rgba(0,0,0,0.2)",
      display: "block",
      margin: "0 auto",
    },
    { src: `assets/${step.img}`, alt: `Screenshot ${currentIndex + 1}` }
  );

  navWrapper.append(backButton, nextButton);
  sliderContent.append(stepDescription, navWrapper, stepImage);
}

// Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

gameOverviewSection.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

gameOverviewSection.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  if (touchStartX - touchEndX > 50) {
    currentIndex = (currentIndex + 1) % steps.length;
    updateSlider();
  } else if (touchEndX - touchStartX > 50) {
    currentIndex = (currentIndex - 1 + steps.length) % steps.length;
    updateSlider();
  }
});

// Initial adjustments and setup
adjustOverviewFontSizes();
updateSlider();

window.addEventListener("resize", () => {
  adjustOverviewFontSizes();
  updateSlider();
});

gameOverviewSection.append(overviewTitle, sliderContent);

// Rankings Section
const rankingsSection = createElement("section", {
  backgroundColor: "#FFFFFF",
  padding: "5vh 5vw",
  textAlign: "center",
});
rankingsSection.id = "rankings";

const rankingsTitle = createElement(
  "h2",
  {
    fontSize: "4vw",
    color: "#000000",
    marginBottom: "4vh",
    textTransform: "uppercase",
  },
  {},
  ["Rankings"]
);

// Container for Singleplayer and Multiplayer boxes
const rankingsContainer = createElement("div", {
  display: "flex",
  justifyContent: "space-around",
  gap: "5vw",
  flexWrap: "wrap",
});

// Singleplayer Box
const singleplayerBox = createElement("div", {
  width: "40%",
  minWidth: "300px",
  backgroundColor: "#F5F5F5",
  padding: "2vh 2vw",
  borderRadius: "1vw",
  boxShadow: "0 0.5vh 1vw rgba(0,0,0,0.2)",
});

const singleplayerTitle = createElement(
  "h3",
  {
    fontSize: "2.5vw",
    color: "#000000",
    marginBottom: "2vh",
    textTransform: "uppercase",
  },
  {},
  ["Singleplayer"]
);

const singleplayerTable = createElement("table", {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "1.5vw",
});
const spThead = createElement("thead", {});
const spHeaderRow = createElement("tr", {});
const spHeaders = ["Rank", "Player", "Score"].map((text) =>
  createElement(
    "th",
    { padding: "1vh", borderBottom: "0.2vh solid #333", color: "#301934" },
    {},
    [text]
  )
);
spHeaderRow.append(...spHeaders);
spThead.append(spHeaderRow);
const spTbody = createElement("tbody", {}, { id: "singleplayer-tbody" });
singleplayerTable.append(spThead, spTbody);
singleplayerBox.append(singleplayerTitle, singleplayerTable);

// Multiplayer Box
const multiplayerBox = createElement("div", {
  width: "40%",
  minWidth: "300px",
  backgroundColor: "#F5F5F5",
  padding: "2vh 2vw",
  borderRadius: "1vw",
  boxShadow: "0 0.5vh 1vw rgba(0,0,0,0.2)",
});

const multiplayerTitle = createElement(
  "h3",
  {
    fontSize: "2.5vw",
    color: "#000000",
    marginBottom: "2vh",
    textTransform: "uppercase",
  },
  {},
  ["Multiplayer"]
);

const multiplayerTable = createElement("table", {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "1.5vw",
});
const mpThead = createElement("thead", {});
const mpHeaderRow = createElement("tr", {});
const mpHeaders = ["Rank", "Player", "Score"].map((text) =>
  createElement(
    "th",
    { padding: "1vh", borderBottom: "0.2vh solid #333", color: "#301934" },
    {},
    [text]
  )
);
mpHeaderRow.append(...mpHeaders);
mpThead.append(mpHeaderRow);
const mpTbody = createElement("tbody", {}, { id: "multiplayer-tbody" });
multiplayerTable.append(mpThead, mpTbody);
multiplayerBox.append(multiplayerTitle, multiplayerTable);

// Function to adjust Rankings font sizes based on screen width
function adjustRankingsFontSizes() {
  const isMobile = window.innerWidth <= 768;
  rankingsTitle.style.fontSize = isMobile ? "8vw" : "4vw";
  singleplayerTitle.style.fontSize = isMobile ? "6vw" : "2.5vw";
  multiplayerTitle.style.fontSize = isMobile ? "6vw" : "2.5vw";
  singleplayerTable.style.fontSize = isMobile ? "4vw" : "1.5vw";
  multiplayerTable.style.fontSize = isMobile ? "4vw" : "1.5vw";
}

// Initial font size adjustment for Rankings
adjustRankingsFontSizes();

// Update font sizes on window resize
window.addEventListener("resize", adjustRankingsFontSizes);

rankingsContainer.append(singleplayerBox, multiplayerBox);
rankingsSection.append(rankingsTitle, rankingsContainer);

// Function to fetch and update rankings from API
function updateRankings() {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");
  headers.append("Origin", window.location.origin);

  const body = JSON.stringify("{\"name\": \"sp_global\", \"limit\":10}");

  const requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  fetch(
    "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-52b9002e-46ba-4c1f-bb34-b33b02c380c8/default/listleaderboardrecords?leaderboard=sp_global&limit=10",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("singleplayer-tbody");
      tbody.innerHTML = "";

      data.slice(0, 10).forEach((player, index) => {
        const row = createElement("tr", {});
        const rank = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000" },
          {},
          [player.rank.toString()]
        );
        const nameTd = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000", display: "flex", alignItems: "center" },
          {},
        );
        const avatarImg = createElement(
          "img",
          {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
            verticalAlign: "middle",
          },
          { src: `avatars/${player.avatar}.png`, alt: "Avatar" }
        );
        avatarImg.addEventListener("mouseenter", () => {
          avatarImg.src = `avatars/${player.avatar}_active.png`;
        });
        avatarImg.addEventListener("mouseleave", () => {
          avatarImg.src = `avatars/${player.avatar}.png`;
        });
        nameTd.append(avatarImg, document.createTextNode(player.username));
        const score = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000" },
          {},
          [String(player.score.toString())]
        );

        row.append(rank, nameTd, score);
        tbody.append(row);
      });
    })
    .catch((error) =>
      console.error("Error fetching Singleplayer rankings:", error)
    );

  fetch(
    "https://faas-fra1-afec6ce7.doserverless.co/api/v1/web/fn-52b9002e-46ba-4c1f-bb34-b33b02c380c8/default/listleaderboardrecords?leaderboard=mp_global&limit=10",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      const tbody = document.getElementById("multiplayer-tbody");
      tbody.innerHTML = "";

      data.slice(0, 10).forEach((player, index) => {
        const row = createElement("tr", {});
        const rank = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000" },
          {},
          [player.rank.toString()]
        );
        const nameTd = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000", display: "flex", alignItems: "center" },
          {},
        );
        const avatarImg = createElement(
          "img",
          {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginRight: "10px",
            verticalAlign: "middle",
          },
          { src: `avatars/${player.avatar}.png`, alt: "Avatar" }
        );
        avatarImg.addEventListener("mouseenter", () => {
          avatarImg.src = `avatars/${player.avatar}_active.png`;
        });
        avatarImg.addEventListener("mouseleave", () => {
          avatarImg.src = `avatars/${player.avatar}.png`;
        });
        nameTd.append(avatarImg, document.createTextNode(player.username));
        const score = createElement(
          "td",
          { padding: "1vh", borderBottom: "0.1vh solid #ccc", color: "#000000" },
          {},
          [String(player.score.toString())]
        );

        row.append(rank, nameTd, score);
        tbody.append(row);
      });
    })
    .catch((error) =>
      console.error("Error fetching Singleplayer rankings:", error)
    );
}

// Initial fetch and set interval to refresh every 5 minutes (300,000 ms)
updateRankings();
setInterval(updateRankings, 300000);

// News Section
const newsSection = createElement("section", {
  backgroundColor: "#FFFFFF",
  padding: "5vh 5vw",
  textAlign: "center",
});
newsSection.id = "news";

const newsTitle = createElement(
  "h2",
  {
    fontSize: "4vw",
    color: "#000000",
    marginBottom: "4vh",
    textTransform: "uppercase",
  },
  {},
  ["News"]
);

// Container for news articles
const newsContainer = createElement("div", {
  display: "flex",
  flexDirection: "column",
  gap: "3vh",
  maxWidth: "80vw",
  margin: "0 auto",
});

// Sample news articles
const newsArticles = [
  {
    image: "news-3.jpg",
    description:
      "Nouns Hunt v2.0 releases with major changes and public multiplayer.",
    link: "https://medium.com/@dashgamingstudios/nouns-hunt-2-0-full-release-unleashes-global-multiplayer-and-game-changing-upgrades-eec11c0702cc",
  },
  {
    image: "slide10.jpg",
    description: "Behind the scenes - Nouns Hunt",
    link: "https://www.instagram.com/p/C7chCfHs6GA/?igsh=ejgzZGQ3a21yb2px",
  },
  {
    image: "5000.jpg",
    description: "Nouns Hunt hits 5000 players milestone on open beta.",
    link: "https://www.linkedin.com/posts/john-i-02b82397_im-excited-to-announce-that-weve-just-surpassed-activity-7219238908146946048-yiVv?utm_source=share&utm_medium=member_desktop&rcm=ACoAABSWxmMBGPEyCt8_aF0B5A1WNlpxBkEKxZk",
  },
];

// Create article rectangles
newsArticles.forEach((article) => {
  const articleBox = createElement("div", {
    display: "flex",
    backgroundColor: "#F5F5F5",
    borderRadius: "2vw",
    overflow: "hidden",
    boxShadow: "0 0.5vh 1vw rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "100%",
    height: "18vh", // Fixed height for all rectangles
  });

  const articleImage = createElement(
    "img",
    {
      width: "20%",
      height: "100%", // Matches the fixed height of articleBox
      objectFit: "cover", // Crops the image to fit without stretching
      objectPosition: "center", // Centers the cropped image
    },
    { src: `assets/${article.image}`, alt: "News Image" }
  );

  const articleContent = createElement("div", {
    padding: "2vh 2vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "70%",
    textAlign: "left",
  });

  const articleDesc = createElement(
    "p",
    {
      fontSize: "1.8vw",
      color: "#333333",
      marginBottom: "1vh",
      lineHeight: "1.5",
    },
    {},
    [article.description]
  );

  const readMore = createElement(
    "a",
    {
      fontSize: "1.5vw",
      color: "#0000FF",
      textDecoration: "underline",
      textTransform: "uppercase",
      cursor: "pointer",
      transition: "color 0.3s ease",
    },
    {
      href: article.link,
      target: "_blank", // Opens in a new tab
    },
    ["Read More"]
  );

  readMore.addEventListener("mouseenter", () => {
    readMore.style.color = "#FF0000";
  });
  readMore.addEventListener("mouseleave", () => {
    readMore.style.color = "#0000FF";
  });

  articleContent.append(articleDesc, readMore);
  articleBox.append(articleImage, articleContent);
  newsContainer.append(articleBox);
});

// Function to adjust News font sizes based on screen width
function adjustNewsFontSizes() {
  const isMobile = window.innerWidth <= 768;
  newsTitle.style.fontSize = isMobile ? "8vw" : "4vw"; // Larger title on mobile
  newsContainer.querySelectorAll("p").forEach((desc) => {
    desc.style.fontSize = isMobile ? "4vw" : "1.8vw"; // Larger description on mobile
  });
  newsContainer.querySelectorAll("a").forEach((link) => {
    link.style.fontSize = isMobile ? "3.5vw" : "1.5vw"; // Larger Read More on mobile
  });
}

// Initial font size adjustment for News
adjustNewsFontSizes();

// Update font sizes on window resize
window.addEventListener("resize", adjustNewsFontSizes);

newsSection.append(newsTitle, newsContainer);

// Main content assembly
mainContent.append(
  heroSection,
  gameInfoSection,
  gameOverviewSection,
  rankingsSection,
  newsSection
);

// Final Fix: Ensure video plays on page load
window.onload = () => {
  video.muted = true;
  video.autoplay = true;
  video.play().catch((error) => console.error("Autoplay failed:", error));
  adjustMobileSizes();
  adjustNavFontSize();
};

// Ensure video plays after it's loaded
video.addEventListener("canplaythrough", () => {
  video
    .play()
    .catch((error) => console.error("Video failed to autoplay:", error));
});

// Footer (Black Background)
const isMobile = window.innerWidth <= 768;

const footer = createElement("footer", {
  className: "footer",
  display: "flex",
  justifyContent: isMobile ? "center" : "space-between",
  alignItems: "center",
  flexDirection: isMobile ? "column" : "row",
  padding: "2vh 5vw",
  backgroundColor: "#000000",
  borderTop: "1px solid #333",
});

const footerLeft = createElement("div", {
  className: "footer-left",
  textAlign: isMobile ? "center" : "left",
  marginBottom: isMobile ? "2vh" : "0",
});
const footerLogo = createElement("div", { cursor: "pointer" });
const footerLogoLink = createElement("a", {}, { href: "index.html" });
const footerLogoIcon = createElement(
  "img",
  {
    height: "5vh",
    width: "auto",
    display: "block",
    transition: "transform 0.5s ease",
  },
  { src: "assets/logo.png", alt: "Logo" }
);

footerLogoLink.addEventListener("mouseenter", () => {
  footerLogoIcon.style.animation = "spin 0.5s ease-in-out";
});

footerLogoLink.appendChild(footerLogoIcon);
footerLogo.appendChild(footerLogoLink);
footerLeft.appendChild(footerLogo);

const footerCenter = createElement("div", {
  className: "footer-center",
  textAlign: isMobile ? "center" : "center",
  marginBottom: isMobile ? "2vh" : "0",
});
const footerNav = createElement("ul", {
  className: "footer-nav",
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  listStyle: "none",
  gap: isMobile ? "1vh" : "2vw",
  padding: "0",
});

const footerLinks = [
  { text: "TERMS OF SERVICE", href: "terms.html" },
  { text: "PRIVACY", href: "privacy.html" },
].map((link) => {
  const li = createElement("li", {});
  const a = createElement(
    "a",
    {
      color: "#FFFFFF",
      textDecoration: "none",
      fontSize: "2.2vh",
      textTransform: "uppercase",
      transition: "color 0.3s ease, transform 0.3s ease",
    },
    { href: link.href },
    [link.text]
  );

  a.addEventListener("mouseenter", () => {
    a.style.color = "#E0E0E0";
    a.style.animation = "bounce 0.4s ease";
  });
  a.addEventListener("mouseleave", () => {
    a.style.color = "#FFFFFF";
  });

  li.appendChild(a);
  return li;
});

footerNav.append(...footerLinks);
footerCenter.appendChild(footerNav);

const footerRight = createElement("div", {
  className: "footer-right",
  textAlign: isMobile ? "center" : "right",
  display: "flex",
  flexDirection: "column",
  alignItems: isMobile ? "center" : "flex-end",
});

const socialLinks = createElement("div", {
  className: "social-links",
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  justifyContent: "center",
  gap: isMobile ? "1vh" : "1.5vw",
  marginBottom: "1vh",
});

const socialMedia = [
  { platform: "X", src: "twitter.png", href: "https://x.com/DashStudiosInc/" },
  {
    platform: "Instagram",
    src: "instagram.png",
    href: "https://www.instagram.com/dashstudios.tech/",
  },
  {
    platform: "YouTube",
    src: "youtube.png",
    href: "https://www.youtube.com/channel/UCZuLS7Q8jemturg7B3FpxPg",
  },
  { platform: "LinkedIn", src: "linkedin.png", href: "https://www.linkedin.com/company/dash-studios-inc/" },
].map((social) => {
  const a = createElement(
    "a",
    {
      display: "inline-block",
      transition: "transform 0.3s ease, filter 0.3s ease",
    },
    { href: social.href, target: "_blank" }
  );

  const img = createElement(
    "img",
    {
      width: isMobile ? "5vw" : "2.4vw",
      height: isMobile ? "5vw" : "2.4vw",
      display: "block",
      transition: "transform 0.3s ease",
    },
    { src: `assets/${social.src}`, alt: `${social.platform} Logo` }
  );

  a.appendChild(img);

  a.addEventListener("mouseenter", () => {
    img.style.animation = "wobble 0.5s ease";
    img.style.filter = "brightness(1.2)";
  });
  a.addEventListener("mouseleave", () => {
    img.style.filter = "brightness(1)";
  });

  return a;
});

socialLinks.append(...socialMedia);

const email = createElement(
  "p",
  {
    fontSize: "2vh",
    margin: "0.5vh 0",
    color: "#FFFFFF",
  },
  {},
  ["All Rights Reserved"]
);
const copyright = createElement(
  "p",
  {
    fontSize: "2vh",
    margin: "0.5vh 0",
    color: "#FFFFFF",
  },
  {},
  ["© 2025 Dash Studios Inc."]
);
footerRight.append(socialLinks, email, copyright);

footer.append(footerLeft, footerCenter, footerRight);

// Append sections to the app container
mainContent.append(
  heroSection,
  gameInfoSection,
  gameOverviewSection,
  rankingsSection,
  newsSection
);
app.append(header, mainContent, footer);

