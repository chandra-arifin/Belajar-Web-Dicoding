import RestoSource from '../../data/restodb-source';
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

const AllResto = {
  async render() {
    return `
    <section>    
        <h1 class="explore">Explore Restaurant</h1>
    
        <div class="posts" id="posts">
        </div>
    </section> 
    `;
  },

  async afterRender() {
    const restosContainer = document.querySelector('#posts');

    showLoading();

    try{

      const restos = await RestoSource.allRestos();
      
      hideLoading();

      restos.forEach((resto) => {
        restosContainer.innerHTML += createRestoItemTemplate(resto);
      });  
    }catch(error)
    {
      hideLoading();
      showErrorMessage(error);
    }
  },
};

export default AllResto;
