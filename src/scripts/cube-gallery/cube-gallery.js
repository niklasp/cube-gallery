import './cube-gallery.scss';

class CubeGallery {

  constructor( selector ) {
    this.DOM = {
      selector: selector,
      el: document.querySelector( selector ),
    };
    this.domEl = this.DOM.el;
    this.DOM.cubeWrap = this.domEl.querySelector('.cube-wrap');
    this.DOM.parent = this.domEl.parentElement;
    this.DOM.radio = document.querySelector('.radio-group');
    this.currentClass = '';
    this.DOM.sides = this.DOM.cubeWrap.querySelectorAll('.cube-side');

    this.width = 0;

    this.defaults = {
      width: 'auto',
    };

    this.transforms = {
      sides: [
        {
          rotateX: 0,
          rotateY: 0,
          translateZ: 0,
        },
        {
          rotateX: 0,
          rotateY: 90,
          translateZ: 0,
        },
        {
          rotateX: 0,
          rotateY: 180,
          translateZ: 0,
        },
        {
          rotateX: 0,
          rotateY: -90,
          translateZ: 0,
        },
        {
          rotateX: 90,
          rotateY: 0,
          translateZ: 0,
        },
        {
          rotateX: -90,
          rotateY: 0,
          translateZ: 0,
        },
      ],
      wrap: {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        rotateX: 0,
        rotateY: 0,
      },
    };

    //todo passed params
    const params = {};

    this.options = Object.assign( this.defaults, params );

    console.log( this.DOM.sides );
    this.initCubeGallery();
    this.addEventListeners();
  }

  initCubeGallery() {
    console.log( 'init gallery on', this.domEl );

    //demo only
    var cube = document.querySelector('.cube');

    this.setWidths();
  }

  setWidths() {
    if ( this.options.width === 'auto' ) {
      this.width = this.DOM.parent.offsetWidth;
    }

    this.domEl.style.width = `${ this.width }px`;
    this.domEl.style.height = `${ this.width }px`;
    this.transforms.wrap.translateZ = - this.width / 2;


    [ ...this.transforms.sides ].forEach( ( side ) => {
      side.translateZ = this.width / 2;
    } );

    this.updateTransforms();
  }

  changeSide( idx ) {
    if ( idx === 0 || idx === 'front' ) {
      this.transforms.wrap.rotateX = 0;
      this.transforms.wrap.rotateY = 0;
    } else if ( idx === 1 || idx === 'right' ) {
      this.transforms.wrap.rotateX = 0;
      this.transforms.wrap.rotateY = -90;
    } else if ( idx === 2 || idx === 'back' ) {
      this.transforms.wrap.rotateX = 0;
      this.transforms.wrap.rotateY = -180;
    } else if ( idx === 3 || idx === 'left' ) {
      this.transforms.wrap.rotateX = 0;
      this.transforms.wrap.rotateY = 90;
    } else if ( idx === 4 || idx === 'top' ) {
      this.transforms.wrap.rotateX = -90;
      this.transforms.wrap.rotateY = 0;
    } else if ( idx === 5 || idx === 'bottom' ) {
      this.transforms.wrap.rotateX = 90;
      this.transforms.wrap.rotateY = 0;
    }

    this.updateTransforms();
  }

  updateTransforms() {
    const wrapTransformString = `translateX(${ this.transforms.wrap.translateX }px) translateY(${ this.transforms.wrap.translateY }px) translateZ(${ this.transforms.wrap.translateZ }px) rotateX(${ this.transforms.wrap.rotateX }deg) rotateY(${ this.transforms.wrap.rotateY }deg)`;
    this.DOM.cubeWrap.style.transform = wrapTransformString;

    [ ...this.DOM.sides ].forEach( ( el, idx ) => {
      const transformString = `rotateX(${ this.transforms.sides[idx].rotateX }deg) rotateY(${ this.transforms.sides[idx].rotateY }deg) translateZ(${ this.transforms.sides[idx].translateZ }px)`;
      el.style.transform = transformString;
    } );
  }

  addEventListeners() {
    this.DOM.radio.addEventListener( 'change', () => {
      var checkedRadio = this.DOM.radio.querySelector( ':checked' );
      this.changeSide( checkedRadio.value );
    } );
  }
}

export default CubeGallery;
