document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.querySelector('.sidebar');
  const menuIcon = document.querySelector('.menu-icon');
  const exitIcon = document.querySelector('.exit-icon');

  if (menuIcon) {
    menuIcon.addEventListener('click', function() {
      console.log('Menu icon clicked');
      openSidebar();
    });
  }

  if (exitIcon) {
    exitIcon.addEventListener('click', function() {
      console.log('Exit icon clicked');
      closeSidebar();
    });
  }

  function openSidebar() {
    if (sidebar) {
      sidebar.style.display = 'block';
    }
  }

  function closeSidebar() {
    if (sidebar) {
      sidebar.style.display = 'none';
    }
  }
});


