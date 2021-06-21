<template>
  <el-container class="main_container">
    <!--侧边栏-->
    <el-aside :width="isCollapse?'64px':'200px'">
      <div class="title_box_main">
        <i style="margin-right: 8px" class="el-icon-odometer"></i>
        <span >学生社团管理系统</span>
      </div>
      <!--展开收起-->
      <div class="toggle_box" @click="toggleCollapse"></div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isCollapse"
        :collapse-transition="false"
        :unique-opened="true"
        :router="true">
        <MenuTree></MenuTree>
      </el-menu>
    </el-aside>
    <el-container>
      <!--头部布局-->
      <el-header >
        <span style="margin-left: 20px; margin-right: 20px; font-size: 18px;color: black;size: 20px">{{this.$root.USER.trueName }}{{this.$root.USER.position }},欢迎你的归来！</span>

        <div class="right_box">
          <el-dropdown>
            <img src="../assets/img/timg.jpg">
            <!--下拉菜单-->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-s-home" @click.native="change">首页信息</el-dropdown-item>
              <el-dropdown-item icon="el-icon-menu" @click.native="showSystemNotice">系统公告</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button" @click.native="quit">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <!--路由视图-->
        <router-view></router-view>
      </el-main>
      <el-footer style="height: 25px;text-align: center;background: #F0F8FF" >
        ©Copyright 2021 zhangjz-toishT工作室 | 浙大城市学院小伙
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MenuTree from '@/components/MenuTree'
import { findSystemNotice } from '@/api/system'
export default {
  name: 'Main',
  components: { MenuTree },
  data () {
    return {
      isCollapse: false,
      systemnotice: ''
    }
  },
  created () {
    this.$router.push('/host')
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    quit () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    change () {
      this.$router.push('/host')
    },
    async showSystemNotice () {
      const { data } = await findSystemNotice()
      this.systemnotice = data.data.notice
      this.$notify({
        title: '系统公告',
        message: this.systemnotice,
        type: 'success'
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-container{
  height: 100%;
}
/*头部布局*/
.el-header {
  background-color: #F0F8FF;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  color: #FFFFFF;
  align-items: center;
  font-size: 20px;
  /*左边的logo和标题*/
  .left_box{
    display: flex;
    align-items: center;
    font-size: 30px;
    color: #F0F8FF;
    /*logo*/
    img{
      width: 55px;
      height: 55px;
      border-radius: 30%;
      margin: 0px 0px 5px 5px;
    }
    /*标题*/
    span{
      margin-left: 15px;
    }
  }
  /*右边的登录头像*/
  .right_box{
    .el-dropdown>img{
      height: 55px;
      width: 55px;
      border-radius: 50%;
      background-color: #FFFFFF;
      margin: 0px 15px 0px 0px;
      background-size: contain;
    }
  }

}
/*侧边栏*/
.el-aside {
  background-color: #001529;
  text-align: left;
  .el-menu{
    border-right: none;
  }
  /*展开/收起*/
  .toggle_box{
    background-color: white;
    font-size: 15px;
    font-weight: bold;
    line-height: 25px;
    color: black;
    letter-spacing: 0.2em;
    text-align: center;
    cursor: pointer;
  }
  .title_box_main{
    display: flex;
    align-items: center;
    font-size: 20px;
    height: 58px;
    color: #FFFFFF;
  }
}
/*内容主体*/
.el-main {
  background-color: #E9EEF3;
}
/*菜单下拉样式*/
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.footer{flex: 0;background: #2c3e50}
</style>
