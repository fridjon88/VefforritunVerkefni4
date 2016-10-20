document.addEventListener('DOMContentLoaded', function() {
  Flug();
});
let Flug = (function() {
  let tungumal = "is";
  let stada = "arrivals";

  function init() {
    const btnTungumal = document.querySelector("button.tungumal");
    const btnKomur = document.querySelector("button.komur");
    const btnBrottfarir = document.querySelector("button.brottfarir");
    //default setting
    getData(tungumal, stada);

    btnTungumal.addEventListener("click", function() {
      setLanguage()
      getData(tungumal, stada);
    });
    btnKomur.addEventListener("click", function() {
      stada = "arrivals";
      getData(tungumal, stada);
    });
    btnBrottfarir.addEventListener("click", function() {
      stada = "departures";
      getData(tungumal, stada);
    });

  }
  init();

  function setLanguage() {
    const btnTungumal = document.querySelector("button.tungumal");
    const btnKomur = document.querySelector("button.komur");
    const btnBrottfarir = document.querySelector("button.brottfarir");
    const pageHeader = document.querySelector("h1.islenska");

    if (tungumal === "is") {
      tungumal = "en";

      pageHeader.textContent = "Arrivals and departures of airplanes";
      btnKomur.textContent = "Arrivals";
      btnBrottfarir.textContent = "Departures";
      btnTungumal.textContent = "Skipta yfir á íslensku";

    } else if (tungumal === "en") {
      tungumal = "is";
      btnTungumal.textContent = "Change to English";
      pageHeader.textContent = "Komur og brottfarir flugvéla";
      btnKomur.textContent = "Komur";
      btnBrottfarir.textContent = "Brottfarir";

    } else {
      tungumal = "is"
    }
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
      'success': function(response) {

        //köllum á fylkið inní objectnum
        let gogn = response.results;
        makeTable(gogn, language, type);
      }
    });
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
    //veljum haus og body töflu
    let taflaHd = document.querySelector("thead");
    let taflaBdy = document.querySelector("tbody");
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
    const tr = document.createElement('tr');
    const airline = document.createElement('th');
    airline.innerHTML = airlineHeader;
    tr.appendChild(airline);
    const date = document.createElement('th');
    date.innerHTML = dateHeader;
    tr.appendChild(date);
    const flightNumber = document.createElement('th');
    flightNumber.innerHTML = flightNumberHeader;
    tr.appendChild(flightNumber);
    const plannedArrival = document.createElement('th');
    plannedArrival.innerHTML = plannedArrivalHeader;
    tr.appendChild(plannedArrival);
    const realArrival = document.createElement('th');
    realArrival.innerHTML = realArrivalHeader;
    tr.appendChild(realArrival);
    if (type === 'departures') {
      const to = document.createElement('th');
      to.innerHTML = toHeader;
      tr.appendChild(to);
    } else if (type === 'arrivals') {
      const from = document.createElement('th');
      from.innerHTML = fromHeader;
      tr.appendChild(from);
    }
    //öllum dálukum bætt við
    // table.appendChild(tr);
    taflaHd.appendChild(tr);

    //rúllum í gegnum gögn
    for (let value of data) {
      const tr = document.createElement('tr');
      const airline = document.createElement('td');
      airline.innerHTML = value.airline;
      tr.appendChild(airline);
      const date = document.createElement('td');
      date.innerHTML = value.date;
      tr.appendChild(date);
      const flightNumber = document.createElement('td');
      flightNumber.innerHTML = value.flightNumber;
      tr.appendChild(flightNumber);
      const plannedArrival = document.createElement('td');
      plannedArrival.innerHTML = value.plannedArrival;
      tr.appendChild(plannedArrival);
      const realArrival = document.createElement('td');
      realArrival.innerHTML = value.realArrival;
      tr.appendChild(realArrival);
      //athuga með arrivals eða departures
      if (type === 'departures') {
        const to = document.createElement('td');
        to.innerHTML = value.to;
        tr.appendChild(to);
        taflaBdy.appendChild(tr);
      } else if (type === 'arrivals') {
        const from = document.createElement('td');
        from.innerHTML = value.from;
        tr.appendChild(from);
        taflaBdy.appendChild(tr);
      } else {
        throw "Wrong arrival or departure";
      }
    }
  }
});
