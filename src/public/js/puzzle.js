class SlidingPuzzle {
    static gap = document.getElementById("gap")
    static game = document.getElementById('sliding-puzzle')
    static pieces;
    static click = this.game.addEventListener('click', (event) => {
        this.pieces =  this.game.querySelectorAll('img')
        if(event.target != this.gap){
            this.sliding(event.target)
        }           
    })
    static sliding(piece) {
        let pieces = new Array()
        console.log(this.pieces, piece)
        for(let i = 0; i < this.pieces.length; i++){
            if(piece == this.pieces[i]){
                pieces.push(this.gap)
                continue
            }
            if(this.gap == this.pieces[i]){
                pieces.push(piece)
                continue
            }
            pieces.push(this.pieces[i])
        }
        this.print(pieces)
    }
    static print(pieces) {
        this.clear()
        pieces.forEach(piece => {
            this.game.appendChild(piece)
        })

    }
    static clear() {
        this.game.innerHTML = ""
    }
}