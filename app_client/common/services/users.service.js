angular.module('AstirWebApp')
.service('usersSvc', usersSvc);

function usersSvc($http, authSvc){
  var getUsers = function(
    pageNumber = 0,
    pageSize = 1){
    var query = '/api/v1/users';
    var queryParams = "";
    if(pageNumber != null && pageSize != null){
      queryParams = queryParams + "page[number]=" + pageNumber;
      queryParams = queryParams + "&page[size]=" + pageSize;
    }
    var queryUrl = query + "?" + queryParams;
    return $http.get(queryUrl, {
      headers: {
        Authorization: 'Bearer '+ authSvc.getToken()
      }
    });
  };

  var getSelfUserData = function(){
    return $http.get('/api/v1/selfuser', {
      headers: {
        Authorization: 'Bearer '+ authSvc.getToken()
      }
    });
  }

  var updateSelfUserData = function(userData){
    return $http.patch('/api/v1/selfuser', {
      name: userData.name,
      email: userData.email
    },
    {
      headers: {
        Authorization: 'Bearer '+ authSvc.getToken()
      }
    });
  }

  return {
    getUsers : getUsers,
    getSelfUserData : getSelfUserData,
    updateSelfUserData : updateSelfUserData
  };
}
