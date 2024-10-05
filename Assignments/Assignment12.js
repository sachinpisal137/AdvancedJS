class Point {
    constructor(x, y) {
        this.x = x; // x-coordinate
        this.y = y; // y-coordinate
        this.type = 'point'; // Type of the object
    }
}

class Line {
    constructor(points) {
        this.type = 'line'; // Type of the object
        this.points = points.map(([x, y]) => new Point(x, y)); // Convert coordinate pairs to Point objects
    }
}

class Figure {
    constructor(elements = []) {
        this.elements = {
            points: [],
            lines: []
        };
        elements.forEach(element => {
            if (element.type === 'point') {
                this.elements.points.push(new Point(element.x, element.y));
            } else if (element.type === 'line') {
                this.elements.lines.push(new Line(element.points.map(p => [p.x, p.y])));
            }
        });
    }

    addPoint(x, y) {
        this.elements.points.push(new Point(x, y)); // Add a new Point to the collection
    }

    addLine(points) {
        this.elements.lines.push(new Line(points)); // Add a new Line to the collection
    }

    toJSON() {
        return JSON.stringify(this.elements); // Return the collection as a JSON string
    }

    fromJSON(json, replace = false) {
        const data = JSON.parse(json); // Parse the JSON data

        if (replace) {
            // Replace existing elements if the flag is true
            this.elements.points = [];
            this.elements.lines = [];
        }

        // Add points to the collection
        if (data.points) {
            data.points.forEach(p => {
                this.elements.points.push(new Point(p.x, p.y));
            });
        }

        // Add lines to the collection
        if (data.lines) {
            data.lines.forEach(l => {
                this.elements.lines.push(new Line(l.points.map(p => [p.x, p.y])));
            });
        }
    }

    deleteAll() {
        this.elements.points = []; // Clear points
        this.elements.lines = []; // Clear lines
    }
}

// Testing the implementation
let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 10);
f.addLine([[10, 20], [30, 40], [50, 60]]);
let json = f.toJSON();
console.log(json); // Log the JSON representation
f.fromJSON(json, true); // Populate from JSON, replacing existing data
console.log(f.elements.points.length); // Check number of points
console.log(f.elements.lines.length); // Check number of lines

// Test from a JSON string
f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}', false);
console.log(f.elements.points.length); // Check number of points after adding from JSON
console.log(f.elements.lines.length); // Check number of lines after adding from JSON
