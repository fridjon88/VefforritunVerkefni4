'use strict';

(function () {

  $(init);

  function init() {}
  // alert("jQuery");

  // const foo = [1, 2, 3];
  // const bar = foo.map(i => i*2);
  //
  // const foo2 = 3
  $.ajax({
    'url': 'https://apis.is/flight',
    'type': 'GET',
    'dataType': 'json',
    'data': { 'language': 'en', 'type': 'departures' },
    'success': function success(response) {
      console.log(response.results);
      //köllum á fylkið inní objectnum
      var a = response.results;
      console.log(a[1].date);

      // búum til töflu

      var table = document.createElement("table");
      table.className = 'table';
      // heitum á dálum bætt við
      var tr = document.createElement('tr');
      var airline = document.createElement('td');
      airline.innerHTML = "Airline";
      tr.appendChild(airline);
      var date = document.createElement('td');
      date.innerHTML = "Date";
      tr.appendChild(date);
      var flightNumber = document.createElement('td');
      flightNumber.innerHTML = "Flight Number";
      tr.appendChild(flightNumber);
      var plannedArrival = document.createElement('td');
      plannedArrival.innerHTML = "Planned Arrival";
      tr.appendChild(plannedArrival);
      var realArrival = document.createElement('td');
      realArrival.innerHTML = "Real Arrival";
      tr.appendChild(realArrival);
      var to = document.createElement('td');
      to.innerHTML = "To";
      tr.appendChild(to);
      //öllum dálukum bætt við
      table.appendChild(tr);
      // const div = ;//ATH ATH
      // document.body.querySelector("html body div.container").appendChild(table);
      // $("#div1").prepend(table);
      // const currentDiv = document.getElementById("div1");
      // document.body.insertBefore(table, currentDiv);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = a[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var value = _step.value;

          console.log(value.airline);
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
          var _to = document.createElement('td');
          _to.innerHTML = value.to;
          _tr.appendChild(_to);
          table.appendChild(_tr);
        }
        // Add the created table to the HTML page
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

  });
})();