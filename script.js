// ===== Smooth Scrolling for Navbar Links =====
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===== Sticky Navbar on Scroll =====
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// ===== Highlight Active Section in Navbar =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// ===== Hero "Hire Me" Button =====
const hireBtn = document.querySelector('.hero-text button');
if (hireBtn) {
    hireBtn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        alert("Thanks for your interest! You can contact me below 😊");
    });
}

// ===== Fade-In Animation on Scroll =====
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});
document.querySelectorAll('section, .project-card').forEach(el => observer.observe(el));

// ===== Typing Animation for Hero Name =====
const nameElement = document.querySelector('.hero-text h1');
if (nameElement) {
    const fullText = nameElement.textContent;
    nameElement.textContent = '';
    let index = 0;

    function typeEffect() {
        if (index < fullText.length) {
            nameElement.textContent += fullText.charAt(index);
            index++;
            setTimeout(typeEffect, 150);
        }
    }
    window.addEventListener('load', typeEffect);
}

// ===== Scroll-To-Top Button =====
const scrollBtn = document.createElement('button');
scrollBtn.textContent = "↑";
scrollBtn.className = "scroll-top";
document.body.appendChild(scrollBtn);

scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

// ===== Optional: Dark Mode Toggle =====
const toggleBtn = document.createElement('button');
toggleBtn.textContent = "🌙 Dark Mode";
toggleBtn.className = "dark-toggle";
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
});
