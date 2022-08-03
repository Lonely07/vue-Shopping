
<template>
  <div>
    <van-tabs @change="changeFn" v-model="active">
        <van-tab v-for="item in brotherCategory" :key="item.id" :title="item.name" :name="item.id+''">
            <div class="title">
                <h4>{{item.name}}</h4>
                <p>{{item.front_desc}}</p>
            </div>
            <Project :goodsList="getProjectDatas"  @click="goto('/ProjectDatas?id='+item.id)"/>
        </van-tab>
    </van-tabs>
    
   </div>
</template> 

 <script>
import Project from '@/components/Project'
import {ChannelDatas,getProjectData} from '@/api/home'
export default {
  data () {
    return {
        active:'',
        // 标签数据
        brotherCategory:[],
        // 分类商品详情数据
        getProjectDatas:{}
    };
  },
  
  created(){
    this.active = this.$route.query.id

    this.getCategoryData();  //获取所有分类数据
    this.getCategoryListData();  //获取当前类别对应的产品数组
    // console.log(this.$route.query.id)
    //   ChannelDatas({
    //       id:this.$route.query.id
    //   }).then(res=>{
    //       console.log(res);
    //       this.brotherCategory=res.data.brotherCategory;
    //   })

    //   getProjectData({
    //       categoryId:this.$route.query.id,
    //        page:1,
    //       size:20,
    //   }).then(res=>{
    //       this.getProjectDatas=res.data.data
    //   })
  },
  mounted(){
  },
  components: {
      Project
  },

  computed: {},

  methods: {
    getCategoryData(){
         ChannelDatas({
          id:this.active
      }).then(res=>{
          this.brotherCategory=res.data.brotherCategory;
      })
    },
    getCategoryListData(){
        getProjectData({
          categoryId:this.active,
          page:1,
          size:20,
      }).then(res=>{
          this.getProjectDatas=res.data.data
      })
    },
    goto(url) {
		  this.$router.push(url)
	  },
    //   切换分类
    changeFn(title, name) {
      // title 下标
      // name: 分类标题
      this.brotherCategory.forEach((item) => {
        if (item.name == name) {
          this.$route.query.idve = item.id;
        }
      });
      this.getCategoryListData();
      this.getCategoryData();
    },
  }
}
</script>

<style lang='less' scoped>
.title{
    h4{
        text-align: center;
        font-size: 20px;
        margin: .15rem;
    }
    p{
        text-align: center;
        font-size: 15px;
        margin: .15rem;
        color:#666666;

    }
}
</style>


