var mongoose = require('mongoose');
var Organization = mongoose.model('Organization');

var JsonApiQueryParserClass = require('jsonapi-query-parser');
var JsonApiQueryParser = new JsonApiQueryParserClass();

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.organizationsList = function (req, res) {
  var hostname = req.headers.host;
  var requestData = JsonApiQueryParser.parseRequest(req.url);
  var pageNumber  = requestData.queryData.page.number  || 0;
  var pageSize    = requestData.queryData.page.size    || 0;
  var query = {

  };
  Organization.find(
    query
    ,
    null,
    {
      sort:{

      },
      skip:pageNumber*pageSize,
      limit:pageSize*1
    },
    function(err, organizations){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        //console.log(events);
        Organization.count(query, (err, count) => {
          sendJSONresponse(res, 201, {
            meta: {
              "total-pages": count/pageSize,
              "total-items": count
            },
            links: {
              self: hostname+'/api/v1/organizations'
            },
            data: organizations
          });
        });
      }
    });
};

module.exports.organizationsList = function (req, res) {
  var hostname = req.headers.host;
  var requestData = JsonApiQueryParser.parseRequest(req.url);
  var pageNumber  = requestData.queryData.page.number  || 0;
  var pageSize    = requestData.queryData.page.size    || 0;
  var query = {};
  if(requestData.queryData.filter.representant){
    query.representant = requestData.queryData.filter.representant
  }
  Organization.find(
    query
    ,
    null,
    {
      sort:{

      },
      skip:pageNumber*pageSize,
      limit:pageSize*1
    },
    function(err, organizations){
      if(err){
        console.log(err);
        sendJSONresponse(res, 400, err);
      }else{
        //console.log(events);
        Organization.count(query, (err, count) => {
          sendJSONresponse(res, 201, {
            meta: {
              "total-pages": count/pageSize,
              "total-items": count
            },
            links: {
              self: hostname+'/api/v1/organizations'
            },
            data: organizations
          });
        });
      }
    });
};

module.exports.organizationsCreate = (req, res) => {
  var hostname = req.headers.host;
  console.log(req.user);
  var org = new Organization();
  org.name = req.body.name;
  org.description = req.body.description;
  org.where = {
    address: req.body.where.address
  };
  org.phone = req.body.phone;
  org.email = req.body.email;
  org.website = req.body.website;
  org.lastActivity = new Date();
  if(req.user.role!='administrator'){
    org.representant = req.user._id;
  }else{
    org.representant = req.body.representant || req.user._id;
  }
  org.save((err) => {
    if(err){
      console.log(err);
      sendJSONresponse(res, 400, {
        message: "Error en la creación de la organización.",
        error: err
      });
    }else{
      var createdOrg = {
        type : "organizations",
        id : org._id,
        attributes : {
          name: org.name,
          description: org.description,
          where: org.where,
          phone: org.phone,
          email: org.email,
          website: org.website,
          representant: org.representant,
          lastActivity: org.lastActivity
        },
        links: {
          self: req.headers.host+'/api/v1/organizations/'+org._id
        }
      }
      sendJSONresponse(res, 200, createdOrg);
    }
  });
}
