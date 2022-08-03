<template>
  <div>
      <!-- 单个商品页面组件 -->
      <ul>
          <li v-for="item in goodsList" :key="item.id" @click="toProjectDatas(item.id)">
              <img :src="item.list_pic_url" style="display:block;" width="100%" alt="">
              <div class="van-ellipsis">{{item.name}}</div>
              <div class="price">{{item.retail_price|RMBformat}}</div>
          </li> 
      </ul>
  </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    // 父传子数据
    props:["goodsList"],
    methods:{
        toProjectDatas(id){
            this.$router.push("/ProjectDatas?id="+id);
             setTimeout(()=>{
                this.$router.go(0);
            },10)
        }
    }
}
</script>

<style lang="less" scoped>
ul{ 
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width: 50%;
        background-color: #fff;
        text-align: center;
        line-height: .3rem;
        .price{
            color: darkred;
        }
    }
}
</style>

