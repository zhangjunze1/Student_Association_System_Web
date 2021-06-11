<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的社团</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card" >
      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="myAssList"
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
          prop="memberAssState"
          label="申请状态"
          width="150">
          <template slot-scope="scope">
            <span  v-if="scope.row.memberAssState == '申请中'" style="color: red;">申请中</span>
            <span  v-if="scope.row.memberAssState == '已通过'" style="color: blue;">已是社员</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userTrueName"
          label="社长">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-s-grid" @click="showNotice(scope.row)">公告</el-button>
            <el-button type="danger" size="mini" icon="el-icon-circle-close" @click="deleteMember(scope.row)">退出</el-button>
          </template>
        </el-table-column>
        <!--        <el-table-column-->
        <!--          label="操作"-->
        <!--          width="180">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button type="primary" size="mini" icon="el-icon-edit" @click="showEditDialog(scope.row.userId)"></el-button>-->
        <!--            <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeUserById(scope.row.userId)"></el-button>-->
        <!--          </template>-->
        <!--        </el-table-column>-->
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

import { findMyAssListPage } from '@/api/assData'
import { deleteMemberFromAss } from '@/api/system'

export default {
  name: 'MyAss',
  data () {
    return {
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有社团集合
      myAssList: [],
      loading: true
    }
  },
  created () {
    this.getMyAssListPage()
  },
  methods: {
    showNotice (e) {
      this.$notify({
        title: e.assName + '公告',
        message: e.assNotice,
        type: 'success',
        duration: 2000
      })
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
      this.getMyAssListPage()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getMyAssListPage()
    },
    handleTaskItemClick (e) {
      console.log(e.assName)
      this.$router.push({ path: '/myAss/' + e.assId + '/activity', query: { name: e.assName, state: e.memberAssState, success: 1 } })
    },
    async getMyAssListPage () {
      const { data } = await findMyAssListPage(this.current, this.pageSize, this.$root.USER.id)
      console.log(data)
      // eslint-disable-next-line eqeqeq

      this.myAssList = data.data.myAssList
      this.total = data.data.total

      // eslint-disable-next-line eqeqeq

      this.loading = false
    },
    async deleteMember (e) {
      const confirmResult = await this.$confirm('将退出<' + e.assName + '>?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次退出社团操作')
      }
      // eslint-disable-next-line eqeqeq
      if (e.memberAssState == '申请中') {
        this.$notify({
          title: '警告',
          message: '您尚未成为<' + e.assName + '>社团一员，无法进行退出社团的操作',
          type: 'warning',
          duration: 2000
        })
      } else {
        const { data } = await deleteMemberFromAss(e.assId, this.$root.USER.id)
        if (data.code === 20000) {
          this.$notify({
            title: '成功',
            message: '成功退出<' + e.assName + '>',
            type: 'success',
            duration: 2000
          })
        }
        this.getMyAssListPage()
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
