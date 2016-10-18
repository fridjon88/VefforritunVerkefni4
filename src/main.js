(function (){

  $(init);

  function init()
  {
    // alert("jQuery");
  }
  // const foo = [1, 2, 3];
  // const bar = foo.map(i => i*2);
  //
  // const foo2 = 3
  $.ajax({
    'url': 'https://apis.is/flight',
    'type': 'GET',
    'dataType': 'json',
    'data': {'language': 'en', 'type': 'departures'},
    'success': function(response) {
      console.log(response.results);
      //köllum á fylkið inní objectnum
      let a = response.results;
      console.log(a[1].date);

        // búum til töflu

        let table = document.createElement("table");
        table.className = 'table';
        // heitum á dálum bætt við
        const tr = document.createElement('tr');
        const airline = document.createElement('td');
        airline.innerHTML = "Airline";
        tr.appendChild(airline);
        const date = document.createElement('td');
        date.innerHTML = "Date";
        tr.appendChild(date);
        const flightNumber = document.createElement('td');
        flightNumber.innerHTML = "Flight Number";
        tr.appendChild(flightNumber);
        const plannedArrival = document.createElement('td');
        plannedArrival.innerHTML = "Planned Arrival";
        tr.appendChild(plannedArrival);
        const realArrival = document.createElement('td');
        realArrival.innerHTML = "Real Arrival";
        tr.appendChild(realArrival);
        const to = document.createElement('td');
        to.innerHTML = "To";
        tr.appendChild(to);
        //öllum dálukum bætt við
        table.appendChild(tr);
        // const div = ;//ATH ATH
        // document.body.querySelector("html body div.container").appendChild(table);
        // $("#div1").prepend(table);
        // const currentDiv = document.getElementById("div1");
        // document.body.insertBefore(table, currentDiv);

      for(let value of a) {
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
        const to = document.createElement('td');
        to.innerHTML = value.to;
        tr.appendChild(to);
        table.appendChild(tr);


      }
      // Add the created table to the HTML page
      document.body.appendChild(table);
      }
      // var data = {"a": 1, "b": 3, "ds": 4};
  //
      //  // Create a new table
      //  var table = document.createElement("table");
       //
      //  // Add the table header
      //  var tr = document.createElement('tr');
      //  var leftRow = document.createElement('td');
      //  leftRow.innerHTML = "Name";
      //  tr.appendChild(leftRow);
      //  var rightRow = document.createElement('td');
      //  rightRow.innerHTML = "Value";
      //  tr.appendChild(rightRow);
      //  table.appendChild(tr);
       //
      //  // Add the table rows
      //  for (var name in data) {
      //      var value = data[name];
      //      var tr = document.createElement('tr');
      //      var leftRow = document.createElement('td');
      //      leftRow.innerHTML = name;
      //      tr.appendChild(leftRow);
      //      var rightRow = document.createElement('td');
      //      rightRow.innerHTML = value;
      //      tr.appendChild(rightRow);
      //      table.appendChild(tr);
      //  }
       //


      // for(var m in response)
      // {
      //   const flight = response[m];
      //   const airline = flight.airline;
      //   const flightNumber = flight.flightNumber;
      //   console.log(airline);
      // }

  }
  );
})();
