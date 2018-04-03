<template>
    <ul class="app-nav">
          <div @click="toggleSlide()" class="slide-contral" :class="{ sliderBarHidden: sidebar.opened}"> <icon-svg icon-class="icon-shuxian" ></icon-svg></div>
          <breadcrumb></breadcrumb>
          <tag-view></tag-view>
    </ul>
</template>
<script>
 import { mapGetters } from 'vuex';
 import breadcrumb from './breadcrumb';
 import tagView from './tagView';
export default {
     name: 'appNav',
     computed: {
         ...mapGetters([
             'sidebar'
         ])
     },
     components: {
         breadcrumb,
         tagView
     },
     data () {
         return {
         };
     },
     methods: {
         toggleSlide: function () {
             this.$store.dispatch('ToggleSideBar');
         }
     }
};
</script>
<style lang="scss" rel="stylesheet/scss" >
    .app-nav{
        list-style: none;
        background-color:#eef1f6;
        display: flex;
        height: 50px;
        line-height: 50px;
        .slide-contral{
            margin:0 20px;
            font-size: 24px;
            cursor: pointer;
            transition: transform 0.28s ease-out;
            &.sliderBarHidden{
                transform: rotate(90deg);
             }
        }
    }
</style>