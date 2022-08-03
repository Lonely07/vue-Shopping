<!-- 分类页 -->
<template>
  <div class="category-box">
    <!-- 搜索框 -->
    <van-search  shape="round" disabled placeholder="请输入搜索关键词" @click="$router.push('/home/seachpopu')"/>

    <div class="fenlei">
      <!-- 左侧导航 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          :title="item.name"
          v-for="item in categoryList"
          :key="item.id"
        />
      </van-sidebar>

      <!-- 右侧主体 -->
      <main>
        <!-- 上方图片 -->
        <div class="pic-area">
          <img :src="currentCategory.banner_url" alt="" />
          <p class="desc">{{ currentCategory.front_desc }}</p>
        </div>

        <!-- 标题 -->
        <div class="mytitle">
          <span></span>
          <h3>{{ currentCategory.name }}</h3>
        </div>

        <!-- 图文混排 -->
        <van-grid :column-num="3" >
          <van-grid-item
            v-for="item in subCategoryList"
            :key="item.id"
            :icon="item.wap_banner_url"
            :text="item.name"
          />
        </van-grid>
      </main>
    </div>
  </div>
</template>

<script>
import { GetChannelDataApi, GetFenleiDataApi } from "@/api/home";

export default {
  data() {
    return {
      activeKey: 0,
      value: "",
      categoryList: [], //导航数据
      currentCategory: {}, //选中的类别数据,
      currentId: "0",  
      subCategoryList:[]  //子类数组
    };
  },
  methods: {
    // 左侧导航被点击（index为选中的类别的索引值），更换类别
    onChange(index) {
      this.activeKey = index;
      this.currentCategory =this.categoryList[this.activeKey]  
      this.currentId = this.categoryList[this.activeKey].id;  //选中的类别的id
      // 获取当前分类数据
      this.GetCurrentCategory()
    },

    // 获取全部分类数据
    GetcategoryList() {
      GetChannelDataApi().then((res) => {
        // console.log("res1", res);
        this.categoryList = res.data.categoryList;  //左侧导航数据

        //选中的类别的id，默认第一个类别被选中
        this.currentId = this.categoryList[0].id;  
        // 当前显示的类别数据，图片和标题使用
        this.currentCategory = res.data.currentCategory;  

        //当前显示的类别数据 图文混排区域使用
        this.subCategoryList = res.data.currentCategory.subCategoryList;  
      });
    },

    // 获取当前分类数据
    GetCurrentCategory() {
      GetFenleiDataApi({ id: this.currentId }).then((res) => {
        // console.log("res12", res);
        // 当前显示的类别数据，图片和标题使用
        this.currentCategory = res.data.currentCategory;  

        //当前显示的类别数据 图文混排区域使用
        this.subCategoryList = res.data.currentCategory.subCategoryList;
      });
    },
  },
  
  created() {
    this.GetcategoryList();  // 获取全部分类数据
  }
};
</script>
<style scoped lang="less">
/* @import url(); 引入css类 */
.fenlei {
  display: flex;
  main {
    flex: 1;

    .pic-area {
      text-align: center;
      position: relative;
      height: 100px;
      font-size: 15px;
      img {
        width: 98%;
        border-radius: 5px;
        display: block;
      }
      .desc {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .mytitle {
      text-align: center;
      font-size: 16px;
      margin-top: 20px;
      position: relative;
      height: 50px;
      span {
        width: 50%;
        height: 2px;
        background-color: #ccc;
        display: inline-block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      h3 {
        width: 30%;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
   
  }
}
</style>
