<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>一个基于vue2+webpack模板的多页面架构配置</h2>
    <ul>
      <li>
        <a
          href="page1.html"
          target="_blank"
        >
          第一个子系统
        </a>
        <span>请留意地址栏</span>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="page2.html"
          target="_blank"
        >
          第二个子系统
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
