<template>
        <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.path">
            <slidebar-item :routes='routers' ></slidebar-item>
        </el-menu>
</template>
<script>
    import { mapGetters } from 'vuex';
    import slidebarItem from './slidebarItem';
    export default {
        name: '',
        components: {slidebarItem},
        computed: {
            ...mapGetters([
                'routers'
            ])
        },
        mounted: function () {
    
        },
        data () {
            return {};
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" >

  
</style>