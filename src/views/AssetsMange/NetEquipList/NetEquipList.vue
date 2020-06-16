<template>
    <div id="NetEquipList">

        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click.native="addEmp">添加设备</el-button>

        <!--导出按钮-->
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
<!--        导入按钮-->
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
        <el-table
                :data="NEform"
                highlight-current-row
                >
            <el-table-column
                    type="selection"
                    width="55"

            >
            </el-table-column>
            <el-table-column
                    label="UUID"
                    prop="uuid">
            </el-table-column>
            <el-table-column
                    label="MAC"
                    prop="mac">
            </el-table-column>
            <el-table-column
                    label="设备名称"
                    prop="name" >
            </el-table-column>
            <el-table-column
                    label="类型"
                    prop="ne_type">
            </el-table-column>
            <el-table-column
                    label="型号"
                    prop="unitType">
            </el-table-column>
            <el-table-column
                    label="到库时间"
                    >
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.stock_date" placement="top-start">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 2px">{{(scope.row.stock_date).slice(0,10)}}</span>
                    </el-tooltip>
                </template>
            </el-table-column>

            <el-table-column label="状态"
                             :filters="fitter_status"
                             :filter-method="filterStatus"
                             filter-placement="bottom-start">
                <template slot-scope="scope">
                    <el-dropdown trigger="click"
                                 v-show="scope.row.nestatus === null">
                          <span class="el-dropdown-link" style="color: #409EFF">
                            添加状态<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item
                                    icon="el-icon-plus"
                                    v-for="(item,index) in status"
                                    :key="index"
                                    @click.native="AddStatus(scope.row,item.name)"
                            >{{item.remark}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <el-popover
                            :title="isShowStatus ? '状态详情':'编辑状态' "
                            trigger="click"
                            placement="top"
                            width="300"
                            @hide="popoverHide()"
                    >
<!--                        显示详细信息状态-->
                        <div class="showStatus" v-if="isShowStatus">
                            <p><b>状态：</b>{{scope.row.nestatus ? scope.row.nestatus.status_name:"null"}}</p>
                            <p><b>时间：</b>{{scope.row.nestatus ? scope.row.nestatus.date :"null"}}</p>
                            <p><b>设备位置：</b>{{scope.row.nestatus ? scope.row.nestatus.site :"null"}}</p>
                            <p><b>备注：</b>{{scope.row.nestatus ? scope.row.nestatus.remark :"null"}}</p>
                        </div>
<!--                        显示更新状态详细信息的表单-->
                        <div class="updateStatus" v-else>
                            <p><label><el-row>
                                <el-col :span="7">状态: </el-col>
                                <el-col :span="17">
                                    <el-select v-model="target_status.status_name"
                                               size="mini"
                                               placeholder="选择状态"
                                    >
                                        <el-option
                                                v-for="(item,index) in status"
                                                :key="index"
                                                :label="item.remark"
                                                :value="item.name">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row></label></p>
                            <p><label><el-row>
                                <el-col :span="7">时间: </el-col>
                                <el-col :span="17"><div style="display: inline-block">
<!--                                    <el-input size="mini" v-model="target_status.date"></el-input>-->
                                    <el-date-picker
                                            size="mini"
                                            v-model="target_status.date"
                                            type="datetime"
                                            placeholder="选择日期时间">
                                    </el-date-picker>
                                </div></el-col>
                            </el-row></label></p>
                            <p><label><el-row>
                                <el-col :span="7">设备位置: </el-col>
                                <el-col :span="17"><div style="display: inline-block">
                                    <el-input size="mini" v-model="target_status.site"></el-input></div>
                                </el-col>
                            </el-row></label></p>
                            <p><label><el-row>
                                <el-col :span="7">备注: </el-col>
                                <el-col :span="17"><div style="display: inline-block">
                                    <el-input size="mini" v-model="target_status.remark"></el-input>
                                </div></el-col>
                            </el-row></label></p>
                        </div>
                        <div style="text-align: right">
                            <div v-if="isShowStatus">
                                <el-link type="primary" @click.native="editStatus(scope.row)">编辑</el-link>
                            </div>
                            <div v-else>
                                <el-button type="primary" size="mini" @click.native="confirmUpdateStatus(scope.row)">确定</el-button>
                                <el-button type="" size="mini" @click.native="cancleUpdateStatus" >取消</el-button>
                            </div>


                        </div>
                        <div slot="reference" class="name-wrapper">
                            <el-tooltip class="item" effect="dark" :content="'点击查看状态详情'" placement="top">
                                <div class="status_name">
                                <el-tag
                                        v-for="(item,index) in status"
                                        v-show="showStatus(item.name,scope.row) "
                                        :key="index"
                                        size="medium"
                                        :type="item.show_type"
                                        closable
                                        @close="handleTagClose(scope.row,item)"
                                >{{item.remark}}
                                </el-tag>
                                </div>
                            </el-tooltip>

                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    align="right"
                    label="操作"
                    width="180"
            >
                <template slot="header" >
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete-solid"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getNetEquipList,finAllstatus_type,deleteStatus,addStatus,updateStatus} from "@/network/NetEquipList";

    export default {
    name: "NetEquipList",
    data(){
      return{
        search:null,
        NEform:[],
        status:[],
        target_status:{},//用于引用表单中scope.row的nestatus，便于更新操作
        isShowStatus:true,
        isShowPopover:false,

      }
    },
      computed:{

      // 用status数据生成一个筛选数组对象
        fitter_status(){
            const mapper = this.status.map(item =>{
              //1.处理数据,返回指定的格式
              //防止从null中读取属性
                if(item.remark !== null && item.name !== null)
                    {
                      return {
                        text : item.remark,
                        value : item.name
                      }
                    }else{
                      return {
                        text : "",
                        value : ""
                      }
                    }
                });
            // 多添加一个筛选空status项
            mapper.push({
              text : "空状态",
              value : null
            })

            return  mapper;
        }
      },
    methods:{
      /**
       * 设备状态操作
       * */
      //添加状态
      AddStatus(row,type){
        class NEstatus{
          constructor(){
            this.neid = "";
            this.status_name = "";
            this.date = null;
            this.site = '';
            this.remark = '';
          }

        }
        const nEstatus = new NEstatus();
        nEstatus.neid = row.neid;
        nEstatus.status_name = type;

        addStatus(nEstatus).then(res => {
          if(res.data === "success"){
            this.$notify({
              title:"设备状态更新通知",
              type:"success",
              duration:1000,
              message:"状态添加成功！"
            })
            this.NEloadData();
          }
          else
          {
           this.$notify.error({
             title:"设备状态更新通知",
             duration:1000,
             message:"状态更新失败！"
           })
          }

        }).catch(error => {
          console.log(error)
          this.$notify.error({
            title:"设备状态更新通知",
            duration:1000,
            message:"状态更新失败！"
          })
        })
    },
      //点击编辑状态按钮
      editStatus(row){
        if(row.nestatus !== null){
          //注意！，这里只是引用
          this.target_status = row.nestatus;
          this.isShowStatus = !this.isShowStatus;
        }
      },
      //确定更新状态
      confirmUpdateStatus(row){
        if(row.nestatus !== null){
          //1. 提交
          console.log("submit",row.nestatus);
          updateStatus(row.nestatus).then(res => {
            if (res.data === 1){
            this.$notify({
              title: "消息通知",
              type: 'success',
              duration:1000,
              message: "更新设备状态成功状态。"
            });
            }else{
              this.$notify.error({
                title: "消息通知",
                message: "更新操作失败！",
                duration:1000,
              })
            }
            // 刷新数据
            this.NEloadData();
          }).catch(error => {
            console.log(error);
            this.$notify.error({
              title: "消息通知",
              message: "更新操作失败！",
              duration:1000,
            })
          })

          //2. 取消显示输入框
          this.isShowStatus = !this.isShowStatus;
        }
      },
      //取消更新状态
      cancleUpdateStatus(){
        //1.取消显示输入框
        this.isShowStatus = !this.isShowStatus;
        // //2. 清空表单
        // this.target_status = {
        //     neid:'',
        //     status_name:'',
        //     date:'',
        //     site:'',
        //     remark:''
        // }

      },
      //筛选状态
      filterStatus(value, row){
        //防止null引用属性，需要判断row.nestatus是否为null
        if(row.nestatus !== null){
          return value === row.nestatus.status_name;
        }
        else return row.nestatus === value;
      },
      showStatus(name,row){
        if(row.nestatus !== null && row.nestatus !== undefined){
          return name === row.nestatus.status_name;
        }else {
          return false
        }
      },
      handleEdit(index,row){
        console.log(index,row)
      },
      handleDelete(index,row){
        console.log(index,row)
      },
      handleTagClose(row,item){
        this.$confirm("取消设备 ["+row.name+"] 的 ["+item.remark+"] 状态?","设备状态更新提示",{
          confirmButtonText:'确定',
          cancelButtonText:"取消",
          duration:1000,
          type:"warning"
        }).then(()=>{
          // 提交请求
          // console.log("before sned request...")
          if (row.nestatus === null){
            this.$notify({
              title:"消息通知",
              type:"warning",
              duration:1000,
              message:"不能删除默认状态！"
            })
          }else {
            deleteStatus(row.neid, row.nestatus.status_name).then(() => {
              // console.log("sned request...")
              this.$notify({
                title: "消息通知",
                type: 'success',
                duration:1000,
                message: "成功取消 [" + row.name + "] 的 [" + item.remark + "] 状态。"
              });
              // 刷新数据
              this.NEloadData();
            }).catch(error => {
              console.log(error);
              this.$notify.error({
                title: "消息通知",
                message: "操作失败！",
                duration:1000,
              })
            })
          }
        }).catch(() =>{
          this.$notify({
            type:"warning",
            title:"消息通知",
            message:"取消操作",
            duration:1000,
          })
        });
      },
      // 状态显示框隐藏时
      popoverHide(){
        console.log("popoverHide...");
        //如果显示更新状态输入框，则取消显示
        if(this.isShowStatus === false) this.isShowStatus = !this.isShowStatus;
      },
      /**
       * 网络请求
       * */
      NEloadData(){
        getNetEquipList().then(res =>{
          this.NEform = res.data;
          // console.log("NEform:")
          // console.log(this.NEform);
        }).catch(erro =>{
          console.log(erro);
        })
      },
      finAllstatus_type(){
        finAllstatus_type().then(res =>{
          this.status = res.data;
        }).catch(res => {
          console.log(res);
        })
      }
    },
    created(){
      this.finAllstatus_type();
      this.NEloadData();
    }
  }
</script>

<style scoped>
    #NetEquipList{
        text-align: left;
    }
    .status_name{
        display: inline-block;
        position: relative;
        z-index: 20;
    }
    .status_name:hover{
        cursor: pointer;
    }

</style>