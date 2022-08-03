<template>
  <div class="gird">
    <van-grid :column-num="5" channel.length>
      <van-grid-item
        v-for="item in channel"
        :key="item.id"
        :icon="item.icon_url"
        :text="item.name"
        @click="btn(item.id)"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: "Grid",
  props: ["channel"],
  methods: {
    btn(id){
      this.$router.push({path: '/channel', query:{id: id}})
    }
  }
};
</script>

<style>
</style>
