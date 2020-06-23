<template>
    <div id="AssetOverview">
        <div class="heard_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资产管理</el-breadcrumb-item>
                <el-breadcrumb-item>资产概述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
<!--        main_contain  start-->
        <div class="main_contain">
<!--            图表1-->
            <el-row>
                <el-col :sm="12" :xs="24">
                    <el-card class="box-card">

                        <div style="height: 30px;background: #3a8ee6;width: 8px;position: absolute;left: 0;top: 8px"></div>
                        <div ref="typeOverview" style="width:390px;height:300px;margin: auto"></div>
                    </el-card>
                </el-col>
                <!--            图表2-->
                <el-col :sm="12" :xs="24" >
                    <el-card class="box-card">
                        <div style="height: 30px;background: #3a8ee6;width: 8px;position: absolute;left: 0;top: 8px"></div>
                        <div ref="statuesOverview" style="width:390px;height:300px;"></div>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col  :sm="12" :xs="24">
                    <!--            图表3-->
                    <el-card class="box-card">
                        <div style="height: 30px;background: #3a8ee6;width: 8px;position: absolute;left: 0;top: 8px"></div>
                        <div ref="typeOverview3" style="width:390px;height:300px;margin: auto"></div>
                    </el-card>
                </el-col>
                     <!--            图表4-->
                <el-col  :sm="12" :xs="24">
                    <el-card class="box-card">
                        <div style="height: 30px;background: #3a8ee6;width: 8px;position: absolute;left: 0;top: 8px"></div>
                        <div ref="typeOverview4" style="width:390px;height:300px;margin: auto">各种类型的设备的价格图</div>
                    </el-card>
                </el-col>
            </el-row>

            </div>
<!--        main_contain  end-->
    </div>
</template>

<script>
    import {getTypeOverview} from "../../../network/assetOverview";

    export default {
    name: "AssetOverview",
    data(){
      return {
        typeOverview:[]
      }
    },
        methods:{
        drawChart_typeOverview(){
            // 获取所有的标题
            const dataTitle = [];
            if(this.typeOverview[0].name !== null){
                for(let index in this.typeOverview){
                    console.log(this.typeOverview[index])
                    dataTitle.push(this.typeOverview[index].name);
                }

                console.log(dataTitle);
                console.log(this.typeOverview)
            const myChart = this.$echarts.init(this.$refs.typeOverview);
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '网络设备数量占比概况' ,
                    left:'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a}<br/>{b}:{c}({d}%)'
                },
                legend: {
                    // orient: 'vertical',
                    // top: 'middle',
                    bottom: 1,
                    left: 'center',
                    data: dataTitle
                },
                series: [{
                    name: '数量',
                    type: 'pie',
                    bottom:20,
                    data: this.typeOverview
                }]
            });


            }
        },
        drawChart_statuesOverview(){
                // 获取所有的标题
                // const dataTitle = [];
                // if(this.typeOverview[0].name !== null){
                //     for(let index in this.typeOverview){
                //         console.log(this.typeOverview[index]);
                //         dataTitle.push(this.typeOverview[index].name);
                //     }
                //
                //     console.log(dataTitle);
                //     console.log(this.typeOverview)
                    const statuesOverview = this.$echarts.init(this.$refs.statuesOverview);
                    // 绘制图表
                statuesOverview.setOption({
                    title: {
                        text: '各种状态的设备的状态的数量图' ,
                        left:'center',
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        bottom: 1,
                        left: 'center',
                        data: ['上架', '禁止使用', '入库', '报废', '无状态']
                    },
                    grid: {
                        left: '',
                        right: '',
                        bottom: '30',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        data: ['交换机', '路由器', '防火墙', '流控设备', '其他']
                    },
                    series: [
                        {
                            name: '上架',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [320, 302, 301, 334, 390]
                        },
                        {
                            name: '禁止使用',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [120, 132, 101, 134, 90]
                        },
                        {
                            name: '入库',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [220, 182, 191, 234, 290]
                        },
                        {
                            name: '报废',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [150, 212, 201, 154, 190]
                        },
                        {
                            name: '无状态',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [820, 832, 901, 934, 1290]
                        }
                    ]
                    });



            }
        },
    mounted(){
        //图表1：网络设备类型对应的数量统计信息的数据
        getTypeOverview().then(res => {
            this.typeOverview = res.data;
            //绘制图表
            this.drawChart_typeOverview();
        }).catch(error =>{
            console.log(error);
        });
        this.drawChart_statuesOverview();


    }
  }
</script>

<style scoped>
    #AssetOverview{
        height:calc(100vh - 100px);
        overflow-y: scroll;
        /*background: rebeccapurple;*/
    }
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
       position: relative;
       margin:10px 10px;
   }
</style>