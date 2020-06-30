<template>
    <div id="Assettype">
        <div class="heard_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资产管理</el-breadcrumb-item>
                <el-breadcrumb-item>机柜管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs v-model="activeName" type="">
            <el-tab-pane label="设备类型" name="NetequipType"><NetequipType/></el-tab-pane>
            <el-tab-pane label="状态类型" name="NetStatusType"><NetStatusType/></el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
  import NetequipType from "@/views/manage/AssetsMange/AssetTypechildren/NetequipType";
  import NetStatusType from "@/views/manage/AssetsMange/AssetTypechildren/NetStatusType";
  export default {
    name: "Assettype",
    components: {NetStatusType, NetequipType},
    data(){
      return {
        activeName:'NetequipType'
      }
    }
  }
</script>

<style scoped>
    #Assettype{
        background: white;
        height: calc(100vh - 60px);
        overflow-y: scroll;
        padding: 10px;
    }
</style>