import { currentRoom } from '../classes/enterRoom.js';
import buildElement from '../utils/buildElement.js';
import '../components/display-icon.js';

const colorCodes = {
  purple: '#C451FA',
  gold: '#E3B204'
}

class ActionButton extends HTMLElement {
  connectedCallback() {
    //styles
    this.style.backgroundColor = this.setBackgroundColor();
    this.render();
  }

  constructor() {
    super();

    this.addEventListener('click', function(e) {
      let btnTxt = e.target.innerHTML.toLowerCase();

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

      switch (btnTxt) {
        case 'open':
          //somehow set the chest._isOpen to true
          this.open();
          console.log('chest opened?')
          for (const item of Entity.getInfo.contents) {
            let div = document.createElement('div');
            div.appendChild(buildElement(
              'display-icon', //change to card element
              {class: 'item-icon'},
              {icon: item.icon}
            ))
            document.querySelector('#contents').append(div);
          }
          //change button text
          this.innerHTML = 'take all';
          break;
        case 'attack':
          Entity.startAttackTimer();
          Player.startAttackTimer(Entity);

          this.innerHTML = 'stop attack';
          break;
        case 'take all':
          //add all items to inventory
          console.log('add all items to inv');
          break;
        case 'stop attack':
          Player.stopAttackTimer();
          this.innerHTML = 'attack';
          break;
        default:
          console.log(`No action for ${btnTxt}`);
      }
    })
  }

  setBackgroundColor() {
    switch (this.type) {
      case 'enemy':
        return colorCodes.purple;
      case 'chest':
        return colorCodes.gold;
    }
  }

  render() {
    this.innerHTML = this.text;
  }
}

customElements.define('action-button', ActionButton);