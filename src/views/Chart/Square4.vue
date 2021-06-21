<template>
  <div class="box">
    <div class="column">
          <span class="item">
            <div :id="'reg'" style="width: 800px; height: 400px; background-color: #FFFFFF"/>
          </span>
      <span class="item">
            <div :id="'end'" style="width: 800px; height: 400px; background-color: #FFFFFF"/>
          </span>
    </div>
    <div class="column">
          <span class="item">
            <div :id="'all'" style="width: 800px; height: 400px; background-color: #FFFFFF"/>
          </span>
      <span class="item">
            <ranklist chartid="chart4" />
          </span>
    </div>
  </div>
</template>

<script>
import Ranklist from './Ranklist'
import { getAssAct } from '@/api/assData'
import * as echarts from 'echarts'

export default {
  name: 'Square4',
  components: { Ranklist },
  data () {
    return {
      asslist: [],
      registering: [],
      ended: [],
      all: []
    }
  },
  created () {
    this.getAssActStatistics()
  },
  methods: {
    async getAssActStatistics () {
      const { data } = await getAssAct()
      const assact = data.data.assact
      const assSet = new Set()
      const regMap = new Map()
      const endMap = new Map()
      const allMap = new Map()
      assact.forEach(rcd => {
        assSet.add(rcd.assName)
        let cnt = rcd.cnt
        if (rcd.state === '报名中') regMap.set(rcd.assName, cnt)
        if (rcd.state === '活动结束') endMap.set(rcd.assName, cnt)
        if (allMap.has(rcd.assName)) cnt += allMap.get(rcd.assName)
        allMap.set(rcd.assName, cnt)
      })

      this.asslist = [...assSet]
      for (const ass of this.asslist) {
        this.registering.push(regMap.has(ass) ? regMap.get(ass) : 0)
        this.ended.push(endMap.has(ass) ? endMap.get(ass) : 0)
        this.all.push(allMap.has(ass) ? allMap.get(ass) : 0)
      }
      console.log('|', this.asslist)

      this.drawChart('reg', '报名中 - 活动数量', this.asslist, this.registering)
      this.drawChart('end', '已结束 - 活动数量', this.asslist, this.ended)
      this.drawChart('all', '活动总数', this.asslist, this.all)
    },
    drawChart (chartid, title, xdata, ydata) {
      var myChart = echarts.init(document.getElementById(chartid))
      console.log('|<', xdata)
      var option = {
        title: {
          text: title,
          left: 'center'
        },
        xAxis: {
          type: 'category',
          data: xdata
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: ydata,
          type: 'bar'
        }]
      }
      option && myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

.box {
  display: flex;
  flex-wrap: wrap;
  align-content: space-around;
}

.column {
  flex-basis: 100%;
  display: flex;
  justify-content: space-around;
}

.item {
  margin: 10px;
}
</style>
