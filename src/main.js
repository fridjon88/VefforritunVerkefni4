document.addEventListener('DOMContentLoaded', function() {
  Flug();
});
let Flug = (function() {

  // $(init);

  function init() {
    //  getData('en', 'arrivals');
     const buttonKomur = document.querySelector("button.komur");
     const buttonBrottfarir = document.querySelector("button.brottfarir");
     const buttonDepartures = document.querySelector("button.departures");
     const buttonArrivals = document.querySelector("button.arrivals");
     console.log(buttonDepartures);
     console.log(buttonArrivals);
     buttonKomur.addEventListener("click",function(){getData('is', 'arrivals')});
     buttonBrottfarir.addEventListener("click",function(){getData('is', 'departures')});
     buttonArrivals.addEventListener("click",function(){getData('en', 'arrivals')});
     buttonDepartures.addEventListener("click",function(){getData('en', 'departures')});
    // alert("jQuery");
  }
  init();
  //language getur verið 'en' eða 'is', type getur verið 'departures'
  //eða 'arrivals'
  function getData(language, type){
    $.ajax({
        'url': 'https://apis.is/flight',
        'type': 'GET',
        'dataType': 'json',
        'data': {
          'language': language,
          'type': type
        },
        'success': function(response) {
          console.log(response.results);
          //hreinsum domið
          // while (taflabdy.firstChild) {
          //     taflabdy.removeChild(taflabdy.firstChild);
          //   }
          //köllum á fylkið inní objectnum
          let gogn = response.results;
          makeTable(gogn, language, type);
        }
      }
    );
  }
  // búum til töflu
  function makeTable(data, language, type) {
    // let table = document.createElement("table");
    let airlineHeader ='';
    let dateHeader ='';
    let flightNumberHeader ='';
    let plannedArrivalHeader ='';
    let realArrivalHeader ='';
    let toHeader ='';
    let fromHeader ='';
    //veljum haus og body töflu
    let taflaHd = document.querySelector("thead");
    let taflabdy = document.querySelector("tbody");
    //tæmum töfluna ef það er e-ð í henni
    $(taflaHd).empty();
    $(taflabdy).empty();

    //athugum language, ef is þá breytum við header á töflu í
    //íslensku, ef e-ð annað en íslenska, þá er enska defautl
    if (language === 'is'){
      airlineHeader = 'Flugfélag';
      dateHeader = 'Dagsetning';
      flightNumberHeader = 'Númer flugs';
      plannedArrivalHeader = 'Áætluð koma';
      realArrivalHeader = 'Koma';
      toHeader = 'Til';
      fromHeader = 'Frá';
    }
    else {
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
    if (type === 'departures'){
      const to = document.createElement('th');
      to.innerHTML = toHeader;
      tr.appendChild(to);
    }
    else if (type === 'arrivals'){
      const from = document.createElement('th');
      from.innerHTML = fromHeader;
      tr.appendChild(from);
    }
    //öllum dálukum bætt við
    // table.appendChild(tr);
    console.log(taflaHd);
    taflaHd.appendChild(tr);

    //rúllum í gegnum gögn
    for (let value of data) {
      console.log(value.airline);
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
      if (type === 'departures'){
        const to = document.createElement('td');
        to.innerHTML = value.to;
        tr.appendChild(to);
        taflabdy.appendChild(tr);
      }
      else if (type === 'arrivals'){
        const from = document.createElement('td');
        from.innerHTML = value.from;
        tr.appendChild(from);
        taflabdy.appendChild(tr);
      }
      else {
        throw "Wrong arrival or departure";
      }


    }
  }
});
