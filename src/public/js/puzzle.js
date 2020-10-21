class SlidingPuzzle {
    static dateInit = new Date()
    static count = 1;
    static gap = document.getElementById("gap")
    static game = document.getElementById('sliding-puzzle')
    static modalSettings = document.getElementById('modalSettings')
    static pieces = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    static click = this.game.addEventListener('click', (event) => {
        if(event.target.parentNode != this.gap){
            this.sliding(event.target) 
            document.getElementById("count").innerHTML = this.count++ 
        }                   
    })
    static start(){
        let imgs = this.game.querySelectorAll('img')
        this.disorder()
        this.pieces.forEach(position => {
            for(let i=0; i < imgs.length; i++){
                if(imgs[i].getAttribute('data-piece') == position){
                    let div = document.createElement('div')
                    div.classList.add('piece')
                    div.appendChild(imgs[i])
                    this.game.appendChild(div)
                    break
                }
            }
        })
        
    }
    static disorder(){
        this.game.innerHTML = ""
        return this.pieces.sort(function(){
            return Math.random() - 0.5
        })
    }
    static sliding(piece){
        let pieceParent = piece.parentNode
        let gapParent = this.gap.parentNode
        pieceParent.innerHTML = ""
        let gap = this.gap
        pieceParent.appendChild(gap)
        gapParent.appendChild(piece)
    }   
    static print(pieces){
        this.clear()
        pieces.forEach(piece => {
            this.game.appendChild(piece)
        })

    }
    static clear(){
        this.game.innerHTML = ""
    }
    static pause(){
        this.settings()
    }
    static settings(){
        let modal = document.getElementById('modalSettings')
        modal.style.display = "block"
    }
    static close(){
        this.modalSettings.style.display = "none"
    }
    static exit(){
        
    }
}

window.onclick = function(event) {
    if(event.target == SlidingPuzzle.modalSettings) {
        SlidingPuzzle.modalSettings.style.display = "none"
    }
}