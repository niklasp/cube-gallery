import anime from 'animejs/lib/anime.es.js';

import './cube-gallery.scss';

class CubeGallery {
  constructor( selector, args ) {
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
    this.anime = anime( this.DOM.cubeWrap );

    this.width = 0;

    this.defaults = {
      width: 'auto',
      scrollAnimate: true,
      swiping: true,
      scrollKeyframes: [
        {rotateX: '+=720', rotateY: '+=360'},
      ],
      rotationDuration: 500,
      easing: 'easeInOutQuad',
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

    const params = { ...args };

    this.options = Object.assign( this.defaults, params );

    this.initCubeGallery();
    this.addEventListeners();
    if ( this.options.scrollAnimate ) {
      this.scrollAnimate();
    }
  }

  initCubeGallery() {
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

  rotate( xy ) {
    const { x = 0, y = 0 } = xy;

    const rotX = parseFloat( anime.get( this.DOM.cubeWrap, 'rotateX' ) );
    const rotY = parseFloat( anime.get( this.DOM.cubeWrap, 'rotateY' ) );

    this.DOM.cubeWrap.style.transition = 'transform 0.5s';
    this.transforms.wrap.rotateX = rotX + x;
    this.transforms.wrap.rotateY = rotY + y;

    this.updateTransforms();

    // this.DOM.cubeWrap.style.transition = 'none';
  }

  animeRelativeRot( toX, toY ) {
    const rotXDiff = ( parseFloat( anime.get( this.DOM.cubeWrap, 'rotateX' ) ) - toX ) % 360;
    const rotYDiff = ( parseFloat( anime.get( this.DOM.cubeWrap, 'rotateY' ) ) - toY ) % 360;

    anime({
      targets: this.DOM.cubeWrap,
      rotateX: `-=${ rotXDiff }deg`,
      rotateY: `-=${ rotYDiff }deg`,
      duration: this.options.rotationDuration,
      easing: this.options.easing,
    });
  }

  changeSide( idx ) {
    // this.DOM.cubeWrap.style.transition = 'transform 0.5s';

    if ( idx === 0 || idx === 'front' ) {
      this.animeRelativeRot( 0, 0 );
    } else if ( idx === 1 || idx === 'right' ) {
      this.animeRelativeRot( 0, -90 );
    } else if ( idx === 2 || idx === 'back' ) {
      this.animeRelativeRot( 0, -180 );
    } else if ( idx === 3 || idx === 'left' ) {
      this.animeRelativeRot( 0, 90 );
    } else if ( idx === 4 || idx === 'top' ) {
      this.animeRelativeRot( -90, 0 );
    } else if ( idx === 5 || idx === 'bottom' ) {
      this.animeRelativeRot( 90, 0 );
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
    if ( this.DOM.radio ) {
      this.DOM.radio.addEventListener( 'change', () => {
        var checkedRadio = this.DOM.radio.querySelector( ':checked' );
        this.changeSide( checkedRadio.value );
      } );
    }
  }

  scrollAnimate() {
    const divAnimation = anime({
      targets: this.DOM.cubeWrap,
      keyframes: this.options.scrollKeyframes,
      autoplay: false,
      easing: 'easeInOutCubic',
    });

    this.DOM.parent.style.height = '5000px';
    this.DOM.cubeWrap.style.transition = 'none';
    this.domEl.style.position = 'sticky';
    this.domEl.style.top = '50%';

    function scrollPercent() {
      const bodyST = document.body.scrollTop;
      const docST = document.documentElement.scrollTop;
      const docSH = document.documentElement.scrollHeight;
      const docCH = document.documentElement.clientHeight;
      return (docST + bodyST) / (docSH - docCH) * 100;
    }

    window.addEventListener('scroll', ( e ) => {
      this.DOM.cubeWrap.style.transition = 'none';
      divAnimation.seek( ( scrollPercent() / 100 ) * divAnimation.duration );
    });
  }


}

export default CubeGallery;
