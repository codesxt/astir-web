const roles = [
  {value: "administrator", name: "Admin"},
  {value: "provider", name: "Proveedor Cultural"}
];

const roleTranslate = () => {
  return (value) => {
    return (roles.find((element) => {
      return element.value == value
    })).name;
  }
}

angular
.module('AstirWebApp')
.filter('roleTranslate', roleTranslate);
