<template>
<div>
   
        <el-popover
            placement="top-start"
            width="200"
            trigger="hover">
            <img :src="imgUrl" alt="">
            <i style="margin-right: 10px;" class="el-icon-picture" slot="reference"></i>
        </el-popover>
 
</div>
</template>
<script>
    export default {
        data(){
         return {
             imgUrl : "http://pic49.nipic.com/file/20140927/19617624_230415502002_2.jpg"
            //  imagesUrl:["http://pic49.nipic.com/file/20140927/19617624_230415502002_2.jpg","http://pic49.nipic.com/file/20140927/19617624_230415502002_2.jpg"]
             
         }
        }
    }
</script>
