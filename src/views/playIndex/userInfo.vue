<template>
    <div class="user-info">
        <div class="user-info-img">
            <img :src="img" alt="">
            <div class="box">
                <div class="column">
                    <li>
                        <span>权限</span>
                        <span>admin</span>
                    </li>
                    <li>
                        <span>登陆地点</span>
                        <span>广州</span>
                    </li>
                </div>
                <div class="column">
                    <li>
                        <span>权限</span>
                        <span>admin</span>
                    </li>
                   <li>
                        <span>登陆地点</span>
                        <span>广州</span>
                    </li>
                </div>
            </div>
        </div>
        <div class="user-info-detail" id='myChart'>
                
        </div>
    </div>
</template>

<script>
    import img from 'src/images/userImage.jpg';
    export default {
        data () {
            return {
                img
            };
        },
        components: {

        },
        mounted () {
            this.drawLine();
        },
        methods: {
            drawLine () {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表
                myChart.setOption({
                    title: { text: '柱状图' },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
    }
    };
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
    @import "src/css/mixin.scss";
    .user-info {
        @include flex-row;
        height: 200px;
        background: bisque;
        .user-info-img {
            width: 200px;
            flex: none;
            margin-right: 50px;
            img {
                border: 1px solid #ccc;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                display: block;
                margin: 20px auto
            }
            .box {
                display: flex;
                flex-wrap: wrap;
                align-content: space-between;
            }
            .column {
                flex-basis: 100%;
                display: flex;
                justify-content: space-between;
                li{
                    margin-bottom: 20px;
                }
            }
        }
        .user-info-detail {

            flex: 1;
        }
    }
</style>