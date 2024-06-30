export class LocationService {
  initializeLocations() {
    const locations = [
      "Jerusalem", "Tel Aviv", "Haifa", "Rishon LeZion", "Petah Tikva", "Ashdod", "Netanya", "Beersheba",
      "Holon", "Bnei Brak", "Ramat Gan", "Ashkelon", "Rehovot", "Bat Yam", "Kfar Saba", "Herzliya",
      "Hadera", "Modiin", "Nazareth", "Ra'anana", "Ramat Hasharon", "Raanana", "Lod", "Ramla", "Nahariya",
      "Kiryat Ata", "Eilat", "Acre", "Rosh HaAyin", "Givatayim", "Kiryat Gat", "Kiryat Motzkin", "Nesher",
      "Kiryat Yam", "Or Yehuda", "Yavne", "Tiberias", "Tirat Carmel", "Afula", "Migdal HaEmek", "Karmiel",
      "Dimona", "Sderot", "Maale Adumim", "Yehud"
    ];
    const datalist = document.querySelector('#locations');
    locations.forEach(location => {
      const option = document.createElement("option");
      option.value = location;
      datalist.appendChild(option);
    });
  }
}
