<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main2' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>管理界面</el-breadcrumb-item>
        <el-breadcrumb-item>成员管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

  <el-card class="box-card">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-row type="flex" justify="start">
        <el-form-item label="职位" style="margin-left: 10px">
          <el-select v-model="formInline.position" placeholder="请选择职位">
            <el-option
              v-for="item in AuthorityAndCount"
              :key="item.userPosition"
              :label="item.userPosition"
              :value="item.userPosition">
              <span style="float: left">{{ item.userPosition }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">
                  <span class="el-tag el-tag--success el-tag--mini el-tag--plain">{{ item.userCount }}</span>
                </span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" style="margin-left: 10px">
          <el-input clearable v-model="formInline.userTrueName" placeholder="输入姓名"></el-input>
        </el-form-item>
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
        <el-form-item style="margin-left: 10px"  >
          <el-button icon="el-icon-refresh" @click="resetForm">重置</el-button>
          <el-button type="primary" icon="el-icon-search" @click="myqueryUserList">查询</el-button>
        </el-form-item>
      </el-row>
    </el-form>

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
          <el-button v-if="scope.row.userPosition=='社员'" type="danger" size="mini" icon="el-icon-delete" @click="memberDelete(scope.row)"></el-button>
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
import { findAuthorityAndCount, findqueryUserList, membersDelete } from '@/api/user'
import { findAssList } from '@/api/assData'

export default {
  name: 'Member',
  data () {
    return {
      formInline: {
        // eslint-disable-next-line no-undef
        position: '',
        // eslint-disable-next-line no-undef
        userTrueName: '',
        // eslint-disable-next-line no-undef
        assName: ''
      },
      // userAuthority
      // userCount
      AuthorityAndCount: [],
      // 当前页
      current: 1,
      // 每页显示的条数
      pageSize: 6,
      // 总条数
      total: 200,
      // 所有人员集合
      MemberList: [],
      // 社团列表
      assList: [],
      loading: true
    }
  },
  created () {
    this.getAuthorityAndCount()
    this.getAssList()
    this.myqueryUserList()
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
      this.myqueryUserList()
    },
    // 当页码改变的时候
    handleCurrentChange (val) {
      // eslint-disable-next-line no-template-curly-in-string
      console.log(`当前页: ${val}`)
      this.current = val
      this.myqueryUserList()
    },
    async getAuthorityAndCount () {
      const { data } = await findAuthorityAndCount()
      console.log(data)
      this.AuthorityAndCount = data.data.AuthorityAndCount
    },
    async myqueryUserList () {
      const { data } = await findqueryUserList(this.current, this.pageSize,
        this.formInline.userTrueName, this.formInline.assName, this.formInline.position)
      this.MemberList = data.data.userList
      this.total = data.data.total
      this.loading = false
      console.log('current:' + data.data.current)
      console.log('total:' + data.data.total)
      console.log(data)
    },
    async getAssList () {
      const { data } = await findAssList()
      console.log(data)
      this.assList = data.data.Ass
    },
    resetForm () {
      this.formInline.userTrueName = ''
      this.formInline.assName = ''
      this.formInline.position = ''
      this.myqueryUserList()
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
    async memberDelete (e) {
      const confirmResult = await this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
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
      const { data } = await membersDelete(e.userId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '成功删除' + e.userTrueName,
          type: 'success',
          duration: 2000
        })
      }
      this.getAuthorityAndCount()
      this.getAssList()
      this.myqueryUserList()
      console.log(data)
    }
  }

}
</script>

<style scoped>

</style>
