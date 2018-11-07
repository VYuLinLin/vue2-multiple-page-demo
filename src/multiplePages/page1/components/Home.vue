<template>
  <div>
    <a href="index.html">首页</a>
    <a @click="$router.push({name: 'HelloWorld'})">关于</a>
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style scoped>
div {
    font-size: 60px;
}
</style>
