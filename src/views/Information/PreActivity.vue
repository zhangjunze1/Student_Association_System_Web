<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的中心</el-breadcrumb-item>
        <el-breadcrumb-item>活动记录</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card" >
      <!--表格内容显示区域-->
      <el-table
        v-loading="loading"
        :data="myActivityList"
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
export default {
  name: 'PreActivity'
}
</script>

<style scoped>

</style>
