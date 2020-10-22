class Storage {    
    static user;
    static modalNewGame = document.getElementById('modalNewGame')
    static newGame(){
        SlidingPuzzle.modalSettings.style.display = "none"
        this.modalNewGame.style.display = "block"
    }
    static load(){
        if(!localStorage.getItem('data')){
            this.newGame()
        }
    }
    static save(){
        if(!localStorage.getItem('data')){
            let data = new Array()
            data.push(this.user)
            localStorage.setItem('data', JSON.stringify(data))
        }else{
            
        }
    }
    static createUsername(){
        if(document.getElementById('username').value){
            let name = document.getElementById('username').value
            document.getElementById('name').innerHTML = name
            this.user = {
                name: name,
                time: undefined,
                score: 0
            }
            this.modalNewGame.style.display ="none"
        }        
    }
    static close(){
        this.modalNewGame.style.display = "none"
    }
}

class SlidingPuzzle {
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
            Storage.user.score++     
        }           
    })
    static start(){
        if(!Storage.user){
            Storage.newGame()
        }
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
                Storage.user.time = Clock.totalSeconds
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
    if(event.target == SlidingPuzzle.modalSettings) {
        SlidingPuzzle.modalSettings.style.display = "none"
    }
}

Storage.load()