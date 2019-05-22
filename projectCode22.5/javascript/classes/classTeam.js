class Team{
    constructor(name, sport, state, symbol, batch){ //batch = אצווה
        this.name = name;
        this.sport = sport;
        this.state = state;
        this.symbol = symbol;
        //i think that batch is built from the other objects we get here
    }
}

//example 1

class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    area() {
        return Math.PI * this.radius * this.radius;
    }

    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}; 

//example 2 ירושה

class Circle2D extends Circle {
    constructor(radius, x, y) {
        super(radius);
        this.x = x;
        this.y = y;
    }
    
    inCircle(point) {
        let {x, y} = this;
        if(this.distance({x, y}, point) <= this.radius)
            return true;
        return false;
    }
    
    distance(p1, p2) {  
        return Math.sqrt(Math.pow((p1.x-p2.x), 2) + Math.pow((p1.y-p2.y), 2));
    }
}