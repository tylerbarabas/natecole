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

        setTimeout(()=>{
            this.init();
        },0);


        window.addEventListener('load', ()=>{
            this.sizeAndPosition();
        });
    }

    init(){
        for (let i=0;i<this.images.length;i++){
            this.imageContainers[i] = document.createElement('DIV');
            this.imageContainers[i].className = 'image-container off-left';

            let caption = document.createElement('DIV');
            caption.className = 'caption';
            caption.innerText = this.images[i].caption;

            let image = document.createElement('IMG');
            image.src = this.images[i].src;

            this.imageContainers[i].appendChild(image);
            this.imageContainers[i].appendChild(caption);
            this.container.appendChild(this.imageContainers[i]);

            this.imageContainers[i].addEventListener('click', window.mainController.menuItemClicked.bind(window.mainController, this.images[i].linkto)); 
        }

        setTimeout(()=>{
            this.removeOffClass(this.currentIndex);
            this.autoRotate();
            this.sizeAndPosition();
        },50);

        window.addEventListener('resize', ()=>{
            setTimeout(()=>{
                this.sizeAndPosition();
            },50);
        });
    }

    getAbsoluteHeight(elm) {
        let elmHeight, elmMargin;
        if(document.all) {// IE
            elmHeight = elm.currentStyle.height;
            elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10) + "px";
        } else {// Mozilla
            elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
            elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom')) + "px";
        }
        elmHeight = parseInt(elmHeight.split('px')[0]);
        elmMargin = parseInt(elmMargin.split('px')[0]);
        return (elmHeight+elmMargin);
    }

    sizeAndPosition(){
        let ic;
        for (let i=0;i<this.imageContainers.length;i+=1) {
            ic = this.imageContainers[i];
            ic.style.width = `${window.innerWidth * 0.8}px`;
        }

        let height = ((this.getAbsoluteHeight(ic)/2) + 100) - (this.getAbsoluteHeight(this.nextButton)/2);
        this.nextButton.style.top = `${height}px`;
        this.prevButton.style.top = `${height}px`;
    }

    checkThrottle(){
        let now = Date.now();
        let diff = now - this.lastClick;
        if (diff < 300) {
            return false;
        }
        this.lastClick = now;
        return true;
    }

    shiftLeft(){
        if (!this.checkThrottle()) return;

        this.setOffClass(this.currentIndex, 'left');
        
        let nextIndex = (this.currentIndex + 1 >= this.images.length) ? 0 : this.currentIndex + 1;
        this.removeOffClass(nextIndex, 'left');
        this.currentIndex = nextIndex;
        this.resetInterval();
    }

    shiftRight(){
        if (!this.checkThrottle()) return;

        this.setOffClass(this.currentIndex, 'right');
        
        let nextIndex = (this.currentIndex - 1 < 0) ? this.images.length - 1 : this.currentIndex - 1;

        this.removeOffClass(nextIndex, 'right');
        this.currentIndex = nextIndex;
        this.resetInterval();
    }

    removeOffClass(i, direction){
        let oppositeOff = '';
        let className = this.imageContainers[i].className;
        if (className.indexOf(direction) !== -1) {
            if (className.indexOf('right') !== -1) oppositeOff = ' off-left no-transition';
            else if (className.indexOf('left') !== -1) oppositeOff = ' off-right no-transition';
            this.imageContainers[i].className = `image-container ${oppositeOff}`;
        }
        setTimeout(()=>{
            this.imageContainers[i].className = 'image-container';
        },100);
    }

    autoRotate(){
        this.interval = setInterval(()=>{
            this.shiftRight();
        }, 5000);
    }

    resetInterval(){
        clearInterval(this.interval);
        this.autoRotate();
    }

    setOffClass(i, direction = 'left'){
        this.imageContainers[i].className = `image-container off-${direction}`;
    }
}
