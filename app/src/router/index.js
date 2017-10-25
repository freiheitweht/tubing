import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import ContentManagement from '@/components/page/ContentManagement'
import ReportManagement from '@/components/page/ReportManagement'
import SpiderManagement from '@/components/page/SpiderManagement'
import InterestGroup from '@/components/page/InterestGroup'
import AddInterstGroup from '@/components/page/addInterestGroup'
import AddSpiderAccount from '@/components/page/addSpiderAccount'
import EditInterestGroup from '@/components/page/editInterestGroup' 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
    },
    {
      path:'/interestGroup',
      name:'InterestGroup',
      component:InterestGroup
    },
    {
      path:'/contentManagement',
      name:'ContentManagement',
      component:ContentManagement
    },
    {
      path:'/reportManagement',
      name:'ReportManagement',
      component:ReportManagement
    },
    {
      path:'/spiderManagement',
      name:'SpiderManagement',
      component:SpiderManagement
    },{
      path:'/addInterstGroup',
      name:'AddInterstGroup',
      component:AddInterstGroup
    },{
      path:'/addSpiderAccount',
      name:'addSpiderAccount',
      component:AddSpiderAccount
    },{
      path:'/editInterestGroup',
      name:'editInterestGroup',
      component:EditInterestGroup
    }
  ]
})
