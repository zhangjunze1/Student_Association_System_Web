<template>
  <div>
    <div>
      <!--面包屑-->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="padding-left: 10px;padding-bottom: 10px;font-size: 12px">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>主界面</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Host'
}
</script>

<style scoped>

</style>
