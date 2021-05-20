<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.name" >
    </el-page-header>
    <!--车辆列表卡片-->
    <el-card class="box-card" style="margin-top: 20px">
      <!--表格内容显示区域-->
<!--      @row-dblclick='handleTaskItemClick'-->
      <el-table
        v-loading="loading"
        :data="activityList"
        border
        max-height="380px"
        style="width: 100%;">
        <el-table-column
          prop="activityId"
          label="活动编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="activitySub"
          label="活动主题"
          width="150">
        </el-table-column>
        <el-table-column
          prop="activityContent"
          label="内容"
          width="150">
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
          label="状态"
          width="100">
        </el-table-column>
        <el-table-column
          prop="activityScore"
          label="活动分值"
          width="60">
        </el-table-column>
        <el-table-column
          prop="activityLeaderName"
          label="申报社长"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.userId)"></el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.userId)"></el-button>
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

import { findAssActivityPage } from '@/api/activity'

export default {
  name: 'AssItem',
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
      loading: true
    }
  },
  created () {
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
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
