<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的中心</el-breadcrumb-item>
        <el-breadcrumb-item>个人资料</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mine'
}
</script>

<style scoped>

</style>
