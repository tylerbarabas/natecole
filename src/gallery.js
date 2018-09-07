export default class Gallery {
    constructor(Images){
        this.images = Images;
        this.imageContainers = [];
        this.container = document.getElementById('gallery');
        this.isPreview = false;
        this.previewContainer = document.getElementById('preview-container');
        this.previewContainer.style.display = 'none';

        this.xIcon = document.getElementById('x-close-preview');
        this.xIcon.addEventListener('click', this.closePreview.bind(this));

        for (let i=0;i<this.images.length;i+=1){
            let image = this.images[i];
            
            let ic = document.createElement('DIV');
            ic.className = 'image-container';

            let domImg = document.createElement('IMG');
            domImg.src = image.src;
            domImg.setAttribute('data-index', i);

            ic.appendChild(domImg);

            this.imageContainers[i] = ic;
            this.container.appendChild(ic);

            this.imageContainers[i].addEventListener('click', this.openPreview.bind(this));

            if (i % 2 === 1) this.container.appendChild(document.createElement('BR'));
        }
    }

    openPreview(){
        this.previewContainer.style.display = 'block';
        this.previewContainer.style.opacity = 1; 
    }

    closePreview(){
        console.log('closePreview');
    }
}
