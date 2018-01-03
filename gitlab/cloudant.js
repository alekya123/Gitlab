var dateFormat = require('dateformat');
var datetime = require('node-datetime');
var Blowfish = require('blowfish');
var key = require('./constant.js');
const readline = require('readline');
var dt = datetime.create();
var presentDate = dt.format('m/d/Y');//present date
var Cloudant = require('cloudant');
var moment = require('moment');
var fs = require('fs');
const Crypto = require('node-crypt');
let CLOUDANT_USERNAME;
let CLOUDANT_PASSWORD;
let ProjNamegit = [];
let TimeStampgit = [];
let ProjNameCloud = [];
let TimestampCloud = [];
var dateFormat = require('dateformat');
var datetime = require('node-datetime');
var dt = datetime.create();
var presentDate = dt.format('m/d/Y');//present date
var moment = require('moment');
var gitlab = require('gitlab')({
    url:   'https://gbsgit.in.dst.ibm.com',
    token: 'aQJ7FotabxTdcrB6WUMU'
  });


  gitlab.projects.allAdmin(function(projects) {

    //var c = 0;
    //console.log(projects)
      for(var proj = 0; proj < projects.length; proj++)
      {
        var date1 = dateFormat(projects[proj].created_at, "fullDate");
        var date2 = dateFormat(projects[proj].last_activity_at, "fullDate");
  
        var date = dateFormat(projects[proj].last_activity_at, "fullDate");
        var future = moment(presentDate);
        var start = moment(date);
       
        
        //  console.log("Project Name: " + projects[proj].name + " Created at: " + date1 + " Last Activity: " + date2 + " days "+ future.diff(start, 'days'))
          ProjNamegit.push(projects[proj].name);
          TimeStampgit.push(future.diff(start, 'days'));
      }
      comp();
    });
  

    



first()
function first(){
  const crypto = new Crypto({
    key:key1,
    hmacKey:hmacKey1
  });

  CLOUDANT_USERNAME = crypto.decrypt(user);
  CLOUDANT_PASSWORD = crypto.decrypt(pass);
myfun();

}



function comp() {
  console.log(ProjNameCloud.length +'    ' + ProjNamegit.length);
  for (var i = 0; i < ProjNamegit.length; i++) {
   //console.log(TimeStampgit[i] +" "+TimestampCloud[j]+'   '+ProjNamegit[i] +"   "+ProjNameCloud[j])
    for (var j = 0; j < ProjNameCloud.length; j++) {
      if (ProjNamegit[i] === ProjNameCloud[j] && TimeStampgit[i] === TimestampCloud[j] && TimeStampgit[i] > 60) {
        console.log("-----------------------"+ProjNamegit[i] + TimeStampgit[i]);
      }
    }
  }
}

function myfun(){

console.log(CLOUDANT_USERNAME);
  
  var cloudant = Cloudant({account:CLOUDANT_USERNAME, password:CLOUDANT_PASSWORD});
  var cloud_wopt = fs.createWriteStream('proj_time.txt'); //creating a file

  var db = cloudant.db.use("portal-database");

  db.list({ include_docs: true }, function(err, body) {
      if (!err) {
        body.rows.forEach(function(row) {
          var date = dateFormat(row.doc.Timestamp, "fullDate");
          var future = moment(presentDate);
          var start = moment(date);
          
          if(row.doc._id)
              if (row.doc.project_name == null || row.doc.Timestamp == null)
              
                  cloud_wopt.write("_id       "+row.doc._id+"     Project Name      "+row.doc.project_name+"      Timestamp      "+date+"\n" + "Days:   " + future.diff(start, 'days'));
              else{
                  //console.log("_id        "+row.doc._id+"     Project Name     "+row.doc.project_name+"       Timestamp       "+date + "Days:   " + future.diff(start, 'days'));
                  ProjNameCloud.push(row.doc.project_name);
                  TimestampCloud.push(future.diff(start, 'days'));
              }

        });
       // console.log(ProjNameCloud+ '  '  + TimestampCloud);
      }
    })
  };
