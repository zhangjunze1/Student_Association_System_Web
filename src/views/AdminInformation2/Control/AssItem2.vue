<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.name" >
    </el-page-header>

    <el-card class="box-card" style="margin-top: 20px">
      <!--表格内容显示区域-->
      <!--      @row-dblclick='handleTaskItemClick'-->

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
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="deleteActivity(scope.row)"></el-button>
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

import { deleteActivityByActivityId, findAssActivityPage } from '@/api/activity'

export default {
  name: 'AssItem2',
  data () {
    return {
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      activityList: [],
      ass: [],
      loading: true,
      // 是否在该社团中
      ifInAss: this.$route.query.state
    }
  },
  created () {
    // eslint-disable-next-line eqeqeq
    console.log(this.$route.query.state)
    this.getAssActivity()
    console.log(this.$route.params.assId)
    console.log(this.$route.query.name)
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    async getAssActivity () {
      const { data } = await findAssActivityPage(this.current, this.pageSize, this.$route.params.assId)
      this.activityList = data.data.activities
      console.log(data)
      this.total = data.data.total
      this.loading = false
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
      this.getAssActivity()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAssActivity()
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
      this.$router.push({ path: '/activity2/' + e.activityId + '/activityMember', query: { activity: e, assName: this.$route.query.name } })
    },
    async deleteActivity (e) {
      const confirmResult = await this.$confirm('此操作将永久删除该活动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const { data } = await deleteActivityByActivityId(e.activityId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '<' + e.activitySub + '>已删除',
          type: 'success',
          duration: 2000
        })
      }
      this.getAssActivity()
      console.log(data)
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
