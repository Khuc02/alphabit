// Text Fragment Cleaning (https://alphabitinfoway.com/#:~:text=Explore%20Us -> https://alphabitinfoway.com/)
(function () {
  try {
    if (typeof window !== 'undefined' && window.location) {
      var hash = window.location.hash || '';
      var href = window.location.href || '';
      var search = window.location.search || '';
      if (
        hash.indexOf(':~:text=') !== -1 ||
        href.indexOf(':~:text=') !== -1 ||
        search.indexOf(':~:text=') !== -1 ||
        hash.indexOf('Explore%20Us') !== -1 ||
        hash.indexOf('Explore Us') !== -1
      ) {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } else {
          window.location.replace('https://alphabitinfoway.com/');
        }
      }
    }
  } catch (e) {}
})();

function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

document.addEventListener("DOMContentLoaded", () => {
  // ======== MINIMAL PRELOADER ========
  const preloader = document.getElementById("preloader");
  const progress = document.querySelector(".loader-progress-bar");

  // Animate progress bar quickly
  if (progress) {
    setTimeout(() => { progress.style.width = "100%"; }, 50);
  }

  // Hide preloader almost immediately to drastically improve perceived load time
  setTimeout(() => {
    if (preloader) preloader.classList.add("fade-out");
    window.scrollTo(0, 0);
  }, 150);

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

  // ======== COUNTING (SMOOTH & SLOWER ANIMATION) ========
  const countingSections = document.querySelectorAll(".counting-section");
  countingSections.forEach((sec) => {
    let secStarted = false;
    const secCounters = sec.querySelectorAll(".counting-number");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !secStarted) {
            secStarted = true;
            secCounters.forEach((counter) => {
              const target = +counter.getAttribute("data-target");
              const suffix = counter.getAttribute("data-suffix") || "";
              const duration = 2500; // 2.5 seconds duration
              let startTime = null;

              const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease-out cubic for smooth deceleration
                const easeProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeProgress * target);

                counter.innerText = currentVal + suffix;

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  counter.innerText = target + suffix;
                }
              };

              requestAnimationFrame(animate);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sec);
  });

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
  const solCards = document.querySelectorAll(
    ".card1, .card2, .card3, .card4, .card5"
  );
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

  // ======== AUTO ACTIVE NAVBAR LINK ========
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  document.querySelectorAll(".navbar a").forEach(link => {
    let hrefAttr = link.getAttribute("href");
    if (!hrefAttr) return;

    let isMatch = false;
    if (hrefAttr === "./" || hrefAttr === "/") {
      isMatch = pageName === "" || pageName === "index.html";
    } else {
      let normalizedHref = hrefAttr.replace(/^(\.\/|\/)/, "").replace(/\.html$/, "");
      let normalizedPage = pageName.replace(/\.html$/, "");
      isMatch = normalizedHref === normalizedPage;
    }

    if (isMatch) {
      link.classList.add("active");
      const dropdownParent = link.closest('.dropdown');
      if (dropdownParent) {
        const toggleBtn = dropdownParent.querySelector('.dropdown-toggle');
        if (toggleBtn) {
          toggleBtn.classList.add('active');
        }
      }
    }
  });

  // ======== SEO-FRIENDLY AUTO-CLONE FOR MARQUEE SLIDERS ========
  const industryGrids = document.querySelectorAll('.delivering-excellence .industry-grid');
  industryGrids.forEach(grid => {
    if (!grid.dataset.cloned) {
      grid.dataset.cloned = 'true';
      const cards = Array.from(grid.children);
      cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        grid.appendChild(clone);
      });
    }
  });
});

// our history

const items = document.querySelectorAll(".timeline-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

items.forEach((item) => observer.observe(item));

// counting numbers FOR ABOUT PAGE

const aboutSection = document.querySelector(".aboutpage-container2");
if (aboutSection) {
  const aboutCounters = aboutSection.querySelectorAll(".counting");
  let startedAbout = false;

  const observerAbout = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !startedAbout) {
          startedAbout = true;
          aboutCounters.forEach((counter) => {
            const target = +counter.getAttribute("data-target");
            const suffix = counter.getAttribute("data-suffix") || "";
            const duration = 2500;
            let startTime = null;

            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              const easeProgress = 1 - Math.pow(1 - progress, 3);
              const currentVal = Math.floor(easeProgress * target);

              counter.innerText = currentVal + suffix;

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                counter.innerText = target + suffix;
              }
            };

            requestAnimationFrame(animate);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  observerAbout.observe(aboutSection);
}



// service page  section -3

const timelineOptions = {
  root: null,
  threshold: 0.25,
  rootMargin: "0px 0px -80px 0px"
};

const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.15}s`;
      entry.target.classList.add("visible");
      timelineObserver.unobserve(entry.target);
    }
  });
}, timelineOptions);

document.querySelectorAll(".brand-timeline .timeline-step")
  .forEach(step => timelineObserver.observe(step));




// Tech page counter :

/* ===== COUNTER ANIMATION SCRIPT ===== */
const statNumbers = document.querySelectorAll('.stat-number');
const animationLimit = 200;

statNumbers.forEach(statEl => {
  const animateStat = () => {
    const finalValue = Number(statEl.dataset.target);
    const currentValue = Number(statEl.innerText);
    const stepValue = Math.ceil(finalValue / animationLimit);

    if (currentValue < finalValue) {
      statEl.innerText = currentValue + stepValue;
      setTimeout(animateStat, 20);
    } else {
      statEl.innerText = finalValue;
    }
  };

  animateStat();
});



const toggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

if (toggle && navbar) {
  // Helper to close all open submenus
  const closeAllSubmenus = () => {
    document.querySelectorAll('.submenu-panel').forEach(panel => {
      panel.classList.remove('slide-in');
    });
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
    if (window.innerWidth <= 768) {
      navbar.style.overflowY = 'auto';
    } else {
      navbar.style.overflowY = '';
    }
  };

  toggle.addEventListener('click', () => {
    const isActive = toggle.classList.toggle('active');
    navbar.classList.toggle('active');
    document.documentElement.classList.toggle('nav-active', isActive);
    document.body.classList.toggle('nav-active', isActive);
    
    if (!isActive) {
      closeAllSubmenus();
    }
  });

  // Mobile Submenu slide-in toggle
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentDropdown = btn.closest('.dropdown');
        const submenuPanel = parentDropdown.querySelector('.submenu-panel');
        
        if (submenuPanel) {
          parentDropdown.classList.add('active');
          submenuPanel.classList.add('slide-in');
          navbar.style.overflowY = 'hidden'; // Lock navbar scrolling
          navbar.scrollTo(0, 0); // Scroll navbar to top so submenu drawer starts from top
        }
      }
    });
  });

  // Mobile Submenu back button
  document.querySelectorAll('.back-btn').forEach(backBtn => {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const panel = backBtn.closest('.submenu-panel');
      const parentDropdown = backBtn.closest('.dropdown');
      
      if (panel) {
        panel.classList.remove('slide-in');
      }
      if (parentDropdown) {
        parentDropdown.classList.remove('active');
      }
      
      const openPanels = document.querySelectorAll('.submenu-panel.slide-in');
      if (openPanels.length === 0) {
        if (window.innerWidth <= 768) {
          navbar.style.overflowY = 'auto';
        } else {
          navbar.style.overflowY = '';
        }
      }
    });
  });

  // Desktop Split-Pane Mega Menu Hover/Click switching
  document.querySelectorAll('.sidebar-item').forEach(item => {
    const handleTabSwitch = () => {
      if (window.innerWidth > 768) {
        const tabId = item.getAttribute('data-tab');
        const container = item.closest('.mega-menu-container');
        if (!container) return;
        
        container.querySelectorAll('.sidebar-item').forEach(sib => sib.classList.remove('active'));
        item.classList.add('active');
        
        container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
        const targetPane = container.querySelector(`#${tabId}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      }
    };
    
    item.addEventListener('mouseenter', handleTabSwitch);
    item.addEventListener('click', (e) => {
      if (window.innerWidth > 768) {
        e.preventDefault();
        handleTabSwitch();
      }
    });
  });

  // Bahar click karo toh band ho jaye
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !navbar.contains(e.target)) {
      toggle.classList.remove('active');
      navbar.classList.remove('active');
      document.documentElement.classList.remove('nav-active');
      document.body.classList.remove('nav-active');
      closeAllSubmenus();
    }
  });

  // Close menu and unlock scroll when clicking any link inside the navbar that isn't a dropdown toggle
  navbar.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navbar.classList.remove('active');
      document.documentElement.classList.remove('nav-active');
      document.body.classList.remove('nav-active');
      closeAllSubmenus();
    });
  });
}




document.addEventListener('DOMContentLoaded', () => {

  const blogContainer = document.getElementById('blog-feed-container');
  if (!blogContainer) return;

  const API_URL = `${BASE_URL}/users/getBlogs`;
  const primaryCard = document.querySelector('.primary-article');
  const auxCards = document.querySelectorAll('.aux-card');

  async function fetchBlogPosts() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      const posts = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);

      if (!posts || posts.length === 0) return;

      // Latest first
      const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      renderTopCards(sortedPosts);
      renderFeedGrid(sortedPosts.slice(3));

    } catch (err) {
      console.error("Fetch error:", err);
    }
  }

  // ==========================
  // TOP 3 CARDS
  // ==========================
  function renderTopCards(posts) {
    const latest = posts[0];
    const second = posts[1];
    const third = posts[2];

    // MAIN CARD
    if (latest && primaryCard) {
      const latestImageUrl = latest.image && latest.image.startsWith("http")
        ? latest.image
        : latest.image && latest.image.startsWith("uploads/")
          ? `${BASE_URL}/${latest.image}`
          : latest.image
            ? `${BASE_URL}/uploads/${latest.image}`
            : 'https://picsum.photos/800/600';

      primaryCard.style.backgroundImage = `url(${latestImageUrl})`;
      primaryCard.style.backgroundSize = "cover";
      primaryCard.style.backgroundPosition = "center";

      const cleanTitle = latest.title ? latest.title.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
      const latestSlug = latest.slug || slugify(cleanTitle);
      primaryCard.innerHTML = `
        <a href="blogs/${latestSlug}" style="text-decoration:none; color:inherit; display:block; width:100%; height:100%;">
          <div class="primary-info">
            <div>
              <h3 class="primary-title">${cleanTitle}</h3>
              <p class="primary-label">Featured Post</p>
              <span class="primary-date">${new Date(latest.createdAt).toDateString()}</span>
            </div>
            <span class="primary-arrow">↗</span>
          </div>
        </a>
      `;
    }

    // SIDE CARDS
    [second, third].forEach((post, index) => {
      if (post && auxCards[index]) {
        const auxImageUrl = post.image && post.image.startsWith("http")
          ? post.image
          : post.image && post.image.startsWith("uploads/")
            ? `${BASE_URL}/${post.image}`
            : post.image
              ? `${BASE_URL}/uploads/${post.image}`
              : 'https://picsum.photos/400/300';

        auxCards[index].style.backgroundImage = `url(${auxImageUrl})`;
        auxCards[index].style.backgroundSize = "cover";
        auxCards[index].style.backgroundPosition = "center";

        const cleanTitle = post.title ? post.title.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
        const postSlug = post.slug || slugify(cleanTitle);
        auxCards[index].innerHTML = `
          <a href="blogs/${postSlug}" style="display:block;width:100%;height:100%;"></a>
        `;
      }
    });
  }

  // ==========================
  // GRID BLOGS
  // ==========================
  function renderFeedGrid(posts) {
    posts.forEach(post => {
      const imageUrl = post.image && post.image.startsWith("http")
        ? post.image
        : post.image && post.image.startsWith("uploads/")
          ? `${BASE_URL}/${post.image}`
          : post.image
            ? `${BASE_URL}/uploads/${post.image}`
            : `https://picsum.photos/seed/${post._id}/400/300`;

      const article = document.createElement("article");
      article.className = "feed-card";

      const cleanTitle = post.title ? post.title.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
      const postSlug = post.slug || slugify(cleanTitle);
      article.innerHTML = `
        <a href="blogs/${postSlug}" style="text-decoration:none; color:inherit; display:block; height:100%;">
          <div class="feed-thumb">
            <img src="${imageUrl}" alt="${cleanTitle}" class="fade-in">
          </div>

          <div class="feed-card-footer">
            <p>${cleanTitle}</p>
            <span class="feed-arrow">↗</span>
          </div>
        </a>
      `;

      const img = article.querySelector('img');
      if (img) {
        img.onload = () => img.classList.add('loaded');
        if (img.complete) img.classList.add('loaded');
      }

      blogContainer.appendChild(article);
    });
  }

  fetchBlogPosts();
});


// const form = document.getElementById("contactForm");

// form.addEventListener("submit", async function (e) {
//   e.preventDefault();

//   let isValid = true;

//   document.querySelectorAll(".error-text").forEach(el => el.remove());
//   document.querySelectorAll(".input-error").forEach(el => el.classList.remove("input-error"));

//   const inputs = form.querySelectorAll("input, textarea");

//   inputs.forEach(input => {
//     const value = input.value.trim();

//     if (!value) {
//       showError(input, "This field is required");
//       isValid = false;
//       return;
//     }

//     if (input.name === "email") {
//       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
//       if (!emailPattern.test(value)) {
//         showError(input, "Enter valid email");
//         isValid = false;
//       }
//     }

//     if (input.name === "phone") {
//       const phonePattern = /^[+]?[\d\s]{10,15}$/;
//       if (!phonePattern.test(value)) {
//         showError(input, "Enter valid phone number");
//         isValid = false;
//       }
//     }

//     if (input.name === "message" && value.length < 10) {
//       showError(input, "Message must be at least 10 characters");
//       isValid = false;
//     }
//   });

//   if (!isValid) return;

//   const submitBtn = form.querySelector("button");
//   submitBtn.disabled = true;
//   submitBtn.innerText = "Sending...";

//   const data = {
//     firstName: form.firstName.value.trim(),
//     lastName: form.lastName.value.trim(),
//     phoneNumber: form.phone.value.trim(), 
//     email: form.email.value.trim(),
//     subject: form.subject.value.trim(),
//     message: form.message.value.trim(),
//   };

//  try {
//   const response = await fetch(`${BASE_URL}/users/contactUS`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to send message");
//   }

//   // Always show fixed success message
//   alert("Message sent successfully!");
//   form.reset();

// } catch (error) {
//   alert("Something went wrong!");
// }

// });

// function showError(input, message) {
//   input.classList.add("input-error");

//   const error = document.createElement("div");
//   error.className = "error-text";
//   error.innerText = message;

//   input.parentNode.insertBefore(error, input.nextSibling);
// }

//************************************** */ homepage blog section*************************/


document.addEventListener("DOMContentLoaded", () => {

  const blogContainer = document.getElementById("blog-container");

  if (!blogContainer) {
    return;
  }

  const API_URL = `${BASE_URL}/users/getBlogs`;

  async function fetchBlogs() {
    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const posts = await response.json();

      // Pehle sort karo (latest first)
      const sortedPosts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Fir sirf 3 latest lo
      renderBlogs(sortedPosts.slice(0, 3));

    } catch (error) {
      console.error("Error fetching blogs:", error);
      blogContainer.innerHTML =
        '<p class="error-message">Failed to load blog posts.</p>';
    }
  }


  function renderBlogs(posts) {

    blogContainer.innerHTML = "";

    posts.forEach(post => {

      const imageUrl = post.image && post.image.startsWith("http")
        ? post.image
        : post.image && post.image.startsWith("uploads/")
          ? `${BASE_URL}/${post.image}`
          : post.image
            ? `${BASE_URL}/uploads/${post.image}`
            : `https://picsum.photos/seed/${post._id}/400/300`;

      const cleanTitle = post.title ? post.title.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
      const cleanDesc = post.description ? post.description.replace(/&nbsp;/g, ' ').replace(/\u00a0/g, ' ') : '';
      const postSlug = post.slug || slugify(cleanTitle);

      const blogCard = document.createElement("a");
      blogCard.className = "blog-card";
      blogCard.href = `blogs/${postSlug}`;
      blogCard.style.textDecoration = "none";
      blogCard.style.color = "inherit";

      blogCard.innerHTML = `
        <div class="blog-image">
           <img src="${imageUrl}" alt="${cleanTitle}" class="fade-in">
        </div>
        <div class="blog-content">
          <div class="blog-author">
            <span>${new Date(post.createdAt).toDateString()} — Story</span>
          </div>
          <h3 class="blog-title">${cleanTitle}</h3>
          <p class="blog-desc">
            ${cleanDesc ? cleanDesc.substring(0, 100) + "..." : ""}
          </p>
          <div class="blog-more">
            Read More <span class="arrow">→</span>
          </div>
        </div>
      `;

      const img = blogCard.querySelector('img');
      if (img) {
        img.onload = () => img.classList.add('loaded');
        if (img.complete) img.classList.add('loaded');
      }

      blogContainer.appendChild(blogCard);
    });
  }

  fetchBlogs();
});

// Sticky Navbar logic
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
});



