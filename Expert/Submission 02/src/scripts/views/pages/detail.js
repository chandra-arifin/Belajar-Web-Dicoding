import UrlParser from '../../routes/url-parser';
import RestoSource from '../../data/restodb-source';
import { createRestoDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';
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

const Detail = {  
  async render() {
    return `
      <div id="resto" class="resto"></div>
      <div id="likeButtonContainer"></div>
      <h2 class="resto">Add Review</h2>
      <form id="addForm" class="addForm" method="POST">
          <div class="form-group">
              <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  pattern="^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"
                  minlength="7"
                  aria-describedby="nameValidation"
              />
              <label for="nama">Name</label>
              <p id="nameValidation" class="validation-message"></p>
              <br />
              <textarea
                  id="isiReview"
                  name="isiReview"
                  rows="10"
                  cols="50"
                  placeholder="fill the review here!"
                  required
              ></textarea>
              <br />
              <button class="tambah" id="tambah">Add</button>
          </div>
      </form>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restoContainer = document.querySelector('#resto');
    const btnTambah = document.querySelector('#tambah');

    btnTambah.addEventListener('click', this.addReview);

    showLoading();

    try
    {
      const resto = await RestoSource.detailResto(url.id);

      hideLoading();

      restoContainer.innerHTML = createRestoDetailTemplate(resto);
  
      LikeButtonInitiator.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        resto: {
          id: resto.id,
          name: resto.name,
          description: resto.description,
          rating: resto.rating,
          city: resto.city,
          pictureId: resto.pictureId,
        },
      });
  
    }
    catch(error)
    {
      hideLoading();
      showErrorMessage(error);
    }
  },

  addReview(event) {
      event.preventDefault();

      showLoading();

      try {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const nama = document.querySelector('#nama');
        const isiReview = document.querySelector('#isiReview');

        RestoSource.addReviewResto(url.id, nama.value, isiReview.value);

        hideLoading()
    } catch (error) {
        hideLoading()
        showErrorMessage(error)
    }
  }

};

export default Detail;
