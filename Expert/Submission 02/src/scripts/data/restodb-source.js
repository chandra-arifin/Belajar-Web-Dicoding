import API_ENDPOINT from '../globals/api-endpoint';
import Swal from 'sweetalert2';

class RestoDbSource {

  static showSuccessMessage = (message) => {
    Swal.fire('Success!', message, 'success');
  }

  static showErrorMessage = (message) => {
    Swal.fire('Error!', message, 'error');
  }

  static showResponseMessage = (
      message = 'Check your internet connection'
  ) => {
    Swal.fire('Error!', message, 'error');
  }

  static async allRestos() {
    const response = await fetch(API_ENDPOINT.ALL_RESTO);
    const responseJson = await response.json();
    const restaurants = responseJson.restaurants;

    return restaurants;
  }

  static async detailResto(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    const restaurant = responseJson.restaurant;

    return restaurant;
  }

  static async addReviewResto(id, nama, isiReview) {

    try {
      const data = {
            id: id,
            name: nama,
            review: isiReview,
        };

        const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        };

          const response = await fetch(API_ENDPOINT.ADDREVIEW, options);
          const responseJson = await response.json();
          
          this.showSuccessMessage(responseJson.message);
      } catch (error) {
          this.showResponseMessage(error);
      }
    }
}

export default RestoDbSource;
