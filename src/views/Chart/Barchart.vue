<template>
  <div :id="chartid" style="width: 800px; height: 400px; background-color: #FFFFFF"/>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'Barchart',
  props: ['chartid', 'xdata', 'ydata', 'title'],
  data () {
    return {
      mychartid: null,
      myxdata: null,
      myydata: null,
      mytitle: null
    }
  },
  computed: {
    myChart () {
      return echarts.init(document.getElementById(this.chartid))
    }
  },
  created () {
    console.log(Date())
  },
  mounted () {
    this.mychartid = this.chartid
    this.myxdata = this.xdata
    this.myydata = this.ydata
    this.mytitle = this.title

    var option = {
      title: {
        text: this.mytitle,
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: this.myxdata
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: this.myydata,
        type: 'bar'
      }]
    }
    option && this.myChart.setOption(option, true)
  },
  methods: {
    updateBarChart () {
      console.log('1112' + this.xdata)
      var option = {
        title: {
          text: this.mytitle,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: this.myxdata
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: this.myydata,
          type: 'bar'
        }]
      }
      this.myChart.setOption(option, true)
    }
  }
}

</script>

<style scoped>

</style>
