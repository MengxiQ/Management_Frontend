<template>
    <div id="Emplist">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click.native="addEmp">添加员工</el-button>
<!--        data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"-->
        <el-table
                :data="table"
                max-height="480"
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="ID"
                    prop="id"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="姓名"
                    prop="lastName">
            </el-table-column>
            <el-table-column
                    label="email"
                    prop="email">
            </el-table-column>
            <el-table-column
                    label="性别"
                    prop="emp_gender" >
            </el-table-column>
            <el-table-column
                    label="部门"
                    prop="departmentName">
            </el-table-column>
            <el-table-column
                    align="right"
                    label="操作"
                    width="180"
            >
<!--                slot-scope="scope"-->
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
        <!--              如果提交了就重新加载数据-->
        <Edit :isshow="isShowEdit"
              @getPoint="dialogClose"
              :s_empData="s_empData"
              :department="department"
              :title="dialogTitle"
              :action="action"
        />
    </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
    import {getEmplist,getDepartment,deleteEmp} from "@/network/emplist";
    import Edit from "@/views/manage/Empmanage/EmpList/Edit";
    export default {
    name: "Emplist",
      components: {Edit},
      data(){
      return {
        table:[],
        search:'',
        isShowEdit:false,
        //传给弹出窗口的信息
        s_empData:{},
        department:{},
        dialogTitle:"编辑员工信息",
        action:"",
      }
    },
    methods:{
      handleEdit(index, row){
        //重复点击同一按钮的bug，这里为了使数据更新
        this.s_empData = null;

        console.log("编辑->");
        console.log(row)
        this.dialogTitle = "编辑员工信息";
        this.action = "put";
        this.s_empData = row;
        this.isShowEdit = true;

      },
      handleDelete(index,row){
        // console.log(index, row);
        console.log("删除？"+row)
        this.$confirm('此操作将永久删除该员工信息 (id:'+row.id+' , '+row.lastName+') , 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteEmp(row.id).then(()=>{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.loadData();
          }).catch(()=>{
            this.$message.error('删除失败!');
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
      dialogClose(isSubmit){
        this.isShowEdit = false;
        if(isSubmit) this.loadData();
        //清空数据
        this.s_empData={
          id:"",
          lastName:"",
          gender:"",
          email:"",
          d_id:""
        }
      },
      //对话框：确认
      handleClose(){


      },
      confirm(){
        // deleteEmp(this.EmpId).then(res => {
        //   alert("删除成功"+res);
        //   this.loadData();
        // }).catch(error => {
        //   alert("删除失败"+error);
        // });
        // this.EmpId = null;
        // this.dialogVisible = false;
      },
      addEmp(){
        this.dialogTitle = "添加员工";
        this.action = "post";
        this.isShowEdit = true;
      },
      /**
       * Network Info
       * */
      loadData(){
        getEmplist().then(res => {
          console.log(res.data);
          this.table = res.data;
        }).catch(error =>{
            console.log("emlist=>请求所有员工信息出错："+error)
          }
        )
      }


    },
      created(){
        console.log("emplist.log");
        // //1.请求所有员工的数据
        this.loadData();
        // getEmplist().then(res => {
        //   // console.log(res.data);
        //   this.table = res.data;
        // }).catch(error =>{
        //   console.log("emlist=>请求所有员工信息出错："+error)
        //   }
        // )
        //2.请求所有的部门信息
        getDepartment().then(res =>{
          this.department = res.data;
        }).catch(error =>{
          console.log("emlist=>请求所有的部门信息出错:"+error);
        })
      },



  }
</script>

<style scoped>
    #Emplist{
        text-align: left;
    }
</style>