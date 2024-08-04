export class MenuService {
  setActiveMenu(activeButton, inactiveButton, activeMenu, inactiveMenu) {
    activeButton.style.backgroundColor = '#20C997';
    inactiveButton.style.backgroundColor = 'white';
    activeMenu.style.display = 'block';
    inactiveMenu.style.display = 'none';
  }

  toggleMenuDisplay(isAllJobs, activeButton, inactiveButton, activeMenu, inactiveMenu) {
    if (isAllJobs) {
      this.setActiveMenu(activeButton, inactiveButton, activeMenu, inactiveMenu);
    } else {
      this.setActiveMenu(inactiveButton, activeButton, inactiveMenu, activeMenu);
    }
  }
}
