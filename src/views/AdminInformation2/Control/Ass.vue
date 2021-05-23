<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理界面</el-breadcrumb-item>
        <el-breadcrumb-item>社团管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--车辆列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <el-form-item style="margin-left: 10px"  >
            <el-button type="primary" @click="addAss">增加社团</el-button>
          </el-form-item>
        </el-row>
      </el-form>
      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="assList"
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
          prop="assState"
          label="社团状态"
          width="150">
          <template slot-scope="scope">
            <span  v-if="scope.row.assState == '申请中'" style="color: red;">申请中</span>
            <span  v-if="scope.row.assState == '已通过'" style="color: blue;">已通过</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="">
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

import { findAssListPage } from '@/api/assData'

export default {
  name: 'Ass',
  data () {
    return {
      formInline: {
        // eslint-disable-next-line no-undef
        assName: ''
      },
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有社团集合
      assList: [],
      loading: true
    }
  },
  created () {
    this.getAssListPage()
  },
  methods: {
    async getAssListPage () {
      const { data } = await findAssListPage(this.current, this.pageSize)
      console.log(data)
      this.assList = data.data.Ass
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
      console.log(e)
      // eslint-disable-next-line eqeqeq
      if (e.assState == '申请中') {
        this.$notify({
          title: '警告',
          message: '尚未申请通过,暂无活动',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.$router.push({ path: '/Ass/' + e.assId + '/activity', query: { name: e.assName, state: e.assState } })
      }
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
}
</style>
