<template>
  <div>
    <template>

      <!--        <el-menu-item index="/welcome" >-->
      <!--          <i class="el-icon-star-off"></i>-->
      <!--          <span slot="title">控制面板</span>-->
      <!--        </el-menu-item>-->
      <el-menu-item index="/host2" >
        <i class="el-icon-s-home"></i>
        <span slot="title">主界面</span>
      </el-menu-item>

      <el-submenu index="/AssManage">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>管理界面</span>
        </template>
        <el-menu-item index="/ass">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">社团管理</span>
        </el-menu-item>
        <el-menu-item index="/member">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">成员管理</span>
        </el-menu-item>
        <el-menu-item index="/activity">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">活动管理</span>
        </el-menu-item>
        <el-menu-item index="/notice">
          <i class="el-icon-magic-stick"></i>
          <span slot="title">公告管理</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="/MyCenter" >
        <template slot="title">
          <i class="el-icon-camera-solid"></i>
          <span>审批中心</span>
        </template>
        <el-menu-item index="/controlAss">
          <i class="el-icon-document-copy"></i>
          <span slot="title">社团审批</span>
        </el-menu-item>
        <el-menu-item index="/controlAct">
          <i class="el-icon-aim"></i>
          <span slot="title">活动审批</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree2'
}
</script>

<style scoped>
/*实现了溢出处理*/
.el-menu--collapse span,
.el-menu--collapse i.el-submenu__icon-arrow {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
</style>
