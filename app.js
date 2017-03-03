var express = require('express'),
  kue = require('kue'),
  queue = kue.createQueue();

var app = express();
app.set('trust proxy', 1); // trust first proxy

app.get('/',
  (req, res, next) => {
    // simulate that we received a valid input and create a job in kue!
    var job = queue.create('email-queue',
      {
        from: `${Math.random()}@example.com`,
        to: `${Math.random()}@example.com`,
        template: 'welcome-email',
        context: {
          var1: `${Math.random()}`,
          var2: `${Math.random()}`
        },
        title: 'welcome email request'
      }).save(
        (err) => {
          if (!err) {
            console.log(job.id);
            res.status(200).end();
            return;
          }
          console.log(err);
          res.status(500).end();
        }
      );
  }
);

var server = app.listen(3000);
console.log('Express listening on port 3000');
kue.app.listen(3001);
console.log('Kue listening on port 3001');

/************ Worker: start ***************/
queue.process('email-service', function(job, done){
  email(job.data, done);
});

function email(data, done) {
  if(!data.to) {
    //done('invalid to address') is possible but discouraged
    return done(new Error('invalid to address'));
  }
  // email send stuff...
  console.log('requesting email service provider...\n');
  done();
}
/************ Worker: end *****************/

// Exiting with style
process.on('SIGINT', appExit);
function appExit() {
  server.close();
  console.log( 'Express shutdown: OK' );
  queue.shutdown( 5000, (err) => {
    console.log( 'Kue shutdown: ', err||'OK' );
    console.log(`App '${process.title}' exiting on signal 'SIGINT', after ${process.uptime()} seconds running`);
    process.exit( 0 );
  });
}
