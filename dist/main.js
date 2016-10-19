'use strict';

document.addEventListener('DOMContentLoaded', function () {
  Flug();
});
var Flug = function Flug() {
  var tungumal = 'is';
  // $(init);

  function init() {
    //  getData('en', 'arrivals');
    var btnTungumal = document.querySelector("button.tungumal");
    var btnKomur = document.querySelector("button.komur");
    var btnBrottfarir = document.querySelector("button.brottfarir");
    //  const btnDepartures = document.querySelector("button.departures");
    //  const btnArrivals = document.querySelector("button.arrivals");

    btnTungumal.addEventListener("click", function () {
      setLanguage();
    });
    btnKomur.addEventListener("click", function () {
      getData(tungumal, 'arrivals');
    });
    btnBrottfarir.addEventListener("click", function () {
      getData(tungumal, 'departures');
    });
    //  btnArrivals.addEventListener("click",function(){getData(tungumal, 'arrivals')});
    //  btnDepartures.addEventListener("click",function(){getData(tungumal, 'departures')});

    // alert("jQuery");
  }
  init();

  function setLanguage() {
    var btnTungumal = document.querySelector("button.tungumal");
    var btnKomur = document.querySelector("button.komur");
    var btnBrottfarir = document.querySelector("button.brottfarir");
    var pgHeader = document.querySelector("h1.jumbotron");
    // document.querySelector("button.brottfarir").innerHtml = "Brottfarirr";


    if (tungumal === "is") {
      tungumal = "en";
      btnTungumal.innerHTML = "Skipta yfir á íslensku";
      $(btnKomur).empty();
      $(btnKomur).empty();
      // $(pgHeader).empty();
      btnKomur.innerHTML = "Arrivals";
      btnBrottfarir.innerHTML = "Departures";
      // pgHeader.innerHtml = "Information about airplane departures and arrivals";
      // btnKomur.innerHtml = "Arrivals";
      // console.log(btnKomur);
      // btnBrottfarir.innerHtml = "Departures";
    } else if (tungumal === "en") {
      tungumal = "is";
      btnTungumal.innerHTML = "Change to English";
      $(btnKomur).empty();
      $(btnKomur).empty();
      // $(pgHeader).empty();
      btnKomur.innerHTML = "Komur";
      btnBrottfarir.innerHTML = "Brottfarir";

      // btnKomur.innerHtml = "Komurr";
      // console.log(btnKomur.innerHtml);
      // btnBrottfarir.innerHtml = "Brottfarirr";
    } else {
      tungumal = "is";
    }
    console.log(tungumal);
  }

  //language getur verið 'en' eða 'is', type getur verið 'departures'
  //eða 'arrivals'
  function getData(language, type) {
    $.ajax({
      'url': 'https://apis.is/flight',
      'type': 'GET',
      'dataType': 'json',
      'data': {
        'language': language,
        'type': type
      },
      'success': function success(response) {
        // console.log(response.results);
        //hreinsum domið
        // while (taflaBdy.firstChild) {
        //     taflaBdy.removeChild(taflaBdy.firstChild);
        //   }
        //köllum á fylkið inní objectnum
        var gogn = response.results;
        makeTable(gogn, language, type);
      }
    });
  }
  // búum til töflu
  function makeTable(data, language, type) {
    // let table = document.createElement("table");
    var airlineHeader = '';
    var dateHeader = '';
    var flightNumberHeader = '';
    var plannedArrivalHeader = '';
    var realArrivalHeader = '';
    var toHeader = '';
    var fromHeader = '';
    //veljum haus og body töflu
    var taflaHd = document.querySelector("thead");
    var taflaBdy = document.querySelector("tbody");
    //tæmum töfluna ef það er e-ð í henni
    $(taflaHd).empty();
    $(taflaBdy).empty();

    //athugum language, ef is þá breytum við header á töflu í
    //íslensku, ef e-ð annað en íslenska, þá er enska defautl
    if (language === 'is') {
      airlineHeader = 'Flugfélag';
      dateHeader = 'Dagsetning';
      flightNumberHeader = 'Númer flugs';
      plannedArrivalHeader = 'Áætluð koma';
      realArrivalHeader = 'Koma';
      toHeader = 'Til';
      fromHeader = 'Frá';
    } else {
      airlineHeader = 'Airline';
      dateHeader = 'Date';
      flightNumberHeader = 'Flight number';
      plannedArrivalHeader = 'Planned arrival';
      realArrivalHeader = 'Real arrival';
      toHeader = 'To';
      fromHeader = 'From';
    }
    // table.className = 'table';
    // heitum á dálum bætt við
    var tr = document.createElement('tr');
    var airline = document.createElement('th');
    airline.innerHTML = airlineHeader;
    tr.appendChild(airline);
    var date = document.createElement('th');
    date.innerHTML = dateHeader;
    tr.appendChild(date);
    var flightNumber = document.createElement('th');
    flightNumber.innerHTML = flightNumberHeader;
    tr.appendChild(flightNumber);
    var plannedArrival = document.createElement('th');
    plannedArrival.innerHTML = plannedArrivalHeader;
    tr.appendChild(plannedArrival);
    var realArrival = document.createElement('th');
    realArrival.innerHTML = realArrivalHeader;
    tr.appendChild(realArrival);
    if (type === 'departures') {
      var to = document.createElement('th');
      to.innerHTML = toHeader;
      tr.appendChild(to);
    } else if (type === 'arrivals') {
      var from = document.createElement('th');
      from.innerHTML = fromHeader;
      tr.appendChild(from);
    }
    //öllum dálukum bætt við
    // table.appendChild(tr);
    taflaHd.appendChild(tr);

    //rúllum í gegnum gögn
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        var _tr = document.createElement('tr');
        var _airline = document.createElement('td');
        _airline.innerHTML = value.airline;
        _tr.appendChild(_airline);
        var _date = document.createElement('td');
        _date.innerHTML = value.date;
        _tr.appendChild(_date);
        var _flightNumber = document.createElement('td');
        _flightNumber.innerHTML = value.flightNumber;
        _tr.appendChild(_flightNumber);
        var _plannedArrival = document.createElement('td');
        _plannedArrival.innerHTML = value.plannedArrival;
        _tr.appendChild(_plannedArrival);
        var _realArrival = document.createElement('td');
        _realArrival.innerHTML = value.realArrival;
        _tr.appendChild(_realArrival);
        //athuga með arrivals eða departures
        if (type === 'departures') {
          var _to = document.createElement('td');
          _to.innerHTML = value.to;
          _tr.appendChild(_to);
          taflaBdy.appendChild(_tr);
        } else if (type === 'arrivals') {
          var _from = document.createElement('td');
          _from.innerHTML = value.from;
          _tr.appendChild(_from);
          taflaBdy.appendChild(_tr);
        } else {
          throw "Wrong arrival or departure";
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
};