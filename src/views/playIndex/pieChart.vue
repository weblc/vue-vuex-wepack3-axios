<template>
  <div  :style="{height:height,width:width}">

  </div>
</template>

<script>
 export default {
     data () {
         return {

         };
     },
     components: {

     },
     props: {
         width: {
             type: String,
             default: '100%'
         },
         height: {
             type: String,
             default: '350px'
         }
     },
     mounted () {
         this.initChart();
     },
     methods: {
         initChart () {
             let pieChart = this.$echarts.init(this.$el);
             pieChart.setOption({
                 title: {
                     text: '南丁格尔玫瑰图',
                     subtext: '纯属虚构',
                     x: 'center'
                 },
                 tooltip: {
                     trigger: 'item',
                     formatter: '{a} <br/>{b} : {c} ({d}%)'
                 },
                 legend: {
                     x: 'center',
                     y: 'bottom',
                     data: ['rose1','rose2','rose3','rose4','rose5','rose6','rose7','rose8']
                 },
                 //  toolbox: { //支持下载到本地
                 //      show: true,
                 //      feature: {
                 //          mark: {show: true},
                 //          dataView: {show: true, readOnly: false},
                 //          magicType: {
                 //              show: true,
                 //              type: ['pie', 'funnel']
                 //          },
                 //          restore: {show: true},
                 //          saveAsImage: {show: true}
                 //      }
                 //  },
                 calculable: true,
                 series:
                     {
                         name: '面积模式',
                         type: 'pie',
                         radius: [30, 110],
                         center: ['35%', '50%'],
                         roseType: 'area',
                         data: [
                             {value: 10, name: 'rose1'},
                             {value: 5, name: 'rose2'},
                             {value: 15, name: 'rose3'},
                             {value: 25, name: 'rose4'},
                             {value: 20, name: 'rose5'},
                             {value: 35, name: 'rose6'},
                             {value: 30, name: 'rose7'},
                             {value: 40, name: 'rose8'}
                         ]
                     }
 
             });
         }
     }
 
 };
</script>

<style lang='scss' rel='stylesheet/scss' scoped>

 
</style>
