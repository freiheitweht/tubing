<template>
<div>
  <div class="form-title">
    <p>举报管理</p>
  </div>
  <el-row>
    <el-col :span="16">
      <el-form :inline="true" style="padding-left:20px;">
        <el-form-item>
          <el-input placeholder="源平台账号" v-model="accountKey"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryList">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8" style="text-align:right;">
      <el-form :inline="true" style="padding-right:20px;">
        <el-form-item>
          <el-select v-model="mediaStatus" placeholder="请选择" @change="mediaStatusChange">
            <el-option v-for="item in mediaStatusotions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
  <div style="padding:20px;">

  <el-table :data="list" style="width: 100%;">
    <el-table-column prop="id" label="内容id" width="90">
    </el-table-column>
    <el-table-column prop="account.username" label="源平台账号">
    </el-table-column>
     <el-table-column label="图片" width="180">
        <template slot-scope="scope" >
          <el-popover
              v-if="scope.row.images"
              placement="right-start"
              width="300"
              trigger="hover">
              <div>
                <img :src="scope.row.images &&  scope.row.images[0].url" width="100%;" alt="">
              </div>
              <div class="img-box" slot="reference">
                  <img :src="scope.row.images && scope.row.images[0].url" alt="" width="100%" height="100%">
              </div>  
            </el-popover>
            <div class="video-box" slot="reference" v-if="scope.row.videos">
                  <img :src="scope.row.videos[0].standardResolution.videoConver.imageUrl" alt="" width="100%" height="100%">
                  <div class="vide-btn-box" @click="()=>openVideo(scope.row.videos[0].standardResolution.videoUrl)"> 
                    <div class="vide-btn">
                      <i class="el-icon-caret-right" style="color:#fff;"></i>
                    </div>
                  </div>
              </div>  
        </template>
    </el-table-column>
    <el-table-column label="源平台内容" width="150">
<template slot-scope="scope">
  <el-popover placement="top-start" width="400" trigger="hover">
    <div>
      {{scope.row.caption}}
    </div>
    <div class="text-overflow" slot="reference">
      {{scope.row.caption}}
    </div>
  </el-popover>
</template>
    </el-table-column>
    <el-table-column label="翻译内容" width="150">
<template slot-scope="scope">
  <el-popover placement="top-start" width="400" trigger="hover">
    <div>
      {{scope.row.captionCooked}}
    </div>
    <div class="text-overflow" slot="reference">
      {{scope.row.captionCooked}}
    </div>
  </el-popover>
</template>
    </el-table-column>
      <el-table-column prop="mediaStatus" label="内容状态">
      </el-table-column>
      <el-table-column prop="from" label="来源平台">
      </el-table-column>
      <el-table-column prop="produceTime" label="发布时间" width="180">
      </el-table-column>
      <el-table-column prop="tipOffCount" label="举报人数">
      </el-table-column>
      <el-table-column prop="reporter" label="举报人">
      </el-table-column>
      <el-table-column label="操作">
<template slot-scope="scope">
<p>
  <el-button type="text" size="mini" @click="()=>cancelBlackList(scope.row)" v-if="scope.row.isInBlacklist">解除</el-button>
  <el-button type="text" size="mini" @click="()=>addBlackList(scope.row)" v-if="!scope.row.isInBlacklist">加入</el-button>
</p>
</template>
    </el-table-column>
  </el-table>
  </div>
  <div style="margin:20px;" v-if="pageInfo.total">
    <el-pagination layout="sizes,prev, pager, next,jumper" :current-page="pageInfo.page" @size-change="handleSizeChange" :page-sizes="[10, 20, 30, 40,50]" :total="pageInfo.total" :page-size="pageInfo.size" @current-change="handelPageChange" style="text-align: right;">
    </el-pagination>
  </div>
  <el-dialog title="视频展示" width="30%" :visible.sync="videoDialog" :before-close="handleClose" >
        <video style="margin:0 auto;display:block" :src="videoUrl" v-if="videoUrl" height="400px" controls="controls">your browser does not support the video tag</video>
  </el-dialog>
</div>
</template>

<script>
import api from "@/api";
export default {
  data() {
    return {
      videoDialog:false,
      videoUrl : "",
      accountKey: "",
      mediaStatus: "cookedMeat",
      list: [],
      // 生肉：rawMeat;翻译中：translating;审核中：reviewing;熟肉：cookedMeat; 被拉黑：forbidden;审核未通过：reviewFail
      mediaStatusotions: [{
        value: "rawMeat",
        label: "生肉"
      }, {
        value: "translating",
        label: "翻译中"
      }, {
        value: "reviewing",
        label: "审核中"
      }, {
        value: "cookedMeat",
        label: "熟肉"
      }, {
        value: "forbidden",
        label: "被拉黑"
      }, {
        value: "reviewFail",
        label: "审核未通过"
      }],
      pageInfo: {
        total: 0,
        page: 1,
        size: 50
      }
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    handleSizeChange(num){
         this.pageInfo.size = num;
         this.pageInfo.page = 1;
         this.queryList();
      },
    mediaStatusChange(key) {
      this.queryList();
    },
    queryList() {
      api
        .queryMediaList({
          accountKey: this.accountKey,
          mediaStatus: this.mediaStatus,
          page: this.pageInfo.page - 1,
          size: this.pageInfo.size
        })
        .then(e => {
          if (e.data.success) {
            let data = e.data.data;
            this.list = data.content;
            this.pageInfo.total = data.totalElements;
          } else {
            this.$message.error("查询失败");
          }
        });
    },
    handelPageChange(num) {
      this.pageInfo.page = num;
      this.queryList();
    },
    addBlackList(row) {
      api.addBlackList({
        mediaId: row.id
      }).then(e => {
        if (e.data.success) {
          this.$message.success("加入成功");
          this.queryList();
        } else {
          this.$message.error("操作失败");
        }
      })
    },
    openVideo(src){
      this.videoUrl = src;
      this.videoDialog = true;
    },
    handleClose(){
       this.videoDialog = false;
      this.videoUrl = "";
    },
    cancelBlackList(row) {
      console.log(row)
      api.cancelBlackList({
        mediaId: row.id
      }).then(e => {
        if (e.data.success) {
          this.$message.success("解除成功");
          this.queryList();
        } else {
          this.$message.error("操作失败");
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .img-box,.video-box{
    position: relative;
    overflow: hidden;
    width: 100px;
    height: 100px;
    margin: 10px;
  }
  .vide-btn-box{
    display: block;
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    .vide-btn{
      text-indent: 6px;
      font-size: 20px;
      line-height: 40px;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      background-color: rgba(0,0,0,0.7);

      margin: 30px;
    }
  }
  .text-overflow{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
