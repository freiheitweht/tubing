<template>
<div>
    <div class="form-title">
        <p>兴趣组管理</p>
    </div>
    <el-row>
        <el-col :span="16">
            <el-form :inline="true" style="padding-left:20px;">
                <el-form-item>
                    <el-input placeholder="兴趣组名称" v-model="key"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="queryList">搜索</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="8" style="text-align:right;">
            <el-form :inline="true" style="padding-right:20px;">
                <el-button type="primary" @click="addInterstGroup">增加兴趣组</el-button>
            </el-form>
        </el-col>
    </el-row>
    <div style="padding:20px;">
    <el-table :data="list" style="width: 100%">
        <el-table-column prop="groupName" label="兴趣组名称">
            <template slot-scope="scope">
                <a href="javascript:void(0);" @click="()=>editInterestGroup(scope.row)">{{scope.row.groupName}}</a>
            </template>
        </el-table-column>
        <el-table-column prop="memberCount" label="兴趣点数量">
        </el-table-column>
        <el-table-column prop="fansCount" label="关注数">
        </el-table-column>
        <el-table-column prop="inBlacklist" label="上/下架" width="100">
            <template slot-scope="scope">
                <p>
                    <el-button type="text" size="mini" v-if="scope.row.groupStatus=='1'" @click="()=>changeGroupStatus(scope.row)" style="color:blue;">上架</el-button>
                    <el-button type="text" size="mini" v-if="scope.row.groupStatus=='0'" @click="()=>changeGroupStatus(scope.row)" >下架</el-button>
                </p>
            </template>   
        </el-table-column>
  </el-table>
  </div>
  <div style="margin:20px;" v-if="pageInfo.total">
    <el-pagination layout="sizes,prev, pager, next,jumper" :current-page="pageInfo.page" @size-change="handleSizeChange"  :page-sizes="[10, 20, 30, 40,50]" :total="pageInfo.total" :page-size="pageInfo.size" @current-change="handelPageChange" style="text-align: right;">
    </el-pagination>
  </div>
</div>
</template>

<script>
import api from "@/api";
export default {
    data() {
        return {
            list: [],
            key: "",
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
        handleSizeChange(num){
         this.pageInfo.size = num;
         this.pageInfo.page = 1;
         this.queryList();
      },
        queryList() {
            api.interestList({
                key: this.key,
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
        handelPageChange(num) {
            this.pageInfo.page = num;
            this.queryList();
        },
        changeGroupStatus(row){
            api.dealInterestGroup({
                groupId:row.id,
                action: row.groupStatus == 1 ? "show": "hide"
            }).then(e=>{
                if (e.data.success) {
                    this.$message.success('操作成功')
                    this.queryList();
                }else{
                    this.$message.error("操作失败");
                }
            })
        },
        addInterstGroup(){
            this.$router.push({name:"AddInterstGroup"})
        },
        editInterestGroup(row){
             this.$router.push({name:"editInterestGroup",query:{id:row.id}})
        }
        
    }
}
</script>

<style lang="less" scoped>

</style>
