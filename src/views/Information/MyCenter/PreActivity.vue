<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的中心</el-breadcrumb-item>
        <el-breadcrumb-item>活动记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card" style="margin-top: 20px">
      <!--表格内容显示区域-->
      <!--      @row-dblclick='handleTaskItemClick'-->

    <el-table
      v-loading="loading"
      :data="myActivityList"
      @row-dblclick='handleAssItemClick'
      border
      max-height="380px"
      style="width: 100%;">
      <el-table-column
        prop="activityId"
        label="活动编号"
        width="80">
      </el-table-column>
      <el-table-column
        prop="activitySub"
        label="活动主题"
        width="150">
      </el-table-column>
      <el-table-column
        prop="activityContent"
        label="内容"
        width="70">
        <template slot-scope="scope">
          <span  v-if="scope.row.activityContent != ''" style="color: black;">略</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="activityStartTime"
        label="开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="activityFinishTime"
        label="结束时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="activityState"
        label="活动状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="activityScore"
        label="活动分值"
        width="100">
      </el-table-column>
      <el-table-column
        prop="activityLeaderName"
        label="申报社长"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="showConcentDialog(scope.row)">报名通知</el-button>
          <el-button v-if="scope.row.activityState==='活动结束'&&scope.row.activityEndContent!=''" type="primary" size="mini" icon="el-icon-search" @click="showEndConcentDialog(scope.row)">活动结束</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页功能-->
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        style="padding-top: 20px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[2,6,10,20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    </el-card>

  </div>
</template>

<script>

import { findMyActivityPage } from '@/api/activity'

export default {
  name: 'PreActivity',
  data () {
    return {
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      loading: true,
      myActivityList: []
    }
  },
  created () {
    this.getMyAssActivity()
  },
  methods: {
    async getMyAssActivity () {
      const { data } = await findMyActivityPage(this.current, this.pageSize, this.$root.USER.id)
      this.myActivityList = data.data.activities
      this.total = data.data.total
      this.loading = false
      console.log(data)
    },
    onSubmit () {
      console.log('submit!')
    },
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      this.getMyAssActivity()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getMyAssActivity()
    },
    showConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity/' + e.activityId + '/content', query: { activity: e, assName: this.$route.query.name } })
    },
    showEndConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity/' + e.activityId + '/endcontent', query: { activity: e, assName: this.$route.query.name } })
    }
  }
}
</script>

<style scoped>

</style>
