import '../styles/index.scss';
import CubeGallery from './cube-gallery/cube-gallery';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

new CubeGallery( '.cube-gallery' );
