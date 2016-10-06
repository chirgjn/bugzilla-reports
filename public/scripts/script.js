(function (window, $, undefined) {
  var data, start, end;
  var loadData = $.getJSON('http://localhost:9000/api/cobrand/stat');
  var datasets = {};

  var getMoment = function(bug) {
    return moment.tz(bug.when, data.timezone);
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

  var filterDatasetbyDate = function (dataset,start,end) {
    if (start == undefined && end == undefined) {
      dataset.data = dataset['_data'].slice(0);
    } else {
      dataset.data = dataset['_data'].slice(start,end);
    }
    return dataset;
  };

  $(function () {
    loadData.then(function(res) {
      var datasetview = [];
      var _labels, config, map;

      var init = function(res) {
        data = res;
        start = moment().tz(data.timezone).startOf('year');
        end = moment().tz(data.timezone).quarter(2).endOf('quarter');

        datasets.total = {
          label: 'Total',
          _data: []
        };
        datasets.tradesmith = {
          label: 'TradeSmith',
          _data: []
        };
        datasets.xero = {
          label: 'Xero',
          _data: []
        };
        datasets.personalCapital = {
          label: 'Personal Capital',
          _data: []
        };
        datasets.bankOfAmerica = {
          label: 'Bank Of America',
          _data: []
        };
        datasets.citi = {
          label: 'Citi',
          _data: []
        };
        datasets.iggSoftware = {
          label: 'IGG Software',
          _data: []
        };
        datasets.learnvest = {
          label: 'Learnvest',
          _data: []
        };
        datasets.lifelock = {
          label: 'Lifelock',
          _data: []
        };
        datasets.crowdspot = {
          label: 'Crowdspot',
          _data: []
        };
        datasets.pocketsmith = {
          label: 'PocketSmith',
          _data: []
        };
        datasets.clarilogic = {
          label: 'Clarilogic',
          _data: []
        };
        datasets.waveaccounting = {
          label: 'Waveaccounting',
          _data: []
        };
        datasets.hedgeop = {
          label: 'HedgeOp',
          _data: []
        };
        datasets.kabbage = {
          label: 'Kabbage',
          _data: []
        };
        datasets.hellowallet = {
          label: 'HelloWallet',
          _data: []
        };

        generateDataSetsByCount(data.incoming);

        filterDatasetbyDate(datasets.total);
        filterDatasetbyDate(datasets.tradesmith);
        filterDatasetbyDate(datasets.xero);
        filterDatasetbyDate(datasets.personalCapital);
        filterDatasetbyDate(datasets.bankOfAmerica);
        filterDatasetbyDate(datasets.citi);
        filterDatasetbyDate(datasets.iggSoftware);
        filterDatasetbyDate(datasets.learnvest);
        filterDatasetbyDate(datasets.lifelock);
        filterDatasetbyDate(datasets.crowdspot);
        filterDatasetbyDate(datasets.pocketsmith);
        filterDatasetbyDate(datasets.clarilogic);
        filterDatasetbyDate(datasets.waveaccounting);
        filterDatasetbyDate(datasets.hedgeop);
        filterDatasetbyDate(datasets.kabbage);
        filterDatasetbyDate(datasets.hellowallet);

        Reflect.ownKeys(datasets).forEach(function(key) {setColor(datasets[key], randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor())});

        _labels = generateWeekLabels();

        config = {
          type: 'line',
          data: {
            labels: _labels.slice(0),
            datasets: datasetview
          },
          options: {
            responsive: true
          }
        };

        map = {
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
      };

      init(res);
      var ctx = $("#stats canvas");
      var graph = new Chart(ctx,config);

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
  });
})(window, jQuery);
