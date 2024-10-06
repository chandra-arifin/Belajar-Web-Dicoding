import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (resto) => `
    <article class="post-item">
      <img
        class="post-item__thumbnail"
        src="${CONFIG.BASE_IMAGE_URL_SMALL + resto.pictureId}"
        alt="${resto.name}"
      />
      <div class="post-item__content">
        <h1 class="">
          ${resto.name}
        </h1>
        <p class="">
          ${resto.address}
        </p>
        <p class="post-item__city">
          City: ${resto.city}
        </p>
        <p class="post-item__description">
          ${resto.description}
        </p>
        <p class="post-item__menu">
          List Foods:
          <ul>
            ${resto.menus.foods.map(food => `<li>${food.name}</li>`).join('')}
          </ul>
        </p>
        <p class="post-item__menu">
          List Drinks:
          <ul>
            ${resto.menus.drinks.map(drink => `<li>${drink.name}</li>`).join('')}
          </ul>
        </p>
        <p class="post-item__menu">
          Reviews:
          <ul>
            ${resto.customerReviews.map(review => `<li class="post-item__review">
              Name: ${review.name}<br/>
              Review: ${review.review}<br/>
              Date: ${review.date}
              </li>`).join('')}
          </ul>
        </p>
        <a href="/" class="linkhome">Home</a>
        </div>
    </article>
`;

const createRestoItemTemplate = (resto) => `
  <article class="post-item">
      <img
        class="post-item__thumbnail"
        src="${CONFIG.BASE_IMAGE_URL_SMALL + resto.pictureId}"
        alt="${resto.name}"
      />
      <div class="post-item__content">
        <p class="post-item__rating">
          Rating: ⭐️${resto.rating}
        </p>
        <h1 class="post-item__name">
          <a href="${`/#/detail/${resto.id}`}">${resto.name}</a>
        </h1>
        <p class="post-item__description">
          ${resto.description}
        </p>
        <p class="post-item__city"></p>
          City: ${resto.city}
        </p>
      </div>
    </article>
  `;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export { createRestoItemTemplate, createRestoDetailTemplate, createLikeButtonTemplate, createLikedButtonTemplate };
