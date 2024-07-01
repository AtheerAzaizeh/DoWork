document.addEventListener("DOMContentLoaded", function() {
  const sidebar = document.getElementById('sidebar');
  const menuicon = document.getElementById('menuicon');
  const exiticon = document.getElementById('exit-icon');

  menuicon.addEventListener('click' , OpenSidebar);
  exiticon.addEventListener('click' , CloseSidebar);

  function OpenSidebar(){
      sidebar.style.display = 'block';
  }
  function CloseSidebar(){
      sidebar.style.display = 'none';
  }
});