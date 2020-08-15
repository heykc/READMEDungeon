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

          //event listener for attack button
          
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
      if (this.icon === 'skull') {
        //set the content
        info = `
        <div class="icon-name">${this.name}</div>
        ${/* maybe make health-bar component */''}
        <div class="e-health-bar"></div>
        ${/* some stat display for [atk, def, spd] */''}
        <div class="e-atk">ATK: ${this.atk}</div>
        ${/* how to add an event listener? maybe component? */''}
        <div class="action-button">Attack</div>`;
      } else {
        info = `<div class="action-button ${this.name}">Open</div>`;
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
  }

  render() {
    this.innerHTML = `
      <i class='fas fa-${this.icon}'></i>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);