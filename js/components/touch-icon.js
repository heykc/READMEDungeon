export default class TouchIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    //set an open/close flag for the user menu
    this._isOpen = false;

    //click listener
    this.addEventListener('click', e => {
      switch (this.type) {
        case 'player':
          //open/close menu
          let playerMenu = document.querySelector('#player-menu');
          if (!this._isOpen) {
            let menuIconCount = document.querySelectorAll('.menu-item').length;
            playerMenu.style.top = `-${menuIconCount * 50}px`;
            
          } else {
            playerMenu.style.top = '0';
          }

          //change open flag
          this._isOpen = !this._isOpen;
          break;
        //TODO: create function that handles duplicate code for toolbox and skull
        case 'chest':
        case 'enemy':
          /*MIGHT NEED TO MAKE INFO SECTION A WEB COMPONENT THAT TAKES 'info' AS ARGUMENT*/

          this.displayInfo();

          //event listener for action button
          document.querySelector('.action-button').addEventListener('click', e => {
            let btnTxt = e.target.innerHTML.toLowerCase();
            switch (btnTxt) {
              case 'open':
                console.log('You opened the chest to find:');
                for (let item of this.contents) {
                  console.log(item.name)
                }
                break;
              case 'attack':
                console.log(`${Player._name} started attacking ${this.name}`)
                let enemy = null;
                for (let item of Room.getContents) {
                  if (item._id === +this.id) {
                    enemy = item;
                  }
                }

                Player.attack(enemy);
                enemy.startAttackTimer();
                Player.startAttackTimer(enemy);
            }
          })
          break;
        case 'move': //move
          console.log('The move button was clicked');
          break;
        case 'inv':
          console.log('The inventory will show up. Make a good display in Figma before trying.');
          break;
        default:
          console.log(`no action for ${this.icon}`);
      }
    });
  }

  displayInfo() {
    //grab info section
    let infoSection = document.querySelector('#info-section');
    //generated info
    let info = '';
    
    // remove current active class
    document.querySelectorAll('.icon').forEach(el => {
      el.classList.remove('active');
    })
    
    // unlocked action
    if (!this.isLocked) {
      //add active to clicked action icon
      this.classList.add('active');
      if (this.type === 'enemy') {
        //set the content
        info = `
        <div class="icon-name">${this.name}
          ${/* maybe make health-bar component */''}
          <div class="e-health-bar"></div>
        </div>
        
        ${/* some stat display for [atk, def, spd] */''}
        <div>
          ATK: ${this.atk}
          SPD: ${this.spd}
        </div>
        ${/* how to add an event listener? maybe component? */''}
        <div class="action-button ${this.type}">Attack</div>`;
      } else {
        info = `
          <div class="icon-name">${this.name}</div>
          ${/* create a div for chest items
               append to it after created? */''}
          <div class="action-button ${this.type}">Open</div>`;
      }
    // locked action
    } else {
      // blink animation on icon
      this.classList.remove('blink');
      void this.offsetWidth;
      this.classList.add('blink');

      // set the content
      info = `
      <div class="locked-content">
        <div class="locked-title"><i class="fas fa-lock"></i></div>
        <div class="title">LOCKED</div>
        <div class="sub-title">Complete tasks to unlock</div>
      </div>`;
    }

    infoSection.innerHTML = info;
    // append chest items to chest item area?
  }

  render() {
    this.innerHTML = `
      <i class='fas fa-${this.icon}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);