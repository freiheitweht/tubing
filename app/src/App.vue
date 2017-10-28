<template>
  <div id="app">
    <div class="header">
      <img src="http://res.xiongdihuzhu.com/res/api/web-manager/logo.svg" alt="">
      <span>油管</span>
    </div>
    <el-row class="section">
      <el-col :span="8" class="nav">
        <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handleSelect" >
            <el-menu-item index="1"><i class="el-icon-menu"></i>内容管理</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-information"></i>举报管理</el-menu-item>
            <el-menu-item index="3"><i class="el-icon-setting"></i>爬虫审核管理</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-date"></i>兴趣组管理</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="24" class="content">
        <router-view/>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "app",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(index){
      let map = {
        "1":"ContentManagement",
        "2":"ReportManagement",
        "3":"SpiderManagement",
        "4":"InterestGroup"
      }
      if(map[index]){
        this.$router.push({name:map[index]});
      }else{
        console.log(index+'未定义跳转的页面');
      }
    }
  }
};
</script>

<style lang="less">
body,
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  padding: 0;
  margin: 0;
}

body,
html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  .form-title {
    padding: 20px;
    // background: #EFF2F7;
  }

  .header {
    height: 70px;
    padding-top: 10px;
    padding-left: 40px;
    background: #FC2422;
    vertical-align: middle;
    img {
      height: 60px;
      // margin-top: 10px;
      display: inline-block
    }
    span{
        color: #fff;
        font-size: 30px;
        font-weight: 400;
        display: inline-block;
        line-height: 60px;
        vertical-align: top;
        height: 60px;
        letter-spacing: 10px;
        text-shadow: 0 2px 4px #CC0000;
        margin-left: 20px;
    }
  }
  .section {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    display: flex;
    .nav {
      width: 200px;
      height: 100%;
      background:  rgb(238, 241, 246);
      overflow-y: auto;
    }
    .content {
      height: 100%;
      background: #fff;
      overflow-y: auto;
    }
  }
}
</style>
