import Vue from 'vue'
import Router from 'vue-router'
// import CompanyList from 'components/company/company-list/company-list'
// import JobHunter from '../components/jobhunter/jobhunter'
// import CompanyPage from "../components/company/company-page/company-page.vue"
// import CompanyFound from '../components/company/company-found/cpmpany-found.vue'
// import Resume from '../components/resume/resume/resume.vue';
// import Wenba from '../components/wenba/wenba.vue'
// import QuestionList from '../components/wenba/page/listPage.vue'
// import QuestionDetail from '../components/wenba/page/detail.vue'

const CompanyList = () => import('components/company/company-list/company-list');
const JobHunter = () => import('../components/jobhunter/jobhunter');
const CompanyPage = () => import('../components/company/company-page/company-page.vue');
const CompanyFound = () => import('../components/company/company-found/cpmpany-found.vue');
const Resume = () => import('../components/resume/resume/resume.vue');
const Wenba = () => import('../components/wenba/wenba.vue');
const QuestionList = () => import('../components/wenba/page/listPage.vue');
const QuestionDetail = () => import('../components/wenba/page/detail.vue');

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'job',
      component: JobHunter
    },
    {
      path: '/company.list',
      component: CompanyList
    },
    {
      path: '/jobhunter',
      component: JobHunter
    },
    {
      path: '/company.page',
      component: CompanyPage
    },
    {
      path: '/company.found',
      component: CompanyFound
    },
    {
      path: '/resume',
      component: Resume
    },
    {
      path: '/wenba',
      component: Wenba,
      // redirect: '/wenba/questonlist',
      children: [
        {
          path: '/wenba/questonlist/:mode',
          component: QuestionList
        },
        {
          path: ':TID',
          component: QuestionDetail
        },
      ]
    }
  ]
})
