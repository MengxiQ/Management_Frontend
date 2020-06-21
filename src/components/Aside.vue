<template>
    <div class="Aside" ref="Aside">
        <div class="Collapse" @click="Collapse" ref="Collapse" :class="{CollapseTF:isCollapse}">
            <i class="el-icon-caret-left" ></i>
        </div>
        <!--                :default-active="activeIndex"-->
        <el-menu
                :unique-opened="true"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :router="true"
                :collapse="isCollapse"
        >
            <el-submenu index="EmpManage">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span>企业管理</span>
                </template>
                <el-menu-item-group>
<!--                    <template slot="title">分组一</template>-->
                    <el-menu-item index="EmpOverview" slot="title">企业概况</el-menu-item>
                    <el-menu-item index="emplist" slot="title">员工列表</el-menu-item>
                    <el-menu-item index="emplist" slot="title">部门管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="AssetsManage">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span>资产管理</span>
                </template>
                <el-menu-item-group>
<!--                    <template slot="title">分组一</template>-->
                    <el-menu-item index="AssetOverview" slot="title">资产概况</el-menu-item>
                    <el-menu-item index="NetEquipList" slot="title">网络设备</el-menu-item>
                    <el-menu-item index="NetDeviceList" slot="title">网络器件</el-menu-item>
                    <el-menu-item index="CabinetList" slot="title">机柜管理</el-menu-item>
                    <el-menu-item index="AssetType" slot="title">类型管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="AssetsManage">
                <template slot="title">
                    <i class="el-icon-s-cooperation"></i>
                    <span>故障管理</span>
                </template>
                <el-menu-item-group>
                    <!--                    <template slot="title">分组一</template>-->
                    <el-menu-item index="111" slot="title">故障概况</el-menu-item>
                    <el-menu-item index="222" slot="title">突发故障</el-menu-item>
                    <el-menu-item index="222" slot="title">用户报修</el-menu-item>
                    <el-menu-item index="333" slot="title">派单管理</el-menu-item>
                    <el-menu-item index="222" slot="title">备案管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="DocManage">
                <template slot="title">
                    <i class="el-icon-document-copy"></i>
                    <span>文档管理</span>
                </template>
                <el-menu-item-group>
                    <!--                    <template slot="title">分组一</template>-->
                    <el-menu-item index="555" slot="title">文档概况</el-menu-item>
                    <el-menu-item index="666" slot="title">技术文档</el-menu-item>
                    <el-menu-item index="777" slot="title">技术文档</el-menu-item>
                    <el-menu-item index="888" slot="title">其他文档</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="DocManage">
                <template slot="title">
                    <i class="el-icon-document-copy"></i>
                    <span>事务管理</span>
                </template>
                <el-menu-item-group>
                    <!--                    <template slot="title">分组一</template>-->
                    <el-menu-item index="555" slot="title">事务概况</el-menu-item>
                    <el-menu-item index="666" slot="title">员工请假</el-menu-item>
                    <el-menu-item index="777" slot="title">员工打卡</el-menu-item>
                    <el-menu-item index="888" slot="title">员工出勤</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
  export default {
    name: "Aside",
    data(){
      return{
        activeIndex:'emplist',
        isCollapse:false
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      Collapse(){
        this.isCollapse = !this.isCollapse;
        // this.$refs.Collapse.style.width = 0;
      }
    }
  }
</script>

<style scoped>
    .Aside{
        background-color: #797979;
        position: relative;
    }
    .el-menu-vertical-demo{

    }
    .Collapse{
        height: 25px;
        width: 25px;
        /*background-color: rebeccapurple;*/
        position: absolute;
        z-index: 20;
        right: 0;
        font-size: 15px;
        color: rgb(144,147,153);

    }
    .Collapse:hover{
        cursor: pointer;
        /*transform: scale(1.1);*/
        /*transition: scale 0.2s;*/
    }
    .CollapseTF{
        transform: rotateY(180deg);
    }

</style>
