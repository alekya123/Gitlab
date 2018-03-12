var dateFormat = require('dateformat');
var datetime = require('node-datetime');
var dt = datetime.create();
var presentDate = dt.format('m/d/Y');//present date
var moment = require('moment');
var gitlab = require('gitlab')({
    url:   'https://gbsgit.in.dst.ibm.com',
    token: 'aQJ7FotabxTdcrB6WUMU'
  });

//console.log(gitlab.projects.allAdmin)

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
     
      
        console.log("Project Name: " + projects[proj].name + " Created at: " + date1 + " Last Activity: " + date2 + " days "+ future.diff(start, 'days'))
        // c++;
    }
    //console.log(c)
  });


  //Proj Names + days diff > 60
  [0],[1]
 