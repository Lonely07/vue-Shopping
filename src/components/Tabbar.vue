<!-- 底部组件 -->
<template>
  <div>
    <van-tabbar v-model="active">
        <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/Topic" icon="label-o">专题</van-tabbar-item>
        <van-tabbar-item to="/Category" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item to="/Car" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item to="/User" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {
      active:{
          get(){
              return this.$route.meta.activeNum
          },
          set(){}
          
      }
  },


  methods: {}
}

</script>
<style lang='less' scoped>
</style>