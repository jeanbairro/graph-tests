function start(xml) {
	var searcher = new Searcher();
	searcher.setMethod(new BreadthFirstSearch());
	startTests(xml, searcher);
}

function createGraphFromXml(xml) {
	var graph = xml.getElementsByTagName("Grafo")[0];
	var graph_isWeighted = graph.getAttributeNode("ponderado").value;
	var graph_isDirected = graph.getAttributeNode("dirigido").value;

	//Vertices
	var vertices = [];
	var verticesXml = xml.getElementsByTagName("Vertice");
	for (var i = 0; i < verticesXml.length; i++) {
		vertices.push(
			new Vertice(
				verticesXml[i].getAttributeNode("relId").value,
				verticesXml[i].getAttributeNode("rotulo").value,
				verticesXml[i].getAttributeNode("posX").value,
				verticesXml[i].getAttributeNode("posY").value
			)
		);
	}

	//Edges
	var edges = [];
	var edgesXml = xml.getElementsByTagName("Aresta");
	for (var i = 0; i < edgesXml.length; i++) {
		edges.push(
			new Edge(
				edgesXml[i].getAttributeNode("idVertice1").value,
				edgesXml[i].getAttributeNode("idVertice2").value,
				edgesXml[i].getAttributeNode("peso").value
			)
		);
	}

	return new Graph(graph_isWeighted, graph_isDirected, vertices, edges);
}