'use strict';

function flug() {
  var tungumal = 'is';
  var stada = 'arrivals';

  function setLanguage() {
    var btnTungumal = document.querySelector('button.tungumal');
    var btnKomur = document.querySelector('button.komur');
    var btnBrottfarir = document.querySelector('button.brottfarir');
    var pageHeader = document.querySelector('h1.islenska');

    if (tungumal === 'is') {
      tungumal = 'en';

      pageHeader.textContent = 'Arrivals and departures of airplanes';
      btnKomur.textContent = 'Arrivals';
      btnBrottfarir.textContent = 'Departures';
      btnTungumal.textContent = 'Skipta yfir á íslensku';
    } else if (tungumal === 'en') {
      tungumal = 'is';
      btnTungumal.textContent = 'Change to English';
      pageHeader.textContent = 'Komur og brottfarir flugvéla';
      btnKomur.textContent = 'Komur';
      btnBrottfarir.textContent = 'Brottfarir';
    } else {
      tungumal = 'is';
    }
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
    // veljum haus og body töflu
    var taflaHd = document.querySelector('thead');
    var taflaBdy = document.querySelector('tbody');
    // tæmum töfluna ef það er e-ð í henni
    $(taflaHd).empty();
    $(taflaBdy).empty();

    // athugum language, ef is þá breytum við header á töflu í
    // íslensku, ef e-ð annað en íslenska, þá er enska defautl
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
    var to = void 0;
    var from = void 0;
    if (type === 'departures') {
      to = document.createElement('th');
      to.innerHTML = toHeader;
      tr.appendChild(to);
    } else if (type === 'arrivals') {
      from = document.createElement('th');
      from.innerHTML = fromHeader;
      tr.appendChild(from);
    }
    // öllum dálukum bætt við
    // table.appendChild(tr);
    taflaHd.appendChild(tr);

    // rúllum í gegnum gögn
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var value = _step.value;

        tr = document.createElement('tr');
        airline = document.createElement('td');
        airline.innerHTML = value.airline;
        tr.appendChild(airline);
        date = document.createElement('td');
        date.innerHTML = value.date;
        tr.appendChild(date);
        flightNumber = document.createElement('td');
        flightNumber.innerHTML = value.flightNumber;
        tr.appendChild(flightNumber);
        plannedArrival = document.createElement('td');
        plannedArrival.innerHTML = value.plannedArrival;
        tr.appendChild(plannedArrival);
        realArrival = document.createElement('td');
        realArrival.innerHTML = value.realArrival;
        tr.appendChild(realArrival);
        // athuga með arrivals eða departures
        if (type === 'departures') {
          to = document.createElement('td');
          to.innerHTML = value.to;
          tr.appendChild(to);
          taflaBdy.appendChild(tr);
        } else if (type === 'arrivals') {
          from = document.createElement('td');
          from.innerHTML = value.from;
          tr.appendChild(from);
          taflaBdy.appendChild(tr);
        } else {
          stada = 'arrivals';
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
  // language getur verið 'en' eða 'is', type getur verið 'departures'
  // eða 'arrivals'
  function getData(language, type) {
    $.ajax({
      url: 'https://apis.is/flight',
      type: 'GET',
      dataType: 'json',
      data: {
        language: language,
        type: type
      },
      success: function success(response) {
        // köllum á fylkið inní objectnum
        var gogn = response.results;
        makeTable(gogn, language, type);
      }
    });
  }

  function init() {
    var btnTungumal = document.querySelector('button.tungumal');
    var btnKomur = document.querySelector('button.komur');
    var btnBrottfarir = document.querySelector('button.brottfarir');
    // default setting
    getData(tungumal, stada);

    btnTungumal.addEventListener('click', function () {
      setLanguage();
      getData(tungumal, stada);
    });
    btnKomur.addEventListener('click', function () {
      stada = 'arrivals';
      getData(tungumal, stada);
    });
    btnBrottfarir.addEventListener('click', function () {
      stada = 'departures';
      getData(tungumal, stada);
    });
  }
  init();
}
document.addEventListener('DOMContentLoaded', function () {
  flug();
});