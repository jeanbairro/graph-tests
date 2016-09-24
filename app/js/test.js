function TestRow (index, initial, final, time) {
	this.index = index;
	this.initial = initial;
	this.final = final;
	this.time = time;
}

function TestTable(testRows) {
	this.rows = testRows;

	this.sort = function () {
		this.rows.sort(function(v1, v2) {
			if (v1.time < v2.time) {
				return -1;
			} else if (v1.time > v2.time) {
				return 1;
			}

			return 0;
		});
	}
}

function startTests(xml, searcher) {
	var table1 = test(xml, searcher);
	var table2 = test(xml, searcher);
	var testsFromGaussianDist = testFromGaussianDist();


	console.log("------------ tabela 1 ---------------------")
	for (var i = 0; i < table1.rows.length; i++) {
		console.log(i + ": " + table1.rows[i].time);
	};

	console.log("------------ tabela 2 ---------------------")
	for (var i = 0; i < table2.rows.length; i++) {
		console.log(i + ": " + table2.rows[i].time);
	};

	console.log("-----geradas a partir dist. gaussiana---------")
	for (var i = 0; i < testsFromGaussianDist.length; i++) {
		console.log(i + ": " + testsFromGaussianDist[i]);
	};
}

function testFromGaussianDist() { 
	var tests = [];

	var standard = gaussian(1.11, 0.583);
	
	for(var i = 0; i < 100; i++) {
    	tests.push(standard());
	}

	tests.sort();

	return tests;
}

function test(xml, searcher) {
	var tests = [];
	
	for (var i = 0; i < 100; i++) {
		var graph = createGraphFromXml(xml); /* O grafo é criado novamente a cada iteração, por causa do cache */
		graph.orderVertices();

		var initial = graph.findVerticeById(Math.floor((Math.random() * 55) + 0));
		var final = graph.findVerticeById(Math.floor((Math.random() * 55) + 0));

		var t0 = performance.now();
		var path = searcher.search(initial.label, final.label, graph);
		var t1 = performance.now();
		tests.push(new TestRow(i, initial.label, final.label, t1 - t0));
	};

	var table = new TestTable(tests);
	table.sort();

	return table;
}

/*http://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve*/
function gaussian(mean, stdev) {
    var y2;
    var use_last = false;
    return function() {
        var y1;
        if(use_last) {
           y1 = y2;
           use_last = false;
        }
        else {
            var x1, x2, w;
            do {
                 x1 = 2.0 * Math.random() - 1.0;
                 x2 = 2.0 * Math.random() - 1.0;
                 w  = x1 * x1 + x2 * x2;               
            } while( w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w))/w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
       }

       var retval = mean + stdev * y1;
       if(retval > 0) 
           return retval;
       
       return -retval;
   }
}