<!--  -->
<template>
  <div>
      <div class="brand">
          <img :src="brand.list_pic_url" alt="" width="100%">
          <h4>{{brand.name}}</h4>
          <p>{{brand.simple_desc}}</p>
      </div>
  </div>
</template>

<script>
import { DetailDatas } from '../api/home'
export default {
  data () {
    return {
        // 产品制造商数据
        brand:{}
    };
  },

  created(){
      DetailDatas({
          id:this.$route.query.id
      }).then(res=>{
          this.brand=res.data.brand
      })
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
<style lang='less' scoped>
.brand{
    background-color: white;
     position: relative;
   h4{
       position: absolute;
       top: 35%;
       left: 33%;
       font-size: 18px;
       color: aliceblue;
       text-decoration:underline;
       font-weight:bold;
       

   }
   p{
       font-size: 20px;
       margin: .05rem;
       color:pink;
       font-family: 宋体;
   }
}
</style>