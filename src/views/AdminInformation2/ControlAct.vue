<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>活动审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-card class="box-card" style="margin-top: 20px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item label="社团" style="margin-left: 10px">
            <el-select v-model="formInline.assName" clearable placeholder="请选择社团">
              <el-option
                v-for="item in assList"
                :key="item.assId"
                :label="item.assName"
                :value="item.assName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="活动状态" style="margin-left: 10px">
            <el-select v-model="formInline.activityState" placeholder="活动状态">
              <el-option label="审核中" value="审核中" style="color: red"></el-option>
              <el-option label="报名中" value="报名中" style="color: blue"></el-option>
              <el-option label="活动结束" value="活动结束" style="color: green"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 10px"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getApplyActivity">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <el-table
        v-loading="loading"
        :data="activityList"
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
          <template slot-scope="scope">
            <span  v-if="scope.row.activityState == '审核中'" style="color: red;">审核中</span>
            <span  v-if="scope.row.activityState == '报名中'" style="color: blue;">报名中</span>
            <span  v-if="scope.row.activityState == '活动结束'" style="color: green;">活动结束</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="activityScore"
          label="活动分值"
          width="80">
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
            <el-button v-if="scope.row.activityState==='审核中'" type="warning" size="mini" icon="el-icon-circle-check" @click="showEndConcentDialog(scope.row)">通过</el-button>
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

import { findApplyActivity } from '@/api/activity'
import { findAssList } from '@/api/assData'

export default {
  name: 'ControlAct',
  data () {
    return {
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      activityList: [],
      loading: false,
      formInline: {
        // eslint-disable-next-line no-undef
        assName: '',
        // eslint-disable-next-line no-undef
        activityState: ''
      },
      assList: []
    }
  },
  created () {
    if (this.$route.query.assName != null) {
      this.formInline.assName = this.$route.query.assName
      this.formInline.activityState = this.$route.query.activityState
    }
    this.getAssList()
    this.getApplyActivity()
  },
  methods: {
    async getApplyActivity () {
      const { data } = await findApplyActivity(this.current, this.pageSize, this.formInline.assName, this.formInline.activityState)
      this.activityList = data.data.activities
      this.total = data.data.total
      console.log(data)
    },
    resetForm () {
      this.formInline.assName = ''
      this.formInline.activityState = ''
      this.getApplyActivity()
    },
    async getAssList () {
      const { data } = await findAssList()
      console.log(data)
      this.assList = data.data.Ass
    },
    showConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity2/' + e.activityId + '/content2', query: { activity: e, assName: this.$route.query.name } })
    },
    showEndConcentDialog (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity2/' + e.activityId + '/endcontent2', query: { activity: e, assName: this.$route.query.name } })
    },
    handleAssItemClick (e) {
      console.log(e.activityId)
      this.$router.push({ path: '/activity2/' + e.activityId + '/content2', query: { activity: e, assName: this.$route.query.name } })
    }
  }
}
</script>

<style scoped>

</style>
