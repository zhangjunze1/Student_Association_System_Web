<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>审批中心</el-breadcrumb-item>
        <el-breadcrumb-item>社团审批</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
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
          <el-form-item label="用户状态" style="margin-left: 10px">
            <el-select v-model="formInline.assState" placeholder="社团状态">
              <el-option label="申请中" value="申请中" style="color: red"></el-option>
              <el-option label="已通过" value="已通过" style="color: blue"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-left: 10px"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getAssAllList">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="assList"
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
          prop="assState"
          label="社团状态"
          width="150">
          <template slot-scope="scope">
            <span  v-if="scope.row.assState == '申请中'" style="color: red;">申请中</span>
            <span  v-if="scope.row.assState == '已通过'" style="color: blue;">已通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="assLeader"
          label="社团社长"
          width="150">
        </el-table-column>
        <el-table-column
          prop=""
          label="">
        </el-table-column>
        <el-table-column
          label="操作"
          width="300">
          <template slot-scope="scope">
            <el-button  v-if="scope.row.assState=='申请中'" type="primary" size="mini" icon="el-icon-circle-check" @click="agreeAss(scope.row)">同意</el-button>
            <el-button  v-if="scope.row.assState=='申请中'" type="warning" size="mini" icon="el-icon-circle-close" @click="notagreeAss(scope.row)">不同意</el-button>
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

import { agreeAssApply, findAssListQueryPage, notAgreeAssApply } from '@/api/assData'

export default {
  name: 'ControlAss',
  data () {
    return {
      formInline: {
        // eslint-disable-next-line no-undef
        assState: '',
        // eslint-disable-next-line no-undef
        assName: ''
      },
      // 社团列表
      assList: [],
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      loading: true
    }
  },
  created () {
    if (this.$route.query.state != null) {
      this.formInline.assState = this.$route.query.state
    }
    this.getAssAllList()
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
      this.getAssAllList()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAssAllList()
    },
    async getAssAllList () {
      const { data } = await findAssListQueryPage(this.current, this.pageSize, this.formInline.assName, this.formInline.assState)
      console.log(data)
      this.assList = data.data.Ass
      this.total = data.data.total
      this.loading = false
    },
    resetForm () {
      this.formInline.assState = ''
      this.formInline.assName = ''
      this.getAssAllList()
    },
    async agreeAss (e) {
      const { data } = await agreeAssApply(e.assId, e.assLeader)
      this.$root.ASSAPPLY.applyNum = this.$root.ASSAPPLY.applyNum - 1
      if (this.$root.ASSAPPLY.applyNum < 0) {
        this.$root.ASSAPPLY.applyNum = 0
      }
      this.$notify({
        title: '成功',
        message: '已同意<' + e.assLeader + '>建立<' + e.assName + '>',
        type: 'success',
        duration: 2000
      })
      this.getAssAllList()
      console.log(data)
    },
    async notagreeAss (e) {
      const { data } = await notAgreeAssApply(e.assId, e.assLeader)
      this.$root.ASSAPPLY.applyNum = this.$root.ASSAPPLY.applyNum - 1
      if (this.$root.ASSAPPLY.applyNum < 0) {
        this.$root.ASSAPPLY.applyNum = 0
      }
      this.$notify({
        title: '成功',
        message: '已拒绝<' + e.assLeader + '>建立<' + e.assName + '>',
        type: 'success',
        duration: 2000
      })
      this.getAssAllList()
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
