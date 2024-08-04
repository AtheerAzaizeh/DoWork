document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('logout-link').addEventListener('click', function(event) {
      event.preventDefault();
      Swal.fire({
          title: 'Are you sure you want to log out?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, log out',
          cancelButtonText: 'Cancel'
      }).then((result) => {
          if (result.isConfirmed) {
              window.location.href = 'index.html';
          }
      });
  });
});