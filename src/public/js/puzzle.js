class Game {
    static modalCreate = document.getElementById('modalCreate')
    static modalSettings = document.getElementById('modalSettings')
    static run(){
        let data = Storage.load()
        if(!data.length){
            this.openModal(this.modalCreate)
        }
    }
    static create(){
        this.data = {
            name: document.getElementById('username').value,
            score: 0,
            time: null,
            completed: false
        }
        this.closeModal(this.modalCreate)
    }
    static openModal(modal){
        modal.style.display = "block"
    }
    static closeModal(modal){
        modal.style.display = "none"
    }
}

class Storage {   
    static modalNewGame = document.getElementById('modalNewGame')
    static newGame(){
        SlidingPuzzle.modalSettings.style.display = "none"
        this.modalNewGame.style.display = "block"
    }
    static load(){
        this.data = new Array()
        if(localStorage.getItem('data')){
            this.data = JSON.parse(localStorage.getItem('data')) 
        }
        return this.data
    }
    static save(){
        this.data.push(Game.userData)
        localStorage.setItem('data', JSON.stringify(this.data))
    }
}

class SlidingPuzzle extends Game {
    static size = document.querySelector('.sliding-puzzle').clientHeight
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

        console.log(piece.target.id, SlidingPuzzle.slots.one)
    }
    static translate(piece, pos){
        piece.style.transform = `translate(${this.slots[piece].pos[0] * (this.size/3)}px, ${this.slots[piece].pos[1] * (this.size/3)}px)`
    }
    static shuffle(){
        const imgs = document.querySelectorAll('.piece')
        for(let piece in this.slots){
            this.slots[piece].img.style.transform = `translate(${this.slots[piece].pos[0] * (this.size/3)}px, ${this.slots[piece].pos[1] * (this.size/3)}px)`
            this.slots[piece].img.addEventListener('click', this.slide, true)
            console.log(this.slots[piece].img)
        }
        /*
        for(let i=0; i < this.pieces.length; i++){
            imgs[i].style.left = `${this.pieces[i].pos[0] * this.size / 3}px`
            imgs[i].style.top = `${this.pieces[i].pos[1] * this.size / 3}px`
            imgs[i].addEventListener('click', this.slide, true)
        }*/
    }
}

class SlidingPuzzleV1 extends Game {
    static dimension = 3
    static score = 0;
    static gap = document.getElementById("gap")
    static game = document.getElementById('sliding-puzzle')
    static modalSettings = document.getElementById('modalSettings')
    static pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    static click = this.game.addEventListener('click', (event) => {
        if((parseInt(this.gap.style.order) - 1) == event.target.style.order 
        || (parseInt(this.gap.style.order) + 1) == event.target.style.order
        || (parseInt(this.gap.style.order) - this.dimension) == event.target.style.order
        || (parseInt(this.gap.style.order) + this.dimension) == event.target.style.order){
            this.sliding(event.target)    
            document.getElementById('score').innerHTML = ++this.score              
        }           
    })
    static start(){
        Clock.restart()
        this.count = 0
        let imgs = this.game.querySelectorAll('img')
        this.disorder()
        for(let i=0; i < imgs.length; i++){
            imgs[i].style.order = this.pieces[i]
            this.game.appendChild(imgs[i])
        }        
    }
    static disorder(){
        this.clear()
        return this.pieces.sort(function(){
            return Math.random() - 0.5
        })
    }
    static sliding(piece){
        let gapPos = this.gap.style.order
        this.gap.style.order = piece.style.order
        piece.style.order = gapPos
    }
    static clear(){
        this.game.innerHTML = ""
    }
    static pause(){
        Clock.pause()
        this.settings()
    }
    static settings(){
        this.modalSettings.style.display = "block"
    }
    static close(){
        if(Clock.totalSeconds){
            Clock.resume()
        }        
        this.modalSettings.style.display = "none"
    }
    static save(){
        Storage.save()
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
                Game.userData.time = Clock.totalSeconds
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

window.onclick = function(event) {   
    if(event.target == Game.modalSettings) {
        Game.closeModal(event.target)
    }
}

SlidingPuzzle.run()
//Game.run()
//Storage.load()