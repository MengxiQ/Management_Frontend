<template>
    <div id="NetEquipList">
        <div class="heard_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>资产管理</el-breadcrumb-item>
                <el-breadcrumb-item>资产概述</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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

<!--    表格-->
<!--        :border="true"-->
        <el-table
                :data="NEform"
                highlight-current-row
                height="430"
                v-loading="loading"
                @select="select"
                @select-all="select"
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
                    prop="ne_type"
                    :filters="fitter_NEtype"
                    :filter-method="filterNEtype"
                    filter-placement="bottom-start"

            >
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
                             filter-placement="bottom-start"
            >
                <template slot-scope="scope">
                    <div class="hoverPoint">
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
                    </div>
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
                                <el-button type="primary" size="mini" @click.native="confirmUpdateStatus()">确定</el-button>
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
                            >删除</el-button>
                        </el-popconfirm>
                    </div>


                </template>
            </el-table-column>
        </el-table>

<!--     分页工具栏-->
<!--        :page-sizes="[10, 20, 50, 100]" // 选择每页显示的多少条的列表选项-->
<!--        :page-size="10"      // 实际每页显示多少条，设置为是上面的类别的默认选项-->
<!--        ::pager-count="9"     //当页码大于9的时候，收起页码 !大于等于 5 且小于等于 21 的奇数-->
        <div style=" margin:8px 0 8px 0">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    @prev-click="prev_click"
                    @next-click="next_click"
                    v-bind:current-page.sync="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-count="pager_count"
                    v-bind:page-size.sync="page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

<!--    编辑设备信息弹出框-->
        <el-dialog :title="EditTitle"
                   :visible="isShowEdit"
                    @close="Editclose"
                   width="40%"
        >
            <el-form label-position="left"
                     label-width="100px"
                     size="mini"
                     v-model="target_networkEquipment"
                     ref="empform"
            >
                <el-form-item label="neid" prop="neid" >
                    <el-input disabled v-model="target_networkEquipment.neid" placeholder="ID值自动生成"></el-input>
                </el-form-item>
                <el-form-item label="uuid" prop="uuid">
                    <el-input v-model="target_networkEquipment.uuid" ></el-input>
                </el-form-item>
                <el-form-item label="mac" prop="mac" >
                    <el-input type="text" v-model="target_networkEquipment.mac" ></el-input>
                </el-form-item>
                <el-form-item label="固定资产标签" prop="fixed_id" >
                    <el-input type="text" v-model="target_networkEquipment.fixed_id" ></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name" >
                    <el-input type="text" v-model="target_networkEquipment.name" ></el-input>
                </el-form-item>
                <el-form-item label="设备型号" prop="unitType" >
                    <el-input type="text" v-model="target_networkEquipment.unitType" ></el-input>
                </el-form-item>
                <el-form-item label="设备类型" prop="NE_type">
                    <el-select v-model="target_networkEquipment.tid" placeholder="请选择设备类型" >
                        <el-option v-for="(item,index) in NEtypes"
                                   :key="index"
                                :label="item.name" :value="item.tid" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="入库时间" prop="stock_date" >
                    <el-date-picker
                            v-model="target_networkEquipment.stock_date"
                            type="datetime"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="备注" prop="remark" >
                    <el-input type="text" v-model="target_networkEquipment.remark" ></el-input>
                </el-form-item>
                <!--            :label-width="formLabelWidth"-->
<!--                <el-form-item label="部门" prop="department" >-->
<!--                    <el-select v-model="target_networkEquipment" placeholder="请选择部门">-->
<!--                        &lt;!&ndash;                    从服务端查找所有的部门 v-for&ndash;&gt;-->
<!--                        <el-option :label="item.departmentName"-->
<!--                                   :value="item.id" v-for="(item,index) in department"-->
<!--                                   :key="index">-->

<!--                        </el-option>-->
<!--                    </el-select>-->
<!--                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="Editsubmit()" size="mini">确 定</el-button>
                <el-button @click="Editclose()" size="mini">取 消</el-button>
            </div>
        </el-dialog>

    </div>
<!--    编辑设备信息弹出框 end-->

</template>

<script>
    // 网络请求
    import {
        addStatus,
        deleteNetworkEquipment,
        deleteStatus,
        finAllstatus_type,
        getAllNEtype,
        getNetEquipList,
        NetworkEquipmentAction,
        updateStatus
    } from "@/network/NetEquipList";
    // 实体类
    import {NEstatus, NetworkEquipment} from "@/entity/NetEquip";

    export default {
    name: "NetEquipList",
    data(){
      return{
        search:null,
        NEform:[],
        target_networkEquipment: new NetworkEquipment(),
        NEtypes:null,//设备类型
        status:[],
        target_status: new NEstatus(),//便于更新操作时绑定表单
        isShowStatus:true,
        isShowPopover:false,
        isShowEdit:false,//是否显示编辑设备详情窗口
        EditTitle:"编辑涉笔详细",
        EditAction:"put",
        //分页
        currentPage:1,
        page_size:10,
        pager_count:9,
        total:400,
          //是否显示加载
          loading:true,
          selection:null//保存着被选中的行
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
            });
            return  mapper;
        },
          //用NEtypes数据生成一个筛选数组对象
          fitter_NEtype(){
            if(this.NEtypes !== null){
                return this.NEtypes.map(item => {
                    //1.处理数据,返回指定的格式
                    //防止从null中读取属性
                    if (item.tid !== null && item.name !== null) {
                        return {
                            text: item.name,
                            value: item.tid
                        }
                    } else {
                        return {
                            text: "",
                            value: ""
                        }
                    }
                });
          }else {
                return []
            }

        }
      },
    methods:{
      /**
       * 设备状态操作
       * */
      //添加状态
      AddStatus(row,type){

        const nEstatus = new NEstatus();
        nEstatus.neid = row.neid;
        nEstatus.status_name = type;
        // 提交
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
          this.target_status.neid = row.nestatus.neid;
          this.target_status.date = row.nestatus.date;
          this.target_status.site = row.nestatus.site;
          this.target_status.remark = row.nestatus.remark;
          this.target_status.status_name = row.nestatus.status_name;
          console.log("edit:",this.target_status);
          this.isShowStatus = !this.isShowStatus;
        }
      },
      //确定更新状态
      confirmUpdateStatus(){
          //1. 提交
          console.log("submit",this.target_status);
          updateStatus(this.target_status).then(res => {
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
        /**
         * 筛选方法
         * */
      //筛选状态
      filterStatus(value, row){
        //防止null引用属性，需要判断row.nestatus是否为null
        if(row.nestatus !== null){
          return value === row.nestatus.status_name;
        }
        else return row.nestatus === value;
      },
        //筛选设备的类型
        filterNEtype(value, row) {
            //防止null引用属性，需要判断row.nestatus是否为null
            if (row.NEtypes !== null) {
                return value === row.tid;
            } else return false;
        },
      showStatus(name,row){
        if(row.nestatus !== null && row.nestatus !== undefined){
          return name === row.nestatus.status_name;
        }else {
          return false
        }
      },
        /**
         * 多选方法
         * */
        //单选触发
        // eslint-disable-next-line no-unused-vars
        select(selection, row){
            this.selection = selection;

        },

        //点击删除选中
        deleteSelection(){
          if(this.selection !== null){
              //这里有待优化！
              this.$confirm("是否删除选中的所有条目？","提示",{
                  type:'error'
                  }
              ).then(() =>{
                  this.selection.forEach((item,index) => {
                      console.log(item,index);
                      deleteNetworkEquipment(item.neid);
                      //只需要判断index和长度就可以知道是否执行完成！但是，操作可能没有完成,
                      //建议后面改成返送一次服务器处理一次的方法
                      if (this.selection.length -1  === index){
                          console.log(index);
                          deleteNetworkEquipment(item.neid).then(() =>{
                                  console.log("complete!");
                                  this.NEloadData();
                                  this.$message({
                                      type:"success",
                                      message:"全部删除完成！"
                                  })
                          })

                      }else{
                          deleteNetworkEquipment(item.neid);
                      }
                  });
              }).catch(() =>{
                  this.$message({
                      message:'已经取消操作。！'
                  });
              });
          }else {
              this.$message({
                  message:'没有选中任何条目！'
              });
          }
        },

      /**
       * 编辑窗口
       * */
      // 关闭编辑设备窗口
      Editclose(){
        this.isShowEdit = false;
      },
      // 提交编辑
      Editsubmit(){
        // console.log("submit..,")
        // console.log(this.target_networkEquipment);
        NetworkEquipmentAction(this.target_networkEquipment,this.EditAction).then(res => {
          if(res.data === 1){
            this.$notify({
              title:"设备信息跟新通知",
              type:'success',
              message:"[" + this.target_networkEquipment.name + "]更新成功。"
            })
            //重新加载数据
            this.NEloadData()
          }else {
            this.$notify.error({
              title:"设备信息更新通知",
              message:"[" + this.target_networkEquipment.name + "]更新失败。"
            })
          }
        }).catch(error =>{
          this.$notify.error({
            title:"设备信息更新通知",
            message:"[" + this.target_networkEquipment.name + "]更新失败。"+error
          })
        });
        this.Editclose();
      },
      /**
       * 编辑设备信息
       */
      //点击编辑设备
      handleEdit(index,row){
        // 设置弹出框的操作方法
        this.EditTitle = "编辑设备详情";
        this.EditAction = "put";//更新

        this.target_networkEquipment.neid = row.neid;
        this.target_networkEquipment.fixed_id = row.fixed_id;
        this.target_networkEquipment.mac = row.mac;
        this.target_networkEquipment.name = row.name;
        this.target_networkEquipment.ne_type = row.ne_type;
        this.target_networkEquipment.nestatus =  row.nestatus;
        this.target_networkEquipment.remark = row.remark;
        this.target_networkEquipment.stock_date = row.stock_date;
        this.target_networkEquipment.tid = row.tid;
        this.target_networkEquipment.unitType = row.unitType;
        this.target_networkEquipment.uuid = row.uuid;

        this.isShowEdit = true;
      },
      /**
       * 删除设备
       */
      //确认删除
      deleteNEConfirm(neid){
        deleteNetworkEquipment(neid).then(res => {
          if(res.data === 1){
            this.$notify({
              title:"设备信息删除通知",
              type:'success',
              message:"删除设备成功。"
            })
            //重新加载数据
            this.NEloadData()
          }else {
            this.$notify.error({
              title:"设备信息删除通知",
              message:"删除失败。"
            })
          }
        }).catch(error =>{
          this.$notify.error({
            title:"设备信息删除通知",
            message:"删除失败。"+error
          })
        });

      },
    /**
     * 添加设备
     * */
      clickAddEquip(){
        // 设备弹出框的操作方法
      this.EditTitle = "添加网络设备信息";
      this.EditAction = "post";//添加


      this.target_networkEquipment.neid = '';
      this.target_networkEquipment.fixed_id = '';
      this.target_networkEquipment.mac = '';
      this.target_networkEquipment.name = '';
      this.target_networkEquipment.ne_type = '';
      this.target_networkEquipment.nestatus =  null;
      this.target_networkEquipment.remark = '';
      this.target_networkEquipment.stock_date = '';
      this.target_networkEquipment.tid = '';
      this.target_networkEquipment.unitType = '';
      this.target_networkEquipment.uuid = '';

      this.isShowEdit = true;
    },

      /**
       * 删除设备状态
       */
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
        // console.log("popoverHide...");
        //如果显示更新状态输入框，则取消显示
        if(this.isShowStatus === false) this.isShowStatus = !this.isShowStatus;
      },
      /**
       * 分页
       * */
      //更改每页显示数量
      handleSizeChange(){
        alert("page_size:"+this.page_size)
      },
      //更改页码
      handleCurrentChange(){
        alert(this.currentPage)
      },
      //点击上一页
      prev_click(){
        alert(this.currentPage)
      },
      //点击下一页
      next_click(){
        alert(this.currentPage)
      },
      /**
       * 网络请求
       * */
      NEloadData(){
          // 显示加载中
          this.loading = true;
        getNetEquipList().then(res =>{
          this.NEform = res.data;
          //加载完成
            this.loading = false;
          // console.log("NEform:")
          // console.log(this.NEform);
        }).catch(erro =>{
          console.log(erro);
          this.$notify.error({
              duration: 0,
              message:"加载数据失败，请手动刷新"
          })
        })
      },
      finAllstatus_type(){
        finAllstatus_type().then(res =>{
          this.status = res.data;
        }).catch(res => {
          console.log(res);
        })
      },
      getAllNEtype(){
        getAllNEtype().then(res => {
          this.NEtypes = res.data;
        }).catch(error =>{
          console.log("获取所有的设备类型失败！")
          console.log(error)
        })
      }
    },
    created(){
      this.finAllstatus_type();
      this.NEloadData();
      this.getAllNEtype();

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
    .hoverPoint:hover{
        cursor: pointer;
    }
    .btn-mini{
        display: inline-block;
        margin-left: 8px;
    }

</style>