<template>
  <div>
      <!-- 搜索实时文本数据展示 -->
     <van-list
        :finished="finished"
        finished-text="没有更多了"
        >
        <van-cell @click="seachlistChang(item)" v-for="(item,index) in SeachListData" :key="index" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
    data(){
        return{
            loading: false,
            finished: true,
        }
    },
    props:["SeachListData"],
    methods:{
        seachlistChang(val){
            this.$emit("seachlistChang",val)
        }
    }
}
</script>

<style lang="less" scoped>

</style>

