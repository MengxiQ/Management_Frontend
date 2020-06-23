<template>
  <div id="app">
      <el-container>
      <el-header height="60px" style="padding:0"><Header/></el-header>
          <el-container>
              <router-view/>
          </el-container>
      </el-container>

  </div>
</template>

<script>

import Header from "@/components/Header";

export default {
  name: 'App',
  components: {Header}
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
  ::-webkit-scrollbar{
    display: none;
  }
</style>
