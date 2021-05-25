<template>
  <el-submenu v-if="(item.children && item.children.length > 0) || item.alwaysShow" :index="item.path" :key="item.path">
    <template slot="title">
      <i :class="item.meta.icon" />
      <span>{{ item.meta.title }}</span>
    </template>
    <template v-for="childItem in item.children">
      <menu-item v-if="!childItem.meta.hidden" :item="childItem" :key="childItem.name" />
    </template>
  </el-submenu>
  <el-menu-item v-else :index="item.name" :key="item.name" @click="menuItemClick(item)">
    <i class="fa" :class="item.meta.icon" />
    <span slot="title">{{ item.meta.title }}</span>
  </el-menu-item>
</template>

<script>
import { isExternal } from '@/utils'
import menuItem from './menuItem'
export default {
  name: 'menuItem',
  components: {
    menuItem
  },
  props: {
    item: {}
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    routerJump(to) {
      if (isExternal(to)) {
        window.open(to, '_blank')
      } else {
        this.$router.push({ name: to })
      }
    },
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
    },
    menuItemClick(menu) {
      if (menu.meta && menu.meta.link) {
        window.open(menu.meta.link, menu.meta.target)
      } else {
        this.$router.push({ name: menu.name })
      }
    }
  },
  created() {}
}
</script>
<style lang="scss" scoped>
.layout-aside {
  background: #363433;
  transition: width 0.3s;
  .logo-box {
    text-align: center;
    padding: 33px 0 0;
  }
  .filter-box {
    margin-top: 14px;
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
      background-color: #4c4a4f;
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
          color: #1472c8;
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
