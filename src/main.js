function flug() {
  let tungumal = 'is';
  let stada = 'arrivals';

  function setLanguage() {
    const btnTungumal = document.querySelector('button.tungumal');
    const btnKomur = document.querySelector('button.komur');
    const btnBrottfarir = document.querySelector('button.brottfarir');
    const pageHeader = document.querySelector('h1.islenska');

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
    let airlineHeader = '';
    let dateHeader = '';
    let flightNumberHeader = '';
    let plannedArrivalHeader = '';
    let realArrivalHeader = '';
    let toHeader = '';
    let fromHeader = '';
    // veljum haus og body töflu
    const taflaHd = document.querySelector('thead');
    const taflaBdy = document.querySelector('tbody');
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
    let tr = document.createElement('tr');
    let airline = document.createElement('th');
    airline.innerHTML = airlineHeader;
    tr.appendChild(airline);
    let date = document.createElement('th');
    date.innerHTML = dateHeader;
    tr.appendChild(date);
    let flightNumber = document.createElement('th');
    flightNumber.innerHTML = flightNumberHeader;
    tr.appendChild(flightNumber);
    let plannedArrival = document.createElement('th');
    plannedArrival.innerHTML = plannedArrivalHeader;
    tr.appendChild(plannedArrival);
    let realArrival = document.createElement('th');
    realArrival.innerHTML = realArrivalHeader;
    tr.appendChild(realArrival);
    let to;
    let from;
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
    for (const value of data) {
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
  }
  // language getur verið 'en' eða 'is', type getur verið 'departures'
  // eða 'arrivals'
  function getData(language, type) {
    $.ajax({
      url: 'https://apis.is/flight',
      type: 'GET',
      dataType: 'json',
      data: {
        language,
        type,
      },
      success(response) {
        // köllum á fylkið inní objectnum
        const gogn = response.results;
        makeTable(gogn, language, type);
      },
    });
  }

  function init() {
    const btnTungumal = document.querySelector('button.tungumal');
    const btnKomur = document.querySelector('button.komur');
    const btnBrottfarir = document.querySelector('button.brottfarir');
    // default setting
    getData(tungumal, stada);

    btnTungumal.addEventListener('click', () => {
      setLanguage();
      getData(tungumal, stada);
    });
    btnKomur.addEventListener('click', () => {
      stada = 'arrivals';
      getData(tungumal, stada);
    });
    btnBrottfarir.addEventListener('click', () => {
      stada = 'departures';
      getData(tungumal, stada);
    });
  }
  init();
}
document.addEventListener('DOMContentLoaded', () => {
  flug();
});
