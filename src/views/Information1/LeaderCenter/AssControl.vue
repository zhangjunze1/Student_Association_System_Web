<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main1' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>社团相关</el-breadcrumb-item>
        <el-breadcrumb-item>管理社团</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!--车辆列表卡片-->
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-row type="flex" justify="start">
<!--          <el-form-item label="职位" style="margin-left: 10px">-->
<!--            <el-select v-model="formInline.position" placeholder="请选择职位">-->
<!--              <el-option-->
<!--                v-for="item in AuthorityAndCount"-->
<!--                :key="item.userPosition"-->
<!--                :label="item.userPosition"-->
<!--                :value="item.userPosition">-->
<!--                <span style="float: left">{{ item.userPosition }}</span>-->
<!--                <span style="float: right; color: #8492a6; font-size: 13px">-->
<!--                  <span class="el-tag el-tag&#45;&#45;success el-tag&#45;&#45;mini el-tag&#45;&#45;plain">{{ item.userCount }}</span>-->
<!--                </span>-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item label="姓名" style="margin-left: 10px">
            <el-input clearable v-model="formInline.userTrueName" placeholder="输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="学号" style="margin-left: 10px">
            <el-input clearable v-model="formInline.userNumber" placeholder="输入学号"></el-input>
          </el-form-item>
          <el-form-item label="用户状态" style="margin-left: 10px">
            <el-select v-model="formInline.memberAssState" placeholder="用户状态">
              <el-option label="申请中" value="申请中" style="color: red"></el-option>
              <el-option label="已是社员" value="已通过" style="color: blue"></el-option>
            </el-select>
          </el-form-item>
<!--          <el-form-item label="社团" style="margin-left: 10px">-->
<!--            <el-select v-model="formInline.assName" clearable placeholder="请选择社团">-->
<!--              <el-option-->
<!--                v-for="item in assList"-->
<!--                :key="item.assId"-->
<!--                :label="item.assName"-->
<!--                :value="item.assName">-->
<!--              </el-option>-->
<!--            </el-select>-->
<!--          </el-form-item>-->
          <el-form-item style="margin-left: 10px"  >
            <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
            <el-button type="primary" icon="el-icon-search" @click="getAssMember">查询</el-button>
          </el-form-item>
        </el-row>
      </el-form>

      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="thisMemberList"
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
          prop="memberAssState"
          label="用户状态"
          width="100">
          <template slot-scope="scope">
            <span  v-if="scope.row.memberAssState == '申请中'" style="color: red;">申请中</span>
            <span  v-if="scope.row.memberAssState == '已通过'" style="color: blue;">已是社员</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button v-if="scope.row.memberAssState=='申请中'" type="primary" size="mini" icon="el-icon-circle-check" @click="agreeApply(scope.row)">同意</el-button>
            <el-button v-if="scope.row.memberAssState=='已通过'" type="danger" size="mini" icon="el-icon-delete" @click="deleteMember(scope.row)">删除成员</el-button>
            <el-button v-if="scope.row.memberAssState=='申请中'" type="warning" size="mini" icon="el-icon-circle-close" @click="notagreeApply(scope.row)">不同意</el-button>
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

import { findAssMember } from '@/api/user'
import { agreeApplyForMyAss, deleteMemberFromAss, notagreeApplyForMyAss } from '@/api/system'

export default {
  name: 'AssControl1',
  data () {
    return {
      formInline: {
        userTrueName: '',
        userNumber: '',
        memberAssState: ''
      },
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      loading: true,
      thisMemberList: []
    }
  },
  created () {
    // eslint-disable-next-line eqeqeq
    if (this.$route.query.state == '申请中') {
      this.formInline.memberAssState = '申请中'
    }
    this.getAssMember()
    this.getApply()
  },
  methods: {
    async getAssMember () {
      const { data } = await findAssMember(this.current, this.pageSize, this.$root.ASS.assId, this.formInline.userTrueName, this.formInline.userNumber, this.formInline.memberAssState)
      this.thisMemberList = data.data.userList
      this.total = data.data.total
      console.log(data)
      this.loading = false
    },
    async getApply () {
      const { data } = await findAssMember(this.current, this.pageSize, this.$root.ASS.assId, '', '', '申请中')
      this.$root.ApplyLeader.applyNum = data.data.total
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
      this.getAssMember()
      this.getApply()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.getAssMember()
      this.getApply()
    },
    resetForm () {
      this.formInline.userNumber = ''
      this.formInline.userTrueName = ''
      this.formInline.position = ''
      this.formInline.memberAssState = ''
      this.getAssMember()
      this.getApply()
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
    async agreeApply (e) {
      const confirmResult = await this.$confirm('将同意<' + e.userTrueName + '>发起入社申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次审批')
      }
      const { data } = await agreeApplyForMyAss(this.$root.ASS.assId, e.userId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '<' + e.userTrueName + '>审核通过本社团',
          type: 'success',
          duration: 2000
        })
      }
      if (this.$root.ApplyLeader.applyNum > 0) {
        this.$root.ApplyLeader.applyNum = this.$root.ApplyLeader.applyNum - 1
      }
      this.getAssMember()
      console.log(data)
    },
    async notagreeApply (e) {
      const confirmResult = await this.$confirm('将拒绝<' + e.userTrueName + '>发起入社申请, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次审批')
      }
      const { data } = await notagreeApplyForMyAss(this.$root.ASS.assId, e.userId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '拒绝<' + e.userTrueName + '>通过本社团',
          type: 'success',
          duration: 2000
        })
      }
      if (this.$root.ApplyLeader.applyNum > 0) {
        this.$root.ApplyLeader.applyNum = this.$root.ApplyLeader.applyNum - 1
      }
      this.getAssMember()
      console.log(data)
    },
    async deleteMember (e) {
      const confirmResult = await this.$confirm('将继续开除<' + e.userTrueName + '>?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err
      })
      // 如果商家点击确定返回字符串 confirm
      // 如果商家点击取消返回字符串 cancel
      if (confirmResult !== 'confirm') {
        return this.$message.info('取消本次删除操作')
      }
      const { data } = await deleteMemberFromAss(this.$root.ASS.assId, e.userId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '成功删除<' + e.userTrueName + '>',
          type: 'success',
          duration: 2000
        })
      }
      this.getAssMember()
      console.log(data)
    }
  }
}
</script>

<style scoped>

</style>
