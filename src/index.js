import './img/logo_white.png';
import './img/ico_facebook.png';
import './img/ico_twitter.png';
import './img/ico_instagram.png';
import './img/ico_pinterest.png';
import './img/demo1.png';
import './img/demo2.png';
import './img/demo3.png';

import './index.scss';

import Home from './home.html';
import Gallery from './gallery.html';
import AboutMe from './aboutme.html';
import Contact from './contact.html';

class ColeForge {
    constructor(){
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
        console.log('menuItemClicked', key);
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
                break;
        }
    }
}

new ColeForge();
