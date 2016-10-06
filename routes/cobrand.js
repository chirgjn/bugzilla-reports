module.exports =  function (pool, timezone) {
  var utils = require('../lib/utils')(timezone);
  var moment = require('moment-timezone');
  var app = require('express').Router();

  var setCORSHeaders = function(res) {
      res.set({
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Request-Method' : '*',
          'Access-Control-Allow-Methods' : 'OPTIONS, GET',
          'Access-Control-Allow-Headers' : '*'
      });
  }

  var generateStats = function(bugs) {
    var stats = {
      timezone: timezone,
      incoming: [],
      closed: [],
      doot: [],
      dootReopened: [],
      closedReopened: [],
      failedInReview: []
    };
    stats.incoming = [].concat(bugs);

    var cmp = function(trans1, trans2) {
      return moment.tz(trans1.when, timezone).valueOf() - moment.tz(trans2.when, timezone).valueOf();
    }

    stats.closed.sort(cmp);
    stats.doot.sort(cmp);
    stats.closedReopened.sort(cmp);
    stats.dootReopened.sort(cmp);
    stats.failedInReview.sort(cmp);
    return stats;
  }

  function fetch_bugs(start, end, done) {
    var query = "select distinct b.bug_id, DATE_FORMAT(b.creation_ts, '%Y-%m-%dT%T') as creation_ts, b.short_desc, b.cf_customer from bugs b\n"+
    "where b.creation_ts>="+pool.escape(utils.formatAsISOString(start))+"\n"+
    "and b.creation_ts<="+pool.escape(utils.formatAsISOString(end))+"\n"+
    "and b.cf_bugtype not in ('NSR')\n"+
    "order by b.creation_ts, b.bug_id";

    pool.query(query, function (err, rows) {
      if (err) {
        console.log('There was an error querying the db');
        done(err);
        return;
      }
      console.log(rows.length);
      done(err, utils.generateIncomingBugList(rows));
    });
  }

  function fetch_bugs_for_quarter(quarter, done, year) {
    quarter = quarter || 1;
    year = year || (new Date()).getFullYear();
    var start = moment().tz(timezone);
    var end = moment().tz(timezone);
    start.year(year);
    end.year(year);
    start.quarter(quarter);
    end.quarter(quarter);
    start.startOf('quarter');
    end.endOf('quarter');
    return fetch_bugs(start, end ,done);
  }

  function fetch_bugs_for_midYear(done, year) {
    year = year || (new Date()).getFullYear();
    var start = moment().tz(timezone);
    var end = moment().tz(timezone);
    start.year(year);
    end.year(year);
    start.quarter(1);
    end.quarter(2);
    start.startOf('quarter');
    end.endOf('quarter');
    console.log(utils.formatAsISOString(start));
    console.log(utils.formatAsISOString(end));
    return fetch_bugs(start, end ,done);
  }

  function fetch_bugs_for_Year(done, year) {
    year = year || (new Date()).getFullYear();
    var start = moment().tz(timezone);
    var end = moment().tz(timezone);
    start.year(year);
    end.year(year);
    start.startOf('year');
    end.endOf('year');
    return fetch_bugs(start, end ,done);
  }

  app.get('/stat',function(req,res) {
    setCORSHeaders(res);
    fetch_bugs_for_midYear(function (err, bugs) {
      if (err) {
        res.status(500);
        res.send(err);
        return
      }
      var stats = generateStats(bugs);
      res.set('Content-Length', stats.closed.length
      + stats.doot.length
      + stats.dootReopened.length
      + stats.closedReopened.length
      + stats.failedInReview.length);
      res.json(stats);
    });
  });

  return app;
};
