<template>
    <div class="seachpopu">
        <!-- 搜索框 -->
        <van-search
            v-model="value"
            show-action
            :placeholder="Searchtext"
            @search="onSearch"
            @cancel="onCancel"
            @input="oninput"
        />
        <!-- 热门搜索以及历史记录模板 -->
        <HistoryHot v-if="displaynum==1" :historyList="historyList" :hotList="hotList" @tagChange="tagChange"/>
        <!-- 搜索实时显示文本数据 -->
        <SeachList v-else-if="displaynum==2" :SeachListData="SeachListData" @seachlistChang="tagChange"/>
        <SeachProject v-else :goodsList="goodsList" :filterCategory="filterCategory" @categoryChange="categoryChange" @pricesChange="pricesChange"/>
    </div>
</template>

<script>
import HistoryHot from "@/components/HistoryHot"
import SeachList from "@/components/SeachList"
import SeachProject from "@/components/SeachProject"
import {getSeachData,getSeachList,getProjectData} from '@/api/home'
export default {
    data(){
        return{
            value:'',
            //搜索框显示数据
            Searchtext:'',
            //判断弹出框
            displaynum:1,
            //历史记录数据
            historyList:[],
            //热门搜索记录
            hotList:[],
            //搜索文本显示
            SeachListData:[],
            //分类数据
            filterCategory:[],
            //商品详情数据
            goodsList:[],
            //价格排序
            order:'desc',
            //分类id
            categoryId:0,
            //搜索方式 是id 还是prices
            sort:'id'
        }
    },
    created(){
        //获取热门搜索以及历史记录数据
         getSeachData().then(res=>{
           console.log(res);
                //搜索框数据显示
                this.Searchtext=res.data.defaultKeyword.keyword;
                //历史记录数据
                this.historyList=res.data.historyKeywordList;
                //热门搜索数据
                this.hotList=res.data.hotKeywordList;
            }).catch(err=>{

            })
    },
   methods: {
    //点击历史搜索和热门搜索跳转页面
    tagChange(val){
      this.value=val;
        this.onSearch(val)
    },
    //点击价格选项
    pricesChange(value){
        this.order=value;
        this.sort="price";
        this.onSearch(this.value)
    }, 
    //点击分类  
    categoryChange(value){
        //改id
        this.categoryId=value;
        //发送搜索商品的请求
        this.onSearch(this.value)
    },   
    onSearch(val) {
      this.displaynum=3;
      //获取商品分类数据
      getProjectData({
          keyword:val,
          page:1,
          size:20,
          order:this.order,
          categoryId:this.categoryId,
          sort:this.sort
          }).then(res=>{
          let {filterCategory,goodsList} =res.data;
        //   this.filterCategory =res.data.filterCategory;
          this.goodsList =goodsList;
        //   转换数据
          let newList =JSON.parse(JSON.stringify(filterCategory).replace(/name/g,'text').replace(/id/g,'value'));
          this.filterCategory=newList;
      }).catch(error=>{

      })
    },
    onCancel() {
        //点击取消返回上一级
      this.$router.go(-1);
    },
    //输入框内容变化时触发
    oninput(val){
        this.displaynum=2;
        //发送请求：获取搜索实时提示文本列表数据
        getSeachList({keyword:val}).then(res=>{
            this.SeachListData=res.data;
        }).catch(err=>{

        })
    }

  },
//   子组件
  components:{
    //   搜索页面
      HistoryHot,
    //   搜索实时文本数据展示
      SeachList,
    //   搜索商品详情
      SeachProject
  }
}
</script>

<style scoped>
.seachpopu{
    width: 100%;
    height: 100%;
    top: 0;
    position:absolute;
    background-color: #efefef;
}
</style>