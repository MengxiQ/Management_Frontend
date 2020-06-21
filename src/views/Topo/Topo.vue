<template>
    <div class="Topo" >
        <el-steps :active="active" align-center finish-status="success" >
            <el-step title="添加设备"></el-step>
            <el-step title="添加连接"></el-step>
            <el-step title="编辑拓步"></el-step>
        </el-steps>
        <step1 v-show="active === 0"></step1>
        <Step2 v-show="active === 1"></Step2>
        <step3 v-show="active === 2 "></step3>
        <el-button @click.native="next">下一步</el-button>
    </div>
</template>

<script>
  import Step1 from "@/views/Topo/step1";
  import Step2 from "@/views/Topo/step2";
  import Step3 from "@/views/Topo/step3";
  export default {
    name: "Topo",
    components: {Step3, Step2, Step1},
    data(){
      return {
        active:0
      }
    },
    methods:{
      next(){
        if(this.active < 3)
        switch (this.active) {
            case 0 :{ alert("确认第一步");this.active++;break}
            case 1 :{ alert("确认第二步");this.active++;break}
            case 2 :{ alert("确认第三步");this.active++;break}
        }
      }
    }
  }
</script>

<style scoped>
    .Topo{
        width: 100%;
        height: 500px;

    }
</style>