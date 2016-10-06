var moment = require('moment-timezone');


module.exports = function (timezone) {
  timezone = timezone || 'America/Los_Angeles';

  var cobrands = {
    unique: [
      {
        name: 'amerimerchant',
        descriptions: ['amerimerchant']
      }
      , {
        name: 'aplossoftware',
        descriptions: ['aplossoftware']
      }
      , {
        name: 'awarnys',
        descriptions: ['awarnys']
      }
      , {
        name: 'personal capital',
        customer: 'personal capital',
        descriptions: ['personal capital']
      }
      , {
        name: 'citi',
        customer: 'citi cards',
        descriptions: ['citi cards']
      }
      , {
        name: 'citi',
        customer: 'citi colombia',
        descriptions: ['citi colombia']
      }
      , {
        name: 'citi',
        customer: 'citi myfi',
        descriptions: ['citi myfi']
      }
      , {
        name: 'citi',
        customer: 'citi smith barney',
        descriptions: ['citi smith barney']
      }
      , {
        name: 'citi',
        customer: 'citibank',
        descriptions: ['citibank']
      }
      , {
        name: 'bank of america',
        customer: 'bofa countrywide',
        descriptions: ['bofa countrywide']
      }
      , {
        name: 'bank of america',
        customer: 'bofa my portfolio upgrade',
        descriptions: ['bofa my portfolio upgrade']
      }
      , {
        name: 'bank of america',
        customer: 'bofa saml',
        descriptions: ['bofa saml']
      }
      , {
        name: 'bank of america',
        customer: 'bofa searchbox',
        descriptions: ['bofa searchbox']
      }
      , {
        name: 'bank of america',
        customer: 'bofa transorder',
        descriptions: ['bofa transorder']
      }
      , {
        name: 'bank of america',
        customer: 'bofa udap',
        descriptions: ['bofa udap']
      }
      , {
        name: 'bank of america',
        customer: 'bofaconsumer',
        descriptions: ['bofaconsumer']
      }
      , {
        name: 'bank of america',
        customer: 'bofamilitary',
        descriptions: ['bofamilitary']
      }
      , {
        name: 'xero',
        customer: 'xero',
        descriptions: ['xero']
      }
      , {
        name: 'Balance Financial',
        customer: 'balance financial',
        descriptions: ['balance financial']
      }
      , {
        name: 'Blooom',
        descriptions: ['blooom']
      }
      , {
        name: 'budgetsimple',
        descriptions: ['budgetsimple']
      }
      , {
        name: 'clarilogic',
        customer: 'clarilogic',
        description: ['clarilogic']
      }
      , {
        name: 'clearbooks',
        descriptions: ['clearbooks']
      }
      , {
        name: 'concur',
        customer: 'concur',
        descriptions: ['concur']
      }
      , {
        name: 'creditkarma',
        customer: 'creditkarma',
        descriptions: ['creditkarma']
      }
      , {
        name: 'crowdspot',
        descriptions: ['crowdspot']
      }
      , {
        name: 'factortrust',
        descriptions: ['factortrust']
      }
      , {
        name: 'Feex',
        descriptions: ['feex']
      }
      , {
        name: 'Freedom Financial PFM',
        customer: 'freedom financial pfm',
        descriptions: ['freedom financial pfm']
      }
      , {
        name: 'hedgeop',
        customer: 'hedgeop',
        descriptions: ['hedgeop']
      }
      , {
        name: 'hellowallet',
        customer: 'hellowallet',
        descriptions: ['hellowallet', 'hello wallet']
      }
      , {
        name: 'igg software',
        customer: 'igg software',
        descriptions: ['igg software']
      }
      , {
        name: 'Johnsonbank',
        descriptions: ['johnsonbank']
      }
      , {
        name: 'kabbage',
        customer: 'kabbage',
        descriptions: ['kabbage']
      }
      , {
        name: 'Kashoo',
        customer: 'kashoo',
        descriptions: ['kashoo']
      }
      , {
        name: 'learnvest',
        customer: 'learnvest',
        descriptions: ['learnvest']
      }
      , {
        name: 'LessEverything',
        customer: 'lesseverything',
        descriptions: ['lesseverything']
      }
      , {
        name: 'lifelock',
        customer: 'lifelock',
        descriptions: ['lifelock']
      }
      , {
        name: 'Miicard',
        customer: 'miicard',
        descriptions: ['miicard']
      }
      , {
        name: 'Moneydashboard',
        customer: 'moneydashbaord',
        descriptions: ['moneydashboard']
      }
      , {
        name: 'MoneyDesktop',
        customer: 'moneydesktop',
        descriptions: ['moneydesktop']
      }
      , {
        name: 'MoneyStream',
        descriptions: ['moneystream']
      }
      , {
        name: 'Moven',
        customer: 'moven',
        descriptions: ['moven']
      }
      , {
        name: 'Omni',
        descriptions: ['omni']
      }
      , {
        name: 'Outright',
        descriptions: ['outright']
      }
      , {
        name: 'pocketsmith',
        descriptions: ['pocketsmith']
      }
      , {
        name: 'ProfitKeeper',
        descriptions: ['profitkeeper']
      }
      , {
        name: 'saveup',
        customer: 'saveup',
        descriptions: ['saveup']
      }
      , {
        name: 'Sushio',
        descriptions: ['sushio']
      }
      , {
        name: 'tradesmith',
        descriptions: ['tradesmith']
      }
      , {
        name: 'USYIRestMaster',
        customer: 'usyirestmaster',
        descriptions: ['usyirestmaster']
      }
      , {
        name: 'waveaccounting',
        descriptions: ['waveaccounting']
      }
      , {
        name: 'wealthminder',
        descriptions: ['wealthminder']
      }
      , {
        name: 'Xulu',
        descriptions: ['xulu']
      }
      , {
        name: 'yi prospect',
        customer: 'yi prospect',
        descriptions: ['yi prospect']
      }
      , {
        name: 'zoho',
        descriptions: ['zoho']
      }
    ],
    common: [
      {
        name: 'SDKEE',
          customer: 'sdkee'
      }
      , {
          name: 'Yodlee SDK LAW Master',
          customer: 'yodlee sdk law master'
      }
      , {
          name: 'International Yodlee SDK Master',
          customer: 'international yodlee sdk master'
      }
      , {
          name: 'Yodlee SDK Master',
          customer: 'yodlee sdk master'
      }
    ]
  };

  var getCobrand = function(customer, shortDesc) {
    var u = cobrands.unique;
    var c = cobrands.common;
    var uLength = u.length;
    var cLength = c.length;
    var desc = shortDesc.toLowerCase();

    for (var i = 0; i < uLength; i++) {
      if (u[i].customer && u[i].customer === customer.toLowerCase()) {
        return u[i].name;
      }

      if (u[i].descriptions) {
        var matches = u[i].descriptions.some(function(curr) {
          if(desc.startsWith(curr+'[') || desc.startsWith(curr+' ') || desc.startsWith(curr+',') || desc.includes(':'+curr+'[') || desc.includes(':'+curr+' ') || desc.includes(' '+curr+'[') || desc.includes(' '+curr+' ') || desc.includes(','+curr+',')) {
            return true;
          }
          return false;
        });
        if(matches) {
          return u[i].name;
        }
      }
    }

    for (var i = 0; i < cLength; i++) {
      if (c[i].customer && c[i].customer === customer.toLowerCase()) {
        return c[i].name;
      }
    }

    return 'Other';
  }

  var createBug = function(bugId, creationDate, customer, shortDesc) {
    return {
      id: bugId,
      when: creationDate,
      cobrand: getCobrand(customer, shortDesc)
    };
  };

  var createTransaction = function (alias, when, activity) {
    return {
      alias: alias,
      when: when,
      activities: [activity]
    };
  }

  var formatAsISOString = function(m) {
    return m.format('YYYY-MM-DD[T]HH:mm:ss.SSS');
  }

  var calcTat = function(creationDate, closedDate, idleDays, timezone) {
    timezone = timezone || this.timezone;
    var created =  moment.tz(creationDate, timezone).startOf('day')
    , closed = moment.tz(closedDate, timezone).startOf('day');

    return closed.diff(created, 'days') - parseInt(idleDays);
  }
  var createClosedBugStat = function(transWhen, bugId, type, bugCreationDate, lastIdleTime) {
    return {
      id: bugId,
      type: type,
      when: transWhen,
      tat: calcTat(bugCreationDate, transWhen, lastIdleTime)
    };
  }
  var createReopenBugStat = function(bugId, type, transWhen, transAlias) {
    return {
      id: bugId,
      type: type,
      when: transWhen,
      alias: transAlias
    };
  }
  var generateBugTransactionLists = function(activities) {
    var bugId
    , bug
    , bugs = [];

    activities.forEach(function (record) {
      var bug_when = record['bug_when']
      , alias = record['login_name']
      , activity = {
        description : record['description'],
        removed : record['removed'],
        added : record['added'],
      };

      if (bugId == record['bug_id']) {
        var lastTransaction = bug['transactions'][bug['transactions'].length-1];

        if (bug_when === lastTransaction['when']  && lastTransaction['alias'] == alias)
        lastTransaction['activities'].push(activity);
        else {
          bug['transactions'].push(createTransaction(alias, bug_when, activity));
        }
      } else {
        if (bug) {
          bugs.push(bug);
        }

        bugId = record['bug_id'];
        bug = {
          id : bugId,
          type: record['cf_bugtype'],
          creation_ts: record['creation_ts'],
          idle_time: record['cf_idle_time'],
          transactions: [createTransaction(alias, bug_when, activity)]
        };
      }
    });
    return bugs;
  }


  var generateIncomingBugList = function(bugs) {
    return bugs.map(function (record) {
      return createBug(record['bug_id'], record['creation_ts'], record['cf_customer'], record['short_desc']);
    });
  }



  return {
    timezone: timezone,
    createTransaction : createTransaction,
    calcTat: calcTat,
    createClosedBugStat: createClosedBugStat,
    createDootBugStat: createClosedBugStat,
    createReopenBugStat: createReopenBugStat,
    createFailedInReviewBugStat: createReopenBugStat,
    generateBugTransactionLists: generateBugTransactionLists,
    generateIncomingBugList: generateIncomingBugList,
    formatAsISOString: formatAsISOString
  };
};
