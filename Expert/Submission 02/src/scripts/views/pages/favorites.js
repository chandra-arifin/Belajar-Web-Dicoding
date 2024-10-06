import FavoriteRestoIdb from '../../data/favorite-resto-idb';
import { createRestoItemTemplate } from '../templates/template-creator';
import Swal from 'sweetalert2';

const loadingComponent = document.querySelector('loading-component');

const showErrorMessage = (message) => {
  Swal.fire('Error!', message, 'error');
}

const showLoading = () => {
  loadingComponent.showLoading();
}

const hideLoading = () => {
  setTimeout(() => {
      loadingComponent.hideLoading();
  }, 1000)
}


const Like = {
  async render() {
    return `
    <section>
        <h1 class="explore">Your Liked Restaurant</h1>
        
        <div class="posts" id="posts">
        </div>
    </section> 
    `;
  },

  async afterRender() {

    showLoading();

    try
    {
      const restosContainer = document.querySelector('#posts');
      
      const restos = await FavoriteRestoIdb.getAllRestos();
      
      hideLoading();
      
      restos.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });  
    }
    catch(error)
    {
      hideLoading();
      showErrorMessage(error);
    }

  },
};

export default Like;
