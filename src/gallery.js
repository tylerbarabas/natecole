export default class Gallery {
    constructor(Images){
        this.images = Images;
        this.imageContainers = [];
        this.container = document.getElementById('gallery');
        this.isPreview = false;
        this.previewContainer = document.getElementById('preview-container');
        this.previewContainer.style.display = 'none';
        this.previewImage = null;

        this.xIcon = document.getElementById('x-close-preview');
        this.xIcon.addEventListener('click', this.closePreview.bind(this));

        for (let i=0;i<this.images.length;i+=1){
            let image = this.images[i];
            
            let ic = document.createElement('DIV');
            ic.className = 'image-container';

            let domImg = document.createElement('IMG');
            domImg.src = image.src;
            domImg.setAttribute('data-index', i);
            domImg.className = 'preview-img';

            ic.appendChild(domImg);

            this.imageContainers[i] = ic;
            this.container.appendChild(ic);

            this.imageContainers[i].addEventListener('click', this.openPreview.bind(this));

            if (i % 2 === 1) this.container.appendChild(document.createElement('BR'));
        }

        this.arrowLeft = document.getElementById('arrow-left');
        this.arrowLeft.addEventListener('click',this.arrowClicked.bind(this,'left'));

        this.arrowRight = document.getElementById('arrow-right');
        this.arrowRight.addEventListener('click',this.arrowClicked.bind(this,'right'));
    }

    openPreview(e,i=null){
        this.currentIndex = i = i || e.target.getAttribute('data-index');

        this.previewImage = document.createElement('IMG');
        this.previewImage.src = this.images[i].src;
        this.previewImage.className = 'preview-image';

        this.previewContainer.appendChild(this.previewImage);
        this.previewContainer.style.display = 'block';

        setTimeout(()=>{
            this.previewContainer.style.opacity = 1;
        }, 50);
    }

    closePreview(){
        this.previewContainer.style.opacity = 0; 
        setTimeout(()=>{
            this.clearPreview();
            this.previewContainer.style.display = null; //defaults to none
        },500);
    }

    clearPreview(){
        let images = this.previewContainer.getElementsByTagName('IMG');
        for (let i=0;i<images.length;i+=1){
            images[i].parentNode.removeChild(images[i]);
        }
        this.previewImage = null;
    }

    arrowClicked(direction){
        if (direction === 'right'){
            this.currentIndex += 1;
        } else {
            this.currentIndex -= 1;
        }

        if (this.currentIndex >= this.images.length) this.currentIndex = 0;
        else if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;

        let i = this.currentIndex;
        this.previewImage.src = this.images[i].src;
    }
}
