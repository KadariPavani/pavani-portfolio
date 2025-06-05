// Portfolio JavaScript with Modal and Comment Functionality

// Project data
const projectsData = {
    project1: {
        title: "Finance Hive",
        subtitle: "Developing the Finance Management Application to manage the finances based on the user needs.",
        teamSize: "Team of 9",
        explanation: "Finance Hive is an innovative finance management application designed to help users manage their finances effectively. ",
        goals: "The primary goal was to create a user-friendly platform that allows users to track their expenses, set budgets, and gain insights into their financial habits. We aimed to implement robust security measures to protect sensitive financial data.It should be easy to use and accessible to a wide range of users and organizers",
        techStack: "MongoDB, Express.js, React, Node.js",
        features: [
            "User authentication and profile management",
            "Expense tracking and categorization",
            "Payment scheduling",
            "Users can know their financial status",
            "Language translation support",
            "Responsive design for mobile and desktop",
            "Data visualization with charts and graphs",
            "Secure data storage and encryption",
            "Real-time notifications for transactions",
            "Creditials from the user can be stored in the mails"

        ]
    },
    project2: {
        title: "Engineering Mathematics",
        subtitle: "Where you can get the resources for the Engineering Mathematics in diploma.",
        teamSize: "Solo Project",
        explanation: "WeatherWise is a comprehensive weather application that provides real-time weather data and forecasts. The app features a clean, intuitive interface that displays current weather conditions, hourly forecasts, and extended 7-day predictions. Built with React for optimal performance and user experience.",
        goals: "The primary goal was to create a user-friendly weather application that provides accurate and timely weather information. We wanted to implement modern design principles while ensuring the app remains accessible across all devices and screen sizes.",
        techStack: "HTML CSS3, JavaScript",
        features: [
            "Mathematics resources for diploma students",
            "Know that about college which college is doing this",
            "Blog section for latest updates",
            "Easy accessible for the students about the resources"
        ]
    },
        project3: {
        title: "Note Taking App",
        subtitle: "Where you can manage your notes by doing the CRUD(Create, Read, Update, Delete) operations.",
        teamSize: "Solo Project",
        explanation: "The Note Taking App is a simple yet powerful application that allows users to create, read, update, and delete notes. It provides a clean and intuitive interface for managing personal notes, making it easy to keep track of important information.",
        goals: "The main goal was to develop a lightweight note-taking application that is easy to use and accessible from any device. The app should allow users to quickly jot down notes, organize them, and retrieve them whenever needed. We aimed for a responsive design that works well on both desktop and mobile devices.",
        techStack: "HTML, CSS3, JavaScript, FastAPI, MongoDB",
        features: [
            "Sign up and login functionality",
            "Create, read, update, and delete notes",
            "INtegration with MongoDB for data storage",
            "User friendly interface with responsive design"

        ]
    },
    project4: {
        title: "Syllabus Nexus",
        subtitle: "A web application that recommends academic books based on course syllabi(Exculsively based on KIET-Women library) using machine learning..",
        teamSize: "Solo Project",
        explanation: "",
        goals: "The main objective was to create a motivating fitness companion that would help users stay consistent with their workout routines. We aimed to provide comprehensive tracking capabilities while maintaining a simple and engaging user interface.",
        techStack: "HTML, CSS, JavaScript, Python, Flask, Machine Learning",
        features: [
            "Exclusive book recommendations based on course syllabi from KIET-W",
            "Machine learning algorithms to analyze syllabi and suggest relevant books",
            "User-friendly interface for easy navigation",
            "Selecting the best book based on the syllabus and regulations",
            "For both btech and diploma students",

        ]
    },
        project5: {
        title: "Object Detection",
        subtitle: "Creating a custom Yolov5 model to detect objects in images and videos.",
        teamSize: "Solo Project",
        explanation: "FitTrack is a comprehensive fitness tracking application that helps users monitor their workout routines, track progress, and achieve their fitness goals. The app provides detailed analytics and personalized recommendations based on user activity.",
        goals: "The main objective was to create a motivating fitness companion that would help users stay consistent with their workout routines. We aimed to provide comprehensive tracking capabilities while maintaining a simple and engaging user interface.",
        techStack: "OpenCV, TensorFlow, Python, Yolov5",
        features: [
            "Detectin objects in images and videos",
            "High accuracy and performance",
            "Custom Yolov5 model trained on specific datasets",
            "User-friendly interface for uploading images and videos",
            "Real-time object detection capabilities",
            "Integration with popular frameworks like OpenCV and TensorFlow",
            "Support for multiple object classes",
            "Ability to visualize detection results with bounding boxes"
        ]
    },
        project6: {
        title: "Sentiment Analysis",
        subtitle: "Where it can identitfy the sentiment of the text as positive, negative or neutral.",
        teamSize: "Solo Project",
        explanation: "FitTrack is a comprehensive fitness tracking application that helps users monitor their workout routines, track progress, and achieve their fitness goals. The app provides detailed analytics and personalized recommendations based on user activity.",
        goals: "The main objective was to create a motivating fitness companion that would help users stay consistent with their workout routines. We aimed to provide comprehensive tracking capabilities while maintaining a simple and engaging user interface.",
        techStack: "Python, Natural Language Processing",
        features: [
           "Sentiment analysis of text data",
            "Classification of text as positive, negative, or neutral",
            "Integration with Django for web-based applications",
            "Visualization of sentiment analysis results using Chart.js",
            "User-friendly interface for inputting text data",
            "Support for multiple languages and text formats",
            "Ability to analyze large datasets efficiently",
            "Real-time sentiment analysis capabilities"
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
    initializeQualificationAnimations();
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
        window.location.href = 'about.html';
    }
}

function handleSeeMoreClick() {
    window.location.href = 'projects.html';
}

function handleNavLinkClick(e) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    
    // Check if the link is for the about page
    if (this.getAttribute('href').includes('#about')) {
        window.location.href = 'about.html';
        e.preventDefault();
    }
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

// Qualification Animations
function initializeQualificationAnimations() {
    const qualificationItems = document.querySelectorAll('.qualification-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    qualificationItems.forEach(item => {
        observer.observe(item);
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
// Each card slider can slide independently with auto-slide functionality
document.querySelectorAll('.card-slider').forEach((slider) => {
  const track = slider.querySelector('.card-track');
  const cards = slider.querySelectorAll('.card');
  let current = 0;
  let autoSlideInterval;

  // Create indicators
  const indicatorsContainer = document.createElement('div');
  indicatorsContainer.className = 'indicators';
  
  cards.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.className = `indicator ${index === 0 ? 'active' : ''}`;
    indicator.addEventListener('click', () => {
      updateSlide(index);
      resetAutoSlide();
    });
    indicatorsContainer.appendChild(indicator);
  });
  
  slider.appendChild(indicatorsContainer);
  
  const indicators = slider.querySelectorAll('.indicator');

  function updateSlide(index) {
    current = index;
    track.style.transform = `translateX(-${index * 100}%)`;
    
    // Update indicators
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
    
    slider.dataset.current = index;
  }

  function nextSlide() {
    const nextIndex = (current + 1) % cards.length;
    updateSlide(nextIndex);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 2000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // Arrow click handlers
  slider.querySelector('.arrow.left').addEventListener('click', () => {
    const prevIndex = (current - 1 + cards.length) % cards.length;
    updateSlide(prevIndex);
    resetAutoSlide();
  });

  slider.querySelector('.arrow.right').addEventListener('click', () => {
    const nextIndex = (current + 1) % cards.length;
    updateSlide(nextIndex);
    resetAutoSlide();
  });

  // Pause auto-slide on hover
  slider.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
  });

  slider.addEventListener('mouseleave', () => {
    startAutoSlide();
  });

  // Initialize auto-slide
  startAutoSlide();
});