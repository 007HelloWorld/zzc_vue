<template>
  <el-aside width="220px" style="height: 100%" :class="{ 'hide-aside': asideShrink }" class="layout-aside">
    <div class="logo-box">
      <a :href="homeUrl">
        <img src="@/assets/images/common/logo.png" />
      </a>
    </div>
    <div class="filter-box">
      <el-input v-model="menuKeywords" class="filter-input" size="mini" placeholder="菜单筛选" clearable />
    </div>
    <ein-scrollbar class="aside-menu-scrollbar" height="calc( 100% - 158px)">
      <el-menu
        :default-active="$route.name"
        active-text-color="#fff"
        class="aside-menu"
        :collapse="asideShrink"
        :collapse-transition="false"
      >
        <template v-for="item in keyRoutes">
          <menu-item v-if="!item.meta.hidden" :item="item" :key="item.path" />
        </template>
      </el-menu>
    </ein-scrollbar>
  </el-aside>
</template>

<script>
import menuItem from './menuItem'
export default {
  name: 'Aside',
  components: {
    menuItem
  },
  data() {
    return {
      menuKeywords: ''
    }
  },
  computed: {
    asideShrink() {
      return this.$store.getters.asideShrink
    },
    routes() {
      return this.$store.getters.routes
    },
    keyRoutes() {
      // 临时调试代码，回头删除解开注释
      return this.$router.options.routes
      /* let keyRoutes = JSON.parse(JSON.stringify(this.routes))
      let { keys } = Object
      // 左侧导航搜索：第一步、过滤出不包含关键字的父导航 下 不包含关键字的子导航
      keyRoutes.forEach((item) => {
        if (keys(item.meta).includes('title')) {
          if (!item.meta.title.toLowerCase().includes(this.menuKeywords.toLowerCase())) {
            if (item.children && item.children.length > 0) {
              item.children = item.children.filter((childrenItem) => {
                return (
                  keys(childrenItem).includes('meta') &&
                  keys(childrenItem.meta).includes('title') &&
                  childrenItem.meta.title.toLowerCase().includes(this.menuKeywords.toLowerCase())
                )
              })
            }
          }
        }
      })
      // 第二步、过滤出不包含关键字并且 也无包含关键字的子导航的父导航
      keyRoutes = keyRoutes.filter((item) => {
        return (
          (keys(item.meta).includes('title') && item.meta.title.toLowerCase().includes(this.menuKeywords.toLowerCase())) ||
          (item.children && item.children.length > 0)
        )
      })
      return keyRoutes */
    },
    homeUrl() {
      return process.env.VUE_APP_API_HOST
    }
  },
  mounted() {},
  methods: {
    hasOneShowingChild(curRouter) {
      if (curRouter.children) {
        if (curRouter.children.length === 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.layout-aside {
  background: #101e69;
  transition: width 0.3s;
  .logo-box {
    text-align: center;
    padding: 33px 0 0;
  }
  .filter-box {
    margin-top: 25px;
    text-align: center;
    .filter-input {
      width: 170px;
      /deep/.el-input__inner {
        border-radius: 2px;
      }
    }
  }
  .aside-menu-scrollbar {
    margin-top: 15px;
  }
  /deep/.el-menu {
    background: none;
    border-right-color: #4c4a4f;
    .el-submenu__title,
    .el-menu-item {
      color: #a7b1c2;
      height: 46px;
      line-height: 46px;
    }
    .el-submenu__title:hover,
    .el-submenu__title:focus,
    .el-menu-item:hover,
    .el-menu-item:focus {
      background-color: rgba(0, 0, 0, 0.2);
      color: #fff;
    }
    .el-submenu__title {
      .icon {
        margin-right: 5px;
        font-size: 16px;
      }
    }
  }
  &.hide-aside {
    width: 50px !important;
    .filter-box,
    .logo-box {
      visibility: hidden;
    }
    /deep/.el-submenu {
      &.is-active {
        .el-submenu__title i {
          color: #1472c8;;
        }
      }
      .el-submenu__title {
        padding-left: 15px !important;
        & > i {
          font-weight: 700;
        }
      }
    }
  }
}
.el-menu.el-menu--popup {
  .el-menu-item.is-active {
    color: #1472c8 !important;
  }
}
</style>
