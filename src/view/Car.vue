<!--  -->
<template>
  <div>
     <Tips/>
     <van-checkbox-group v-model="result" :disabled="isEditing">
        <van-checkbox :name="item.id" v-for="item in cartList" :key="item.id" @click="changeChecked(item)">
          <van-swipe-cell>
            <van-card
              :num="item.number"
              :price="item.retail_price"
              :title="item.goods_name"
              :thumb="item.list_pic_url"
              />
              <van-stepper v-model="item.number" v-show="isEditing"  @change="stepperChange(item)"/>
              <template #right>
                <van-button square type="danger" text="删除" @click="delGood(item.product_id)"/>
              </template>
        </van-swipe-cell>
        </van-checkbox>
      </van-checkbox-group>


    <van-submit-bar :price="cartTotal.checkedGoodsAmount*100" button-text="提交订单" @submit="onSubmit">
      <van-checkbox v-model="checked" :disabled="isEditing">全选</van-checkbox>
        <template #tip>
            累计共<span>{{cartTotal.checkedGoodsCount}}</span>件商品，可点击    
            <van-button :type="isEditing?'danger':'primary'" size="small" @click="editBtn">
                {{isEditing?'完成编辑':'编辑'}}
            </van-button>   按钮进行商品数量修改 
        </template>
    </van-submit-bar>
  </div>
</template>

<script>
import Tips from '@/components/Tips'
import {GetCartListData,ChangeGoodChecked,StepperChangeData,DeleteGood} from "@/api/home"
export default {
  data () {
    return {
       result: [],
        //购物车列表数据
        cartList:[],
        //商品总信息
        cartTotal:[],
        // 编辑状态的设置
        isEditing:false
    };
  },
    computed:{
        checked:{
            // 什么时候表示全选?? result的长度和cartList的长度一致的时候
             get(){
                // 什么时候表示全选?? result的长度和cartList的长度一致的时候
                return this.result.length==this.cartList.length
            },
            set(val){ // val即将要修改成的新的值
                // if(this.isEditing)return;
                // 处理id数组
                let ids_arr = [];
                this.cartList.map(item=>{
                    ids_arr.push(item.product_id)
                })
                // console.log(ids_arr.join());
                ChangeGoodChecked({
                    isChecked:val?1:0,
                    productIds:ids_arr.join(),
                }).then(res=>{
                    if(res.errno==0){
                        this.totalFn(res.data);
                    }
                })
            }
        }
    },
  components: {
    Tips
  },
    created(){
        GetCartListData().then(res=>{
            if(res.errno==0){
               this.totalFn(res.data)
            }
        })
    },

  methods: {
    editBtn(){
            this.isEditing = !this.isEditing;
    },
    totalFn(data){
      this.cartList = data.cartList
      this.cartTotal = data.cartTotal

      // 清空 this.result数组, 后面的操作不会使这个数组越来越长
      this.result = []
      this.cartList.map(item=>{
          item.checked==1?this.result.push(item.id):"";
      })
    },
    onSubmit(){},
    onClickEditAddress(){},
    changeChecked(item){
       if(this.isEditing){
          return
        };
        // 总结：为什么要发送这个请求？这个请求作用？
        // 这个请求告诉了后端我们改变了哪些值，后端接收到之后，返回给我们一个处理过后的完整的页面数据（包括总价的结算），
        // 我们只需要拿到这个数据，网页面上填写就可以(修改cartList和cartTotal)
      ChangeGoodChecked({
            isChecked:item.checked==0?1:0,
            productIds:item.product_id
      }).then(res=>{
          if(res.errno==0){
            this.totalFn(res.data);
          }
      })
    },
     stepperChange(item){
            StepperChangeData({
                goodsId: item.goods_id,
                id:item.id,
                number:item.number,
                productId:item.product_id
            }).then(res=>{
                if(res.errno==0){
                    this.totalFn(res.data)
                }
            })
      },
       delGood(pid){
            DeleteGood({
                productIds:pid.toString()
            }).then(res=>{
            console.log(res);
                if(res.errno==0){
                    this.totalFn(res.data)
                }
            })
        }
  }
}

</script>
<style lang='less' scoped>
/deep/.van-checkbox__label{
    flex:1;
}
.van-checkbox-group{
    background-color: #fff; 
    padding-bottom: 1.5rem;
    .van-checkbox{
        padding:.1rem .15rem;
        border-bottom: 1px solid #ccc;
    }
}
.van-submit-bar{
    bottom:.5rem;
    border-bottom: 1px solid #ccc;
}
.van-stepper{
    text-align: right;
}
.van-button--square {
    height: 100%;
    margin-left: 1px;
}
</style>