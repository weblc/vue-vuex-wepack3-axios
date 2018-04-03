<template>
    <div class="app-wrapper" :class="{hideSidebar:sidebar.opened}">
        <slidebar class="slider-contain"></slidebar>    
        <div class="detail-contain">
            <app-nav></app-nav>
            <app-main ></app-main>
        </div>
    </div>
</template>
<script>
    import {slidebar,appMain,appNav} from '@views/home';
    
    export default {
        name: 'home',
        components: {
            slidebar,
            appMain,
            appNav
        },
        computed: {
            sidebar () {
                return this.$store.state.app.sidebar;
            }
        },
        data () {
            return {};
        }
    };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    @import "src/css/mixin.scss";
    .app-wrapper {
        @include clearfix; 
         position: relative;
         width: 100%;
         height: 100%;
	    &.hideSidebar {
			.slider-contain{
				width:51px;
				overflow: hidden;
			}
			.detail-contain {
				margin-left: 51px;
			}
		}
      
        .slider-contain{
           	transition: width 0.28s ease-out;
			width: 180px;
			height: 100%;
			position: fixed;
			top: 0;
			bottom: 0;
			left: 0;
			z-index: 1001;
			overflow-y: auto;
 			&::-webkit-scrollbar {display:none}
             .svg-icon{
                margin-right: 16px;
             }
        }
        
        .detail-contain {
            // background: green;
           	min-height: 100%;
			transition: margin-left 0.28s ease-out;
			margin-left: 180px;
		}
    }
</style>