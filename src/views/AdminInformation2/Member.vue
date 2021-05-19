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
  </div>
</template>

<script>
export default {
  name: 'Member'
}
</script>

<style scoped>

</style>
