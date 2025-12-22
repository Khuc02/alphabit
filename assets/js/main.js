document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("year").textContent = new Date().getFullYear();


  // ======== CAROUSEL ========
  let track = document.querySelector(".carousel");

  if (track) {

    function updatePositions() {
      let cards = document.querySelectorAll(".carousel .card");
      if (cards.length < 3) return;
      cards.forEach((c) => c.classList.remove("big"));
      cards[2].classList.add("big");
    }

    function slide() {
      track.appendChild(track.firstElementChild);
      updatePositions();
    }

    updatePositions();
    setInterval(slide, 2500);
  }


  // ======== PROCESS STEPS ========
  const steps = document.querySelectorAll(".step");

  if (steps.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, idx) => {
          if (entry.isIntersecting) {
            const step = entry.target;
            const card = step.querySelector(".process-card");
            const iconWrap = step.querySelector(".icon-wrapper");
            const icon = step.querySelector(".step-icon");

            setTimeout(() => {
              card.style.transition = "0.6s ease";
              card.style.opacity = "1";
              card.style.transform = "translateY(0)";
            }, idx * 600);

            setTimeout(() => {
              iconWrap.style.transition = "0.5s ease";
              iconWrap.style.opacity = "1";
            }, idx * 600 + 300);

            setTimeout(() => {
              icon.style.transition = "0.4s ease";
              icon.style.opacity = "1";
              icon.style.transform = "scale(1)";
            }, idx * 600 + 500);
          }
        });
      },
      { threshold: 0.2 }
    );

    steps.forEach((step) => observer.observe(step));
  }


  // ======== PRESENCE SLIDER ========
  if (window.innerWidth <= 768) {
    const container = document.querySelector(".Presence-container");
    const cards = Array.from(document.querySelectorAll(".Presence-card"));

    if (container && cards.length > 0) {

      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        container.appendChild(clone);
      });

      let scrollPos = 0;
      let cardWidth = cards[0].offsetWidth - 50;

      function autoSlide() {
        scrollPos += cardWidth;

        if (scrollPos >= container.scrollWidth / 2) {
          scrollPos = 0;
          container.scrollTo({ left: 0 });
        }

        container.scrollTo({
          left: scrollPos,
          behavior: "smooth",
        });
      }

      setInterval(autoSlide, 2500);
    }
  }


  // ======== COUNTING ========
  const counters = document.querySelectorAll(".counting-number");
  const section = document.querySelector(".counting-section");
  let started = false;

  function startCounting() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const speed = target / 200;

      const updateCount = () => {
        if (current < target) {
          current += speed;
          counter.innerText = Math.floor(current) + "+";
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
    });
  }

  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounting();
            started = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }


  // ======== EXPLORE BUTTON ========
  const button = document.querySelector(".explore-btn");
  const item = document.querySelector(".explore-btn .round");

  if (button && item) {
    button.addEventListener("mouseenter", function (event) {
      this.classList.add("animate");
      item.style.top = event.offsetY + "px";
      item.style.left = event.offsetX + "px";
      item.style.width = "1px";
      item.style.height = "1px";
    });

    button.addEventListener("mouseleave", function (event) {
      this.classList.remove("animate");
      item.style.top = event.offsetY + "px";
      item.style.left = event.offsetX + "px";
    });
  }


  // ======== SOLUTION SECTION ========
  const solCards = document.querySelectorAll(".card1, .card2, .card3, .card4, .card5");
  const solSection = document.querySelector(".solutions-section");

  if (solSection && solCards.length > 0) {
    const observerSolution = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            solCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("active");
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observerSolution.observe(solSection);
  }


  // ======== FOOTER SECTION ========
  const footer = document.querySelector(".Footer");

  if (footer) {
    const observerFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) footer.classList.add("active");
        });
      },
      { threshold: 0.3 }
    );

    observerFooter.observe(footer);
  }

});


// our history

 const items = document.querySelectorAll('.timeline-item');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.3
  });

  items.forEach(item => observer.observe(item));


  // counting numbers FOR ABOUT PAGE
  
  const counters = document.querySelectorAll(".counting");
  const section = document.querySelector(".aboutpage-container2");
  let started = false;

  function startCounting() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const speed = target / 200;

      const updateCount = () => {
        if (current < target) {
          current += speed;
          counter.innerText = Math.floor(current) + "+";
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + "+";
        }
      };

      updateCount();
    });
  }

  if (section) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounting();
            started = true;
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
  }
