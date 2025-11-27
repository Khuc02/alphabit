
    document.getElementById("year").textContent = new Date().getFullYear();

    let track = document.querySelector(".carousel");

    function updatePositions() {
      let cards = document.querySelectorAll(".carousel .card");

      cards.forEach((c) => c.classList.remove("big"));

      cards[2].classList.add("big");
    }

    function slide() {
      track.appendChild(track.firstElementChild);
      updatePositions();
    }

    updatePositions();
    setInterval(slide, 2500);

    document.addEventListener("DOMContentLoaded", () => {
      const steps = document.querySelectorAll(".step");

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
    });

    // Presence slider

    document.addEventListener("DOMContentLoaded", function () {
      if (window.innerWidth > 768) return;

      const container = document.querySelector(".Presence-container");
      const cards = Array.from(document.querySelectorAll(".Presence-card"));

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
    });

    // counting numbers

    const counters = document.querySelectorAll(".counting-number");
    let started = false;

    const startCounting = () => {
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounting();
            started = true;
          }
        });
      },
      {
        threshold: 0.3, // trigger when 30% of the section is visible
      }
    );

    observer.observe(document.querySelector(".counting-section"));

    // explore button

    let button = document.querySelector(".explore-btn");
    let item = document.querySelector(".explore-btn .round");

    button.addEventListener("mouseenter", function (event) {
      this.classList.add("animate");

      let buttonX = event.offsetX;
      let buttonY = event.offsetY;

      item.style.top = buttonY + "px";
      item.style.left = buttonX + "px";
      item.style.width = "1px";
      item.style.height = "1px";
    });

    button.addEventListener("mouseleave", function (event) {
      this.classList.remove("animate");

      let buttonX = event.offsetX;
      let buttonY = event.offsetY;

      item.style.top = buttonY + "px";
      item.style.left = buttonX + "px";
    });

    // solution section

    const cards = document.querySelectorAll(
      ".card1, .card2, .card3, .card4, .card5"
    );

    const observerSolution = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("active");
              }, index * 150); // stagger effect
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    observerSolution.observe(document.querySelector(".solutions-section"));

    //footer section
    const footer = document.querySelector(".Footer");

    const observerFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    observerFooter.observe(footer);


    // counting numbers
    const counters = document.querySelectorAll(".counting-number");
    let started = false;

    const startCounting = () => {
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
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            startCounting();
            started = true;
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(document.querySelector(".counting-section"));

    //footer section
    const footer = document.querySelector(".Footer");

    const observerFooter = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            footer.classList.add("active");
          }
        });
      },
      { threshold: 0.3 }
    );

    observerFooter.observe(footer);
