<template>
    <div id="NetStatusType">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click.native="clickAddType">添加类型</el-button>
        <el-collapse v-model="activeNames" >
            <el-collapse-item v-for="(item,index) in status_type" :name="index" :key="index+'NetStatusType'">
                <template slot="title">
                    <div class="collapse-item-title">
                        <i class="el-icon-bangzhu"></i>
                        <span>{{item.remark}}</span>
                        <span class="collapse-item-btn">
                            <el-button icon="el-icon-edit-outline" size="mini"  circle plain @click.native.stop="click_edit"/>
                               <div class="btn-mini">
                                <el-popconfirm
                                        confirmButtonText='确定'
                                        cancelButtonText='取消'
                                        icon="el-icon-info"
                                        iconColor="red"
                                        title="是否要删除该设备的所有信息？"
                                        @onConfirm="click_delete(item)"
                                >
                                    <el-button type="danger"
                                               slot="reference"
                                               icon="el-icon-delete"
                                               size="mini"
                                               circle
                                               plain
                                               @click.native.stop="{}"/>
                        </el-popconfirm>
                    </div>
                        </span>
                    </div>
                </template>
                <div class="parma_group">
                    <li class="parma"><span class="key">编号</span>:<span class="value" v-if="!isshowEdit">{{item.status_id}}</span>
                        <span  v-else style="display: inline-block;width: 300px;margin-left: 10px">
                            <el-input
                                    disabled
                                    size="mini"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-edit"
                                    v-model="item.status_id">
                            </el-input></span>

                    </li>
                    <li class="parma"><span class="key">名称</span>:<span class="value" v-if="!isshowEdit">{{item.name}}</span>
                        <span  v-else style="display: inline-block;width: 300px;margin-left: 10px">
                        <el-input

                                size="mini"
                                placeholder="请输入内容"
                                prefix-icon="el-icon-edit"
                                v-model="item.name">
                        </el-input></span>
                    </li>
                    <li class="parma"><span class="key">备注</span>:<span class="value" v-if="!isshowEdit">{{item.remark}}</span>
                        <span  v-else style="display: inline-block;width: 300px;margin-left: 10px">
                        <el-input

                                size="mini"
                                placeholder="请输入内容"
                                prefix-icon="el-icon-edit"
                                v-model="item.remark">
                        </el-input></span>
                    </li>
                    <li class="parma"><span class="key">显示类型</span>:<span class="value" v-if="!isshowEdit">{{item.show_type}}</span>
                        <span  v-else style="display: inline-block;width: 200px;margin-left: 10px">
                        <el-select v-model="item.show_type" placeholder="请选择" size="mini" >
                            <el-option
                                    v-for="item in tags"
                                    :key="item"
                                    :label="item"
                                    :value="item">
                                <span style="float: left">{{item}}</span>
                                <span style="float: right"> <el-tag :type="item" size="mini">{{item}}</el-tag></span>
                            </el-option>
                        </el-select>
                        </span>
                        <span>
                             <el-tag :type="item.show_type" size="mini">{{item.remark}}</el-tag>
                        </span>

                    </li>
                </div>
                <div style="text-align: right;padding: 10px" v-if="isshowEdit">
                    <el-button size="mini" type="primary" @click="save(item)">保存</el-button>
                    <el-button size="mini" type="null" @click="isshowEdit = false">取消</el-button>
                </div>
            </el-collapse-item>

        </el-collapse>

        <div id="tooltip">
            <span>显示示例：</span>
            <span  v-for="item in tags " :key="item+'exm'" style="padding: 5px">
                <el-tag size="mini" :type="item" >{{item}}</el-tag>
            </span>
        </div>


        <!--  弹出表单：添加设备类型-->
        <el-dialog title="添加状态类型" :visible.sync="dialogFormVisible" width="500px">

            <el-form :model="form">
                <el-form-item label="类型编号" >
                    <el-input v-model="form.status_id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型名称" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型备注" >
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="显示标签类型" >
                    <el-select v-model="form.show_type" placeholder="请选择">
                        <el-option
                                v-for="item in tags"
                                :key="item"
                                :label="item"
                                :value="item">
                            <span style="float: left">{{item}}</span>
                            <span style="float: right"> <el-tag :type="item" size="mini">{{item}}</el-tag></span>
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAdd">取 消</el-button>
                <el-button type="primary" @click="confirmAdd">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  import {
    findAllStatus_type,
    addStatus_type,
    deleteStatus_type,
    updateStatus_type,
  } from "@/network/AssetType";

  export default {
    name: "NetStatusType",
      data(){
      return {
        isshowEdit: false,
        dialogFormVisible:false,
        activeNames:0,
        status_type:[],
        form:{
          status_id:null,
          name:null,
          remark:null,
          show_type:null,
        },
        tags:["default",'success',"primary","info","danger"]
      }
      },
      methods:{
        //点击添加设备类型
        clickAddType(){
          this.dialogFormVisible = true;

        },
        // 取消添加
        cancleAdd(){
          //清除表单
          this.form = {
            status_id:null,
            name:null,
            remark:null,
            show_type:null,
          };
          //隐藏弹出框
          this.dialogFormVisible = false;
        },
        // 确认添加
        confirmAdd(){
          //提交表单
          // console.log(this.form);
          this.addStatus_type(this.form);
          //清除表单
          this.form = {
            status_id:null,
            name:null,
            remark:null,
            show_type:null,
          };
          //隐藏弹出框
          this.dialogFormVisible = false;
        },
        //点击编辑
        click_edit(){
          this.isshowEdit = true
        },
        //保存编辑
        save(item){
          // console.log(item)
          this.updateStatus_type(item);
        },
        //点击删除
        click_delete(item){
          this.deleteStatus_type(item.status_id)
        },

        /**
         * 网络请求相关
         * */
        LoadStatus_type(){
          findAllStatus_type().then(res => {
            this.status_type = res.data;
          }).catch(error => {
            console.log(
              error
            )
          })
        },
        addStatus_type(Status_type){
          addStatus_type(Status_type).then(res => {
            if(res.data === 1){
              this.$message({
                type:"success",
                message:"添加成功"
              });
              this.LoadStatus_type();
            }else {
              this.$message.error("添加失败1")
            }
          }).catch(error =>{
            console.log(error);
            this.$message.error("添加失败2")
          })
        },
        deleteStatus_type(status_id){
          deleteStatus_type(status_id).then(res => {
            if(res.data === 1){
              this.$message({
                type:"success",
                message:"删除成功"
              });
              this.LoadStatus_type();
            }else {
              this.$message.error("删除失败1");
            }
          }).catch(error =>{
            console.log(error);
            this.$message.error("删除失败2");
            this.$notify({
              type:'warning',
              duration:0,
              title:"通知",
              message:'如果想删除该类型，请先保证没有该类型的设备！'
            });
          })
        },
        updateStatus_type(Status_type){
          updateStatus_type(Status_type).then(res => {
            if(res.data === 1){
              this.$message({
                type:"success",
                message:"保存成功"
              });
              this.isshowEdit = false;
            }else {
              this.$message.error("保存失败")
            }
          }).catch(error =>{
            console.log(error);
            this.$message.error("保存失败")
          })
        }
      },//methods end
      mounted(){
      this.LoadStatus_type();
      }
  }
</script>

<style scoped>
    #NetStatusType{
        position: relative;
        padding: 10px;
        text-align: left;
    }
    .collapse-item-title{
        text-align: left;
        font-size: larger;
        /*background: #3a8ee6;*/
        width: 95%;
    }
    .collapse-item-btn{

        display: inline-block;
        float: right;
    }
    .parma_group{
        text-align: left;
        /*padding: 0 10px;*/
        background: rgba(172, 207, 245, 0.17);
    }
    .parma{
        list-style: none;
        text-decoration: none;
        padding: 10px;
    }
    .parma:hover{
        background: rgba(28, 127, 222, 0.1);
        cursor: pointer;
    }
    .key,.value{
        padding: 5px;
    }
    .key{
        font-weight: bolder;
    }

    #tooltip{
        background: white;
        font-size: 12px;
        top: 0px;
        right: 100px;
        position: absolute;
    }
</style>