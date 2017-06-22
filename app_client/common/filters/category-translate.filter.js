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
    return (categories.find((element) => {
      return element.value == value
    })).name;
  }
}

angular
.module('AstirWebApp')
.filter('categoryTranslate', categoryTranslate);
