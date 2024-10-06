import AllRestos from '../views/pages/all-restaurant';
import Detail from '../views/pages/detail';
import Favorites from '../views/pages/favorites';

const routes = {
  '/': AllRestos,
  '/all-restaurant': AllRestos,
  '/detail/:id': Detail,
  '/favorites': Favorites,
};

export default routes;

