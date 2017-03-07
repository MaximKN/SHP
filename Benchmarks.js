/*
 * Senior Honors Project 2017
 * QTree implementation in JavaScript
 * Copyright (c) 2017 Maxim Kichigin
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// Simplification algorithm benchmarks
function SABench() {

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

