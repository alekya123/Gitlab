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
let cloudant;
let CLOUDANT_USERNAME;
let CLOUDANT_PASSWORD;
let ProjNamegit = [];
let TimeStampgit = [];
//let GroupNamegit = [];
let Last_activity = [];
let ProjNameCloud = [];
let TimestampCloud = [];
//let GroupNameCloud = [];
let AdminIdCloud = [];
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
    console.log('git');
      for(var proj = 0; proj < projects.length; proj++)
      {
        var date1 = dateFormat(projects[proj].created_at, "fullDate");
        var date2 = dateFormat(projects[proj].last_activity_at, "fullDate");

        var date = dateFormat(projects[proj].last_activity_at, "fullDate");
        var future = moment(presentDate);
        var start = moment(date);


         //console.log("Project Name: " + projects[proj].name + " Created at: " + date1 + " Last Activity: " + date2 + " days "+ future.diff(start, 'days'))
          ProjNamegit.push(projects[proj].name);
          TimeStampgit.push(future.diff(start, 'days'));
          Last_activity.push(date);
          //GroupNamegit.push(projects[proj].namespace.name);
      }
     // console.log(GroupNamegit);

    // comp();
    first();
    });







function first(){
  console.log('cloudant auth');
  const crypto = new Crypto({
    key:key1,
    hmacKey:hmacKey1
  });

  CLOUDANT_USERNAME = crypto.decrypt(user);
  CLOUDANT_PASSWORD = crypto.decrypt(pass);
   cloudant = Cloudant({account:CLOUDANT_USERNAME, password:CLOUDANT_PASSWORD});
myfun()
}



// function comp() {
//   console.log('comparision')
//   console.log(ProjNameCloud.length +'    ' + ProjNamegit.length);



// }

function myfun(){
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
                  // console.log("_id        "+row.doc._id+"     Project Name     "+row.doc.project_name+"       Timestamp       "+date + "Days:   " + future.diff(start, 'days'));
                  ProjNameCloud.push(row.doc.project_name);
                  TimestampCloud.push(future.diff(start, 'days'));
                  AdminIdCloud.push(row.doc.admin_id)
                  //GroupNameCloud.push(row.doc.group_name);
              }

        });
        

        cloudant.db.destroy('demo_gitlab_cleanup', function(err) {

          // Create a new "alice" database.
          cloudant.db.create('demo_gitlab_cleanup', function() {
            var demo_gitlab_cleanup = cloudant.db.use('demo_gitlab_cleanup');
        for (var i = 0; i < ProjNamegit.length; i++) {
         //console.log(TimeStampgit[i] +" "+TimestampCloud[j]+'   '+ProjNamegit[i] +"   "+ProjNameCloud[j])
          for (var j = 0; j < ProjNameCloud.length; j++) {
            if (ProjNamegit[i] === ProjNameCloud[j] && TimeStampgit[i] === TimestampCloud[j] && TimeStampgit[i] > 60 ) {
              console.log("-----------------------"+ProjNamegit[i] +"-----------"+ TimeStampgit[i] +"------------"+ AdminIdCloud[j] + "----------------"+Last_activity[i]);
              demo_gitlab_cleanup.insert({Tool_Name : 'GitLab', Job_Name : ProjNamegit[i], Last_Build_Date :  Last_activity[i], Last_activity : TimeStampgit[i] +'days ago', Last_Build_By : AdminIdCloud[j], Compliance : 'false' }, function(err, body, header) {
                if (err) {
                  return console.log('[demo_gitlab_cleanup.insert] ', err.message);
                }
                console.log('You have inserted');
            })
          }
           else if(ProjNamegit[i] === ProjNameCloud[j]&& TimeStampgit[i] < 60){
            demo_gitlab_cleanup.insert({Tool_Name : 'GitLab', Job_Name : ProjNamegit[i], Last_Build_Date :  Last_activity[i], Last_activity : TimeStampgit[i] +'days ago', Last_Build_By : AdminIdCloud[j], Compliance : 'true' }, function(err, body, header) {
              if (err) {
                return console.log('[demo_gitlab_cleanup.insert] ', err.message);
              }
              console.log('You have inserted-----------');
          })

          }
        }
      }
    })
  })
       // console.log(ProjNameCloud+ '  '  + TimestampCloud);
      // console.log(GroupNameCloud);
      console.log(ProjNameCloud.length)
      }
    })
  };