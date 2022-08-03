<template>
    <div>
        <!-- 搜索框 -->
        <van-search  shape="round" disabled placeholder="请输入搜索关键词" @click="$router.push('/home/seachpopu')"/>
        <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#5599FF">
            <van-swipe-item v-for="(item,key ) in slideshowList" :key="key">
                <img :src="item.image_url" width="100%" alt="">
            </van-swipe-item>
        </van-swipe>
        <!-- 图片导航 -->
        <div>
			<van-grid :column-num="5" :border="true">
					<template v-for="(item,index) in channelList">
						<van-grid-item class="griditem"   @click="btn(item.id)">
							<img width="30" height="30" :src="item.icon_url" class="gridimg" />
							<span>
								<font size="3" color="" class="gridname" >{{item.name}}</font>
							</span>
						</van-grid-item>
					</template>
			</van-grid>
		</div>
         <!-- <Grid :channel="channel"></Grid> -->
        <!-- 品牌制造商直供 -->
        <div class="brandList">
            <h3>品牌制造商直供</h3>
                <van-row>
                    <van-col span="12" v-for="(item,index) in brandList" :key="index" @click="goto('/BrandDetail?id='+item.id)">
                        <div class="itemmodel">
                            <img :src="item.pic_url" alt="">
                            <h4>{{item.name}}</h4>
                            <p>{{item.floor_price|RMBformat}}</p>
                        </div>
                    </van-col>
                </van-row>
        </div>
        <!-- 周一周四·新品首发 -->
        <div class="NewgoodList">
            <h3>周一周四·新品首发</h3>
            <Project :goodsList="newGoodsList"/>
        </div>
        <!-- 人气推荐 -->
        <div class="hotGoodsList">
            <h3>人气推荐</h3>
            <van-card v-for="(item,index) in hotGoodsList" :key="index" currency="" @click="goto('/ProjectDatas?id='+item.id)"
                :price="item.retail_price|RMBformat"
                :desc="item.goods_brief"
                :title="item.name"
                :thumb="item.list_pic_url"
            />
        </div>
        <!-- 搜索弹出层 -->
        <transition name="van-slide-right">
             <router-view></router-view>
        </transition>
       
    </div>
</template>

<script>
import Project from '@/components/Project'
import Grid from '@/components/Grid'
import { getData } from '../api/home'
export default ({
    name:'home',
    data(){
        return{
            // 轮播图数据
            slideshowList:[],
            // 图片数据导航数据
            channelList:[],
            // 厂牌制造
            brandList:[],
            // 新品推荐
            newGoodsList:[],
            // 人气推荐
            hotGoodsList:[],
            channel: [],  //居家-志趣数据
        }
    },
    created() {
            getData().then(res=>{
               this.slideshowList=res.data.banner;
               this.channelList=res.data.channel;
               this.brandList=res.data.brandList;
               this.newGoodsList=res.data.newGoodsList;
               this.hotGoodsList=res.data.hotGoodsList;
               this.channel = res.data.channel;
            }).catch(err=>{

            })
		},
    methods:{
        goto(url) {
				this.$router.push(url)
			},
        btn(id){
                this.$router.push({path: '/channel', query:{id: id}})
            }
    },
    components:{
        Project,Grid
    }
})
</script>

<style lang='less' scoped>
.griditem{
    height: 100px;
}
.gridimg{
    margin-bottom: 10px;
}
.brandList{
    background-color: white;
    margin-top: .2rem;
    h3{
        text-align: center;
        font-size: 24px;
        margin-bottom: .1rem;
         padding-top: .1rem;
    }
    .itemmodel{
        position: relative;
        img{
        width:100% ;
        height: 100%;
        padding-bottom: .01rem;
        }
        h4{
            position: absolute;
            top: 20px;
            padding: .1rem;
        }
        p{
            position: absolute;
            top: 50px;
            padding: .1rem;
            color: darkred;
        }
    }
}
.NewgoodList{
    background-color: white;
    margin-top: .2rem;
    padding-bottom: .7rem;
    h3{
        text-align: center;
        font-size: 20px;
        margin-bottom: .1rem;
         padding-top: .1rem;
    }
}
.hotGoodsList{
     background-color: white;
    margin-top: .2rem;
    padding-bottom: .7rem;
    h3{
        text-align: center;
        font-size: 20px;
        margin-bottom: .1rem;
         padding-top: .1rem;
    }
}
/*
.slide-enter,.slide-leave-to{
     过渡开始之前属性 
    right: -100%;
}
.slide-enter-active,.slide-leave-active{
     过渡属性 
     transition: right .3s;
}
.slide-enter-to,.slide-leave{
      过渡结束之后属性 
     right: 0;
}*/
</style>