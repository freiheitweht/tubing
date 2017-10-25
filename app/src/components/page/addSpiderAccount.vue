<template>
<div>
    <el-upload class="upload-demo" drag action="http://115.28.153.35:9089/instagram/account/insert/excel" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div style="width:300px;">
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
</div>
</template>

<script>
import api from "@/api";
export default {
    data() {
        return {
            form: {
                accounts: "",
                accountType: 0
            }
        };
    },
    methods: {
        submitForm() {
           if(this.form.accounts){
               api.insertLittleInstagramAccount({...this.form}).then(e=>{
                   if(e.data.success && e.data.data){
                       this.$message.success("创建成功")
                   }else{
                        this.$message.error("创建失败")
                   }
               })
           }else{
               this.$message.error("账户信息请填写完整")
           }
        },
        
    }
};
</script>

<style lang="less" scoped>

</style>
