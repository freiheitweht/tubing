<template>
  <div>
    <div class="form-title">
      <p>爬虫审核管理</p>
    </div>
    <el-row>
      <el-col :span="16">
        <el-form :inline="true" style="padding-left:20px;">
          <el-form-item>
            <el-input placeholder="源平台账号/兴趣点ID" v-model="accountKey"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryList">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">增加爬虫账号</el-button>
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
      </el-table-column>
      <el-table-column prop="from" label="来源平台">
      </el-table-column>
      <el-table-column prop="inBlacklist" label="黑名单">
        <template scope="scope">
               {{scope.row.inBlacklist == "Y"?"是":"否"}}
</template>
      </el-table-column>
      <el-table-column prop="totalSize" label="源信息数">
      </el-table-column>
      <el-table-column prop="completeCount" label="已爬多少">
      </el-table-column>
      <el-table-column prop="produceTime" label="拉黑">
<template scope="scope">
  <p>
    <el-button type="text" size="mini" v-if="scope.row.inBlacklist=='N'" @click="()=>addInstagramBlackList(scope.row)">拉黑</el-button>
    <el-button type="text" size="mini" v-if="scope.row.inBlacklist=='Y'" @click="()=>cancelInstagramBlackList(scope.row)">取消</el-button>
  </p>
</template>
      </el-table-column>
  </el-table>
  <div style="margin:20px;" v-if="pageInfo.total">
    <el-pagination layout="prev, pager, next" :total="pageInfo.total" :page-size="pageInfo.size" @current-change="handelPageChange" style="text-align: right;">
    </el-pagination>
  </div>
</div>
</template>

<script>
  import api from "@/api";
  export default {
    data() {
      return {
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
        }],
        pageInfo: {
          total: 0,
          page: 1,
          size: 10
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
            this.pageInfo.total = data.totalPages;
          } else {
            this.$message.error("查询失败");
          }
        })
      },
      spiderStatusChange() {
        this.queryList();
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
