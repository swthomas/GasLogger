$(document).ready(function() {
	console.log("LOADED");
	setup();
});

var setup = function() {
	$('body').empty();
	$.ajax({
		type : 'GET',
		url : 'api/gas/',
		dataType : 'json'
	}).done(function(gasLogs, status) {
		console.log('success');
		load(gasLogs);
	}).fail(function(xhr, status, error) {
		console.log('fail');
	});
};

var load = function(gasLogs) {
	$('body').load('gasTable.html', function() {

		gasLogs.forEach(function(e, i, a) {
			
			var $tr = $('<tr id="row'+e.id+'">');
			var $td1 = $('<td>');
			$td1.text(e.id);
			var $td2 = $('<td>');
			$td2.text(e.date);
			var $td3 = $('<td>');
			$td3.text(e.gallons);
			var $td4 = $('<td>');
			$td4.text(e.cost);
			var $td5 = $('<td>');
			$td5.text(e.odometer);
			var $td6 = $('<td>');
			$td6.text(e.miles);
			var $td7 = $('<td>');
			var $mpg = getMPG(e);
			$mpg = parseInt($mpg*100)/100;
			$td7.text($mpg);
			var $td8 = $('<td>');
			var $cost = getCost(e);
			$cost = parseInt($cost*100)/100;
			$td8.text($cost);
			var $td9 = $('<td td="edit">');
			var $editBtn = $('<button class="edit" id="'+e.id+'">Edit</button>');
			$td9.append($editBtn);
			var $td10 = $('<td td="delete">');
			var $deleteBtn = $('<button class="delete" id="'+e.id+'">Delete</button>');
			$td10.append($deleteBtn);
			
			$tr.append($td1, $td2, $td3, $td4, $td5, $td6, $td7, $td8, $td9, $td10);
			$('#gasTableBody').append($tr);
		});
		
		assignListeners('.edit', getGasLog);
		assignListeners('.delete', deleteGasLog);
		
		var $p = $('<p>');
		var $addGasLogBtn = $('<button id="addBtn">Add Gas Log</button>');
			$addGasLogBtn.on('click', function() {
				addGasLog();
		});
			
		var $reportBtn = $('<button id="addBtn">Gas Log Report</button>');
			$reportBtn.on('click', function() {
			getGasLogs();
		});
			
		var $divLA = $('<div id ="divLA">');
			
		$('.container').append($addGasLogBtn, $p, $reportBtn, $divLA);
	});

};


var getMPG = function(e) {
	var $mpg = e.miles / e.gallons;
	return $mpg;
}

var getCost = function(e) {
	var $cost = e.cost / e.miles;
	return $cost;
}

var assignListeners = function(cn, cb) {
    console.log('in assign');
    $(cn).each(function() {
        $(this).on('click', function() {
            cb($(this).attr('id'));
        });
    });
};

var getGasLog = function(id) {
    $.ajax({
            type: 'GET',
            url: 'api/gas/'+id,
            dataType: 'json'
        })
        .done(function(data, status) {
            editGasLog(data);
        })
        .fail(function(xhr, status, error) {
            console.log('fail');
        });
};

var editGasLog = function(e) {
	
	var $tr = $('<tr>');
	
    var $input1 = $("<input>");
    $input1.attr('date', 'date');
    $input1.attr('type', 'text');
    $input1.attr('value', e.date);
    
    var $input2 = $("<input>");
    $input2.attr('gallons', 'gallons');
    $input2.attr('type', 'text');
    $input2.attr('value', e.gallons);
    
    var $input3 = $("<input>");
    $input3.attr('cost', 'cost');
    $input3.attr('type', 'text');
    $input3.attr('value', e.cost);
    
    var $input4 = $("<input>");
    $input4.attr('odometer', 'odometer');
    $input4.attr('type', 'text');
    $input4.attr('value', e.odometer);

    var $input5 = $("<input>");
    $input5.attr('miles', 'miles');
    $input5.attr('type', 'text');
    $input5.attr('value', e.miles);
    
    var $input6 = $("<input>");
    $input6.attr('value', 'Submit');
    $input6.attr('type', 'submit');

    
    $("#row" + e.id).empty();
    var $td1 = $('<td>');
	$td1.text(e.id);
	var $td2 = $('<td>');
	$td2.append($input1);
	var $td3 = $('<td>');
	$td3.append($input2);
	var $td4 = $('<td>');
	$td4.append($input3);
	var $td5 = $('<td>');
	$td5.append($input4);
	var $td6 = $('<td>');
	$td6.append($input5);
	var $td7 = $('<td>');
	var $mpg = getMPG(e);
	$mpg = parseInt($mpg*100)/100;
	$td7.text($mpg);
	var $td8 = $('<td>');
	var $cost = getCost(e);
	$cost = parseInt($cost*100)/100;
	$td8.text($cost);
	var $td9 = $('<td td="submit">');
	$td9.append($input6);
	$("#row" + e.id).append($td1, $td2, $td3, $td4, $td5, $td6, $td7, $td8, $td9);

    
	  $input6.on('click', function(ep) {
          ep.preventDefault();

          var $gasLog = {
        		  gallons: $input2.val(),
              miles: $input5.val(),
              cost: $input3.val(),
              odometer: $input4.val(),
              date: $input1.val()
          };
          console.log($gasLog);
          
          $.ajax({
                  type: "PUT",
                  url: "api/gas/"+ e.id,
                  dataType: "json",
                  contentType: 'application/json',
                  data: JSON.stringify($gasLog)
              })
              .done(function(data, status) {
                  console.log('gasLog edited');
                  setup();
              })
              .fail(function(xhr, status, error) {
                  console.log('fail');
                  console.log(error);
                  console.log(status);
              });
      });
};

var addGasLog = function() {
	$('#divLA').empty();
	
	var $h1 = $('<h1 class="h1">Create New Gas Log</h1>');
    var $createDiv = $('<div id="createDiv">');
    var $createForm = $('<form name="createForm">');
    var $p = $('<p>');
    
    var $p1 = $('<p>Date:</p>');
    var $input1 = $("<input>");
    $input1.attr('name', 'date');
    $input1.attr('type', 'text');
    
    var $p2 = $('<p>Gallons:</p>');
    var $input2 = $("<input>");
    $input2.attr('name', 'gallons');
    $input2.attr('type', 'text');
    
    var $p3 = $('<p>Cost:</p>');
    var $input3 = $("<input>");
    $input3.attr('name', 'cost');
    $input3.attr('type', 'text');
    
    var $p4 = $('<p>Odometer:</p>');
    var $input4 = $("<input>");
    $input4.attr('name', 'odometer');
    $input4.attr('type', 'text');
    
    var $p5 = $('<p>Miles:</p>');
    var $input5 = $("<input>");
    $input5.attr('name', 'miles');
    $input5.attr('type', 'text');

    var $input6 = $("<input>");
    $input6.attr('value', 'Submit');
    $input6.attr('type', 'submit');

    $createForm.append($p1, $input1, $p2, $input2, $p3, $input3, $p4, $input4, $p5, $input5, $p, $input6);
    $createDiv.append($h1, $createForm);
	$('#divLA').append($createDiv);
    
	  $input6.on('click', function(e) {
          e.preventDefault();

          var $newGas = {
              date: $(createForm.date).val(),
              gallons: $(createForm.gallons).val(),
              cost: $(createForm.cost).val(),
              odometer: $(createForm.odometer).val(),
              miles: $(createForm.miles).val()
          };
          
          console.log($newGas);
          
          $.ajax({
                  type: "POST",
                  url: "api/gas/",
                  dataType: "json",
                  contentType: 'application/json',
                  data: JSON.stringify($newGas)
              })
              .done(function(data, status) {
                  console.log('gaslog created');
                  setup();
              })
              .fail(function(xhr, status, error) {
                  console.log('fail');
                  console.log(error);
                  console.log(status);
              });
      });
}

var getGasLogs = function() {
	
	console.log('in getGasLog');
	$('#divLA').empty();
			
	$.ajax({
		type : 'GET',
		url : 'api/gas/',
		dataType : 'json'
	}).done(function(gasLogs, status) {
		console.log('success');
		reportGasLog(gasLogs);
	}).fail(function(xhr, status, error) {
		console.log('fail');
	});
}

var reportGasLog = function(logs) {
	var $gallons = 0;
	var $cost = 0;
	var $miles = 0;
	var $p = $('<p>');
	
	logs.forEach(function(e, i, a) {
		$gallons = $gallons + e.gallons;
		$cost = $cost + e.cost;
		$miles = $miles + e.miles;
	});
	
	var $costPerMile = $cost / $miles;
	var $miltesPerGallon = $miles / $gallons;
	
	
	console.log($gallons + " asdfasdf " + $cost);
	
	var $reportDiv = $('<reportDiv id="report">');
	var $reporth1 = $('<h1 id="reportHeader">Gas Log Report</h1>')
	var $label1 = $("<h2>Total Gallons: \n</h2>");
	var $h1 = $('<h3 id="H3gallons">');
		$h1.text($gallons);
	var $label2 = $("<h2>Total Miles: </h2>");
	var $h2 = $('<h3 id="H3miles">');
		$h2.text($miles);
	var $label3 = $("<h2>Total Cost: </h2>");
	var $h3 = $('<h3 id="H3cost">');
		$h3.text($cost);
	var $label4 = $("<h2>Cost Per Mile: </h2>");
	var $h4 = $('<h3 id="H3costMile">');
		$h4.text($costPerMile);
	var $label5 = $("<h2>Cost Per Mile: </h2>");
	var $h5 = $('<h3 id="H3costMile">');
		$h5.text($costPerMile);
		
	$reportDiv.append($reporth1, $label1, $p, $h1, $p, $label2, $p, $h2, $p, $label3, $p, $h3, $p, $label4, $p, $h4, $p, $label5, $p, $h5);
	$('#divLA').append($reportDiv);
}

var deleteGasLog = function(id) {
		
        $.ajax({
              type: "DELETE",
              url: "api/gas/" + id,
        }).done(function(data, status) {
          console.log('sucess');
          setup();
        }).fail(function(xhr, status, error) {
          console.log('fail');
        });
   }; 