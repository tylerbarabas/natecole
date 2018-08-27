import './img/logo_white.png';
import './img/ico_facebook.png';
import './img/ico_twitter.png';
import './img/ico_instagram.png';
import './img/ico_pinterest.png';
import './index.scss';
import Test from './test.html';

console.log('test', Test);

class ColeForge {
    constructor(){
        this.selectedPage = 'home';
        this.menuItems = document.getElementsByClassName('menu-item');

        for (let i=0;i<this.menuItems.length;i+=1) {
            let m = this.menuItems[i];
            let key = m.getAttribute('data-value');

            m.addEventListener('click',this.menuItemClicked.bind(this, key));
        }
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
    }
}

new ColeForge();
