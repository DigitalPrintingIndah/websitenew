document.addEventListener('DOMContentLoaded', function() {
  // Preloader with Fallback
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function() {
      try {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      } catch (error) {
        console.error('Preloader error:', error);
        preloader.style.display = 'none';
      }
    });

    setTimeout(() => {
      if (preloader.style.display !== 'none') {
        console.warn('Preloader fallback triggered');
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }
    }, 5000);
  }

  // Back to Top Button
  try {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopBtn.classList.add('active');
        } else {
          backToTopBtn.classList.remove('active');
        }
      });

      backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        smoothScrollTo(0, 800);
      });
    }
  } catch (error) {
    console.error('Back to top error:', error);
  }

  // Mobile Menu Toggle
  document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
      mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
      });
      
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
          mobileMenuToggle.classList.remove('active');
          navLinks.classList.remove('active');
        });
      });
    }
    
    // Sticky Navbar on Scroll
    const navbar = document.querySelector('.navbar');
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
          if (whatsappBtn) {
            whatsappBtn.classList.add('pulse');
          }
        } else {
          navbar.classList.remove('scrolled');
          if (whatsappBtn) {
            whatsappBtn.classList.remove('pulse');
          }
        }
      });
    }
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (sections.length && navItems.length) {
      window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          const sectionBottom = sectionTop + sectionHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
          }
        });
        
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
          }
        });
      });
    }
  });

  // Active Navigation Link on Scroll
function updateActiveNavItem() {
  // Skip scroll-based updates if a click is in progress
  if (clickInProgress) return;

  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  if (!sections.length || !navItems.length) return;

  let current = '';
  const scrollPosition = window.pageYOffset + 150; // Adjusted offset for better detection

  // Find the section currently in view
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionBottom = sectionTop + sectionHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute('id');
    }
  });

  // Update the active nav item
  navItems.forEach(item => {
    item.classList.remove('active');
    const href = item.getAttribute('href');
    if (href === `#${current}` || (current === '' && href === '#home')) {
      item.classList.add('active');
    }
  });
}

// Initialize scroll event listener
window.addEventListener('scroll', updateActiveNavItem);

// Smooth Scrolling for Anchor Links
let clickInProgress = false;
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 100; // Navbar height offset
      const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      clickInProgress = true; // Set flag to prevent scroll event interference

      // Update active class immediately
      const navItems = document.querySelectorAll('.nav-links a');
      navItems.forEach(item => item.classList.remove('active'));
      this.classList.add('active');

      // Perform smooth scroll
      smoothScrollTo(offsetPosition, 800);

      // Reset flag after scroll completes
      setTimeout(() => {
        clickInProgress = false;
      }, 850); // Slightly longer than scroll duration
    }
  });
});

  // Sticky Navbar on Scroll with WhatsApp Pulse
  try {
    const navbar = document.querySelector('.navbar');
    const navCta = document.querySelector('.nav-cta');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
          if (navCta) {
            navCta.classList.add('pulse');
          }
        } else {
          navbar.classList.remove('scrolled');
          if (navCta) {
            navCta.classList.remove('pulse');
          }
        }
      });
    }
  } catch (error) {
    console.error('Navbar scroll error:', error);
  }

  // Custom Smooth Scroll Function
  function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
  }

// Smooth Scrolling for Anchor Links
try {
  let clickInProgress = false;
  let lastClickedSection = null;
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offset = 100; // Navbar height offset
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        clickInProgress = true; // Set flag to prevent scroll event interference
        lastClickedSection = targetId;

        // Update active class immediately
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => item.classList.remove('active'));
        this.classList.add('active');

        // Perform smooth scroll
        smoothScrollTo(offsetPosition, 800);

        // Reset flag after scroll completes
        setTimeout(() => {
          clickInProgress = false;
          lastClickedSection = null;
        }, 850); // Slightly longer than scroll duration to account for delays
      }
    });
  });
} catch (error) {
  console.error('Smooth scroll error:', error);
}

// Active Navigation Link on Scroll
try {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-links a');
  if (sections.length && navItems.length) {
    window.addEventListener('scroll', function() {
      // Skip scroll-based updates if a click is in progress
      if (clickInProgress) return;

      let current = '';
      const scrollPosition = window.pageYOffset;

      // Find the section currently in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150; // Increased offset for better detection
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          current = section.getAttribute('id');
        }
      });

      // Special handling for the "about" section due to its subsections
      const aboutSection = document.querySelector('#about');
      if (aboutSection) {
        const aboutTop = aboutSection.offsetTop - 150;
        const aboutHeight = aboutSection.clientHeight;
        const aboutBottom = aboutTop + aboutHeight;
        if (scrollPosition >= aboutTop && scrollPosition < aboutBottom) {
          current = 'about';
        }
      }

      // If at the top of the page, default to "home"
      if (scrollPosition < sections[0].offsetTop - 150) {
        current = 'home';
      }

      // Update the active nav item
      navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
          item.classList.add('active');
        }
      });
    });
  }
} catch (error) {
  console.error('Nav active error:', error);
}
  // Initialize AOS
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true
      });
    }
  } catch (error) {
    console.error('AOS initialization error:', error);
  }

  // Testimonials Slider
  try {
    if (typeof jQuery !== 'undefined') {
      const testimonialsSlider = document.querySelector('.testimonials-slider');
      if (testimonialsSlider) {
        $(testimonialsSlider).slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 5000,
          fade: true,
          cssEase: 'linear'
        });
      }
    } else {
      console.warn('jQuery not loaded, skipping Slick initialization');
    }
  } catch (error) {
    console.error('Slick slider error:', error);
  }

  // Portfolio Filter with Stagger Animation and Hover Effects
  try {
    const portfolioCategories = document.querySelectorAll('.portfolio-categories li');
    if (portfolioCategories.length) {
      const portfolioData = {
        billboard: {
          title: "Billboard",
          description: "Digital Printing Indah dipercaya oleh perusahaan-perusahaan besar untuk hasil cetakan Billboard berkualitas tinggi.",
          images: [
            { src: "assets/billboard1.jpg", desc: "Billboard Project 1" },
            { src: "assets/billboard2.jpg", desc: "Billboard Project 2" },
            { src: "assets/billboard3.jpg", desc: "Billboard Project 3" },
            { src: "assets/billboard4.jpg", desc: "Billboard Project 4" },
            { src: "assets/billboard5.jpg", desc: "Billboard Project 5" },
            { src: "assets/billboard6.jpg", desc: "Billboard Project 6" }
          ]
        },
        "billboard-backlite": {
          title: "Billboard Backlite",
          description: "Billboard dengan pencahayaan dari belakang, sangat cocok untuk promosi malam hari.",
          images: [
            { src: "assets/bb1.jpg", desc: "Billboard Backlite 1" },
            { src: "assets/bb2.jpg", desc: "Billboard Backlite 2" }
          ]
        },
        "one-way-vision": {
          title: "One Way Vision",
          description: "One Way Vision memberikan solusi branding pada kaca jendela tanpa mengurangi visibilitas dari dalam.",
          images: [
            { src: "assets/owv1.jpg", desc: "One Way Vision 1" },
            { src: "assets/owv2.jpg", desc: "One Way Vision 2" }
          ]
        },
        hoarding: {
          title: "Hoarding",
          description: "Hoarding digunakan untuk mempromosikan proyek besar seperti properti dan konstruksi.",
          images: [
            { src: "assets/h1.jpg", desc: "Hoarding 1" },
            { src: "assets/h2.jpg", desc: "Hoarding 2" }
          ]
        },
        jpo: {
          title: "JPO (Jembatan Penyeberangan Orang)",
          description: "Iklan di JPO sangat efektif untuk menarik perhatian pejalan kaki dan pengendara.",
          images: [
            { src: "assets/jpo1.jpg", desc: "JPO 1" },
            { src: "assets/jpo2.jpg", desc: "JPO 2" }
          ]
        },
        umbul: {
          title: "Umbul",
          description: "Umbul-umbul sangat cocok untuk promosi acara dan brand awareness.",
          images: [
            { src: "assets/umbul1.jpeg", desc: "Umbul 1" },
            { src: "assets/umbul2.jpg", desc: "Umbul 2" }
          ]
        },
        "sticker-cutting": {
          title: "Sticker Cutting",
          description: "Sticker Cutting untuk branding kendaraan, kaca, atau promosi lainnya.",
          images: [
            { src: "assets/s1.jpg", desc: "Sticker Cutting 1" }
          ]
        },
        "roll-banner": {
          title: "Roll Banner",
          description: "Roll Banner adalah solusi portabel untuk promosi indoor dan outdoor.",
          images: [
            { src: "assets/roll1.jpg", desc: "Roll Banner 1" },
            { src: "assets/roll2.jpg", desc: "Roll Banner 2" }
          ]
        },
        "layanan-cetak-dokumen": {
          title: "Layanan Cetak Dokumen",
          description: "Kami juga menyediakan layanan cetak dokumen berkualitas tinggi untuk kebutuhan Anda.",
          images: [
            { src: "assets/l1.jpg", desc: "Document Printing 1" }
          ]
        }
      };

      function updatePortfolio(categoryId) {
        const categoryData = portfolioData[categoryId];
        document.getElementById('portfolio-title').textContent = categoryData.title;
        document.getElementById('portfolio-description').textContent = categoryData.description;
        const portfolioGrid = document.getElementById('portfolio-grid');
        portfolioGrid.innerHTML = '';
        categoryData.images.forEach((image, index) => {
          const imgWrapper = document.createElement('div');
          imgWrapper.classList.add('portfolio-img-wrapper');
          
          const imgElement = document.createElement('img');
          imgElement.src = image.src;
          imgElement.alt = categoryData.title;
          imgElement.loading = 'lazy';
          imgElement.style.opacity = '0';
          imgElement.style.transform = 'translateY(20px)';
          imgElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          imgElement.style.transitionDelay = `${index * 0.1}s`;
          
          const overlay = document.createElement('div');
          overlay.classList.add('portfolio-overlay');
          overlay.textContent = image.desc;
          
          imgWrapper.appendChild(imgElement);
          imgWrapper.appendChild(overlay);
          portfolioGrid.appendChild(imgWrapper);
          
          setTimeout(() => {
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'translateY(0)';
          }, 50);
        });
      }

      const defaultCategory = document.querySelector('.portfolio-categories li[data-category="billboard"]');
      if (defaultCategory) {
        defaultCategory.classList.add('active');
        updatePortfolio('billboard');
      }

      portfolioCategories.forEach(category => {
        category.addEventListener('click', function() {
            portfolioCategories.forEach(cat => cat.classList.remove('active'));
            this.classList.add('active');
            const categoryId = this.getAttribute('data-category'); // Changed from href to data-category
            updatePortfolio(categoryId);
        });
    });
    }
  } catch (error) {
    console.error('Nav active error:', error);
  }

  // Initialize AOS
  try {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 1000,
        easing: 'ease-in-out-cubic',
        once: true
      });
    }
  } catch (error) {
    console.error('AOS initialization error:', error);
  }

  // Testimonials Slider
  try {
    if (typeof jQuery !== 'undefined') {
      const testimonialsSlider = document.querySelector('.testimonials-slider');
      if (testimonialsSlider) {
        $(testimonialsSlider).slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          adaptiveHeight: true,
          autoplay: true,
          autoplaySpeed: 5000,
          fade: true,
          cssEase: 'linear'
        });
      }
    } else {
      console.warn('jQuery not loaded, skipping Slick initialization');
    }
  } catch (error) {
    console.error('Slick slider error:', error);
  }

  // Typing Animation for Hero Subtitle
  try {
    const heroSubtitle = document.querySelector('.hero-subtitle.typing');
    if (heroSubtitle) {
      const text = heroSubtitle.textContent;
      heroSubtitle.textContent = '';
      let i = 0;
      function type() {
        if (i < text.length) {
          heroSubtitle.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50);
        }
      }
      setTimeout(type, 1000);
    }
  } catch (error) {
    console.error('Typing animation error:', error);
  }

  // Set current year in footer
  try {
    const currentYear = document.getElementById('current-year');
    if (currentYear) {
      currentYear.textContent = new Date().getFullYear();
    }
  } catch (error) {
    console.error('Footer year error:', error);
  }

  // Hero Section Gradient Animation
  try {
    const heroSection = document.querySelector('.hero-section');
    let hue = 180;
    function animateGradient() {
      hue += 0.5;
      if (hue >= 360) hue = 180;
      heroSection.style.background = `linear-gradient(135deg, hsl(${hue}, 20%, 98%), hsl(${hue + 20}, 20%, 100%))`;
      requestAnimationFrame(animateGradient);
    }
    animateGradient();
  } catch (error) {
    console.error('Hero gradient animation error:', error);
  }

  // Particle Effect with Mouse Interaction and Glow
  try {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particlesArray = [];
      const numberOfParticles = 50;
      const maxDistance = 120;
      let mouse = { x: null, y: null, radius: 100 };

      // Mouse interaction
      window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY + window.pageYOffset;
      });

      window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
      });

      // Get text area boundaries
      const heroContent = document.querySelector('.hero-content');
      const scrollDown = document.querySelector('.scroll-down');
      let textArea = { top: 0, bottom: 0, left: 0, right: 0, padding: 20 };

      function updateTextArea() {
        const heroRect = heroContent.getBoundingClientRect();
        const scrollRect = scrollDown.getBoundingClientRect();
        textArea.top = Math.min(heroRect.top, scrollRect.top) + window.pageYOffset - textArea.padding;
        textArea.bottom = Math.max(heroRect.bottom, scrollRect.bottom) + window.pageYOffset + textArea.padding;
        textArea.left = Math.min(heroRect.left, scrollRect.left) - textArea.padding;
        textArea.right = Math.max(heroRect.right, scrollRect.right) + textArea.padding;
      }

      window.addEventListener('resize', updateTextArea);
      window.addEventListener('scroll', updateTextArea);
      updateTextArea();

      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 5 + 2;
          this.baseSize = this.size;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.shape = Math.random() > 0.3 ? 'circle' : 'rect';
          this.angle = Math.random() * Math.PI * 2;
          this.pulse = Math.random() * Math.PI * 2;
          const isBlue = Math.random() < 0.1;
          if (isBlue) {
            this.color = `rgba(96, 165, 250, ${Math.random() * 0.3 + 0.2})`;
            this.glowColor = 'rgba(96, 165, 250, 0.5)';
          } else {
            const amberShade = Math.random() > 0.5 ? '245, 158, 11' : '249, 115, 22';
            this.color = `rgba(${amberShade}, ${Math.random() * 0.5 + 0.3})`;
            this.glowColor = `rgba(${amberShade}, 0.5)`;
          }
        }

        update() {
          this.angle += 0.02;
          this.pulse += 0.05;
          this.x += this.speedX + Math.sin(this.angle) * 0.5;
          this.y += this.speedY + Math.cos(this.angle) * 0.5;

          // Mouse attraction
          if (mouse.x && mouse.y) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
              const force = (mouse.radius - distance) / mouse.radius;
              this.x -= (dx / distance) * force * 2;
              this.y -= (dy / distance) * force * 2;
              this.size = this.baseSize * (1 + force * 0.5);
            } else {
              this.size = this.size > this.baseSize ? this.size - 0.05 : this.baseSize;
            }
          } else {
            this.size = this.size > this.baseSize ? this.size - 0.05 : this.baseSize;
          }

          // Shrink particle
          if (this.size > 0.2) this.size -= 0.005;

          // Bounce off edges
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

          // Avoid text area
          const inTextArea =
            this.x >= textArea.left &&
            this.x <= textArea.right &&
            this.y >= textArea.top &&
            this.y <= textArea.bottom;

          if (inTextArea) {
            const distToTop = Math.abs(this.y - textArea.top);
            const distToBottom = Math.abs(this.y - textArea.bottom);
            const distToLeft = Math.abs(this.x - textArea.left);
            const distToRight = Math.abs(this.x - textArea.right);

            const minDist = Math.min(distToTop, distToBottom, distToLeft, distToRight);

            if (minDist === distToTop) {
              this.y = textArea.top - 10;
              this.speedY *= -1;
            } else if (minDist === distToBottom) {
              this.y = textArea.bottom + 10;
              this.speedY *= -1;
            } else if (minDist === distToLeft) {
              this.x = textArea.left - 10;
              this.speedX *= -1;
            } else {
              this.x = textArea.right + 10;
              this.speedX *= -1;
            }
          }
        }

        draw() {
          ctx.fillStyle = this.color;
          ctx.shadowBlur = 10 + Math.sin(this.pulse) * 5;
          ctx.shadowColor = this.glowColor;
          ctx.beginPath();
          if (this.shape === 'circle') {
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          } else {
            ctx.rect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
          }
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      function initParticles() {
        for (let i = 0; i < numberOfParticles; i++) {
          particlesArray.push(new Particle());
        }
      }

      function connectParticles() {
        for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              ctx.strokeStyle = `rgba(245, 158, 11, ${(1 - distance / maxDistance) * 0.2})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
            }
          }
        }
      }

      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        connectParticles();
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
          if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
          }
        }
        requestAnimationFrame(animateParticles);
      }

      initParticles();
      animateParticles();

      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        updateTextArea();
      });
    }
  } catch (error) {
    console.error('Particle animation error:', error);
  }

  // Service Card Holographic Glow and Border Animation
  try {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      // Add border elements for animation
      const borderTop = document.createElement('div');
      borderTop.classList.add('holo-border', 'holo-border-top');
      const borderRight = document.createElement('div');
      borderRight.classList.add('holo-border', 'holo-border-right');
      const borderBottom = document.createElement('div');
      borderBottom.classList.add('holo-border', 'holo-border-bottom');
      const borderLeft = document.createElement('div');
      borderLeft.classList.add('holo-border', 'holo-border-left');
      
      card.appendChild(borderTop);
      card.appendChild(borderRight);
      card.appendChild(borderBottom);
      card.appendChild(borderLeft);

      card.addEventListener('mouseenter', () => {
        card.classList.add('holo-hover');
      });

      card.addEventListener('mouseleave', () => {
        card.classList.remove('holo-hover');
      });
    });
  } catch (error) {
    console.error('Service card holographic effect error:', error);
  }

  // Scroll-Triggered Section Header Glow
  try {
    const sectionTitles = document.querySelectorAll('.section-title');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('glow');
        }
      });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
      observer.observe(title);
    });
  } catch (error) {
    console.error('Section header glow error:', error);
  }
});
