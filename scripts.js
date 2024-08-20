// Function to initialize the slider
function initializeSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.getElementById("prevTestimonial");
  const nextBtn = document.getElementById("nextTestimonial");
  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  function showNextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  function showPrevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", showNextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", showPrevSlide);
  }

  // Initialize the first slide
  showSlide(currentIndex);

  // Optional: Auto-slide
  // setInterval(showNextSlide, 5000);
}

// Function to load page content
// Function to load page content
function loadPage(page, item) {
  const container = document.querySelector(".container");

  if (container) {
    // Bắt đầu hiệu ứng fade out
    container.classList.add("fade-out");

    // Đợi cho hiệu ứng fade out hoàn tất trước khi tải nội dung mới
    setTimeout(() => {
      fetch(page)
        .then((response) => response.text())
        .then((data) => {
          container.innerHTML = data;

          // Khởi tạo lại các chức năng sau khi nội dung mới được tải
          initializeSlider();
          toggleMenu();

          // Thêm lớp 'select' cho item đã click
          const sidebarItems = document.querySelectorAll(".sidebar-item");
          sidebarItems.forEach((item) => {
            item.classList.remove("select");
          });
          item.classList.add("select");

          // Cập nhật URL trên trình duyệt mà không reload trang
          const pageUrl = item.querySelector("a").getAttribute("href");
          history.pushState({ page: pageUrl }, "", pageUrl);

          // Bắt đầu hiệu ứng fade in
          container.classList.remove("fade-out");
          container.classList.add("fade-in");

          // Sau khi hiệu ứng fade in kết thúc, reset các lớp CSS
          setTimeout(() => {
            container.classList.remove("fade-in");
          }, 500); // Thời gian chờ để hiệu ứng fade in hoàn tất
        })
        .catch((error) => console.error("Error loading page:", error));
    }, 500); // Thời gian chờ để hiệu ứng fade out hoàn tất
  } else {
    console.error("Container not found");
  }
}



// Handle browser navigation (back/forward)
window.addEventListener("popstate", (event) => {
  if (event.state && event.state.page) {
    loadPage(event.state.page, null);
  }
});

// Function to toggle menu visibility
function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");

  if (sidebar && hamburger) {
    sidebar.classList.toggle("active");
    hamburger.classList.toggle("active");
  } else {
    console.error("Sidebar or hamburger not found");
  }
}

// Event listener for sidebar items
document.addEventListener("DOMContentLoaded", () => {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const page = item.querySelector("a").getAttribute("data-page");
      loadPage(page, item);
    });
  });
});
