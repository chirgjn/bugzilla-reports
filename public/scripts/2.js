
var datasets = {};

datasets.total = {
  label: 'Total',
  _data: [48, 662, 715, 701, 739, 827, 819, 691, 807, 820, 777, 856, 778, 794, 780, 807, 986, 730, 714, 685, 696, 766, 593, 710, 677, 621, 596]
};
datasets.tradesmith = {
  label: 'TradeSmith',
  _data: [2, 14, 14, 13, 11, 11, 16, 9, 23, 9, 16, 16, 7, 11, 5, 10, 10, 10, 9, 29, 24, 22, 12, 14, 16, 16, 10]
};
datasets.xero = {
  label: 'Xero',
  _data: [6, 77, 60, 63, 71, 67, 64, 80, 74, 48, 63, 46, 50, 69, 59, 80, 87, 60, 59, 75, 73, 86, 63, 77, 76, 80, 64]
};
datasets.personalCapital = {
  label: 'Personal Capital',
  _data: [11, 142, 180, 159, 182, 237, 186, 154, 145, 247, 194, 203, 220, 176, 157, 175, 232, 167, 154, 152, 140, 132, 146, 124, 135, 117, 98]
};
datasets.bankOfAmerica = {
  label: 'Bank Of America',
  _data: [16, 45, 36, 30, 41, 57, 43, 58, 80, 53, 48, 34, 42, 21, 42, 30, 19, 34, 20, 21, 30, 9, 26, 17, 11, 15, 11]
};
datasets.citi = {
  label: 'Citi',
  _data: [0, 0, 0, 3, 0, 2, 1, 0, 1, 2, 3, 2, 6, 0, 2, 3, 3, 3, 0, 1, 3, 3, 2, 0, 0, 0, 2]
};
datasets.iggSoftware = {
  label: 'IGG Software',
  _data: [1, 18, 13, 19, 14, 21, 16, 29, 34, 23, 19, 21, 20, 46, 28, 22, 35, 13, 20, 28, 20, 21, 8, 16, 30, 16, 20]
};
datasets.learnvest = {
  label: 'Learnvest',
  _data: [0, 17, 18, 15, 12, 11, 15, 11, 18, 10, 12, 15, 9, 15, 10, 9, 17, 19, 9, 8, 17, 15, 7, 19, 8, 16, 11]
};
datasets.lifelock = {
  label: 'Lifelock',
  _data: [2, 10, 17, 14, 20, 17, 19, 10, 12, 16, 7, 24, 22, 16, 16, 15, 21, 10, 4, 16, 14, 8, 3, 9, 17, 10, 15]
};
datasets.crowdspot = {
  label: 'Crowdspot',
  _data: [1, 28, 9, 17, 18, 18, 15, 14, 25, 24, 33, 19, 32, 37, 30, 39, 26, 12, 27, 15, 24, 23, 10, 10, 19, 11, 24]
};
datasets.pocketsmith = {
  label: 'PocketSmith',
  _data: [0, 22, 12, 18, 8, 13, 10, 8, 9, 18, 13, 23, 16, 20, 23, 13, 18, 20, 23, 20, 18, 26, 18, 21, 12, 26, 26]
};
datasets.clarilogic = {
  label: 'Clarilogic',
  _data: [0, 19, 9, 14, 15, 13, 12, 8, 22, 16, 16, 13, 13, 13, 15, 18, 16, 19, 16, 17, 17, 13, 11, 15, 11, 10, 5]
};
datasets.waveaccounting = {
  label: 'Waveaccounting',
  _data: [0, 26, 37, 48, 46, 64, 88, 54, 60, 82, 72, 62, 42, 52, 51, 38, 30, 31, 42, 32, 36, 30, 21, 27, 25, 28, 31]
};
datasets.hedgeop = {
  label: 'HedgeOp',
  _data: [0, 27, 20, 17, 18, 5, 15, 7, 26, 7, 7, 14, 10, 9, 8, 7, 40, 5, 7, 7, 12, 30, 4, 7, 24, 8, 35]
};
datasets.kabbage = {
  label: 'Kabbage',
  _data: [0, 5, 6, 12, 1, 9, 6, 3, 2, 3, 0, 3, 4, 1, 2, 4, 5, 6, 4, 3, 1, 8, 4, 6, 13, 6, 6]
};
datasets.hellowallet = {
  label: 'HelloWallet',
  _data: [0, 24, 29, 31, 21, 24, 18, 22, 27, 34, 22, 29, 14, 16, 17, 17, 23, 19, 27, 16, 9, 17, 12, 16, 13, 17, 25]
};

var getMoment = function(bug) {
  return moment.tz(bug.when, data.timezone);
};

var start = moment().tz(data.timezone).startOf('year');
var end = moment().tz(data.timezone).quarter(2).endOf('quarter');

var generateDataSetByCount = function (arr,key,value) {
  var wStart = start.clone();
  var datasetLength = 0;

  if (wStart.day() !== 6) {
    datasetLength += 1;
    // this Saturday
    wStart.day(6);
  }
  datasetLength += Math.ceil(end.diff(wStart, 'week',true));

  var dataset = (new Array(datasetLength)).fill(0);

  var week = 0;

  arr.forEach(function (bug) {
    var when = getMoment(bug);
    if (when.isSameOrBefore(end) && when.isSameOrAfter(start)) {
      if (bug.type !== 'NSR' && bug.cobrand !== 'Other') {
        if(wStart.isSameOrBefore(when)) {
          wStart.day(13);
          week += 1;
        }
        if(key && bug[key] !== value)
           return
        dataset[week] += 1;
      }
    } else {
      console.log('bug may be invalid');
      console.log(bug.when);
      console.log(bug.id);
    }
  });
  return dataset;
};

var generateDataSetsByCount = function (arr) {
  var wStart = start.clone();
  var datasetLength = 0;
  var week = 0;

  if (wStart.day() !== 6) {
    datasetLength += 1;
    // this Saturday
    wStart.day(6);
  }
  datasetLength += Math.ceil(end.diff(wStart, 'week',true));

  datasets.total._data = (new Array(datasetLength)).fill(0);
  datasets.tradesmith._data = (new Array(datasetLength)).fill(0);
  datasets.xero._data = (new Array(datasetLength)).fill(0);
  datasets.personalCapital._data = (new Array(datasetLength)).fill(0);
  datasets.bankOfAmerica._data = (new Array(datasetLength)).fill(0);
  datasets.citi._data = (new Array(datasetLength)).fill(0);
  datasets.iggSoftware._data = (new Array(datasetLength)).fill(0);
  datasets.learnvest._data = (new Array(datasetLength)).fill(0);
  datasets.lifelock._data = (new Array(datasetLength)).fill(0);
  datasets.crowdspot._data = (new Array(datasetLength)).fill(0);
  datasets.pocketsmith._data = (new Array(datasetLength)).fill(0);
  datasets.clarilogic._data = (new Array(datasetLength)).fill(0);
  datasets.waveaccounting._data = (new Array(datasetLength)).fill(0);
  datasets.hedgeop._data = (new Array(datasetLength)).fill(0);
  datasets.kabbage._data = (new Array(datasetLength)).fill(0);
  datasets.hellowallet._data = (new Array(datasetLength)).fill(0);

  arr.forEach(function (bug) {
    var when = getMoment(bug);
    if (when.isSameOrBefore(end) && when.isSameOrAfter(start)) {
      if (bug.type !== 'NSR' && bug.cobrand !== 'Other') {
        if(wStart.isSameOrBefore(when)) {
          wStart.day(13);
          week += 1;
        }
        if (bug['cobrand'] == 'bank of america') {
          datasets.bankOfAmerica._data[week] += 1;
        }
        if (bug['cobrand'] == 'citi') {
          datasets.citi._data[week] += 1;
        }
        if (bug['cobrand'] == 'clarilogic') {
          datasets.clarilogic._data[week] += 1;
        }
        if (bug['cobrand'] == 'crowdspot') {
          datasets.crowdspot._data[week] += 1;
        }
        if (bug['cobrand'] == 'hellowallet') {
          datasets.hellowallet._data[week] += 1;
        }
        if (bug['cobrand'] == 'igg software') {
          datasets.iggSoftware._data[week] += 1;
        }
        if (bug['cobrand'] == 'learnvest') {
          datasets.learnvest._data[week] += 1;
        }
        if (bug['cobrand'] == 'lifelock') {
          datasets.lifelock._data[week] += 1;
        }
        if (bug['cobrand'] == 'personal capital') {
          datasets.personalCapital._data[week] += 1;
        }
        if (bug['cobrand'] == 'pocketsmith') {
          datasets.pocketsmith._data[week] += 1;
        }
        if (bug['cobrand'] == 'tradesmith') {
          datasets.tradesmith._data[week] += 1;
        }
        if (bug['cobrand'] == 'waveaccounting') {
          datasets.waveaccounting._data[week] += 1;
        }
        if (bug['cobrand'] == 'xero') {
          datasets.xero._data[week] += 1;
        }
        if (bug['cobrand'] == 'kabbage') {
          datasets.kabbage._data[week] += 1;
        }
        if (bug['cobrand'] == 'hedgeop') {
          datasets.hedgeop._data[week] += 1;
        }
        datasets.total._data[week] += 1;
      }
    } else {
      console.log('bug may be invalid');
      console.log(bug.when);
      console.log(bug.id);
    }
  });
};

var filterDatasetbyDate = function (dataset,start,end) {
  dataset.data = dataset['_data'].slice(0);
  return dataset;
}

var generateDataSetByAverage = function (arr,key) {
  if (!key) {
    return [];
  }
  var wStart = start.clone();
  var datasetLength = 0;

  if (wStart.day() !== 6) {
    datasetLength += 1;
    // this Saturday
    wStart.day(6);
  }
  datasetLength += Math.ceil(end.diff(wStart, 'week',true))

  var dataset = (new Array(datasetLength));

  for(var i=datasetLength-1; i>=0; i--) {
    dataset[i] = {
      count: 0,
      total: 0.0
    };
  };

  var week = 0;

  arr.forEach(function (bug) {
    var when = getMoment(bug);
    if (when.isSameOrBefore(end) && when.isSameOrAfter(start)) {
      if (bug.type !== 'NSR' && bug.cobrand !== 'Other') {
        if(wStart.isSameOrBefore(when)) {
          wStart.day(13);
          week += 1;
        }
        if(bug[key])
           return
        dataset[week].count += 1;
        dataset[week].total += bug[key];
      }
    } else {
      console.log('bug may be invalid');
      console.log(bug.when);
      console.log(bug.id);
    }
  });

  return dataset.map(function (item) {
    if (item.count === 0)
      return 0
    return Math.round(item.total/item.count);
  });
};

var generateWeekLabels = function () {
  var labels = [];
  var now = start.clone();
  if (now.day() !== 6) {
    labels.push(start.format('MMM Do') + ' - ' + now.day(5).format('MMM Do'))
    now.day(6);
  }

  while(now.isBefore(end)) {
    var label = now.format('MMM Do') + ' - ';
    // Friday
    now.day(12);
    if(now.isSameOrBefore(end)) {
      label += now.format('MMM Do');
    } else {
      label += end.format('MMM Do');
    }
    // Saturday
    now.day(6);
    labels.push(label);
  }
  return labels;
};

var setColor = function(dataset,rgbColor) {
  dataset.fill =  false;
  dataset.backgroundColor = "rgba("+rgbColor+",0.2)";
  dataset.borderColor = "rgba("+rgbColor+",1)";
  dataset.pointBorderColor = "rgba("+rgbColor+",1)";
  dataset.pointHoverBackgroundColor = "rgba("+rgbColor+",1)";
};

var randomColorFactor = function() {
  return Math.round(Math.random() * 230);
};

filterDatasetbyDate(datasets.tradesmith)
filterDatasetbyDate(datasets.xero)
filterDatasetbyDate(datasets.personalCapital)
filterDatasetbyDate(datasets.bankOfAmerica)
filterDatasetbyDate(datasets.citi)
filterDatasetbyDate(datasets.iggSoftware)
filterDatasetbyDate(datasets.learnvest)
filterDatasetbyDate(datasets.lifelock)
filterDatasetbyDate(datasets.crowdspot)
filterDatasetbyDate(datasets.pocketsmith)
filterDatasetbyDate(datasets.clarilogic)
filterDatasetbyDate(datasets.waveaccounting)
filterDatasetbyDate(datasets.hedgeop)
filterDatasetbyDate(datasets.kabbage)
filterDatasetbyDate(datasets.hellowallet)
filterDatasetbyDate(datasets.total)

// generateDataSetsByCount(data.incoming);
var datasetview = [
];

Reflect.ownKeys(datasets).forEach(function(key) {setColor(datasets[key], randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor())});

(function (window, $, undefined) {
  var _labels = generateWeekLabels();
  var config = {
    type: 'line',
    data: {
      labels: _labels.slice(0),
      datasets: datasetview
    },
    options: {
      responsive: true
    }
  };

  $(function () {
    var ctx = $("#stats canvas");
    var graph = new Chart(ctx,config);
    var map = {
      'total': datasets.total,
      'tradesmith': datasets.tradesmith,
      'xero': datasets.xero,
      'personal-capital': datasets.personalCapital,
      'bank-of-america': datasets.bankOfAmerica,
      'citi': datasets.citi,
      'igg-software': datasets.iggSoftware,
      'learnvest': datasets.learnvest,
      'lifelock': datasets.lifelock,
      'crowdspot': datasets.crowdspot,
      'pocketsmith': datasets.pocketsmith,
      'clarilogic': datasets.clarilogic,
      'waveaccounting': datasets.waveaccounting,
      'hedgeop': datasets.hedgeop,
      'kabbage': datasets.kabbage,
      'hellowallet': datasets.hellowallet
    };

    var updatepoll;

    var startBox = $('#start-date');
    var endBox = $('#end-date');

    $('form#cobrand-filter-form').on('change', 'input[type="checkbox"]', function (e) {
        e.preventDefault();
        if(this.checked) {
          if (!datasetview.includes(map[this.id])) {
            datasetview.push(map[this.id]);
          }
          if (updatepoll) {
            clearTimeout(updatepoll);
          }
          updatepoll = setTimeout(function(){graph.update(300);}, 200);
          return
        }
        if (datasetview.includes(map[this.id])) {
          datasetview.splice(datasetview.indexOf(map[this.id]),1);
          if (updatepoll) {
            clearTimeout(updatepoll);
          }
          updatepoll = setTimeout(function(){graph.update(300);}, 200);
        }
    });
    $('#date-filter-btn').on('click', function (e) {
      console.log('here');
      var begin = parseInt(startBox.val());
      var end = parseInt(endBox.val());
      console.log(begin);
      console.log(end);
      if ( end-begin < 2) {
        alert("End date must be atleast 2 weeks after Start date");
        return;
      }

      if (updatepoll) {
        clearTimeout(updatepoll);
      }

      Reflect.ownKeys(map).forEach(function(key) {
        map[key].data = map[key]['_data'].slice(begin, end+1);
      });

      config.data.labels = _labels.slice(begin, end+1);

      updatepoll = setTimeout(function(){graph.update(300);}, 200);
    });
  });
})(window, jQuery);