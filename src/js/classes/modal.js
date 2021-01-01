//////////////////////////////
// Modal

export default class Modal
{
  constructor( elementId ) {
    this.id = elementId;
    this.modal = document.getElementById(elementId);
    this.toggleButtons = document.querySelectorAll(`[toggle*="${elementId}"]`);
    this.openButtons = document.querySelectorAll(`[open*="${elementId}"]`);
    this.closeButtons = document.querySelectorAll(`[close*="${elementId}"]`);
    this.allButtonsArray = this.getAllButtonsArray();
    this.activatingButton = this.openButtons[0] ? this.openButtons[0] : this.toggleButtons[0];
    this.isActive = false;
    this.isAnimating = false;
    this.duration = this.modal.dataset.duration ? this.modal.dataset.duration : 300;
  }

  log() {
    console.log( this.getData() );
  }
  
  getData() {
    return {
      id: this.id,
      isActive: this.isActive,
      isAnimating: this.isAnimating,
      duration: this.duration,
    }
  }
  
  turnFocusTrap( toggle ) {
    const focusableList = `a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])`,
          focusableElements = this.modal.querySelectorAll(focusableList),
          firstFocusableElements = focusableElements[0],
          lastFocusableElements = focusableElements[focusableElements.length - 1];
    
    const tabListener = (event) => {
      // console.log("tab pressed")
      let isTabPressed = ( event.key === 'Tab' || event.keyCode === '9' );

      if (!isTabPressed) { 
        return; 
      }

      // console.log(document.activeElement)

      if ( event.shiftKey ) /* shift + tab */ {
        if (document.activeElement === firstFocusableElements) {
          lastFocusableElements.focus();
          event.preventDefault();
        }
      } else /* tab */ {
        if (document.activeElement === lastFocusableElements) {
          firstFocusableElements.focus();
          event.preventDefault();
        }
      }
    }

    if ( toggle === "on" ) {
      // console.log(`focus trap on ${this.modal.id}`)
      // console.log(`focusing on ${firstFocusableElements}`)
      // console.log(focusableElements.forEach( elem => elem.classList))
      firstFocusableElements.focus();
      this.modal.addEventListener('keydown', tabListener, false )
    } 
    if ( toggle === "off" ) {
      this.modal.removeEventListener('keydown', tabListener, false )
      this.activatingButton.focus();
    }
  }

  turnEscEvent( toggle ) {
    const escListener = (event) => {
      let isEscPressed =  event.key === "Escape" || event.keyCode == '27'

      if ( !isEscPressed ) {
        return;
      }

      if ( this.isActive ) {
        event.preventDefault();
        this.deactivate()
      }
    }

    if ( toggle === "on" ) {
      document.addEventListener('keydown', escListener, false )
    } 
    if ( toggle === "off" ) {
      document.removeEventListener('keydown', escListener, false )
    }
  }
  
  getAllButtonsArray() {
    let allButtons = []
    allButtons = allButtons.concat(Array.from(this.toggleButtons))
    allButtons = allButtons.concat(Array.from(this.openButtons))
    allButtons = allButtons.concat(Array.from(this.closeButtons))
    return allButtons
  }
  
  toggleAllButtons( state ) {
    this.allButtonsArray.forEach( (button) => {
      button.dataset.state = state;
    })
  }

  setStateActivating() {
    this.modal.dataset.state = 'activating';
    this.toggleAllButtons( 'activating' );
  }

  setStateActive() {
    this.modal.dataset.state = 'active';
    this.toggleAllButtons( 'active' );
  }

  setStateDeactivating() {
    this.modal.dataset.state = 'deactivating';
    this.toggleAllButtons( 'deactivating' );
  }

  setStateInactive() {
    this.modal.dataset.state = 'inactive';
    this.toggleAllButtons( 'inactive' );
  }
  
  modalIsActive() {
    this.isActive = true;
    document.body.classList.add('scroll-lock');
    this.turnFocusTrap( "on" );
    this.turnEscEvent( "on" );
  }

  modalIsInactive() {
    this.isActive = false;
    document.body.classList.remove('scroll-lock');
    this.turnFocusTrap( "off" );
    this.turnEscEvent( "off" );
  }
  
  activate( button ) {
    this.activatingButton = button 
    this.setStateActivating();
    this.modalIsActive();

    setTimeout( () => {
      this.setStateActive();
    }, this.duration);
  }
  
  deactivate() {
    this.setStateDeactivating();
    
    setTimeout( () => {
      this.setStateInactive();
      this.modalIsInactive();
    }, this.duration);
  }
  
  buttonAction( button, action ) {
    button.addEventListener("click", ( event ) => {
      event.preventDefault();

      // if there is a current animation stop
      if ( this.isAnimating ) {
        return;
      }
      this.isAnimating = true;
      
      action();

      // what happens after animation
      setTimeout(() => {
        // turn off the animation check
        this.isAnimating = false;
      }, this.duration);
    });
  }
  
  roughScale(num) {
    const parsed = parseInt(num, 10);
    if (isNaN(parsed)) { return 0; }
    return parsed;
  }

  init() {
    if ( this.modal.hasAttribute('active') ) {
      let time = this.roughScale(this.modal.getAttribute('active'))
      this.modal.removeAttribute('active');
      
      if ( time > 0 ) {
        this.setStateInactive();

        setTimeout(() => {
          this.activate();
        }, time * 1000 );
      } else {
        this.setStateActive();
        this.modalIsActive();
      }
    } else {
      this.setStateInactive();
    }

    this.toggleButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        !this.isActive ? this.activate( button ) : this.deactivate()
      })
    });
    
    this.openButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        !this.isActive ? this.activate( button ) : null
      })
    });
    
    this.closeButtons.forEach( (button) => {
      this.buttonAction( button, () => {
        this.isActive ? this.deactivate() : null
      })
    });
  }
}

const initializeModal = () => {
  document.querySelectorAll('.js--modal').forEach( element => {
    if ( !element.id ) {
      console.log("Modal element needs ID to reference")
    } else {
      new Modal( element.id ).init();
    }
  });
}

document.addEventListener('DOMContentLoaded', initializeModal, false);