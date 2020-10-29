// Class Static SlidingPuzzle
class SlidingPuzzle {
    // Indicates if the game has started
    static start = false;
    // Count the clicks
    static score = 0;
    // Get the size of the container sliding-puzzle
    static size = document.querySelector('.sliding-puzzle').clientHeight
    // Ordered coordinate array
    static order = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
    // Array of coordinates to be shuffled
    static coord = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
    /**
     * Dictionary of the puzzle pieces, 
     * with their corresponding label and the position 
     * in which they are located
     */
    static slots = {
        one: {
            img: one,
            pos: [0, 0]
        },
        two: {
            img: two,
            pos: [1, 0]
        },
        three: {
            img: three,
            pos: [2, 0]
        },
        four: {
            img: four,
            pos: [0, 1]
        },
        five: {
            img: five,
            pos: [1, 1]
        },
        six: {
            img: six,
            pos: [2, 1]
        },
        seven: {
            img: seven,
            pos: [0, 2]
        },
        eight: {
            img: eight,
            pos: [1, 2]
        },
        gap: {
            img: gap,
            pos: [2, 2]
        }
    }
    // Each piece event method
    static slide(piece){ 
        let position = new Array();     
        position.push(Math.abs(SlidingPuzzle.slots[piece.target.id].pos[0] - SlidingPuzzle.slots.gap.pos[0]))        
        position.push(Math.abs(SlidingPuzzle.slots[piece.target.id].pos[1] - SlidingPuzzle.slots.gap.pos[1]))
        if(JSON.stringify(position) == JSON.stringify([0, 1]) || JSON.stringify(position) == JSON.stringify([1, 0])){
            let img = SlidingPuzzle.slots.gap.img,
                pos = SlidingPuzzle.slots.gap.pos;        
            SlidingPuzzle.translate(SlidingPuzzle.slots.gap.img, SlidingPuzzle.slots[piece.target.id].pos)
            SlidingPuzzle.translate(SlidingPuzzle.slots[piece.target.id].img, SlidingPuzzle.slots.gap.pos)
            SlidingPuzzle.slots.gap.pos = SlidingPuzzle.slots[piece.target.id].pos
            SlidingPuzzle.slots[piece.target.id].pos = pos
            // The movement is updated
            document.getElementById('score').innerHTML = ++SlidingPuzzle.score
            // The check method is called
            SlidingPuzzle.check()
        }     
    }
    // Method that checks if parts are ordered
    static check(){
        let count = -1;
        // For that runs through each piece of the slots
        for(let piece in SlidingPuzzle.slots){
            count++
            //Verify that the position of each piece in the slot corresponds to the order of the array
            if(JSON.stringify(SlidingPuzzle.slots[piece].pos) != JSON.stringify(SlidingPuzzle.order[count])){
                return
            }
        }
        // Time is paused
        Clock.pause()
    }
    // Method that positions the part in the corresponding coordinate
    static translate(piece, pos){    
        /**
         * Piece, tag => img
         * Pos, coordinate that will be translated
         * There are two coordinates [x, y] in css corresponding to [left, top], 
         * the piece is taken and the transform attribute is updated to 
         * move the piece in the x and y calculating the size 
         * of the Sliding Puzzle.
         */ 
        piece.style.transform = `translate(${pos[0] * (this.size/3)}px, ${pos[1] * (this.size/3)}px)`
    }
    // Method that unorders the coordinates of the array
    static shuffle(){
        return this.coord.sort(function(){
            return Math.random() - 0.5
        })
    }
    // Method that starts the game
    static play(){  
        // The variable is updated
        this.start = true     
        // The shuffle method is called
        this.shuffle()
        // Variable count is started        
        let count = 0;
        // The dictionary is scrolled
        for(let piece in this.slots){
            // its position will be the position of the array that got out of order
            this.slots[piece].pos = this.coord[count];
            // The method is called passing the part and the coordinate
            this.translate(this.slots[piece].img, this.coord[count])    
            // In adds the click event to the image      
            this.slots[piece].img.addEventListener('click', this.slide, true)
            count++;
        }   
        // Time is reset     
        Clock.restart()
        // Variable score is started    
        this.score = 0;
        // Tag count is started    
        document.getElementById('score').innerHTML = 0
    }
    // Method that pauses the game
    static pause(){     
        // It checks if the game has started
        if(this.start){
            // It checks if the time interval exists in the clock class
            if(!Clock.interval){
                // Tag pause is changed 
                document.getElementById('pause').innerHTML = "PAUSE"            
                // The count starts
                return Clock.start()
            }
            // Tag pause is changed 
            document.getElementById('pause').innerHTML = "RESUME"
            // Counting stops
            return Clock.pause()
        }        
    }
}

// Class Static Clock
class Clock {
    // Variable that counts time
    static totalSeconds = 0
    // Method start
    static start() {
        // Checks if there is no interval attribute that stores the interval statement
        if (!this.interval) {
            // function that returns the formatted value
            function pad(val) { return val > 9 ? val : "0" + val; }
            // The interval attribute is added, which is the instruction that will count the time
            this.interval = setInterval(function () {
                Clock.totalSeconds++;
                document.getElementById("min").innerHTML = pad(Math.floor(Clock.totalSeconds / 60 % 60));
                document.getElementById("sec").innerHTML = pad(parseInt(Clock.totalSeconds % 60));
            }, 1000);
        }
    }  
    // Method reset time
    static reset() {
        Clock.totalSeconds = null; 
        // The interval is cleaned
        clearInterval(this.interval);
        document.getElementById("min").innerHTML = "00";
        document.getElementById("sec").innerHTML = "00";
        // The interval is removed
        delete this.interval;
    }
    // Method pause time
    static pause() {
        clearInterval(this.interval);
        delete this.interval;
    }  
    // Method resume time
    static resume() {
        this.start();
    }  
    // Method restart time
    static restart() {
        this.reset();
        Clock.start();
    }
};