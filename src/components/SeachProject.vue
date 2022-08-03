<template>
  <div>
      <!-- 页面表头下拉菜单 -->
    <van-dropdown-menu>
        <van-dropdown-item disabled title="综合" />
        <van-dropdown-item title="价格" @change="pricesChange" v-model="pricesVal" :options="option2" />
        <van-dropdown-item title="分类" @change="categoryChange" v-model="categoryVal" :options="filterCategory" />
    </van-dropdown-menu>
    <!-- 当页面没有数据时显示 -->
    <van-empty v-if="goodsList.length==0" image="search" description="您搜索的商品没有数据!!请您重新搜索！" />
    <!-- 商品展示位置，页面 -->
   <Project  v-else :goodsList="goodsList"/>
  </div>
</template>

<script>
import Project from '@/components/Project'
export default {
    data(){
        return{
            //价格绑定数据
            pricesVal:'',
            //分类绑定数据
            categoryVal: "",
            //价格下拉菜单数据
            option2:[
                { text: '价格由高到低', value: 'desc' },
                { text: '价格由低到高', value: 'asc' },
            ],
        }
    },
    beforeUpdate(){
        //挂载完毕 ，遍历filterCategory数组，看哪一项checked为true,为true就赋值给categoryVal
        this.filterCategory.map(item=>{
            if (item.checked) {
                //通过点击选项改变checked的属性值
                this.categoryVal=item.value;
            }
        })
    },
    //通过父传子将数据传过来
    props:["goodsList","filterCategory"],
    components:{
        Project
    },
    methods:{
        //通过子传父将数据传给seachpopu
        categoryChange(value){//数据分类
            this.$emit("categoryChange",value)
        },
        pricesChange(value){//价格数据
             this.$emit("pricesChange",value)
        }
    }
}
</script>

<style lang="less" scoped>

</style>