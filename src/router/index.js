import Vue from 'vue'
import Router from 'vue-router'

const CompanyList = () => import('components/company/company-list/company-list');
const JobHunter = () => import('../components/jobhunter/jobhunter');
const CompanyPage = () => import('../components/company/company-page/company-page.vue');
const CompanyFound = () => import('../components/company/company-found/cpmpany-found.vue');
const Resume = () => import('../components/resume/resume/resume.vue');
const Wenba = () => import('../components/wenba/wenba.vue');
const QuestionList = () => import('../components/wenba/page/listPage.vue');
const QuestionDetail = () => import('../components/wenba/page/detail.vue');
const WorkerIndex = () => import('../components/jobhunter/workerIndex.vue');
const ShowResume = () => import('../components/resume/resume-show/resume-show.vue');
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'job',
      component: WorkerIndex
    },
    {
      path: '/company.list',
      component: CompanyList
    },
    {
      path: '/workerindex',
      component: WorkerIndex
    },
    {
      path: '/resumeShow',
      component:ShowResume
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
