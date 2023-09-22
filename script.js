document.addEventListener("DOMContentLoaded", function () {

// ----------------------------------------- Mobile view-toggle-button--------------------------------------
    const toggleButton = document.querySelector(".toggle-button");
    const nav = document.querySelector(".navigation-list");
    const navbarLinks = document.querySelectorAll(".nav-item a");
    const sections = document.querySelectorAll("section");
    const navbar = document.querySelector(".navbar");

    const buttonAbout = document.querySelector(".btn-content");
    const aboutSection = document.getElementById("about-me");

    buttonAbout.addEventListener("click", function() {
      aboutSection.scrollIntoView({
        behavior: "smooth"
      })
    });
  
    let prevScrollPos = window.pageYOffset;
  
    function changeNavbarBackground() {
      const currentSection = [...sections].find((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        return (
          window.pageYOffset >= sectionTop &&
          window.pageYOffset < sectionTop + sectionHeight
        );
      });
  
      if (currentSection && currentSection.id === "home") {
        navbar.style.backgroundColor = "transparent";
      } else {
        navbar.style.backgroundColor = "#15243A"; 
      }
    }
  
    function highlightActiveLink() {
      const scrollPosition = window.scrollY;
    
      let activeLink = null;
    
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id");
    
        if (
          scrollPosition >= sectionTop - 1 &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          activeLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
        }
      });
    
      navbarLinks.forEach((link) => {
        link.classList.remove("active");
      });
    
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
    
    
  
    window.addEventListener("scroll", () => {
      const currentScrollPos = window.pageYOffset;
  
      if (window.innerWidth >= 768) {
        navbar.style.position = "fixed";
        navbar.style.top = "0";
      } else {
        if (prevScrollPos > currentScrollPos) {
          navbar.style.transform = "translateY(0)";
        } else {
          navbar.style.transform = "translateY(-100%)";
        }
      }
  
      prevScrollPos = currentScrollPos;
  
      changeNavbarBackground();
      highlightActiveLink();
    });
  
    toggleButton.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  
    const cards = document.querySelectorAll(".procedure-card");
  
    cards.forEach(function (card) {
      const readMoreButton = card.querySelector(".procedure-readMoreButton");
      const readLessButton = card.querySelector(".procedure-readLessButton");
  
      readMoreButton.addEventListener("click", function () {
        toggleCard(card, true);
      });
  
      readLessButton.addEventListener("click", function () {
        toggleCard(card, false);
      });
  
      function toggleCard(card, showMore) {
        var icon = card.querySelector(".procedure-icon");
        var h3 = card.querySelector(".procedure-h3");
        var para = card.querySelector(".procedure-para");
        var readMoreButton = card.querySelector(".procedure-readMoreButton");
        var readLessButton = card.querySelector(".procedure-readLessButton");
  
        if (showMore) {
          icon.style.display = "none";
          h3.style.display = "block";
          para.style.display = "block";
          readMoreButton.style.display = "none";
          readLessButton.style.display = "block";
        } else {
          icon.style.display = "block";
          h3.style.display = "block";
          para.style.display = "none";
          readMoreButton.style.display = "block";
          readLessButton.style.display = "none";
        }
      }
    });
  
    const navLinks = document.querySelectorAll("a[href^='#']");
    const slider = document.querySelector(".slider");
    const images = document.querySelectorAll(".slider img");
    const imagePrevButton = document.querySelector(".prev-button");
    const imageNextButton = document.querySelector(".next-button");
  
    let currentIndex = 0;
  
    function scrollToTarget(targetElement) {
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
  
    function closeNavMenu() {
      nav.classList.remove("open");
    }
  
    navLinks.forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
  
        closeNavMenu();
        scrollToTarget(targetElement);
        history.pushState({}, "", `#${targetId}`);
      });
    });
  
    function showImage(index) {
      slider.style.transition = "none";
      slider.style.transform = `translateX(-${index * 100}%)`;
      setTimeout(function () {
        slider.style.transition = "";
      }, 0);
    }
  
    function goToPrevImage() {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    }
  
    function goToNextImage() {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }
  
    imagePrevButton.addEventListener("click", goToPrevImage);
    imageNextButton.addEventListener("click", goToNextImage);
  
    const slideInterval = 3000;
  
    let autoSlideInterval = setInterval(goToNextImage, slideInterval);
  
    imagePrevButton.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
    });
  
    imageNextButton.addEventListener("click", function () {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(goToNextImage, slideInterval);
    });
  
    document.getElementById("formButton").addEventListener("click", function () {

      const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfUSHWXoGzas_fOj66Ps3xeyhovIjHnW3v0GoL1vTs-vXSKdw/viewform?usp=sf_link";
  
      window.open(googleFormURL, "_blank");
    });

  });
  