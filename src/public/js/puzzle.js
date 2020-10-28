class SlidingPuzzle {
    static score = 0;
    static size = document.querySelector('.sliding-puzzle').clientHeight
    static order = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
    static coord = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1], [0, 2], [1, 2], [2, 2]]
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
            document.getElementById('score').innerHTML = ++SlidingPuzzle.score
            SlidingPuzzle.check()
        }     
    }
    static check(){
        let count = -1;
        for(let piece in SlidingPuzzle.slots){
            count++
            if(JSON.stringify(SlidingPuzzle.slots[piece].pos) != JSON.stringify(SlidingPuzzle.order[count])){
                return false
            }
        }
        SlidingPuzzle.slots.gap.img.classList.remove('gap')
        console.log('WIN!!!')
    }
    static translate(piece, pos){        
        piece.style.transform = `translate(${pos[0] * (this.size/3)}px, ${pos[1] * (this.size/3)}px)`
    }
    static shuffle(){
        return this.coord.sort(function(){
            return Math.random() - 0.5
        })
    }
    static play(){        
        this.shuffle()        
        let count = 0;
        for(let piece in this.slots){
            this.slots[piece].pos = this.coord[count];
            this.slots[piece].img.style.transform = `translate(${this.slots[piece].pos[0] * (this.size/3)}px, ${this.slots[piece].pos[1] * (this.size/3)}px)`
            this.slots[piece].img.addEventListener('click', this.slide, true)
            count++;
        }
        Clock.restart()
        this.score = 0;
        document.getElementById('score').innerHTML = 0
    }
    static pause(){        
        if(!Clock.interval){
            document.getElementById('pause').innerHTML = "PAUSE"            
            return Clock.start()
        }
        document.getElementById('pause').innerHTML = "RESUME"
        return Clock.pause()
    }
}

class Clock {
    static totalSeconds = 0
    static start() {
        if (!this.interval) {
            function pad(val) { return val > 9 ? val : "0" + val; }
            this.interval = setInterval(function () {
                Clock.totalSeconds++;
                document.getElementById("min").innerHTML = pad(Math.floor(Clock.totalSeconds / 60 % 60));
                document.getElementById("sec").innerHTML = pad(parseInt(Clock.totalSeconds % 60));
            }, 1000);
        }
    }  
    static reset() {
        Clock.totalSeconds = null; 
        clearInterval(this.interval);
        document.getElementById("min").innerHTML = "00";
        document.getElementById("sec").innerHTML = "00";
        delete this.interval;
    }
    static pause() {
        clearInterval(this.interval);
        delete this.interval;
    }  
    static resume() {
        this.start();
    }  
    static restart() {
        this.reset();
        Clock.start();
    }
};