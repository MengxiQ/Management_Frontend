<template>
    <div class="Header">
        <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :router="true"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
            <el-menu-item index="/manage/">管理中心</el-menu-item>
            <el-menu-item index="/topo/">Topo</el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
                <el-submenu index="2-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="2-4-1">选项1</el-menu-item>
                    <el-menu-item index="2-4-2">选项2</el-menu-item>
                    <el-menu-item index="2-4-3">选项3</el-menu-item>
                </el-submenu>
            </el-submenu>
            <el-menu-item index="/3" disabled>消息中心</el-menu-item>
            <el-menu-item index="/4">站点地图</el-menu-item>
        </el-menu>
        <div class="avatar" >
                <el-popover
                        placement="top-start"

                        trigger="hover"
                      >
                    <li class="avatar_item"><i class="el-icon-user-solid" style="margin-right: 10px"></i>个人中心</li>
                    <li class="avatar_item"><i class="el-icon-s-comment" style="margin-right: 10px"></i>我的消息</li>
                    <li class="avatar_item"><i class="el-icon-download" style="transform: rotate(90deg);margin-right: 10px"></i>注销</li>
                    <el-avatar size="mini" :src="circleUrl" slot="reference"></el-avatar>
                </el-popover>

        </div>
    </div>
</template>

<script>
  export default {
    name: "Header",
    data(){
      return {
        activeIndex:"1"
      }
    },
    methods:{
      handleSelect(key,path){
        console.log("key：",key);
        console.log("path:",path);

      }
    }
  }
</script>

<style scoped>
    .Header{

    }
    .avatar{
        position: absolute;
        right: 50px;
        top: 10px;
    }
    .avatar:hover{
        cursor: pointer;
    }
    .avatar_item{
        list-style: none;
        text-decoration: none;
        padding: 10px;

    }
    .avatar_item:hover{
        cursor: pointer;
        background: rgb(236,245,255);
    }
</style>