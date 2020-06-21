<template>
    <div id="manage">
        <el-container>
            <div id="aside">
                <Aside/>
            </div>
            <el-main><router-view/></el-main>
        </el-container>

    </div>
</template>

<script>
    import Aside from "@/components/Aside";
  export default {
    name: "Manage",
    components:{Aside}

  }
</script>

<style scoped>
    #manage{
        width: 100%;
        height: calc(100vh - 60px);
        overflow: hidden;
    }
    #aside{
        height: calc(100vh - 60px);
        overflow-y: scroll;
    }
</style>