import Loadable from 'react-loadable'
import Loading from '../components/Loading'

const menuRoutes = [
  {
    path: '/home',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/Home'),
      loading: Loading
    })
  },
  {
    path: '/blocklist',
    sidebarName: 'BlockList',
    navbarName: 'BlockList',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/BlockList'),
      loading: Loading
    })
  },
  {
    path: '/block',
    sidebarName: 'BlockList',
    navbarName: 'BlockList',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/Block'),
      loading: Loading
    })
  },
  {
    path: '/transactionlist',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/TransactionList'),
      loading: Loading
    })
  },
  {
    path: '/transaction',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/Transaction'),
      loading: Loading
    })
  },
  {
    path: '/assetlist',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/AssetList'),
      loading: Loading
    })
  },
  {
    path: '/asset',
    sidebarName: 'Dashboard',
    navbarName: 'Material Dashboard',
    // icon: Dashboard,
    component: Loadable({
      loader: () => import('../views/Asset'),
      loading: Loading
    })
  },
  { redirect: true, path: '/', to: '/home', navbarName: 'Redirect' }
]

export default menuRoutes
