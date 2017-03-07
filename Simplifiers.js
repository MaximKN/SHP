function Simplifiers() {

	// square distance between 2 points
	function getSqDist(p1, p2) {

	    var dx = p1.x - p2.x,
	        dy = p1.y - p2.y;

	    return dx * dx + dy * dy;
	}

	// square distance from a point to a segment
	function getSqSegDist(p, p1, p2) {

	    var x = p1.x,
	        y = p1.y,
	        dx = p2.x - x,
	        dy = p2.y - y;

	    if (dx !== 0 || dy !== 0) {

	        var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);

	        if (t > 1) {
	            x = p2.x;
	            y = p2.y;

	        } else if (t > 0) {
	            x += dx * t;
	            y += dy * t;
	        }
	    }

	    dx = p.x - x;
	    dy = p.y - y;

	    return dx * dx + dy * dy;
	}
	// rest of the code doesn't care about point format

	// basic distance-based simplification
	function simplifyRadialDist(points, sqTolerance) {

	    var prevPoint = points[0],
	        newPoints = [prevPoint],
	        point;

	    for (var i = 1, len = points.length; i < len; i++) {
	        point = points[i];

	        if (getSqDist(point, prevPoint) > sqTolerance) {
	            newPoints.push(point);
	            prevPoint = point;
	        }
	    }

	    if (prevPoint !== point) newPoints.push(point);

	    return newPoints;
	}

	function simplifyDPStep(points, first, last, sqTolerance, simplified) {
	    var maxSqDist = sqTolerance,
	        index;

	    for (var i = first + 1; i < last; i++) {
	        var sqDist = getSqSegDist(points[i], points[first], points[last]);

	        if (sqDist > maxSqDist) {
	            index = i;
	            maxSqDist = sqDist;
	        }
	    }

	    if (maxSqDist > sqTolerance) {
	        if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
	        simplified.push(points[index]);
	        if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
	    }
	}

	// simplification using Ramer-Douglas-Peucker algorithm
	function simplifyDouglasPeucker(points, sqTolerance) {
	    var last = points.length - 1;

	    var simplified = [points[0]];
	    simplifyDPStep(points, 0, last, sqTolerance, simplified);
	    simplified.push(points[last]);

	    return simplified;
	}

	// both algorithms combined for awesome performance
	function simplify(points, tolerance, highestQuality) {

	    if (points.length <= 2) return points;

	    var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;

	    points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
	    points = simplifyDouglasPeucker(points, sqTolerance);

	    return points;
	}

	/**
	 * Main function that starts all benchmarks.
     * @param {String} Polygons to test
	*/
	function start(bench){
		suite.add('Simplify Ramer-Douglas-Peucker Size=10', function() {
		  simplify(polygon.slice(0, 10), 20);
		})
		.add('Simplify Ramer-Douglas-Peucker Size=30', function() {
		  simplify(polygon.slice(0, 100), 20);
		})
		.add('Simplify Ramer-Douglas-Peucker Size=40', function() {
		  simplify(polygon.slice(0, 1000), 20);
		})
		.add('Simplify Ramer-Douglas-Peucker Size=50', function() {
		  simplify(polygon, 20);
		})
		// add listeners
		.on('cycle', function(event) {
		  console.log(String(event.target));
		})
		.on('complete', function() {
		  console.log('Fastest is ' + this.filter('fastest').map('name'));
		})
	}

	/**
	 * Returns results of performed computation.
	*/
	function getResult(){
		console.log('Fastest is ' + this.filter('fastest').map('name'));
	}

	return {
		start: start,
		getResult: getResult
	}
}

