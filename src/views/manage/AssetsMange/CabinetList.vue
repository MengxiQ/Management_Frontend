<template>
    <div id="CabinetList">
        <div class="heard_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资产管理</el-breadcrumb-item>
                <el-breadcrumb-item>机柜管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="mainContent">
            <el-row :gutter="20">
                <el-col :md="6" :xm="12">
                    <div style="background: white;
                    text-align: left;

                    border-left: 5px rgb(58, 142, 230) solid;
                    padding: 5px;
                    ">区域选择</div>
                    <el-tree
                            :data="SpanningTree"
                            node-key="id"
                            default-expand-all
                            :highlight-current="true"
                            :expand-on-click-node="false"
                            :draggable="true"
                            @node-click="node_click"
                            @dblclick.native="node_dblclick"
                          >
                  <span class="custom-tree-node" slot-scope="{ node, data }" >
                    <span style="margin-right: 20px"><i class="el-icon-s-home" style="margin-right: 5px"></i>{{ node.label }}</span>
                    <span style="">
                      <el-button
                              type="text"

                              size="mini"
                              @click="() => append(data)">
                               <i class="el-icon-circle-plus"></i> 添加
                      </el-button>
                      <el-button
                              type="text"

                              size="mini"
                              @click="() => remove(node, data)">
                               <i class="el-icon-remove"></i> 移除
                      </el-button>
                    </span>
                  </span>
                    </el-tree>

                </el-col>

                <el-col :md="18" :xs="12">
                    <el-table
                            v-loading="isLoading"
                            :data="cabinetList"
                            style="width: 100%">
                        <el-table-column
                                label="机柜编号"
                                prop="cid" >
                        </el-table-column>

                        <el-table-column
                                label="机柜名称"
                                 prop="name">
                        </el-table-column>

                        <el-table-column
                                label="位置"
                                prop="location">
                        </el-table-column>

                        <el-table-column
                                label="设备数量"
                                 prop="devices_num">
                        </el-table-column>

                        <el-table-column
                            label="机柜高度"
                          prop="height">
                        </el-table-column>

                        <el-table-column
                                label="可用高度"
                                prop="available_height">
                        </el-table-column>

                        <el-table-column
                            label="备注"
                             prop="remark">

                        </el-table-column>

                        <el-table-column
                                align="right" width="150">
                            <template slot="header">
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="输入关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-col>

            </el-row>


        </div>
    </div>
</template>

<script>
    import {getCabines,getSpanningTree} from "../../../network/Cabinet";


    let id = 1000;
  export default {
    name: "CabinetList",
      data() {
          return {
              SpanningTree:[],//地址树
              search:null,
              cabinetList:null,
              isLoading:true,

          }
      },

      methods: {
        /**
         * 节点操作
         * */
          node_click(nodeList,node,nodeComp){
            console.log(nodeList,node,nodeComp)

        },
          node_dblclick(){
              console.log("node_dblclick")
          },
          append(data) {
              const newChild = { id: id++, label: 'testtest', children: [] };
              if (!data.children) {
                  this.$set(data, 'children', []);
              }
              data.children.push(newChild);
          },

          remove(node, data) {
              const parent = node.parent;
              const children = parent.data.children || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
          },

          /**
           * 网络请求相关
           * */
          LoadCabinesList(){
              this.isLoading = true;
              getCabines().then(res => {
                  this.cabinetList = res.data;
                  this.isLoading = false;
              }).catch(error => {
                  console.log(error)
              })
          },
          LoadSpanningTree(){
              getSpanningTree().then(res =>{
                  this.SpanningTree = res.data;
              }).catch(error => {
                  console.log(error);
              })
          }

    },//methods end
      mounted() {
        this.LoadCabinesList();
        this.LoadSpanningTree();
      }
  }
</script>

<style scoped>
    #CabinetList{
        height:calc(100vh - 100px);
        overflow-y: scroll;
        /*background: rebeccapurple;*/
    }
    .heard_nav{
        /*background: wheat;*/
        padding: 8px 0;
    }
    .mainContent{
        padding: 10px;
    }
</style>
<style>
    .el-tree-node__content{
        font-size: 14px;
        height: 35px;
    }
    .heard_nav{
        /*background: wheat;*/
        padding: 8px 0;
    }
</style>