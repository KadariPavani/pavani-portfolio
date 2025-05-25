// Portfolio JavaScript with Modal and Comment Functionality

// Project data
const projectsData = {
    project1: {
        title: "Hexcape",
        subtitle: "A game that combines iOS and physical puzzle game, using 3D, 360 world view, and AR.",
        teamSize: "Team of 6",
        explanation: "Hexcape is a unique puzzle game that combines a digital experience with physical elements such as cards and a map. Players must work together as a team to progress through the story, which is inspired by Greek mythology and involves helping a girl become a demigod. The game uses various technologies to provide an immersive gaming experience, including QR codes, image recognition, ARKit, RealityKit, and SceneKit.",
        goals: "As a team of board game lovers, we want to bring our love of board games to the next level by using innovative technologies such as QR codes, image recognition, ARKit, RealityKit, and SceneKit. Our goal is to create a game that is engaging and immersive, allowing players to feel like they are truly part of the story and the world we have created. We want to bridge the gap between digital and physical gaming experiences.",
        techStack: "Swift, ARKit, RealityKit, SceneKit, QR Code Scanning, Image Recognition, iOS SDK",
        features: [
            "QR Code Scanning",
            "Image Recognition",
            "Augmented Reality with ARKit",
            "360 World with RealityKit",
            "Interactive 3D Puzzle Box",
            "Multiple Endings"
        ]
    },
    project2: {
        title: "WeatherWise",
        subtitle: "A weather forecasting app built with React & OpenWeather API.",
        teamSize: "Team of 2",
        explanation: "WeatherWise is a comprehensive weather application that provides real-time weather data and forecasts. The app features a clean, intuitive interface that displays current weather conditions, hourly forecasts, and extended 7-day predictions. Built with React for optimal performance and user experience.",
        goals: "The primary goal was to create a user-friendly weather application that provides accurate and timely weather information. We wanted to implement modern design principles while ensuring the app remains accessible across all devices and screen sizes.",
        techStack: "React.js, OpenWeather API, Axios, CSS3, JavaScript ES6+",
        features: [
            "Real-time weather data and forecasts",
            "Location-based weather detection",
            "7-day extended weather forecast",
            "Interactive weather maps",
            "Responsive design for all devices",
            "Dark/Light mode toggle",
            "Weather alerts and notifications"
        ]
    },
    project3: {
        title: "FitTrack",
        subtitle: "A fitness tracking app with Python & Django.",
        teamSize: "Solo Project",
        explanation: "FitTrack is a comprehensive fitness tracking application that helps users monitor their workout routines, track progress, and achieve their fitness goals. The app provides detailed analytics and personalized recommendations based on user activity.",
        goals: "The main objective was to create a motivating fitness companion that would help users stay consistent with their workout routines. We aimed to provide comprehensive tracking capabilities while maintaining a simple and engaging user interface.",
        techStack: "Python, Django, PostgreSQL, Django REST Framework, Chart.js",
        features: [
            "Workout routine tracking",
            "Progress analytics and charts",
            "Goal setting and achievements",
            "Exercise library and tutorials",
            "Social features and challenges",
            "Nutrition tracking integration",
            "Wearable device synchronization"
        ]
    }
};

// DOM Elements
let mobileMenuBtn, mobileMenu, projectModal, modalContent;

// Track last view timestamp per project to prevent double increments
const viewTimestamps = {};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    initializeProjectStats();
});

function initializeElements() {
    mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    mobileMenu = document.querySelector('.mobile-menu');
    projectModal = document.querySelector('.project-modal');
    modalContent = document.querySelector('.project-modal-content');
}

function initializeEventListeners() {
    // Remove existing event listeners to prevent duplicates
    const projectButtons = document.querySelectorAll('.btn-project');
    projectButtons.forEach(button => {
        button.removeEventListener('click', handleProjectButtonClick);
        button.addEventListener('click', handleProjectButtonClick);
    });

    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.removeEventListener('click', toggleMobileMenu);
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // Mobile menu navigation
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.removeEventListener('click', handleMenuItemClick);
        item.addEventListener('click', handleMenuItemClick);
    });

    // Modal close functionality
    if (projectModal) {
        const closeBtn = projectModal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.removeEventListener('click', closeProjectModal);
            closeBtn.addEventListener('click', closeProjectModal);
        }

        // Close modal when clicking outside
        projectModal.removeEventListener('click', handleModalClickOutside);
        projectModal.addEventListener('click', handleModalClickOutside);
    }

    // Hero buttons functionality
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');
    heroButtons.forEach(button => {
        button.removeEventListener('click', handleHeroButtonClick);
        button.addEventListener('click', handleHeroButtonClick);
    });

    // See more projects button
    const seeMoreBtn = document.querySelector('.btn-see-more');
    if (seeMoreBtn) {
        seeMoreBtn.removeEventListener('click', handleSeeMoreClick);
        seeMoreBtn.addEventListener('click', handleSeeMoreClick);
    }

    // Navigation active state management
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
        link.addEventListener('click', handleNavLinkClick);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
        anchor.addEventListener('click', handleAnchorClick);
    });
}

// Event handler functions
function handleProjectButtonClick() {
    const projectCard = this.closest('.project-card');
    const projectId = projectCard.getAttribute('data-project-id');
    openProjectModal(projectId);
}

function handleMenuItemClick() {
    const href = this.getAttribute('data-href');
    if (href) {
        if (href.includes('#')) {
            const targetId = href.split('#')[1];
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = href;
        }
        closeMobileMenu();
    }
}

function handleModalClickOutside(e) {
    if (e.target === projectModal) {
        closeProjectModal();
    }
}

function handleHeroButtonClick() {
    if (this.textContent.includes('View Projects')) {
        const projectsSection = document.getElementById('projects');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (this.textContent.includes('More about me')) {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function handleSeeMoreClick() {
    window.location.href = 'projects.html';
}

function handleNavLinkClick(e) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
}

function handleAnchorClick(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function toggleMobileMenu() {
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
}

function closeMobileMenu() {
    if (mobileMenu && mobileMenuBtn) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initializeProjectStats() {
    const projectCards = document.querySelectorAll('.project-card');
    const stats = JSON.parse(localStorage.getItem('projectStats') || '{}');
    
    // Initialize stats for missing projects only
    Object.keys(projectsData).forEach(projectId => {
        if (!stats[projectId]) {
            stats[projectId] = { views: 0, likes: 0 };
        }
    });
    localStorage.setItem('projectStats', JSON.stringify(stats));

    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project-id');
        const stat = stats[projectId];
        
        if (stat) {
            const viewCount = card.querySelector('.view-count');
            const likeCount = card.querySelector('.like-count');
            
            if (viewCount) viewCount.textContent = stat.views;
            if (likeCount) likeCount.textContent = stat.likes;
        }
    });
}

function openProjectModal(projectId) {
    const projectData = projectsData[projectId];
    if (!projectData || !projectModal) return;

    // Prevent double view increment within 1 second
    const now = Date.now();
    if (viewTimestamps[projectId] && now - viewTimestamps[projectId] < 1000) {
        return;
    }
    viewTimestamps[projectId] = now;

    const modalTitle = projectModal.querySelector('.modal-title');
    const modalSubtitle = projectModal.querySelector('.modal-subtitle');
    const modalTeamSize = projectModal.querySelector('.modal-stats .team-size');
    const modalViewCount = projectModal.querySelector('.modal-stats .view-count');
    const modalLikeCount = projectModal.querySelector('.modal-stats .like-count');
    const modalLikeButton = projectModal.querySelector('.modal-stats .like-button');
    const modalExplanation = projectModal.querySelector('.modal-explanation');
    const modalGoals = projectModal.querySelector('.modal-goals');
    const modalTech = projectModal.querySelector('.modal-tech');
    const modalFeatures = projectModal.querySelector('.modal-features');
    const commentInput = projectModal.querySelector('.comment-input');
    const commentSubmit = projectModal.querySelector('.comment-submit');
    const commentList = projectModal.querySelector('.comment-list');

    if (modalTitle) modalTitle.textContent = projectData.title;
    if (modalSubtitle) modalSubtitle.textContent = projectData.subtitle;
    if (modalTeamSize) modalTeamSize.textContent = projectData.teamSize;
    if (modalExplanation) modalExplanation.textContent = projectData.explanation;
    if (modalGoals) modalGoals.textContent = projectData.goals;
    if (modalTech) modalTech.textContent = projectData.techStack;

    if (modalFeatures && projectData.features) {
        modalFeatures.innerHTML = '';
        projectData.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });
    }

    // Update views
    const stats = JSON.parse(localStorage.getItem('projectStats') || '{}');
    if (!stats[projectId]) {
        stats[projectId] = { views: 0, likes: 0 };
    }
    stats[projectId].views += 1;
    localStorage.setItem('projectStats', JSON.stringify(stats));

    if (modalViewCount) modalViewCount.textContent = stats[projectId].views;
    if (modalLikeCount) modalLikeCount.textContent = stats[projectId].likes;

    // Update project card counts
    const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
    if (projectCard) {
        const cardViewCount = projectCard.querySelector('.view-count');
        const cardLikeCount = projectCard.querySelector('.like-count');
        if (cardViewCount) cardViewCount.textContent = stats[projectId].views;
        if (cardLikeCount) cardLikeCount.textContent = stats[projectId].likes;
    }

    // Handle like button
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    const hasLiked = likedProjects.includes(projectId);
    if (modalLikeButton) {
        modalLikeButton.setAttribute('data-liked', hasLiked ? 'true' : 'false');
        modalLikeButton.disabled = hasLiked;
        if (!hasLiked) {
            modalLikeButton.onclick = () => likeProject(projectId, modalLikeCount, projectCard ? projectCard.querySelector('.like-count') : null, modalLikeButton);
        }
    }

    // Initialize comments
    if (commentList) {
        displayComments(projectId, commentList);
    }

    // Handle comment submission
    if (commentSubmit && commentInput) {
        commentSubmit.onclick = () => {
            const commentText = commentInput.value.trim();
            if (commentText) {
                addComment(projectId, commentText);
                commentInput.value = '';
                displayComments(projectId, commentList);
            }
        };
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (projectModal) {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Like functionality
function likeProject(projectId, modalLikeCount, cardLikeCount, likeButton) {
    const stats = JSON.parse(localStorage.getItem('projectStats') || '{}');
    const likedProjects = JSON.parse(localStorage.getItem('likedProjects') || '[]');

    if (!stats[projectId]) {
        stats[projectId] = { views: 0, likes: 0 };
    }
    if (!likedProjects.includes(projectId)) {
        stats[projectId].likes += 1;
        likedProjects.push(projectId);
        localStorage.setItem('projectStats', JSON.stringify(stats));
        localStorage.setItem('likedProjects', JSON.stringify(likedProjects));

        if (modalLikeCount) modalLikeCount.textContent = stats[projectId].likes;
        if (cardLikeCount) cardLikeCount.textContent = stats[projectId].likes;
        if (likeButton) {
            likeButton.setAttribute('data-liked', 'true');
            likeButton.disabled = true;
        }
    }
}

// Comment functionality
function addComment(projectId, text) {
    const comments = JSON.parse(localStorage.getItem('projectComments') || '{}');
    if (!comments[projectId]) {
        comments[projectId] = [];
    }
    comments[projectId].push({
        text,
        timestamp: new Date().toLocaleString()
    });
    localStorage.setItem('projectComments', JSON.stringify(comments));
}

function displayComments(projectId, commentList) {
    const comments = JSON.parse(localStorage.getItem('projectComments') || '{}')[projectId] || [];
    commentList.innerHTML = '';
    comments.forEach(comment => {
        const li = document.createElement('li');
        li.className = 'comment-item';
        li.innerHTML = `
            <p class="comment-text">${comment.text}</p>
            <p class="comment-timestamp">${comment.timestamp}</p>
        `;
        commentList.appendChild(li);
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        if (projectModal && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
});

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` || (current === 'projects' && link.getAttribute('href') === 'projects.html')) {
            link.classList.add('active');
        }
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

function showLoadingState(element) {
    const originalText = element.textContent;
    element.textContent = 'Loading...';
    element.disabled = true;
    
    setTimeout(() => {
        element.textContent = originalText;
        element.disabled = false;
    }, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        const projectLinks = card.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    });
});

const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(34, 197, 94, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .project-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);