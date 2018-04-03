<template>
    <div>
        <el-row :gutter="50">
            <el-col :span="24">
                <user-info></user-info>
            </el-col>
        </el-row>
        <el-row :gutter="50">
            <el-col :span="10">
                 <pieChart></pieChart>
            </el-col>
           <el-col :span="14">
              <loginNumChart></loginNumChart>
            </el-col>
            
        </el-row>
    </div>
</template>
<script>
    import userInfo from './userInfo';
    import loginNumChart from './loginNumChart';
    import pieChart from './pieChart';
    export default {
        name: '',
        data () {
            return {};
        },
        components: {
            userInfo,
            loginNumChart,
            pieChart
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-row {
    margin-bottom: 50px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>