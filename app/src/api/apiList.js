let baseUrl = "http://115.28.153.35:9089/heimdall";
console.log("环境变量:"+process.env.NODE_ENV);
if(process.env.NODE_ENV=== "development"){
    // baseUrl = "http://192.168.31.95:8088/heimdall";
}
let opt = {
    //获取内容管理列表
    queryMediaList:{
        method:"GET",
        url: baseUrl + '/media/list/search'
    },
    //删除某一条 
    deleteMedia:{
        method:"POST",
        url: baseUrl + '/media/delete'
    },
    // 置顶接口
    topMedia:{
        method:"POST",
        url: baseUrl + '/media/sticky'
    },
    //取消置顶
    cancelMedia:{
        method:"POST",
        url: baseUrl + '/media/sticky/cancel'
    },
    //爬虫审核界面，账户分条件分页查询接口
    accountList:{
        method:"GET",
        url: baseUrl + '/instagram/account/list'
    },
    //兴趣组管理页面 兴趣组模糊分页查询
    interestList:{
        method:"GET",
        url: baseUrl + '/interest/group/search'
    },
    //兴趣组上下架接口 
    dealInterestGroup:{
        method:"POST",
        url: baseUrl + '/interest/group/deal'
    },
    // 分页查询兴趣组中的账户列表 
    interestAccountList:{
        method:"GET",
        url: baseUrl + '/interest/group/account/list'
    },
    // 移除兴趣组中的账户  
    removeInterestAccount:{
        method:"POST",
        url: baseUrl + '/instagram/group/account/remove'
    },
    // 加入黑名单
    addBlackList:{
        method:"POST",
        url: baseUrl + '/media/join/blacklist'
    },
    // 举报管理：取消黑名单 
    cancelBlackList:{
        method:"POST",
        url: baseUrl + '/media/cancel/blacklist'
    },
    // 爬虫审核管理：账户拉黑接口
    addInstagramBlackList:{
        method:"POST",
        url: baseUrl + '/instagram/join/blacklist'
    },
    // 爬虫审核管理：解除拉黑账户
    cancelInstagramBlackList:{
        method:"POST",
        url: baseUrl + '/instagram/remove/blacklist'
    },
    insertLittleInstagramAccount:{
        method:"POST",
        url: baseUrl + '/instagram/account/insert/little'
    },
    detailInterestGroup:{
        method:"GET",
        url: baseUrl + '/interest/group/detail'
    },
    // /interest/group/info/update
    updateInterestGroupInfo:{
        method:"POST",
        url: baseUrl + '/interest/group/info/update'
    },
    getActionAvatarUrl:{
        method:"FILE",
        url: baseUrl + '/interest/group/avatar/update'
    },
    removeAccount:{
        method:"POST",
        url: baseUrl + '/instagram/group/account/remove'
    },
    //少量增加兴趣组
    addInterestMembers:{
        method:"POST",
        url: baseUrl + '/interest/group/members/join'
    },
    addRemarkName:{
        method:"POST",
        url: baseUrl + '/instagram/account/add/remarkName'
    }
   
} 
export default opt;
