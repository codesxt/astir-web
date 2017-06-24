const categories = [
  {value: "music", name: "Música"},
  {value: "theatre", name: "Teatro"},
  {value: "opera", name: "Ópera"},
  {value: "exposition", name: "Exposición"},
  {value: "festival", name: "Festival"},
  {value: "fair", name: "Feria"},
  {value: "talk", name: "Charla"},
  {value: "movie", name: "Cine"},
  {value: "outdoors", name: "Aire Libre"}
];

const categoryTranslate = () => {
  return (value) => {
    var element = categories.find((element) => {
      return element.value == value
    });
    return element != undefined ? element.name : 'No Definido';
  }
}

angular
.module('AstirWebApp')
.filter('categoryTranslate', categoryTranslate);
