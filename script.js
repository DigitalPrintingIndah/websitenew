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
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  } catch (error) {
    console.error('Back to top error:', error);
  }

  // Mobile Menu Toggle
  try {
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
  } catch (error) {
    console.error('Mobile menu error:', error);
  }

  // Sticky Navbar on Scroll
  try {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      });
    }
  } catch (error) {
    console.error('Navbar scroll error:', error);
  }

  // Smooth Scrolling for Anchor Links
  try {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          const sectionBottom = sectionTop + sectionHeight;
          const scrollPosition = window.pageYOffset;

          // Check if the current scroll position is within the section
          if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
          }
        });

        // Special handling for About Us section to include subsections
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
          const aboutTop = aboutSection.offsetTop;
          const aboutHeight = aboutSection.clientHeight;
          const aboutBottom = aboutTop + aboutHeight;
          const scrollPosition = window.pageYOffset;

          if (scrollPosition >= aboutTop - 100 && scrollPosition < aboutBottom) {
            current = 'about';
          }
        }

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

  // Portfolio Filter with Stagger Animation
  try {
    const portfolioCategories = document.querySelectorAll('.portfolio-categories li');
    if (portfolioCategories.length) {
      const portfolioData = {
        billboard: {
          title: "Billboard",
          description: "Digital Printing Indah dipercaya oleh perusahaan-perusahaan besar untuk hasil cetakan Billboard berkualitas tinggi.",
          images: [
            "assets/billboard1.jpg",
            "assets/billboard2.jpg",
            "assets/billboard3.jpg",
            "assets/billboard4.jpg",
            "assets/billboard5.jpg",
            "assets/billboard6.jpg"
          ]
        },
        "billboard-backlite": {
          title: "Billboard Backlite",
          description: "Billboard dengan pencahayaan dari belakang, sangat cocok untuk promosi malam hari.",
          images: [
            "assets/bb1.jpg",
            "assets/bb2.jpg"
          ]
        },
        "one-way-vision": {
          title: "One Way Vision",
          description: "One Way Vision memberikan solusi branding pada kaca jendela tanpa mengurangi visibilitas dari dalam.",
          images: [
            "assets/owv1.jpg",
            "assets/owv2.jpg"
          ]
        },
        hoarding: {
          title: "Hoarding",
          description: "Hoarding digunakan untuk mempromosikan proyek besar seperti properti dan konstruksi.",
          images: [
            "assets/h1.jpg",
            "assets/h2.jpg"
          ]
        },
        jpo: {
          title: "JPO (Jembatan Penyeberangan Orang)",
          description: "Iklan di JPO sangat efektif untuk menarik perhatian pejalan kaki dan pengendara.",
          images: [
            "assets/jpo1.jpg",
            "assets/jpo2.jpg"
          ]
        },
        umbul: {
          title: "Umbul",
          description: "Umbul-umbul sangat cocok untuk promosi acara dan brand awareness.",
          images: [
            "assets/umbul1.jpeg",
            "assets/umbul2.jpg"
          ]
        },
        "sticker-cutting": {
          title: "Sticker Cutting",
          description: "Sticker Cutting untuk branding kendaraan, kaca, atau promosi lainnya.",
          images: [
            "assets/s1.jpg"
          ]
        },
        "roll-banner": {
          title: "Roll Banner",
          description: "Roll Banner adalah solusi portabel untuk promosi indoor dan outdoor.",
          images: [
            "assets/roll1.jpg",
            "assets/roll2.jpg"
          ]
        },
        "layanan-cetak-dokumen": {
          title: "Layanan Cetak Dokumen",
          description: "Kami juga menyediakan layanan cetak dokumen berkualitas tinggi untuk kebutuhan Anda.",
          images: [
            "assets/l1.jpg"
          ]
        }
      };

      // Function to update portfolio content with stagger animation
      function updatePortfolio(categoryId) {
        const categoryData = portfolioData[categoryId];
        document.getElementById('portfolio-title').textContent = categoryData.title;
        document.getElementById('portfolio-description').textContent = categoryData.description;
        const portfolioGrid = document.getElementById('portfolio-grid');
        portfolioGrid.innerHTML = '';
        categoryData.images.forEach((image, index) => {
          const imgElement = document.createElement('img');
          imgElement.src = image;
          imgElement.alt = categoryData.title;
          imgElement.loading = 'lazy';
          imgElement.style.opacity = '0';
          imgElement.style.transform = 'translateY(20px)';
          imgElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          imgElement.style.transitionDelay = `${index * 0.1}s`;
          portfolioGrid.appendChild(imgElement);
          setTimeout(() => {
            imgElement.style.opacity = '1';
            imgElement.style.transform = 'translateY(0)';
          }, 50);
        });
      }

      // Load Billboard category on startup
      const defaultCategory = document.querySelector('.portfolio-categories li[data-category="billboard"]');
      if (defaultCategory) {
        defaultCategory.classList.add('active');
        updatePortfolio('billboard');
      }

      // Category click handler
      portfolioCategories.forEach(category => {
        category.addEventListener('click', function() {
          portfolioCategories.forEach(cat => cat.classList.remove('active'));
          this.classList.add('active');
          const categoryId = this.getAttribute('data-category');
          updatePortfolio(categoryId);
        });
      });
    }
  } catch (error) {
    console.error('Portfolio filter error:', error);
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
      setTimeout(type, 1000); // Start after AOS fade-up animation
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
});