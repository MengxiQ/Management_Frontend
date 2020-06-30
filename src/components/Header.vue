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
                    <el-badge :value="100" :max="99" class="item" slot="reference">
                        <el-avatar  :src="circleUrl" ></el-avatar>
                    </el-badge>

                </el-popover>

        </div>
    </div>
</template>

<script>
  export default {
    name: "Header",
    data(){
      return {
        activeIndex:"1",
          circleUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1593342463606&di=ceaeec8cd06d0de3c714868d9e12f3ed&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D2464338708%2C3226695534%26fm%3D214%26gp%3D0.jpg"
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