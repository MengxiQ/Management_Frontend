<template>
    <div>
        <div class="heard_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资产管理</el-breadcrumb-item>
                <el-breadcrumb-item>资产概述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!--        main_contain  start-->
        <div class="main_contain">
            <el-card class="box-card">
<!--                <div slot="header" class="clearfix">-->
<!--                    <span>网络设备类型概况</span>-->
<!--                    <el-button style="float: right; padding: 3px 0" icon="el-icon-close"></el-button>-->
<!--                </div>-->
                <div style="height: 30px;background: #3a8ee6"></div>
                <div ref="typeOverview" style="width:390px;height:300px;margin: auto">

                </div>
                </el-card>

            </div>9
<!--        main_contain  end-->
    </div>
</template>

<script>
  export default {
    name: "AssetOverview",
    data(){
      return {
        typeOverview:[
          {value: 40, name: '路由器'},
          {value: 6, name: '交换机'},
          {value: 10, name: '防火墙'},
          {value: 2, name: '流控设备'},
          {value: 10, name: '其他'}]
      }
    },
    mounted(){
      let myChart = this.$echarts.init(this.$refs.typeOverview)
      // 绘制图表
      myChart.setOption({
        title: {
          text: '网络设备数量概况' ,
          left:'center',
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['路由器', '交换机', '防火墙', '流控设备','其他']
        },
        series: [{
          name: '人数',
          type: 'pie',
          data: this.typeOverview
        }]
      });
    }
  }
</script>

<style scoped>
    .heard_nav{
        /*background: wheat;*/
        padding: 8px 0;
    }
    .main_contain{
        /*padding: 8px;*/
    }

   .box-card{
       width: 430px;
       height: 350px;
   }
</style>