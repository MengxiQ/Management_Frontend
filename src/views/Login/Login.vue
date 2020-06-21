<template>
    <div id="Login">
                <div class="main">
<!--                    <el-image src="@/assets/images/login/logo.jpg"></el-image>-->
                    <img id="logo" src="@/assets/images/login/logo.jpg">
<!--                    <h1>综合信息管理</h1>-->
                    <h1 class="title">综合信息管理系统</h1>
                    <div class="info">
                    <el-link type="primary">中文</el-link>
                        <span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;</span>
                    <el-link type="info">English</el-link>
                    </div>
                <el-form ref="form"
                         :model="form"
                         label-width="80px"
                >
                    <el-form-item label="用户 " size="small">
                        <el-input type="text" v-model="form.name" placeholder="输入邮箱/手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" size="small" >
                        <el-input type="password" v-model="form.pwd" placeholder="请输入密码" show-password></el-input>
                    </el-form-item>
                    <div class="role">
                    <el-form-item label="角色" size="mini">
                        <el-select v-model="form.role" placeholder="选择角色" >
                            <el-option label="用户" value="user"></el-option>
                            <el-option label="管理员" value="admin"></el-option>
                        </el-select>
                    </el-form-item>
                    </div>
                </el-form>
                    <div class="btn_login">
                    <el-button type="primary" size="medium" @click.native="login()"><div class="mybtn" >登录</div></el-button>
                    </div>
                    <div class="el-table__footer footer" >@MengxiQ</div>
                </div>
    </div>
</template>

<script>
  export default {
    name: "Login",
    data(){
      return {
        form:{
          name:'',
          pwd:'',
          role:''

        } }
    },
    methods:{
      login(){
        console.log(this.form);
        this.$router.push("/manage/")
      }
    }
  }
</script>

<style scoped>
    #Login{
        width: 100%;
        height: 100vh;
        background-color: rgba(182, 182, 182, 0.16);
        display: flex;
        justify-content: center;
    }
    .main{
        height:400px;
        width: 320px;
        border: rgba(182, 182, 182, 0) 1px solid;
        box-shadow:1px 2px 4px rgba(102, 102, 102, 0.18);
        border-radius: 5px;
        background-color: white;
        padding:10px 30px 0 0;
        margin-top: 50px;
        position: relative;
    }
    #logo{
        margin-left: 30px;
        margin-top: 25px;
        height: 150px;
        width: 210px;
        max-width: 100%;

    }
    .role{
        font-size: 12px;
        width: 60%;
    }
    .info{
        /*background-color: #3a8ee6;*/
        margin-top: 5px;
        padding: 5px;
        text-align: right;
        font-size: 8px;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }
    .title{
        position:absolute;
        top: 0;
        left: 0;
        color: #409EFF;
        border-left: 5px  #409EFF solid ;
        padding-left: 10px;
        margin-top: 10PX;
        margin-left: 10px;
        font-size: 20px;
    }
    .footer{
        color: rgba(102, 102, 102, 0.69);
        font-size: 12px;
        text-align: right;
        margin-top: 10px;

    }
    .btn_login{
        width: 75%;
        /*background-color: #3b3b3b;*/
        margin-left: 80px;
        text-align: right;
    }
    .mybtn{
        width:100px;
    }
</style>