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
          prop="assLeader"
          label="社长"
          width="150">
        </el-table-column>
        <el-table-column
          prop=""
          label="">
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button v-if="scope.row.assState == '已通过'" type="primary" size="mini" icon="el-icon-edit" @click="changeLeader(scope.row)">更改社长</el-button>
            <el-button v-if="scope.row.assState == '已通过'" type="danger" size="mini" icon="el-icon-delete" @click="deleteAss(scope.row)"></el-button>
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

    <!--添加社团的对话框-->
    <el-dialog title="添加社团" :visible.sync="addDialogVisible" width="40%" @close="addDialogClosed">
      <!--内容主体区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addRuleForm" label-width="100px">
        <el-form-item label="社团名字" prop="name">
          <el-input v-model="addForm.name" placeholder="请输入社团名字"></el-input>
        </el-form-item>
        <el-form-item label="社团位置" prop="position">
          <el-input v-model="addForm.position" placeholder="请输入社团所在教室场所 "></el-input>
        </el-form-item>
        <el-form-item label="社团资金" prop="funds">
          <el-input v-model="addForm.funds" placeholder="请输入社团资金"></el-input>
        </el-form-item>
        <el-form-item label="指导老师" prop="teacher">
          <el-input v-model="addForm.teacher" placeholder="请输入社团指导老师"></el-input>
        </el-form-item>
        <el-form-item label="社长学号" prop="leader">
          <el-input v-model="addForm.leader" placeholder="请输入社团人选的学号"></el-input>
        </el-form-item>
      </el-form>
      <!--底部区域-->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="applyNewAssByAdmin">确定</el-button>
      </span>
    </el-dialog>

    <!--修改社长的对话框-->
    <el-dialog title="修改社长" :visible.sync="editDialogVisible" width="40%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item  label="社团编号" prop="assId">
          <el-input  disabled v-model="editForm.assId" ></el-input>
        </el-form-item>
        <el-form-item label="新社长学号" prop="newNumber">
          <el-input v-model="editForm.newNumber" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="editNumberInfo">确定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>

import { applyNewAssByAdmin, ChangeLeaderByNumber, deleteThisAss, findAssListPage } from '@/api/assData'

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
      loading: true,
      // 控制添加社团对话框的显示和隐藏
      addDialogVisible: false,
      // 更改社长对话框的显示和隐藏
      editDialogVisible: false,
      addForm: {
        name: '',
        position: '',
        funds: '',
        teacher: '',
        leader: ''
      },
      editForm: {
        newNumber: '',
        assId: ''
      },
      addFormRules: {
        name: [
          { required: true, message: '输入社团名', trigger: 'blur' },
          { min: 1, max: 12, message: '请输入1-12位', trigger: 'blur' }
        ],
        position: [
          { required: true, message: '请输入社团位置', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ],
        funds: [
          { required: true, message: '请输入社团经费', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ],
        teacher: [
          { required: true, message: '指导老师不能为空', trigger: 'blur' },
          { min: 1, max: 20, message: '格式不正确', trigger: 'blur' }
        ],
        leader: [
          { required: true, message: '社长学号不能为空', trigger: 'blur' },
          { min: 4, max: 9, message: '格式不正确', trigger: 'blur' }
        ]
      },
      editFormRules: {
        newNumber: [
          { required: true, message: '社长学号不能为空', trigger: 'blur' },
          { min: 4, max: 9, message: '格式不正确', trigger: 'blur' }
        ]
      }
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
    },
    // 监听添加社团的对话框关闭事件
    addDialogClosed () {
      this.$refs.addRuleForm.resetFields()
    },
    // 监听修改社长的对话框关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    addAss () {
      this.addDialogVisible = true
    },
    changeLeader (e) {
      this.editDialogVisible = true
      this.editForm.assId = e.assId
    },
    async applyNewAssByAdmin () {
      const { data } = await applyNewAssByAdmin(this.addForm.name, this.addForm.position, this.addForm.funds, this.addForm.teacher, this.addForm.leader)
      console.log(data)
      if (data.code === 3025) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3024) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3022) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '成功添加新社团',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      }
      this.addDialogVisible = false
      this.getAssListPage()
    },
    async editNumberInfo () {
      const { data } = await ChangeLeaderByNumber(this.editForm.assId, this.editForm.newNumber)
      console.log(data)
      if (data.code === 3025) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 3024) {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      } else if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '成功更改社长',
          type: 'success',
          duration: 2000
        })
      } else {
        this.$notify({
          title: '警告',
          message: data.message,
          type: 'warning',
          duration: 2000
        })
      }
      this.editDialogVisible = false
      this.getAssListPage()
    },
    async deleteAss (e) {
      const confirmResult = await this.$confirm('此操作将永久删除该社团, 是否继续?', '提示', {
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
      const { data } = await deleteThisAss(e.assId)
      if (data.code === 20000) {
        this.$notify({
          title: '成功',
          message: '成功删除' + e.assName,
          type: 'success',
          duration: 2000
        })
      }
      this.getAssListPage()
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
