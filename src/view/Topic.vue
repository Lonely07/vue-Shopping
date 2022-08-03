<!--  -->
<template>
  <div class="zhuanti">
    <!-- 专题数据显示 -->
    <div class="box" v-for="item in TopicListDatas" :key="item.id">
      <img :src="item.scene_pic_url" alt="" />
      <div class="title">{{ item.title }}</div>
      <div class="tip">{{ item.subtitle }}</div>
      <div class="price">{{ item.price_info | RMBformat }}</div>
    </div>
    <!-- 分页显示 -->
    <van-pagination v-model="currentPage" :page-count="totalPages"  mode="simple"  @change="ChangeFn"/>
  </div>  
</template>

<script>
import {TopicListDatas} from '@/api/home'
export default {
  data () {
    return {
      // 专题数据
      TopicListDatas:[],
      // 总页数
      totalPages:'',
      // 当前页数
      currentPage:1
    };
  },

  created(){
   this.getPage();
  },
  components: {},

  computed: {},

  methods: {
    getPage(){
      TopicListDatas({
      page:this.currentPage,
      size:10
    }).then(res=>{
      this.TopicListDatas=res.data.data
      this.totalPages=res.data.totalPages
      this.currentPage=res.data.currentPage
    })
    },
    ChangeFn(){
      this.getPage();
    }
  }
}

</script>
<style lang='less' scoped>
.zhuanti {
  padding-bottom: 100px;
  box-sizing: border-box;
  .box {
    width: 100%;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    background-color: white;
    img {
      width: 100%;
    }
    .title {
      font-size: 18px;
    }
    .price {
      color: red;
    }
  }
}
</style>