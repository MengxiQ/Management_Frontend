<template>
    <el-container>
        <el-header height="60px" style="padding:0"><Header/></el-header>

        <el-container>
<!--            <el-aside width=""250>-->
                <Aside/>
<!--            </el-aside>-->
            <el-main><MainContent/></el-main>
        </el-container>

        <!--      <el-footer height="100px"><Footer/></el-footer>-->
    </el-container>
</template>

<script>
  import MainContent from "@/components/MainContent";
  import Header from "@/components/Header";
  import Aside from "@/components/Aside";
  export default {
    name: "Main",
    components: {MainContent,Header,Aside}
  }
</script>

<style scoped>

</style>