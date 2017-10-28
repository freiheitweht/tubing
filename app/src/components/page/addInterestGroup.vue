<template>
    <div style="padding:20px;">
        <h2>兴趣组EXCLE 文件上传</h2>
        
        <el-upload class="upload-demo" 
            drag 
            action="http://115.28.153.35:9089/heimdall/interest/upload/group"
            :on-success="successUpload"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>

        <a href="http://res.xiongdihuzhu.com/res/api/add_group_templete.xlsx">EXCLE 的模板文件下载链接</a>
    </div>
</template>
<script>
    export default {
        methods:{
            successUpload(response){
                console.log(response)
                if (response.success) {
                    this.$message.success("上传成功");
                } else {
                    this.$message.error("上传失败:"+response.message);
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    h2{
        margin-bottom: 20px;
    }
</style>
