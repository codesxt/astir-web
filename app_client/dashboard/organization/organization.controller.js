angular.module('AstirWebApp')
.controller('organizationCtrl', organizationCtrl);

function organizationCtrl(usersSvc, authSvc, astirDataSvc){
  var vm = this;
  vm.organization = { };
  vm.formError = "";
  vm.state = "none";
  vm.newOrganization = { };
  vm.getData = () => {
    astirDataSvc.getOrganizationByUser(authSvc.currentUser()._id)
    .success(function(result){
      if(result.data.length==0){
        vm.state = "none";
      }else{
        vm.organization = result.data[0];
        vm.state = "reading";
      }
    })
    .error(function(e){
      vm.formError = "Se produjo un error en la obtención de datos de organización. Error: " + e;
    })
  }

  vm.createNewOrganization = () => {
    vm.state = "creating";
  }

  vm.createOrganization = () => {
    astirDataSvc.createOrganization({
      name: vm.newOrganization.name,
      description: vm.newOrganization.description,
      where: {
        address: vm.newOrganization.address
      },
      phone: vm.newOrganization.phone,
      email: vm.newOrganization.email,
      website: vm.newOrganization.website
    })
    .success((result) => {
      vm.getData();
    })
    .error((e) => {
      vm.formError = "Se produjo un error al crear la organización. Error: " + e;
    });
  }

  vm.getData();
}
