<template>
  <div id="app">
    <router-view/>
    <Tabbar v-show="$route.meta.isShowTabbar"/>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'
export default {
  name: 'App',
  data(){
    return{
            value: '',
    }
  },
  components:{
    Tabbar
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #efefef;
  min-height: 100%;
  font-size: .14rem;
}
body,html{
  height: 100%;
}
html{
  font-size: 100px !important;
}
</style>
