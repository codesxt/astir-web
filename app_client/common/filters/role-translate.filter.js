const roles = [
  {value: "administrator", name: "Admin"},
  {value: "provider", name: "Proveedor Cultural"}
];

const roleTranslate = () => {
  return (value) => {
    var element = roles.find((element) => {
      return element.value == value
    });
    return element != undefined ? element.name : 'No Definido';
  }
}

angular
.module('AstirWebApp')
.filter('roleTranslate', roleTranslate);
