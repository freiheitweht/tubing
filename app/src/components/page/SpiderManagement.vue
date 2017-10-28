<template>
  <div>
    <div class="form-title">
      <p>爬虫审核管理</p>
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
          <el-form-item>
            <el-button type="primary" @click="addSpiderAccount">增加爬虫账号</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8" style="text-align:right;">
        <el-form :inline="true" style="padding-right:20px;">
          <el-form-item>
            <el-select v-model="spiderStatus" placeholder="请选择" @change="spiderStatusChange">
              <el-option v-for="item in spiderStatusOtions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="兴趣点id" width="180">
      </el-table-column>
      <el-table-column prop="username" label="源平台账号" width="180">
      </el-table-column>
      <el-table-column prop="remark" label="备注">
        <template slot-scope="scope">
          <div v-if="scope.row.remark" @click="()=>postRemake(scope.row)" style="cursor: pointer;">
            {{scope.row.remark}}
          </div>
          <div v-else>
            <el-button type="text" @click="()=>postRemake(scope.row)">修改备注</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="from" label="来源平台">
      </el-table-column>
      <el-table-column prop="inBlacklist" label="黑名单">
        <template slot-scope="scope">
               {{scope.row.inBlacklist == "Y"?"是":"否"}}
</template>
      </el-table-column>
      <el-table-column prop="totalSize" label="源信息数">
      </el-table-column>
      <el-table-column prop="completeCount" label="已爬多少">
      </el-table-column>
      <el-table-column prop="produceTime" label="拉黑" width="200">
<template slot-scope="scope">
  <p>
    <el-button type="text" size="mini" v-if="scope.row.inBlacklist=='N'" @click="()=>addInstagramBlackList(scope.row)">拉黑</el-button>
    <el-button type="text" size="mini" v-if="scope.row.inBlacklist=='Y'" @click="()=>cancelInstagramBlackList(scope.row)">取消</el-button>
    <!-- <el-button type="text" size="mini" @click="setAccountNormal(scope.row)">正常账户</el-button>
    <el-button type="text" size="mini" @click="setAccountBig(scope.row)">种子账户</el-button> -->
  </p>
</template>
      </el-table-column>
  </el-table>
  <div style="margin:20px;" v-if="pageInfo.total">
    <el-pagination layout="prev, pager, next" :total="pageInfo.total" :page-size="pageInfo.size" @current-change="handelPageChange" style="text-align: right;">
    </el-pagination>
  </div>
  <el-dialog title="填写备注" :visible.sync="dialog">
    <el-input v-model="remarkName" placeholder="输入备注"></el-input>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogCancel">取 消</el-button>
      <el-button type="primary" @click="dialogSure">确定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
  import api from "@/api";
  export default {
    data() {
      return {
        accountId:"",
        remarkName : "",
        dialog:false,
        accountKey:"",
        list: [],
        spiderStatus: "",
        spiderStatusOtions: [{
          value: "all",
          label: "全部"
        }, {
          value: "normal",
          label: "正常"
        }, {
          value: "blacklist",
          label: "黑名单"
        },{
          value:"seed",
          label:"种子用户"
        },{
          value:"ordinary",
          label:"普通用户"
        }],
        pageInfo: {
          total: 0,
          page: 1,
          size: 50
        }
      }
    },
    mounted() {
      this.queryList();
    },
    methods: {
      queryList() {
        api.accountList({
          key: this.accountKey,
          filter: this.spiderStatus,
          page: this.pageInfo.page - 1,
          size: this.pageInfo.size
        }).then(e => {
          if (e.data.success) {
            let data = e.data.data;
            this.list = data.content;
            this.pageInfo.total = data.totalElements;
          } else {
            this.$message.error("查询失败");
          }
        })
      },
      spiderStatusChange() {
        this.queryList();
      },
      postRemake(row){
        this.dialog = true;
        console.log(row)
        this.remarkName = row.remark || "";
        this.accountId = row.id;     
      },
      handelPageChange(num) {
        this.pageInfo.page = num;
        this.queryList();
      },
      addInstagramBlackList(row){
        api.addInstagramBlackList({
          accountId:row.id
        }).then(e=>{
          if(e.data.success){
            this.$message.success("拉黑成功")
            this.queryList();
          }else{
            this.$message.error("操作失败")
          }
        })
      },
      dialogSure(){
        
        api.addRemarkName({
          remarkName:this.remarkName,
          accountId:this.accountId
        }).then(e=>{
          if(e.data.success){
            this.queryList();
            this.dialog = false;
            this.$message.success("操作成功")
          }else{
            this.dialog = false;
             this.$message.success("操作失败")
          }
        }).catch(e=>{
          this.dialog = true;
        })
      },
      dialogCancel(){
        this.dialog = false;
      },
      // setAccountNormal(){
      //   this.$message.error("API文档里找不到相关的接口")
      // },
      // setAccountBig(){
      //   this.$message.error("API文档里找不到相关的接口")
      // },
      addSpiderAccount(){
        this.$router.push({
          name:"addSpiderAccount"
        })
      },
      cancelInstagramBlackList(row){
        api.cancelInstagramBlackList({
          accountId:row.id
        }).then(e=>{
          if(e.data.success){
            this.$message.success("取消拉黑成功")
            this.queryList();
          }else{
            this.$message.error("操作失败")
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
