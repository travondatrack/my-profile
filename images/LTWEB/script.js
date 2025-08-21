// Simple static website - minimal JavaScript

// Mobile Navigation Toggle (basic functionality only)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    if (navMenu.style.display === "flex") {
      navMenu.style.display = "none";
    } else {
      navMenu.style.display = "flex";
      navMenu.style.flexDirection = "column";
      navMenu.style.position = "absolute";
      navMenu.style.top = "70px";
      navMenu.style.left = "0";
      navMenu.style.width = "100%";
      navMenu.style.backgroundColor = "white";
      navMenu.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
      navMenu.style.padding = "1rem 0";
    }
  });
}

// Assignment input management
document.addEventListener("DOMContentLoaded", function () {
  const assignmentInputs = document.querySelectorAll(".assignment-input");

  assignmentInputs.forEach((input) => {
    // Load saved values from localStorage
    const week = input
      .closest(".assignment-category")
      .querySelector("h3")
      .textContent.trim();
    const savedValue = localStorage.getItem(`assignment-${week}`);
    if (savedValue) {
      input.value = savedValue;
    }

    // Save to localStorage when input changes
    input.addEventListener("input", function () {
      if (this.value) {
        localStorage.setItem(`assignment-${week}`, this.value);
      } else {
        localStorage.removeItem(`assignment-${week}`);
      }
    });

    // Validate URL format
    input.addEventListener("blur", function () {
      if (this.value && !isValidURL(this.value)) {
        alert(
          "Vui lòng nhập URL hợp lệ (VD: https://github.com/username/repo)"
        );
        this.focus();
      }
    });
  });
});

// URL validation function
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Simple form submission
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const name = contactForm.querySelector("#name").value;
    const email = contactForm.querySelector("#email").value;
    const subject = contactForm.querySelector("#subject").value;
    const message = contactForm.querySelector("#message").value;

    // Simple validation
    if (!name || !email || !subject || !message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập email hợp lệ!");
      return;
    }

    // Show success message
    alert("Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.");
    contactForm.reset();
  });
}

// Basic smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// Assignment progress tracking
function updateAssignmentProgress() {
  const totalWeeks = 8;
  let completedWeeks = 0;

  for (let i = 1; i <= totalWeeks; i++) {
    const savedValue = localStorage.getItem(`assignment-Tuần ${i}`);
    if (savedValue && savedValue.trim()) {
      completedWeeks++;
    }
  }

  const progress = Math.round((completedWeeks / totalWeeks) * 100);
  console.log(
    `📊 Assignment Progress: ${completedWeeks}/${totalWeeks} weeks (${progress}%)`
  );

  return { completed: completedWeeks, total: totalWeeks, percentage: progress };
}

// Call on page load
document.addEventListener("DOMContentLoaded", function () {
  const progress = updateAssignmentProgress();
  console.log(
    `🎯 Portfolio loaded successfully! Assignment progress: ${progress.percentage}%`
  );
});

console.log("🚀 Website tĩnh đã tải thành công!");
console.log("📝 Assignment inputs support localStorage for persistence");
console.log("🌐 Ready for GitHub Pages & Render deployment!");
