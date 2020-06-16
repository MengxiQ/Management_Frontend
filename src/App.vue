<template>
  <div id="app">
   <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
  html,body{
    margin:0;
    padding: 0;
  }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  background-color: #f6f6f6;
  text-align: center;


}
  .el-container{
  }
  .el-header{
    background-color: bisque;
  }
  .el-main{
    /*background-color: #f6f6f6;*/
    height: 100vh;

  }
  .el-aside{
    background-color: #a2a2a2;
    height: 100vh;

  }
  .el-footer{
    background-color: #3b3b3b;
    color: white;
  }
  ::-webkit-scrollbar{
    display: none;
  }
</style>
