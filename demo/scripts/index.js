import '../styles/index.scss';
import CubeGallery from '../../cube-gallery';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

const cg = new CubeGallery( '.cube-gallery', {
  // scrollKeyframes: [
  //   {rotateX: 0, rotateY: '-=90'},
  //   {rotateX: -90, rotateY: '+=90'},
  //   {rotateX: '+=90', rotateY: '-=180'},
  //   {rotateY: '-=90'},
  //   {rotateX: '+=90', rotateY: '-=90', rotateZ: '+=0'},
  // ],
} );

const left = document.querySelector( 'button.left' );
const right = document.querySelector( 'button.right' );
const top = document.querySelector( 'button.top' );
const bottom = document.querySelector( 'button.bottom' );

const toFront = document.querySelector( 'button.tofront' );
const toRight= document.querySelector( 'button.toright' );
const toBack = document.querySelector( 'button.toback' );
const toLeft = document.querySelector( 'button.toleft' );
const toTop = document.querySelector( 'button.totop' );
const toBottom = document.querySelector( 'button.tobottom' );



left.addEventListener( 'click', () => {
  cg.rotate( { y: -90 }, true );
});

right.addEventListener( 'click', () => {
  cg.rotate( { y: 90 }, true );
});

bottom.addEventListener( 'click', () => {
  cg.rotate( { x: -90 }, true );
});

top.addEventListener( 'click', () => {
  cg.rotate( { x: 90 }, true );
});


toFront.addEventListener( 'click', () => {
  cg.changeSide( 'front' );
});
toRight.addEventListener( 'click', () => {
  cg.changeSide( 'right' );
});
toBack.addEventListener( 'click', () => {
  cg.changeSide( 'back' );
});
toLeft.addEventListener( 'click', () => {
  cg.changeSide( 'left' );
});
toTop.addEventListener( 'click', () => {
  cg.changeSide( 'top' );
});
toBottom.addEventListener( 'click', () => {
  cg.changeSide( 'bottom' );
});


