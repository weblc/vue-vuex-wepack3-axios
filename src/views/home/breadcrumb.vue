<template>
    <el-breadcrumb separator="/" class="breadcrumb-contain">
        <el-breadcrumb-item v-for="(item,index) in levelList">
            <span v-if="index==levelList.length-1||item.redirect==='noredirect'" class="no-redirect">{{item.name}}</span>
            <router-link v-else :to="item.path">{{item.name}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
   
</template>
<script>
    export default {
        name: '',
        data () {
            return {
                levelList: ''
            };
        },
        created () {
            this.getBreadcrumb();
        },
        methods: {
            getBreadcrumb: function () {
                let matched = this.$route.matched.filter(item => item.name);
                var first = matched[0];
                if (first && (first.name !== '首页' || first.path !== '')) {
                    matched = [{ name: '首页', path: '/' }].concat(matched);
                }
                this.levelList = matched;
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb();
            }
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" >
    .breadcrumb-contain.el-breadcrumb {
         font-size: 14px;
        line-height: 50px;
        margin: 0 20px 0 0;
        .no-redirect {
      color: #97a8be;
      cursor: text;
      .el-breadcrumb__inner{
          font-weight: normal;
          a{
            font-weight: normal;
          }
      } 
     
    }
    }
</style>