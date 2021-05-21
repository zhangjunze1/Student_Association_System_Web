<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社团相关</el-breadcrumb-item>
        <el-breadcrumb-item>社团报名</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card" >
      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="AssList"
        @row-dblclick='handleTaskItemClick'
        border
        max-height="380px"
        style="width: 100%;">
        <el-table-column
          prop="assId"
          label="社团编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="assName"
          label="社团名字"
          width="150">
        </el-table-column>
        <el-table-column
          prop="assPositon"
          label="社团位置"
          width="150">
        </el-table-column>
        <el-table-column
          prop="assTeacher"
          label="指导老师"
          width="150">
        </el-table-column>
        <el-table-column
          prop="assLeader"
          label="社长"
          width="150">
        </el-table-column>
        <el-table-column
          prop="assState"
          label="社团状态"
          width="150">
          <template slot-scope="scope">
            <span  v-if="scope.row.assState == '申请中'" style="color: red;">申请中</span>
            <span  v-if="scope.row.assState == '已通过'" style="color: blue;">已通过</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-circle-plus-outline" @click="addDialog(scope.row.assId)">报名</el-button>
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

import { findAssListPage } from '@/api/assData'

export default {
  name: 'Enroll',
  data () {
    return {
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有社团集合
      AssList: [],
      loading: true
    }
  },
  created () {
    this.getAssListPage()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    // 当每一页条数改变的时候，
    handleSizeChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`每页 ${val} 条`)
      // 将val赋值给size
      this.pageSize = val
      // 重新去后台查询数据
      this.getAssListPage()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAssListPage()
    },
    handleTaskItemClick (e) {
      console.log(e.assName)
      // eslint-disable-next-line eqeqeq
      if (e.assState == '申请中') {
        this.$notify({
          message: '该社团尚未申请成功',
          type: 'warning',
          duration: 1200
        })
      } else {
        this.$router.push({ path: '/myAss/' + e.assId + '/activity', query: { name: e.assName, state: '已通过', success: 1 } })
      }
    },
    async getAssListPage () {
      const { data } = await findAssListPage(this.current, this.pageSize)
      console.log(data)
      this.AssList = data.data.Ass
      this.total = data.data.total
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
