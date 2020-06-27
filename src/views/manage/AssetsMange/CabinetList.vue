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
                            :data="data"
                            node-key="id"

                            :expand-on-click-node="false">
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
                            :data="tableData"
                            style="width: 100%">
                        <el-table-column
                                label="日期"
                                width="180">
                            <template slot-scope="scope">
                                <i class="el-icon-time"></i>
                                <span style="margin-left: 10px">{{ scope.row.date }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                                label="姓名"
                                width="180">
                            <template slot-scope="scope">
                                <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                </el-popover>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button
                                        size="mini"
                                        type="danger"
                                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>

                </el-col>

            </el-row>






        </div>
    </div>
</template>

<script>
    let id = 1000;
  export default {
    name: "CabinetList",
      data() {
          const data = [{
              id: 1,
              label: '有线网络',
              children: [{
                  id: 4,
                  label: '东区',
                  children: [{
                      id: 9,
                      label: '雅园',
                      children: [{
                          id: 91,
                          label: '雅园1栋'
                      }, {
                          id: 92,
                          label: '雅园2栋'
                      }, {
                          id: 93,
                          label: '雅园3栋'
                      }, {
                          id: 94,
                          label: '雅园4栋'
                      }, {
                          id: 95,
                          label: '雅园5栋'
                      }]
                  }, {
                      id: 10,
                      label: '静园'
                  }]
              }]
          }, {
              id: 2,
              label: '无线网络',
              children: [{
                  id: 5,
                  label: '二级 2-1'
              }, {
                  id: 6,
                  label: '二级 2-2'
              }]
          }, {
              id: 3,
              label: '一卡通',
              children: [{
                  id: 7,
                  label: '二级 3-1'
              }, {
                  id: 8,
                  label: '二级 3-2'
              }]
          }];
          return {
              data: JSON.parse(JSON.stringify(data)),
          }
      },

      methods: {
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
          }

    }//methods end
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
</style>