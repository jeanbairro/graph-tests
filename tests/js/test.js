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
	var testsFromNormalDist = testFromNormalDist();


	console.log("------------ tabela 1 ---------------------")
	for (var i = 0; i < table1.rows.length; i++) {
		console.log(i + ": " + table1.rows[i].time);
	};

	console.log("------------ tabela 2 ---------------------")
	for (var i = 0; i < table2.rows.length; i++) {
		console.log(i + ": " + table2.rows[i].time);
	};

	console.log("----- geradas a partir dist. normal ---------")
	for (var i = 0; i < testsFromNormalDist.length; i++) {
		console.log(i + ": " + testsFromNormalDist[i]);
	};

	console.log("----- teste ---------")
	var data = new Array(
                    new Array(21,54,60,78,82),
                    new Array(20,54,54,65,45)
        );
	console.log(calc.pearsonCorrelation(data,0,1))
}

function testFromNormalDist() { 
	var tests = [];

	var standard = calc.normal(1.11, 0.583);
	
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