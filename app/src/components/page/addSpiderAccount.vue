<template>
<div style="padding:20px;">
    <el-tabs v-model="tabName" type="card">
        <el-tab-pane label="少量添加" name="first">
            <div style="width:300px;margin-top:20px;">
                <el-form v-model="form" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="爬虫账户">
                        <el-input type="age" v-model="form.accounts" auto-complete="off" placeholder="多个账户用@分割"></el-input>
                    </el-form-item>
                    <el-form-item label="账户类型">
                        <el-radio class="radio" v-model="form.accountType" :label="0">普通账户</el-radio>
                        <el-radio class="radio" v-model="form.accountType" :label="1">种子账户</el-radio>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="()=>submitForm()">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
        <el-tab-pane label="批量导入" name="second">
            <div>
                <h2 style="padding:20px 0;">爬虫账户EXCLE 文件上传</h2>
                <el-upload class="upload-demo" 
                    drag 
                    action="http://115.28.153.35:9089/heimdall/instagram/account/insert/excel"
                    :on-success="successUpload"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>

                <a href="http://res.xiongdihuzhu.com/res/api/add_spider_account_templete.xlsx">EXCLE 的模板文件下载链接</a>
            </div>
        </el-tab-pane>
    </el-tabs>

</div>
</template>

<script>
import api from "@/api";
export default {
    data() {
        return {
            tabName: 'first',
            form: {
                accounts: "",
                accountType: 0
            }
        };
    },
    methods: {
        successUpload(response){
            if (response.success) {
                this.$message.success("上传成功");
            } else {
                this.$message.error("上传失败:"+response.message);
            }
        },
        submitForm() {
            if (this.form.accounts) {
                api.insertLittleInstagramAccount({ ...this.form
                }).then(e => {
                    if (e.data.success && e.data.data) {
                        this.$message.success("创建成功")
                    } else {
                        this.$message.error("创建失败")
                    }
                })
            } else {
                this.$message.error("账户信息请填写完整")
            }
        },

    }
};
</script>

<style lang="less" scoped>

</style>
