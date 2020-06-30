<template>
    <div id="NetequipType">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click.native="clickAddType">添加类型</el-button>
        <el-collapse >
            <el-collapse-item v-for="(item,index) in NEtype" :name="index" :key="index+'NetequipType'">
                <template slot="title">
                    <div class="collapse-item-title">
                   <i class="el-icon-bangzhu"></i>
                        <span>{{item.name}}</span>
                        <span class="collapse-item-btn">
                            <el-button icon="el-icon-edit-outline" size="mini"  circle plain @click.native.stop="click_edit(item)"/>
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
                    <li class="parma">
                        <span class="key">编号</span>:<span class="value" v-if="!isshowEdit">{{item.tid}}</span>
                        <span  v-else style="display: inline-block;width: 300px;margin-left: 10px">
                            <el-input
                                    disabled
                                    size="mini"
                                    placeholder="请输入内容"
                                    prefix-icon="el-icon-edit"
                                    v-model="item.tid">
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
                                type="textarea"
                                maxlength="255"
                                show-word-limit
                                size="mini"
                                placeholder="请输入内容"
                                prefix-icon="el-icon-edit"
                                v-model="item.remark">
                        </el-input></span>
                    </li>
                    <div style="text-align: right;padding: 10px" v-if="isshowEdit">
                        <el-button size="mini" type="primary" @click="save(item)">保存</el-button>
                        <el-button size="mini" type="null" @click="isshowEdit = false">取消</el-button>
                    </div>
                </div>
<!--                //编辑按钮组-->

            </el-collapse-item>
        </el-collapse>

        <!--  弹出表单：添加设备类型-->
        <el-dialog title="添加设备类型" :visible.sync="dialogFormVisible" width="500px">

                <el-form :model="form">
                    <el-form-item label="类型编号" >
                        <el-input v-model="form.tid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型名称" >
                        <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="类型备注" >
                        <el-input v-model="form.remark" autocomplete="off"></el-input>
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

    import {getAllNEtype} from "@/network/NetEquipList";
    import {addNEtype,deleteNEtype,updateNEtype} from "@/network/AssetType";

    export default {
    name: "NetequipType",
    data(){
      return{
       activeNames:0, // 激活的面板
        dialogFormVisible:false,
        NEtype:[],
        form:{
            tid:null,
            name:null,
            remark:null
        },
        isshowEdit:false //是否显示编辑输入框
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
          tid:null,
          name:null,
          remark:null
        };
        //隐藏弹出框
        this.dialogFormVisible = false;
      },
      // 确认添加
      confirmAdd(){
        //提交表单
        this.addNEtype(this.form);
        //清除表单
        this.form = {
          tid:null,
          name:null,
          remark:null
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
        this.updateNEtype(item);
      },
      //点击删除
      click_delete(item){
        this.deleteNEtype(item.tid)
      },

      /**
       * 网络请求相关
       * */
      LoadNEtype(){
        getAllNEtype().then(res => {
          this.NEtype = res.data;
        }).catch(error => {
          console.log(
            error
          )
        })
      },
      addNEtype(NEtype){
        addNEtype(NEtype).then(res => {
          if(res.data === 1){
            this.$message({
              type:"success",
              message:"添加成功"
            });
            this.LoadNEtype();
          }else {
            this.$message.error("添加失败")
          }
        }).catch(error =>{
          console.log(error);
          this.$message.error("添加失败")
        })
      },
      deleteNEtype(tid){
        deleteNEtype(tid).then(res => {
          if(res.data === 1){
            this.$message({
              type:"success",
              message:"删除成功"
            });
            this.LoadNEtype();
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
      updateNEtype(NEtype){
        updateNEtype(NEtype).then(res => {
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
      this.LoadNEtype();
      }
  }
</script>

<style scoped>
    #NetequipType{
        text-align: left;
        padding: 10px;
        background: white;
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

</style>