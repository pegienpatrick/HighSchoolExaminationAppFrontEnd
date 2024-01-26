import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

import VueCookies from 'vue-cookies';

// Vue.use(VueCookies);



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
export default function (app) {
  app.use(router)
  
  // this.apiUrl=window.location.protocol+"//"+window.location.hostname+":8080"
  app.use(VueCookies)
  




  

}
export { router };

