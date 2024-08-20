function toggleMenu() {
  const sidebar = document.getElementById("sidebar");
  const hamburger = document.querySelector(".hamburger");

  sidebar.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Lắng nghe sự kiện DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  // Lắng nghe sự kiện click cho tất cả các liên kết trong sidebar
  const sidebarLinks = document.querySelectorAll(".sidebar-item a");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Ngăn không cho liên kết mở trang mới
      const page = link.getAttribute("data-page");
      loadPage(page);
    });
  });
});

function loadPage(page) {
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      const container = document.querySelector(".container");
      if (container) {
        // Cập nhật nội dung vào .container mà không bao gồm phần header và sidebar
        container.innerHTML = data;
        // Ẩn menu sau khi tải nội dung mới
        toggleMenu(); 
      }
    })
    .catch((error) => console.error("Error loading page:", error));
}
function redirectToPage() {
  
  window.location.href = './countdown/index.html'; // Thay đổi đường dẫn tới trang bạn muốn chuyển đến
}