document.addEventListener('DOMContentLoaded', function() {
  Flug();
});
let Flug = (function() {
  let tungumal = 'is';
  // $(init);

  function init() {
    //  getData('en', 'arrivals');
    const btnTungumal = document.querySelector("button.tungumal");
    const btnKomur = document.querySelector("button.komur");
    const btnBrottfarir = document.querySelector("button.brottfarir");
    //  const btnDepartures = document.querySelector("button.departures");
    //  const btnArrivals = document.querySelector("button.arrivals");

    btnTungumal.addEventListener("click", function() {
      setLanguage()
    });
    btnKomur.addEventListener("click", function() {
      getData(tungumal, 'arrivals')
    });
    btnBrottfarir.addEventListener("click", function() {
      getData(tungumal, 'departures')
    });
    //  btnArrivals.addEventListener("click",function(){getData(tungumal, 'arrivals')});
    //  btnDepartures.addEventListener("click",function(){getData(tungumal, 'departures')});

    // alert("jQuery");
  }
  init();

  function setLanguage() {
    const btnTungumal = document.querySelector("button.tungumal");
    const btnKomur = document.querySelector("button.komur");
    const btnBrottfarir = document.querySelector("button.brottfarir");
    let pgHeader = document.querySelector("h1.jumbotron");
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
      tungumal = "is"
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
      'success': function(response) {
        // console.log(response.results);
        //hreinsum domið
        // while (taflaBdy.firstChild) {
        //     taflaBdy.removeChild(taflaBdy.firstChild);
        //   }
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
