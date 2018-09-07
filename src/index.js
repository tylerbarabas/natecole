import Home from './home.html';
import Gallery from './gallery.html';
import AboutMe from './aboutme.html';
import Contact from './contact.html';

//Top bar images
import './img/logo_white.png';
import './img/ico_facebook.png';
import './img/ico_twitter.png';
import './img/ico_instagram.png';
import './img/ico_pinterest.png';

//Carousel and Gallery
import JSCarousel from './carousel';
import JSGallery from './gallery';

//Import images
import Staircase from './img/demo1.png';
import HandForge from './img/demo2.png';

import './index.scss';

/*
* linkto can be 'home', 'gallery',
* 'about-me', 'contact', or null (without quotes)
*/
const Images = {
    home: [{
        src: Staircase,
        caption: 'Mah staircase.',
        linkto: 'gallery'
    },{
        src: HandForge,
        caption: 'Mah hammerss.',
        linkto: 'about-me'
    }],
    gallery: [{
        src: Staircase,
        caption: ''
    },{
        src: HandForge,
        caption: ''
    },{
        src: Staircase,
        caption: ''
    },{
        src: HandForge,
        caption: ''
    }
]
};

class ColeForge {
    constructor(){
        this.carousel = null;
        this.gallery = null;

        this.selectedPage = 'home';
        this.mainContent = document.getElementById('main-content');
        this.menuItems = document.getElementsByClassName('menu-item');

        for (let i=0;i<this.menuItems.length;i+=1) {
            let m = this.menuItems[i];
            let key = m.getAttribute('data-value');

            m.addEventListener('click',this.menuItemClicked.bind(this, key));
        }

        this.loadContent('home');
    }

    menuItemClicked(key){
        if (!key) return;

        for (let i=0;i<this.menuItems.length;i+=1) {
            let m = this.menuItems[i];
            let k = m.getAttribute('data-value');

            m.className = m.className.split(' selected')[0];
            if (key === k) {
                m.className += ' selected';
            }
        }

        this.loadContent(key);
    }

    loadContent(key){
        switch(key){
            case 'gallery':
                this.mainContent.innerHTML = Gallery;
                this.gallery = new JSGallery(Images.gallery);
                break;
            case 'about-me':
                this.mainContent.innerHTML = AboutMe;
                break;
            case 'contact':
                this.mainContent.innerHTML = Contact;
                break;
            case 'home':
            default:
                this.mainContent.innerHTML = Home;
                this.carousel = new JSCarousel(Images.home);
                break;
        }
    }
}

window.mainController = new ColeForge();
