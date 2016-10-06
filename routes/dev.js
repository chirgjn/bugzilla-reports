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

  var generateStats = function(alias, bugs) {
    var stats = {
      timezone: timezone,
      closed: [],
      doot: [],
      dootReopened: [],
      closedReopened: [],
      failedInReview: []
    };

    bugs.forEach(function (bug) {
      var bugCreationDate = bug.creation_ts
      , idle_time = bug.idle_time
      , bugId = bug.id
      , type = bug.type
      , lastIdleTime = 0
      , lastClosureAlias = null
      , lastDootAlias = null
      , lastSentForReview1Alias = null
      , lastSentForReview2Alias = null;

      bug.transactions.forEach(function (transaction) {
        var transAlias = transaction.alias
        , transWhen = transaction.when;

        transaction.activities.forEach(function (activity) {
          // Idle Time
          if (activity['description'] === 'Idle Time') {
            lastIdleTime = activity['added'];
          }

          if (activity['description'] === 'Hours Worked') {
            assignedTo = activity['added'];
          }

          // Review - 1
          if (activity['added'] === 'Waiting - Code Review 1') {
            lastSentForReview1Alias = transAlias;
          }

          // Review - 2
          if (activity['added'] === 'Waiting - Code Review 2') {
            lastSentForReview2Alias = transAlias;
          }

          // Closed
          if (activity['removed'] === 'Reviewed' && activity['added'] === 'Closed') {
            lastSentForReview1Alias = null;
            lastSentForReview2Alias = null;
            lastClosureAlias = transAlias;

            if (alias === transAlias) {
              stats.closed.push(utils.createClosedBugStat(transWhen, bugId, type, bugCreationDate, lastIdleTime));
            }
          }

          // Doot
          if (activity['removed'] === 'Reviewed' && activity['added'] === 'Dependent on other teams') {
            lastSentForReview1Alias = null;
            lastSentForReview2Alias = null;
            lastDootAlias = transAlias;

            if (alias === transAlias) {
              stats.doot.push(utils.createDootBugStat(transWhen, bugId, type, bugCreationDate, lastIdleTime));
            }
          }

          // Closed-Reopen
          if (activity['removed'] === 'CS' && activity['added'] === 'IAE' && lastClosureAlias === alias) {
            lastSentForReview1Alias = null;
            lastSentForReview2Alias = null;
            stats.closedReopened.push(utils.createReopenBugStat(bugId, type, transWhen, transAlias));
          }

          // Doot-Reopen
          if (activity['removed'] === 'CS' && activity['added'] === 'IAE' && lastDootAlias === alias) {
            lastSentForReview1Alias = null;
            lastSentForReview2Alias = null;
            stats.dootReopened.push(utils.createReopenBugStat(bugId, type, transWhen, transAlias));
          }

          // Failed in Review
          if (activity['added'] === 'Failed in review'
            && (lastSentForReview1Alias === alias
              || (lastSentForReview1Alias===null
                && lastSentForReview2Alias === alias))) {
            stats.failedInReview.push(utils.createFailedInReviewBugStat(bugId, type, transWhen, transAlias));
          }
        });
      });
    });
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

  function fetch_bugs(alias, start, end, done) {
    var query = "select distinct ba.bug_id, b.cf_bugtype, DATE_FORMAT(ba.bug_when, '%Y-%m-%dT%T') as bug_when, b.cf_idle_time, DATE_FORMAT(b.creation_ts, '%Y-%m-%dT%T') as creation_ts, fd.description, ba.removed, ba.added, p.login_name from bugs_activity ba\n"+
    ", fielddefs fd\n"+
    ", bugs b\n"+
    ", profiles p\n"+
    ",(select ba.bug_id, ba.bug_when from bugs_activity ba\n"+
    ", fielddefs fd\n"+
    ", profiles p\n"+
    "where ba.who = p.userid\n"+
    "and p.login_name = "+pool.escape(alias)+"\n"+
    "and fd.id = 141\n"+
    "and ba.fieldid = fd.id\n"+
    "and (ba.added='Dependent on other teams' or ba.added='Closed')) as closed\n"+
    "where fd.id = ba.fieldid\n"+
    "and ba.bug_id = closed.bug_id\n"+
    "and b.bug_id = closed.bug_id\n"+
    "and ba.who = p.userid\n"+
    "and ba.added != '---'\n"+
    "and closed.bug_when>="+pool.escape(utils.formatAsISOString(start))+"\n"+
    "and closed.bug_when<="+pool.escape(utils.formatAsISOString(end))+"\n"+
    "and fd.id in (16,40,47,117,105,141,143,146,148,150)\n"+
    "order by b.creation_ts, b.bug_id, ba.bug_when";

    pool.query(query, function (err, rows) {
      if (err) {
        console.log('There was an error querying the db');
        done(err);
        return;
      }
      console.log(rows.length);
      done(err, alias, utils.generateBugTransactionLists(rows));
    });
  }

  function fetch_bugs_for_quarter(alias, quarter, done, year) {
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
    return fetch_bugs(alias, start, end ,done);
  }

  function fetch_bugs_for_midYear(alias, done, year) {
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
    return fetch_bugs(alias, start, end ,done);
  }

  function fetch_bugs_for_Year(alias, done, year) {
    year = year || (new Date()).getFullYear();
    var start = moment().tz(timezone);
    var end = moment().tz(timezone);
    start.year(year);
    end.year(year);
    start.startOf('year');
    end.endOf('year');
    return fetch_bugs(alias, start, end ,done);
  }


  app.get('/all/:alias',function(req,res) {
    setCORSHeaders(res);
    fetch_bugs_for_midYear(req.params.alias, function (err, alias, data) {
      if (err) {
        res.status(500);
        res.send(err);
        return
      }
      res.json(data)
    })
  });

  app.get('/stat/:alias',function(req,res) {
    setCORSHeaders(res);
    fetch_bugs_for_midYear(req.params.alias, function (err, alias, bugs) {
      if (err) {
        res.status(500);
        res.send(err);
        return
      }
      var stats = generateStats(alias, bugs);
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
