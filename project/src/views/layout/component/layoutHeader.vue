<template>
  <div class="layout-header border-bottom">
    <el-header class="header-top" height="55px">
      <div class="left-box">
        <i class="btn-shrink icon el-icon-s-fold" :class="{ 'rotate-icon': this.asideShrink }" @click="toggleAside"> </i>
        <div v-show="!$route.meta.isHome" class="breadcrumb-box">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="right-box">
        <span class="user-box"> <i class="el-icon-user-solid"></i>{{ userInfo.username }} </span>
        <span class="item btn" @click="logOut"> <i class="fa fa-sign-out"></i>退出 </span>
      </div>
    </el-header>
    <!-- <tags-view /> -->
  </div>
</template>

<script>
// import tagsView from './tags_view/index'

export default {
  name: 'Header',
  components: {
    // tagsView
  },
  data() {
    return {
      dialogVisible: false,
      listLength: 5
    }
  },
  computed: {
    asideShrink() {
      return this.$store.getters.asideShrink
    },
    userInfo() {
      return this.$store.state.user.userInfo
    }
  },
  methods: {
    routerJump(to) {
      this.$router.push({ name: to })
    },
    toggleAside() {
      this.$store.commit('app/toggleAside')
    },
    logOut() {
      this.$confirm('确定要退出登录？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$store.dispatch('user/ssoLogout')
        })
        .catch(() => {})
    },
    jumpTo(path) {
      this.$router.push(path)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          console.log(_);
          done()
        })
        .catch((_) => {
          console.log(_);
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.layout-header {
  position: relative;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left-box {
    display: flex;
    align-items: center;
    .breadcrumb-box {
      margin-left: 15px;
    }
    .btn-shrink {
      cursor: pointer;
      font-size: 20px;
      width: 30px;
      text-align: center;
      color: #333;
      transition: transform 0.3s;
      &.rotate-icon {
        transform: rotate(180deg);
      }
    }
  }
  .right-box {
    .item {
      margin-left: 15px;
    }
    .btn {
      &:hover {
        color: #1472c8;
      }
    }
  }
}
</style>
