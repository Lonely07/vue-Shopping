<!--  -->
<template>
  <div>
    <!-- 商品图片轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item,index ) in gallery" :key="index">
          <img :src="item.img_url" width="100%" alt="" style="dispaly:block;">
      </van-swipe-item>
    </van-swipe>
    <!-- Tips组件 -->
    <Tips/>
    <!-- 商品介绍 -->
    <div class="info">
      <div class="name">{{info.name}}</div>
      <div class="goods_brief">{{info.goods_brief}}</div>
      <div class="retail_price">{{info.retail_price|RMBformat}}</div>
    </div>
    <!-- 商品展示详情页 -->
   <van-cell title="展示弹出层" is-link @click="isSkuShow=true"/>
    <!-- 商品参数 -->
    <div class="attribute"> 
      <h3>商品参数</h3>
      <ul>
        <li v-for="(item,index) in attribute" :key="index">
          <div class="l">{{item.name}}</div>
          <div class="r">{{item.value}}</div>
        </li>
      </ul>
    </div>
    <!-- 商品信息图片 -->
    <div class="goods_desc" v-html="info.goods_desc"></div>
    <!-- 商品问题 -->
    <div class="title0">
      <span>常见问题</span>
    </div>
    <ul class="issue">
      <li v-for="item in issue" :key="item.id">
        <h3>{{item.question}}</h3>
          <p>{{item.answer}}</p>
      </li>
    </ul>
    <!-- 相关产品 -->
    <div class="title0">
        <span>相关产品</span>
    </div>
    <Project :goodsList="goodsList"/>
    <!-- 商品弹出层 -->
     <van-sku
            ref="sku"
            v-model="isSkuShow"
            :sku="sku"
            :goods="goods"
            :hide-stock="sku.hide_stock"
        />
    <AppGoodAction @addToCart="addToCart"  :goodsCount="goodsCount"/>
  </div>
</template>

<script>
import {ProjectDatas,RelatedDatas,GoodscountDatas,AddProductToCart} from '@/api/home'
import Tips from '@/components/Tips'
import Project from '@/components/Project'
import AppGoodAction from '@/components/AppGoodAction'
export default {
  data () {
    return {
        // sku相关数据：
            isSkuShow:false,
            sku:{
                tree:[],
                hide_stock:false,
                price: '0', 
                stock_num: 0,
            },
            goods:{
                picture: ""
            },
      // 弹出层判断
      show: false,
      // 轮播图
      gallery:[],
      // 商品详情数据
      info:{},
      // 商品参数
      attribute:[],
      // 商品信息(大量图片信息)
      goods_desc:"",
      // 商品问题数据
      issue:[],
      // 相关产品数据
      goodsList:[],
      //购物车产品数量
      goodsCount:0,
      // productList数据
      productList:[]
    };
  },
  created(){
      ProjectDatas({
           id:this.$route.query.id
      }
      ).then(res=>{
        this.gallery =res.data.gallery;
        this.info =res.data.info;
        this.attribute =res.data.attribute;
        this.goods_desc = this.info.goods_desc;
        this.issue=res.data.issue;
        // sku数据：
        this.goods.picture = this.info.list_pic_url
        this.sku.price = this.info.retail_price
        this.sku.stock_num = this.info.goods_number
         // productList数据
        this.productList = res.data.productList
      })

      // 相关产品
      RelatedDatas({ id:this.$route.query.id}).then(res=>{
          this.goodsList=res.data.goodsList
      })

      GoodscountDatas().then(res=>{
        if(res.errno==0){
                this.goodsCount = res.data.cartTotal.goodsCount
            }
      })
  },

  components: {
    Tips,AppGoodAction,Project
  },

  computed: {},

  methods: {
    addToCart(){
       if(this.isSkuShow){
                // 加入购物车
                console.log("执行加入购物车的操作");

                // 获取要添加的商品的数量
                // this.$refs.sku.getSkuData().selectedNum

                // 发起加入购物车请求
                AddProductToCart({
                    goodsId:this.$route.query.id,     //商品id，地址栏id
                    productId:this.productList[0].id,  //产品id，来自productList的第一个数组项中的id
                    number:this.$refs.sku.getSkuData().selectedNum //数量
                }).then(res=>{
                    if(res.errno==0){
                        console.log(res);
                        // 添加到购物车后做两件事情
                        // 1、更新购物车数量
                        this.goodsCount = res.data.cartTotal.goodsCount
                        // 2、跳转到购物车页面
                        this.$toast.success("加入购物车成功");
                        // setTimeout(()=>{
                        //     this.$router.push("/car")
                        // },1500)
                    }
                })
            }else{
                this.isSkuShow=true
            }

    }
  }
}

</script>
<style lang='less' scoped>
.info{
  line-height: .4rem;
  background-color: white;
  text-align: center;
  padding: .2rem;
  border-bottom: 1px solid #ccc;
  .name{
    font-size: 20px;
  }
  .retail_price{
    color: darkred;
  }
}
.attribute{
  background-color:#fff;
  margin-top: .2rem;
  padding: .1rem .168rem;
  h3{
    font-size: 0.1638rem;
    line-height: .5rem;
  }
  li{
    height: .40rem;
    line-height: .40rem;
    background-color: #efefef;
    display: flex;
    margin-bottom: .10rem;
    border-radius: .05rem;
    .l{
      width: 30%;
      text-align: right;
      margin-right: .1rem;
      font-size: .12rem;
    }
    .r{
      flex: 1;
      font-size: .168rem;
    }
  }
}
/* 深度样式写法，穿透ui组件的样式，直接添加在标签上 */
    /deep/.goods_desc{
        img{
            display: block;
            width: 100%;
        }
    }
.title0 {
  width: 100%;
  background: #fff;
  height: 0.5rem;
  position: relative;
  &::before {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }
  span {
    width: 30%;
    position: relative;
    background: #fff;
    display: block;
    text-align: center;
    margin: 0 auto;
    height: 0.5rem;
    line-height: 0.5rem;
  }
}
 .issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 0.3rem;
      line-height: 0.3rem;
      padding-left: 0.2rem;
      position: relative;
      font-weight: normal;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 0.12rem;
      line-height: 0.2rem;
      padding-left: 0.2rem;
    }
  }
 }
</style>