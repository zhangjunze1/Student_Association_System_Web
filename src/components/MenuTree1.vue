<template>
  <div>
    <template>

      <!--        <el-menu-item index="/welcome" >-->
      <!--          <i class="el-icon-star-off"></i>-->
      <!--          <span slot="title">控制面板</span>-->
      <!--        </el-menu-item>-->
      <el-menu-item index="/host1" >
        <i class="el-icon-s-home"></i>
        <span slot="title">主界面</span>
      </el-menu-item>

      <el-submenu index="/AssManage">
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>社团相关</span>
        </template>
        <el-menu-item index="/enroll1">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">社团报名</span>
        </el-menu-item>
      </el-submenu>

      <el-submenu index="/LeaderManage">
        <template slot="title">
          <i class="el-icon-price-tag"></i>
          <span>社长中心</span>
        </template>
        <el-menu-item index="/assControl">
          <i class="el-icon-s-tools"></i>
          <span slot="title">管理社团</span>
        </el-menu-item>
        <el-menu-item index="/applyActivity">
          <i class="el-icon-reading"></i>
          <span slot="title">活动管理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu index="/MyCenter1" >
        <template slot="title">
          <i class="el-icon-camera-solid"></i>
          <span>我的中心</span>
        </template>
        <el-menu-item index="/preActivity1">
          <i class="el-icon-document-copy"></i>
          <span slot="title">活动记录</span>
        </el-menu-item>
        <el-menu-item index="/myAss1">
          <i class="el-icon-aim"></i>
          <span slot="title">我的社团</span>
        </el-menu-item>
        <el-menu-item index="/mine1">
          <i class="el-icon-notebook-1"></i>
          <span slot="title">个人资料</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'MenuTree1'
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
