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
    import {getTypeOverview,getTypeStatusCount} from "@/network/assetOverview";
    import {getAllNEtype,finAllstatus_type} from "@/network/NetEquipList";

    export default {
    name: "AssetOverview",
    data(){
      return {
        typeOverview:[],
        TypeStatusCount:null,
        NEtypes:null,
        status_type:null,
        countlist:[]
      }
    },
      computed:{
        NEtypesList(){
          return this.NEtypes.map(item =>{
            if (item.name !== null) return item.name;
          })
        },
        status_typeList(){
          return this.status_type.map(item => {
            if (item.name !== null) return item.name;
          })
        },
        TypeStatusCountList(){

            // 1、map遍历所有的状态类型
           //1.1 foreach遍历所有设备类型
          //1.1.1 foreach遍历所有的TypeStatusCountList,匹配设备类型 则 匹配
          //1.1.1.1 foreach遍历该设备类型的所有状态数量信息，匹配1.的状态类型，拿到状态对应的数量；
          if (this.NEtypesList !== null && this.NEtypes !== null && this.status_type !== null) {
            return this.NEtypesList.map(status_typeListItem => {
              this.countlist = [];

              let object = {};
              object.name = status_typeListItem;
              this.status_typeListItem.forEach(NEtypesListIten => {
                 this.TypeStatusCount.forEach(TypeStatusCountItem => {
                  if (TypeStatusCountItem.name === NEtypesListIten) {
                    //取数据
                    TypeStatusCountItem.statusCounts.forEach(statusCountsItem => {
                      if (statusCountsItem.status === status_typeListItem) {
                        //获得得一个数据
                        // count = statusCountsItem.count;
                        this.countlist.push(statusCountsItem.count);

                      } else {
                        this.countlist.push(0);
                      }

                    })

                  }
                })


              });
              //

              object.data = this.countlist;

              return object;
            })
          }else {
            return null;
          }


            //数据模板
            // {
            //   name: '上架',
            //     type: 'bar',
            //   stack: '总量',
            //   label: {
            //   show: true,
            //     position: 'insideRight'
            // },
            //   data: [320, 0, 301, 334, 390]
            // }

        }

      },
        methods:{
        drawChart_typeOverview(){
            // 获取所有的标题
            const dataTitle = [];
            if(this.typeOverview[0].name !== null){
                for(let index in this.typeOverview){
                    // console.log(this.typeOverview[index])
                    dataTitle.push(this.typeOverview[index].name);
                }

                // console.log(dataTitle);
                // console.log(this.typeOverview)
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
                        text: '各种状态的设备的状态的数量图',
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
                            data: [320, 0, 301, 334, 390]
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



            },
          LoadstatuesOverviewData(){
            //请求;TypeStatusCount
            getTypeStatusCount().then(res =>{
              this.TypeStatusCount = res.data;
              console.log(this.TypeStatusCount);
            }).catch(error => {
              console.log(error)
            })
            //请求所以的设备类型
                getAllNEtype().then(res => {
                  this.NEtypes = res .data;
                }).catch(error =>{
                  console.log(error)
                })
            // 请求所有的设备状态类型
            finAllstatus_type().then(res =>{
              this.status_type = res .data;
              console.log(this.TypeStatusCountList);

            }).catch(error => {
              console.log(error)
            })
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

        this.LoadstatuesOverviewData();
        //绘制图表2
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