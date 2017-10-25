<template>
<div>
  <div class="form-title">
    <p>内容管理</p>
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
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="id" label="内容id" width="180">
    </el-table-column>
    <el-table-column prop="account.username" label="源平台账号" width="180">
    </el-table-column>
    <el-table-column prop="caption" label="源平台内容">
    </el-table-column>
    <el-table-column prop="captionCooked" label="翻译内容">
    </el-table-column>
    <el-table-column prop="mediaStatus" label="内容状态">
    </el-table-column>
    <el-table-column prop="from" label="来源平台">
    </el-table-column>
    <el-table-column prop="produceTime" label="发布时间">
    </el-table-column>
    <el-table-column label="操作" width="200">
      <template scope="scope">
          <p>
            <el-button type="text" size="mini" @click="topMedia(scope.row)" v-if="!scope.row.isSticky">置顶</el-button>
            <el-button type="text" size="mini" @click="cancelMedia(scope.row)" v-if="scope.row.isSticky">取消置顶</el-button>
             <el-button type="text" size="mini" @click="beBlank(scope.row)" v-if="!scope.row.isBlankList">拉黑</el-button>
            <el-button type="text" size="mini" @click="notBlank(scope.row)" v-if="scope.row.isBlankList">取消拉黑</el-button>
            <el-button type="text" size="mini" @click="removeBtnClick(scope.row)">删除</el-button>
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
      accountKey: "",
      mediaStatus: "",
      list: [],
      // 生肉：rawMeat;翻译中：translating;审核中：reviewing;熟肉：cookedMeat; 被拉黑：forbidden;审核未通过：reviewFail
      mediaStatusotions: [
        {
          value: "rawMeat",
          label: "生肉"
        },
        {
          value: "translating",
          label: "翻译中"
        },
        {
          value: "reviewing",
          label: "审核中"
        },
        {
          value: "cookedMeat",
          label: "熟肉"
        },
        {
          value: "forbidden",
          label: "被拉黑"
        },
        {
          value: "reviewFail",
          label: "审核未通过"
        }
      ],
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
    topMedia(row) {
      api
        .topMedia({
          mediaId: row.id
        })
        .then(e => {
          if (e.data.success) {
            this.$message.success("置顶成功");
            this.queryList();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    cancelMedia(row) {
      api
        .cancelMedia({
          mediaId: row.id
        })
        .then(e => {
          if (e.data.success) {
            this.$message.success("取消成功");
            this.queryList();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    removeBtnClick(row) {
      this.$confirm("删除操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteMedia({
              mediaId: row.id
            })
            .then(e => {
              if (e.data.success) {
                this.$message.success("删除成功");
                this.queryList();
              } else {
                this.$message.error("操作失败");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    beBlank(row) {
      api
        .addBlackList({
          mediaId: row.id
        })
        .then(e => {
          if (e.data.success) {
            this.$message.success("加入成功");
            this.queryList();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    notBlank(row) {
      console.log(row);
      api
        .cancelBlackList({
          mediaId: row.id
        })
        .then(e => {
          if (e.data.success) {
            this.$message.success("解除成功");
            this.queryList();
          } else {
            this.$message.error("操作失败");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>

</style>
