export default class Carousel {
    constructor(images = []){
        this.images = images;
        this.currentIndex = 0;
        this.imageContainers = [];

        this.lastClick = Date.now();

        this.container = document.getElementById('home');
        this.nextButton = document.getElementById('next-button');
        this.prevButton = document.getElementById('prev-button');

        this.nextButton.addEventListener('click', this.shiftRight.bind(this));
        this.prevButton.addEventListener('click', this.shiftLeft.bind(this));

        for (let i=0;i<this.images.length;i++){
            let showing = (i < 1) ? 'off-right':'off-left';

            this.imageContainers[i] = document.createElement('DIV');
            this.imageContainers[i].className = `image-container ${showing}`;

            let image = document.createElement('IMG');
            image.src = this.images[i];

            this.imageContainers[i].appendChild(image);
            this.container.appendChild(this.imageContainers[i]);
        }

        setTimeout(()=>{
            this.removeOffClass(this.currentIndex);
        },0);
    }

    checkThrottle(){
        let now = Date.now();
        let diff = now - this.lastClick;
        if (diff < 700) {
            return false;
        }
        this.lastClick = now;
        return true;
    }

    shiftLeft(){
        if (!this.checkThrottle()) return;

        this.setOffClass(this.currentIndex, 'left');
        
        let nextIndex = (this.currentIndex + 1 >= this.images.length) ? 0 : this.currentIndex + 1;
        this.setOffClass(nextIndex, 'right', true);
        setTimeout(()=>{
            this.removeOffClass(nextIndex);
            this.currentIndex = nextIndex;
        },0);
    }

    shiftRight(){
        if (!this.checkThrottle()) return;

        this.setOffClass(this.currentIndex, 'right');
        
        let nextIndex = (this.currentIndex - 1 < 0) ? this.images.length - 1 : this.currentIndex - 1;

        this.setOffClass(nextIndex, 'left', true);
        setTimeout(()=>{
            this.removeOffClass(nextIndex);
            this.currentIndex = nextIndex;
        },0);
    }

    removeOffClass(i){
        this.imageContainers[i].className = 'image-container';
    }

    setOffClass(i, direction = 'left', transition = false){
        let t = ' no-transition';
        if (!transition) t = '';
        this.imageContainers[i].className = `image-container off-${direction}${t}`;
    }
}
