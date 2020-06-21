<template>
    <el-dialog :title="title"
               :visible="isshow"
               @close="close(false)"
               width="40%"
    >
        <el-form label-position="left"
                 label-width="80px"
                 :rules="rules"
                 v-model="empData"
                 ref="empform"
        >
            <el-form-item label="ID" >
                <el-input disabled v-model="empData.id" placeholder="ID值自动生成"></el-input>
            </el-form-item>
            <el-form-item label="名字" prop="name">
                <el-input v-model="empData.lastName" ></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email" >
            <el-input type="email" v-model="empData.email" ></el-input>
        </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-select v-model="empData.gender" placeholder="请选择性别" >
                    <el-option label="男" :value="1" ></el-option>
                    <el-option label="女" :value="0" ></el-option>
                </el-select>
            </el-form-item>
<!--            :label-width="formLabelWidth"-->
            <el-form-item label="部门" prop="department" >
                <el-select v-model="empData.d_id" placeholder="请选择部门">
<!--                    从服务端查找所有的部门 v-for-->
                    <el-option :label="item.departmentName"
                               :value="item.id" v-for="(item,index) in department"
                               :key="index">

                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close(false)">取 消</el-button>
            <el-button type="primary" @click="submit()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {Emp} from "@/network/emplist";

    export default {
    name: "Edit",
    data(){
      return {
        empData:{
          id:"",
          lastName:"",
          gender:"",
          email:"",
          d_id:""
        },
        formLabelWidth:"100"
        ,
        rules:{
          // name: [
          //   { required: true, message: '请输入员工姓名', trigger: 'blur' },
          //   { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          // ],
          // department: [
          //   { required: true, message: '请选择部门', trigger: 'change' }
          // ],
          // gender:[
          //   {required: true, message: '请选择性别', trigger: 'change'}],
          // email:[
          //   {type: "email",required: true,message: '请输入正确的邮箱', trigger: 'change'},//, pattern: schema.pattern.email
          //   // {validator(rule, value, callback, source, options) {
          //   //     var errors = [];
          //   //     // test if email address already exists in a database
          //   //     // and add a validation error to the errors array if it does
          //   //     return errors;
          //   //   }}
          // ]
        }



        }
    },
    computed:{
    },
    props:{
      s_empData:{},
      isshow:{
        default(){return false}
      },
      department:{},
      title:{},//标题
      action:{}//更新（put）或者添加(post)
    },
    methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            Emp(this.action,this.empData).then(() => {
              // alert("成功"+res);
              this.$message({
                type: 'success',
                message: '添加成功!'
              });
              this.resetForm(formName);
            }).catch(() =>{
              this.resetForm(formName);
              this.$message.error('添加失败！');
            });
          } else {
            this.resetForm(formName);
            this.$message.error('添加失败！')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提交
      submit(){
        console.log(this.empData);
        Emp(this.action,this.empData).then(() => {
          // alert("成功"+res);
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        }).catch(() => {
          //
          this.$message.error('添加失败！')
        });
        this.close(true);

      },
      // 关闭窗口：是否提交
      close(isSubmit){
        // console.log("close..")
        //清空数据
        this.empData={
          id:"",
          lastName:"",
          gender:"",
          email:"",
          d_id:""
        };
        // this.resetForm(this.empData);
        this.$emit('getPoint',isSubmit);
      }
    },
    created(){
    },
    watch:{
      s_empData:{
        immediate:true,
          handler(val){
          this.empData = val;
        }
      }
    }
  }
</script>

<style scoped>

</style>