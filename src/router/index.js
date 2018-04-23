import Vue from 'vue'
import Router from 'vue-router'

// Pages Client Side
import Publish from '@/components/client/pages/Publish.vue'
import NotFound from '@/components/client/pages/NotFound.vue'

// Layouts Client Side
import Navbar from '@/components/client/layouts/NavBar.vue'
import Slider from '@/components/client/layouts/Slider.vue'
import Filter from '@/components/client/layouts/Filter.vue'
import Lists from '@/components/client/layouts/Lists.vue'
import Car from '@/components/client/layouts/Car.vue'
import Footer from '@/components/client/layouts/Footer.vue'

// Pages Dashboard Side
import Dashboard from '@/components/dashboard/pages/Home.vue'
import Vehicles from '@/components/dashboard/pages/Vehicles.vue'
import Login from '@/components/dashboard/pages/Login.vue'
import BrandsAndModels from '@/components/dashboard/pages/BrandsAndModels.vue'
import Atributes from '@/components/dashboard/pages/Atributes.vue'

// Layouts Dashboard Side
import ListVehicles from '@/components/dashboard/layouts/ListVehicles.vue'
import NewVehicle from '@/components/dashboard/layouts/NewVehicle.vue'
import EditVehicle from '@/components/dashboard/layouts/EditVehicle.vue'
import FilterVehicles from '@/components/dashboard/layouts/FilterVehicles.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        navbar: Navbar,
        slider: Slider,
        filter: Filter,
        lists: Lists,
        footer: Footer
      }
    },
    {
      path: '/publish/:id',
      component: Publish,
      children: [
        {
          path: '',
          name: 'publish',
          components: {
            navbar: Navbar,
            filter: Filter,
            car: Car,
            footer: Footer
          }
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'vehicles',
          component: Vehicles,
          children: [
            {
              path: '',
              name: 'vehicles',
              components: {
                list: ListVehicles,
                filter: FilterVehicles,
                new: NewVehicle,
                edit: EditVehicle
              }
            }
          ]
        },
        {
          path: 'brands_and_models',
          name: 'brands_and_models',
          component: BrandsAndModels
        },
        {
          path: 'atributes',
          name: 'atributes',
          component: Atributes
        }
      ]
    },
    {path: '*', component: NotFound}
  ]
})
