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
                <el-col :md="8" :xm="12">

                    <div style="background: white;
                    text-align: left;

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
<!--                slot-scope        data-->
                  <span class="custom-tree-node" slot-scope="{ node }" >
                    <span style="margin-right: 0px"><i class="el-icon-s-home" style="margin-right: 0px"></i>{{ node.label }}</span>
<!--                        <span style="">-->
<!--                          <el-button-->
<!--                                  type="text"-->
<!--    -->
<!--                                  size="mini"-->
<!--                                  @click="() => append(data)">-->
<!--                                   <i class="el-icon-circle-plus"></i> 添加-->
<!--                          </el-button>-->
<!--                          <el-button-->
<!--                                  type="text"-->
<!--    -->
<!--                                  size="mini"-->
<!--                                  @click="() => remove(node, data)">-->
<!--                                   <i class="el-icon-remove"></i> 移除-->
<!--                          </el-button>-->
<!--                        </span>-->
                  </span>
                    </el-tree>

                </el-col>

                <el-col :md="16" :xs="12">
                    <div class="btn-group">

                        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click.native="clickAddEquip">添加设备</el-button>

                        <!--    导出按钮-->
                        <div class="btn-mini">
                            <el-popover
                                    placement="bottom"
                                    title="导出设备"
                                    width="200"
                                    trigger="click">
                                <!--                判断是否选中内容，从而确定显示什么信息和按钮是否可用-->
                                <p>是否导出所有选中的设备信息？</p>
                                <el-button size="mini" type="primary" @click.native="exportData">确定</el-button>
                                <el-button size="mini">取消</el-button>

                                <el-button slot="reference" type="primary" icon="el-icon-printer" size="mini">导出</el-button>

                            </el-popover>
                        </div>

                        <!--    导入按钮-->
                        <div class="btn-mini">
                            <el-popover
                                    placement="bottom"
                                    title="批量导入设备"
                                    width="360"
                                    trigger="click">
                                <!--                判断是否选中文件，从而确定显示什么信息和按钮是否可用-->
                                <div>
                                    <el-button slot="reference" type="primary" icon="el-icon-download" size="mini" plain>下载模板</el-button>
                                    <h5></h5>
                                    <el-upload
                                            class="upload-demo"
                                            drag
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            multiple>
                                        <i class="el-icon-upload"></i>
                                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                        <div class="el-upload__tip" slot="tip">ps：只能上传xlsx/svg文件，且不超过500kb</div>
                                    </el-upload>
                                    <br>
                                    <el-button size="mini" type="primary" @click.native="exportData">导入</el-button>
                                    <el-button size="mini">取消</el-button>
                                </div>
                                <el-button slot="reference" type="primary" icon="el-icon-upload" size="mini" @click.native="addEmp">导入</el-button>
                            </el-popover>
                        </div>

                        <!--     批量操作按钮-->
                        <div class="btn-mini">
                            <el-dropdown>
                                <el-button type="primary" size="mini">
                                    批量操作<i class="el-icon-arrow-down el-icon--right"></i>
                                </el-button>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item icon="el-icon-delete" @click.native="deleteSelection">删除选中</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-printer">导出选中</el-dropdown-item>
                                    <el-dropdown-item icon="el-icon-edit-outline">更新选中</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>

                    </div>
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
                                align="right"
                                label="操作"
                                width="120"
                        >
                            <template slot="header" >
                                <el-input
                                        v-model="search"
                                        size="mini"
                                        placeholder="关键字搜索"/>
                            </template>
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        icon="el-icon-edit"
                                        @click="handleEdit(scope.$index, scope.row)"></el-button>
                                <div class="btn-mini">
                                    <el-popconfirm
                                            confirmButtonText='确定'
                                            cancelButtonText='取消'
                                            icon="el-icon-info"
                                            iconColor="red"
                                            title="是否要删除该设备的所有信息？"
                                            @onConfirm="deleteNEConfirm(scope.row.neid)"
                                    >
                                        <el-button
                                                slot="reference"
                                                size="mini"
                                                type="danger"
                                                icon="el-icon-delete-solid"
                                        ></el-button>
                                    </el-popconfirm>
                                </div>


                            </template>
                        </el-table-column>
                    </el-table>

                </el-col>

            </el-row>


        </div>
    </div>
</template>

<script>
    import {getCabines,getSpanningTree} from "@/network/Cabinet";


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
        background: white;
    }
</style>
<style>
    .el-tree-node__content{
        font-size: 14px;
        height: 35px;
    }

    .btn-group{

        text-align: left;
    }
    .btn-mini{
        display: inline-block;
        margin-left: 8px;
    }
</style>