import {UI} from '../utils/ui.js';
import { currentRoom } from '../classes/enterRoom.js';

class TouchIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  constructor() {
    super();

    //click listener
    this.addEventListener('click', e => {
      switch (this.type) {
        case 'player':
          UI.playerMenu.render();
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
                for (const item of this.contents) {
                  let div = document.createElement('div');
                  div.textContent = item.name;
                  document.querySelector('#contents').append(div);
                }
                break;
              case 'attack':
                //get the room
                let Room = currentRoom;
                //get the player
                let Player = Room._player;
                //get the enemy
                let Entity = null;
                for (let item of Room.getContents) {
                  if (item._id === +this.id) {
                    Entity = item;
                  }
                }
                Player.attack(Entity);
                Entity.startAttackTimer();
                Player.startAttackTimer(Entity);
                break;
              default:
                console.log(`No action for ${btnTxt}`);
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
        <div id="icon-name">
          ${this.name}
        </div>
        
        ${/* some stat display for [atk, def, spd] */''}
        <div>
          ATK: ${this.atk}
          SPD: ${this.spd}
          HP: ${this.hp}
        </div>

        <div id="effects">
         EFFECTS
        </div>
        ${/* how to add an event listener? maybe component? */''}
        <div class="action-button ${this.type}">Attack</div>`;

        UI.infoSection.innerHTML = info;
        document.querySelector('#icon-name').appendChild(this.elements['health-bar']);
        //display effects if any
        document.querySelector('#effects').append(this.effects)
      } else {
        info = `
          <div class="icon-name">${this.name}</div>
          <div id="contents"></div>
          <div class="action-button ${this.type}">Open</div>`;
          
          UI.infoSection.innerHTML = info;
          
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
  }

  render() {
    this.innerHTML = `
      <svg style="margin: 10px; width:55px; height:55px; fill:white;">
        <use xlink:href="#rmd-${this.icon}" />
      </svg>
    `
  }
}

// create element
customElements.define('touch-icon', TouchIcon);