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

;(function() {

    /**
      * Main constructor function of the QTree node for the library.
      * @param {Number} x - x coordinate of a polygon point
      * @param {Number} y - y coordinate of a polygon point
      */
    function QTreeNode (x, y) {
        this.x = x;
        this.y = y; // TODO make it more generic
        this.firstChild;
        this.secondChild;
        this.thirdChild;
        this.fourthChild;
    }

    // Axilary variables
    var version = '0.0.1',
        isStable = false;

    /**
     * Inserts a node to an existing QTree Node. 
      * @param {Number} x0ViewPort - x coordinate of a polygon point
      * @param {Number} y0ViewPort - y coordinate of a polygon point
      * @param {Number} x1ViewPort - x coordinate of a polygon point
      * @param {Number} y1ViewPort - y coordinate of a polygon point
      * @param {Number} xCoord - x coordinate of a polygon point
      * @param {Number} yCoord - y coordinate of a polygon point
     */
    function insertNode(x0ViewPort, y0ViewPort, x1ViewPort, y1ViewPort, xCoord, yCoord) {
        // Calculating the centre of a viewport is used to decide a quadrant for a given X, Y coordinate
        var xCenterOfViewPort = x1ViewPort / 2,
            yCenterOfViewPort = y1ViewPort / 2;
        
        if (xCoord <= xCenterOfViewPort && xCoord >= x0ViewPort && yCoord <= yCenterOfViewPort && yCoord >= y0ViewPort){
            if (this.firstChild) { // In case a child already exist
                // Insert a node to the tree recursively
                this.firstChild.insertNode(x0ViewPort, y0ViewPort, xCenterOfViewPort, yCenterOfViewPort, xCoord, yCoord);
            } else {
                this.firstChild = new AwesomeTreeNode(xCoord, yCoord); // create a new Node otherwise
            }
        } else if (xCoord >= xCenterOfViewPort && xCoord <= x1ViewPort && yCoord <= yCenterOfViewPort && yCoord >= y0ViewPort){
            if (this.secondChild) {
                this.secondChild.insertNode(xCenterOfViewPort, y0ViewPort, x1ViewPort, yCenterOfViewPort, xCoord, yCoord);
            } else {
                this.secondChild = new AwesomeTreeNode(xCoord, yCoord);
            }
        } else if (xCoord <= x1ViewPort && xCoord >= xCenterOfViewPort && yCoord >= y0ViewPort && yCoord <= yCenterOfViewPort){
            if (this.thirdChild) {
                this.thirdChild.insertNode(x0ViewPort, yCenterOfViewPort, xCenterOfViewPort, y1ViewPort, xCoord, yCoord);
            } else {
                this.thirdChild = new AwesomeTreeNode(xCoord, yCoord);
            }
        } else if (xCoord >= xCenterOfViewPort && xCoord <= x1ViewPort && yCoord <= y1ViewPort && yCoord >= yCenterOfViewPort){
            if (this.fourthChild) {
                this.fourthChild.insertNode(xCenterOfViewPort, yCenterOfViewPort, x1ViewPort, y1ViewPort, xCoord, yCoord);
            } else {
                this.fourthChild = new AwesomeTreeNode(xCoord, yCoord);
            }
        }
    }

    /**
     * Prints all information, which contains all QTree point in a tree.
     */
    function printNodes() {
        if (this.firstChild){
            if (this.firstChild.x && this.firstChild.y){
                console.log("(" + this.firstChild.x + ", " + this.firstChild.y + "); ");
            }
            this.firstChild.printNodes();
        }
        if (this.secondChild){
            if (this.secondChild.x && this.secondChild.y){
                console.log("(" + this.secondChild.x + ", " + this.secondChild.y + "); ");
            }
            this.secondChild.printNodes();
        }
        if (this.thirdChild){
            if (this.thirdChild.x && this.thirdChild.y){
                console.log("(" + this.thirdChild.x + ", " + this.thirdChild.y + "); ");
            }
            this.thirdChild.printNodes();
        }
        if (this.fourthChild){
            if (this.fourthChild.x && this.fourthChild.y){
                console.log("(" + this.fourthChild.x + ", " + this.fourthChild.y + "); ");
            }
            this.fourthChild.printNodes();
        }
    }

    
    function contains(x0ViewPort, y0ViewPort, x1ViewPort, y1ViewPort, xCoord, yCoord){
        var xCenterOfViewPort = x1ViewPort / 2,
            yCenterOfViewPort = y1ViewPort / 2;
        
        if (this.x === xCoord && this.y === yCoord){
            return true;
        }

        if (xCoord <= xCenterOfViewPort && xCoord >= x0ViewPort && yCoord <= yCenterOfViewPort && yCoord >= y0ViewPort){
            if (this.firstChild){
                return this.firstChild.contains(x0ViewPort, y0ViewPort, xCenterOfViewPort, yCenterOfViewPort, xCoord, yCoord);
            } else {
                return false;
            }
        } else if (xCoord >= xCenterOfViewPort && xCoord <= x1ViewPort && yCoord <= yCenterOfViewPort && yCoord >= y0ViewPort){
            if (this.secondChild){
                return this.secondChild.contains(xCenterOfViewPort, y0ViewPort, x1ViewPort, yCenterOfViewPort, xCoord, yCoord);
            } else {
                return false;
            }
        } else if (xCoord <= x1ViewPort && xCoord >= xCenterOfViewPort && yCoord >= y0ViewPort && yCoord <= yCenterOfViewPort){
            if (this.thirdChild){
                return this.thirdChild.contains(x0ViewPort, yCenterOfViewPort, xCenterOfViewPort, y1ViewPort, xCoord, yCoord);
            } else {
                return false;
            }
        } else if (xCoord >= xCenterOfViewPort && xCoord <= x1ViewPort && yCoord <= y1ViewPort && yCoord >= yCenterOfViewPort){
            if (this.fourthChild){
                return this.fourthChild.contains(xCenterOfViewPort, yCenterOfViewPort, x1ViewPort, y1ViewPort, xCoord, yCoord);
            } else {
                return false;
            }
        }
    }

    // Attach functions to the constructor function
    QTreeNode.insertNode = insertNode;

    // Export a code to global object
    window.qtree = QTreeNode; 

}());


