<template>

    <div class="login-form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item  prop="user">
                <span class="svg-container">
                    <icon-svg icon-class="icon-youxiang"></icon-svg>
                </span>
                <el-input type="text" v-model="ruleForm.user" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item  prop="pass">
                 <span class="svg-container">
                    <icon-svg icon-class="icon-mima"></icon-svg>
                </span>
                <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="handleLogin('ruleForm')" :loading="loading">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {mapGetters} from 'vuex';
    export default {
        name: 'loginform',
        data () {
            var validateUser = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    if (this.ruleForm.pass !== '') {
                        this.$refs.ruleForm.validateField('pass');
                    }
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else if (value.length < 6) {
                    callback(new Error('密码长度至少大于6位'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    user: 'webl_c@163.com',
                    pass: '123456'
                },
                rules: {
                    user: [{
                        validator: validateUser,
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }]
                },
                loading: false
            };
        },
        methods: {
            handleLogin (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('LoginCheck', this.ruleForm).then((data) => {
                            this.loading = false;
                            this.$router.push({ path: '/' });
                        }).catch(err => {
                            this.loading = false;
                            this.$message.error('' + err + '');
                        });
                    } else {
                        this.$message({
                            type: 'error',
                            duration: 1000,
                            message: '输入有误'
                        });
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }

        },
        computed: {
            ...mapGetters([
                'user'
            ])
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "src/css/mixin.scss";
    .login-form {
        .svg-container {
            font-size: 20px;
            padding: 0px 5px 6px 15px;
            position: absolute;
            z-index: 2;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 85%;
        }
        input{
            padding: 0px 20px 0px 50px;
        }
    }
</style>