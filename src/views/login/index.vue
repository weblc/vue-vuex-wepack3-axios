<template>
    <div class="login">
        <div class="login-form-box">
            <loginform></loginform>
        </div>
    </div>
</template>

<script>
    import loginform from './loginForm';
    export default {
        name: 'login',
        components: {
            loginform
        },
        data () {
            return {

            };
        },
        methods: {},
        cteated: function () {

        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .login {
        background: url("../../images/background.jpg");
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-start;
        padding-left: 20px;
        .log-table {
            width: 500px;
            background: red;
        }
        .login-form-box {
            padding: 20px;
            border: 1px solid #ccc;
            width: 450px;
            position: absolute;
            z-index: 100;
            top: 50%;
            right: 0;
            transform: translate(-20%, -50%);
        }
    }
</style>