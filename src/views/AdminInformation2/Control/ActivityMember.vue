<template>
  <div>
    <el-page-header @back="goBack" :content="this.$route.query.activity.activitySub+'报名成员列表'" >
    </el-page-header>
    <el-card class="box-card" style="margin-top: 20px">

      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="MemberList"
        @row-dblclick='showSignatureClick'
        border
        max-height="380px"
        style="width: 100%;">
        <el-table-column
          prop="userId"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="userTrueName"
          label="姓名"
          width="150">
        </el-table-column>
        <el-table-column
          prop="userNumber"
          label="学号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="userPosition"
          label="职位"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userGender"
          label="性别"
          width="100">
        </el-table-column>
        <el-table-column
          prop="userPhone"
          label="手机号码">
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template slot-scope="scope">
            <el-button v-if="scope.row.userPosition=='社员'" type="danger" size="mini" icon="el-icon-delete" @click="activityMemberDelete(scope.row)"></el-button>
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

import { findActivityMembers } from '@/api/user'
import { notagreeUserApplyActivity } from '@/api/system'

export default {
  name: 'ActivityMember',
  data () {
    return {
      formInline: {
        // eslint-disable-next-line no-undef
        userTrueName: ''
      },
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有人员集合
      MemberList: [],
      loading: true
    }
  },
  created () {
    console.log(this.$route.query.activity.activityId)
    this.getActivityMembers()
  },
  methods: {
    goBack () {
      this.$router.back()
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
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
    },
    async getActivityMembers () {
      const { data } = await findActivityMembers(this.current, this.pageSize, this.$route.query.activity.activityId)
      this.MemberList = data.data.userList
      this.total = data.data.total
      this.loading = false
      console.log(data)
    },
    showSignatureClick (e) {
      this.$alert(e.userSignature, e.userTrueName + '个性签名', {
        confirmButtonText: '关闭',
        callback: action => {
          this.$message({
            type: 'info',
            message: `close: ${action}`
          })
        }
      })
    },
    async activityMemberDelete (e) {
      const confirmResult = await this.$confirm('删除<' + e.userTrueName + '>参加<' + this.$route.query.activity.activitySub + '>的记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消本次操作')
      }
      const { data } = await notagreeUserApplyActivity(this.$route.query.activity.activityId, e.userId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '已成功删除<' + e.userTrueName + '>参加<' + this.$route.query.activity.activitySub + '>的记录',
          type: 'success',
          duration: 2000
        })
      }
      this.getActivityMembers()
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
