// ===== PORTFOLIO WEBSITE - CLEAN CODE =====
// Modern JavaScript with proper structure and optimization

class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadAssignments();
    this.trackProgress();
    this.setupAutoRefresh();
    console.log("🚀 Portfolio loaded successfully!");
  }

  // ===== NAVIGATION =====
  setupEventListeners() {
    this.setupMobileNavigation();
    this.setupSmoothScrolling();
    this.setupContactForm();
  }

  setupMobileNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener("click", () => {
      const isVisible = navMenu.style.display === "flex";

      if (isVisible) {
        navMenu.style.display = "none";
      } else {
        Object.assign(navMenu.style, {
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          top: "70px",
          left: "0",
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          padding: "1rem 0",
        });
      }
    });
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  // ===== ASSIGNMENTS SYSTEM =====
  async loadAssignments() {
    // Skip loading assignments if static content already exists
    const container = document.getElementById("assignments-list");
    if (container && container.children.length > 0) {
      console.log("✅ Static assignments already loaded");
      return;
    }

    try {
      const response = await fetch("assignments.json");
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Support both old and new JSON structure
      const assignments = data.assignments || data;
      this.renderAssignments(assignments);
      console.log("✅ Assignments loaded successfully");
    } catch (error) {
      console.error("❌ Error loading assignments:", error);
      this.renderFallbackAssignments();
    }
  }

  renderAssignments(data) {
    const container = document.getElementById("assignments-list");
    if (!container) return;

    container.innerHTML = "";

    Object.entries(data).forEach(([week, urlData]) => {
      const weekNumber = week.replace("week", "");

      // Support both string and object format
      const url = typeof urlData === "string" ? urlData : urlData.url;
      const title =
        typeof urlData === "object"
          ? urlData.title
          : `Bài tập buổi ${weekNumber}`;

      // Check if it's a real link or placeholder
      const isPlaceholder = url.includes("example.com");

      container.appendChild(
        this.createAssignmentElement(weekNumber, url, title, isPlaceholder)
      );
    });
  }

  createAssignmentElement(weekNumber, url, title, isPlaceholder) {
    const weekDisplayName = `Buổi ${weekNumber}`;
    const statusText = isPlaceholder ? "Đang cập nhật" : "Đã có link";
    const statusClass = isPlaceholder ? "updating" : "completed";

    const element = document.createElement("div");
    element.className = "assignment-category";

    if (isPlaceholder) {
      element.innerHTML = `
        <h3><i class="fas fa-calendar-week"></i> ${weekDisplayName}</h3>
        <ul class="assignment-list">
          <li>
            <span class="assignment-placeholder">${title}</span>
            <span class="assignment-status ${statusClass}">${statusText}</span>
          </li>
        </ul>
      `;
    } else {
      element.innerHTML = `
        <h3><i class="fas fa-calendar-week"></i> ${weekDisplayName}</h3>
        <ul class="assignment-list">
          <li>
            <a href="${url}" target="_blank" class="assignment-link">${url}</a>
            <span class="assignment-status ${statusClass}">${statusText}</span>
          </li>
        </ul>
      `;
    }

    return element;
  }

  renderFallbackAssignments() {
    const container = document.getElementById("assignments-list");
    if (!container) return;

    container.innerHTML = "";

    for (let i = 1; i <= 8; i++) {
      const element = document.createElement("div");
      element.className = "assignment-category";
      element.innerHTML = `
        <h3><i class="fas fa-calendar-week"></i> Buổi ${i}</h3>
        <ul class="assignment-list">
          <li>
            <input
              type="url"
              placeholder="Nhập link bài tập buổi ${i}"
              class="assignment-input"
              data-week="week${i}"
            />
          </li>
        </ul>
      `;
      container.appendChild(element);
    }

    this.initializeInputs();
    console.log("📝 Fallback mode activated");
  }

  initializeInputs() {
    document.querySelectorAll(".assignment-input").forEach((input) => {
      const week = input.dataset.week;
      const savedValue = localStorage.getItem(`assignment-${week}`);

      if (savedValue) input.value = savedValue;

      // Auto-save functionality
      input.addEventListener("input", () => {
        if (input.value) {
          localStorage.setItem(`assignment-${week}`, input.value);
        } else {
          localStorage.removeItem(`assignment-${week}`);
        }
      });

      // URL validation
      input.addEventListener("blur", () => {
        if (input.value && !this.isValidURL(input.value)) {
          alert(
            "Vui lòng nhập URL hợp lệ (VD: https://github.com/username/repo)"
          );
          input.focus();
        }
      });
    });
  }

  // ===== CONTACT FORM =====
  setupContactForm() {
    const form = document.querySelector(".contact-form form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        name: form.querySelector("#name")?.value,
        email: form.querySelector("#email")?.value,
        subject: form.querySelector("#subject")?.value,
        message: form.querySelector("#message")?.value,
      };

      if (this.validateForm(formData)) {
        alert("Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.");
        form.reset();
      }
    });
  }

  validateForm(data) {
    // Check required fields
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert("Vui lòng nhập email hợp lệ!");
      return false;
    }

    return true;
  }

  // ===== UTILITY FUNCTIONS =====
  setupAutoRefresh() {
    // Auto-refresh assignments every 3 seconds in development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      setInterval(async () => {
        try {
          await this.loadAssignments();
        } catch (error) {
          // Silently ignore refresh errors
        }
      }, 3000);
      console.log("🔄 Auto-refresh enabled (3s interval)");
    }
  }

  isValidURL(string) {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  }

  trackProgress() {
    const totalWeeks = 8;
    let completedWeeks = 0;

    for (let i = 1; i <= totalWeeks; i++) {
      const savedValue = localStorage.getItem(`assignment-Buổi ${i}`);
      if (savedValue?.trim()) completedWeeks++;
    }

    const progress = Math.round((completedWeeks / totalWeeks) * 100);
    console.log(
      `📊 Assignment Progress: ${completedWeeks}/${totalWeeks} buổi học (${progress}%)`
    );

    return {
      completed: completedWeeks,
      total: totalWeeks,
      percentage: progress,
    };
  }
}

// ===== INITIALIZE APPLICATION =====
document.addEventListener("DOMContentLoaded", () => {
  new PortfolioApp();
});
