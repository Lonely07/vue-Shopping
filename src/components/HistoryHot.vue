<template>
  <div>
      <!-- 历史记录 -->
    <div class="record">
         <div class="head">
             <h4>历史记录</h4>
             <van-icon name="delete-o" @click="deleteListData"/>
         </div>
         <div class="bottom" v-show="isshowdata">
             <van-tag plain type="default" @click="tagChange(item)" v-for="(item,index) in historyList" :key="index">{{item}}</van-tag>
         </div>
    </div>
    <!-- 热门搜索 -->
    <div class="record">
         <div class="head">
             <h4>热门搜索</h4>
         </div>
         <div class="bottom">
             <van-tag plain type="default" @click="tagChange(item.keyword)" v-for="(item,index) in hotList" :key="index" :class="item.is_hot?'red':''">{{item.keyword}}</van-tag>
         </div>
    </div>
  </div>
</template>

<script>
import {deleteData} from "@/api/home"
export default {
    data(){
        return{
            // 历史记录显示与否
            isshowdata:true
        }
    },
    // 父传子数据
    props:["historyList","hotList"],
    methods:{
        tagChange(val){
            this.$emit("tagChange",val)
        },
        // 点击删除
        deleteListData(){
            deleteData().then(res=>{
                if(res.errno==0){
                    // 弹出框显示删除成功
                    this.$toast.success('删除成功');
                    setTimeout(() => {
                        // 隐藏历史记录数据
                        this.isshowdata=false;
                    }, 1000);
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.record{
    background-color:white;
    padding: .1rem;
    margin-bottom: .2rem;
    .head{
        display: flex;
        justify-content: space-between;
        font-size: .24rem;
        margin-bottom: .08rem;
        h4{
            font-size: .20rem;
        }
    }
    .van-tag{
            margin-right: .05rem;
            padding: .03rem;
    }
    .red{
        color: darkred;
    }
}
</style>