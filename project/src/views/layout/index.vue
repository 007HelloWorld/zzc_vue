<template>
  <div class="app-wrapper">
    <el-container class="wrapper-container">
      <layout-aside />
      <el-container direction="vertical">
        <layout-header />
        <ein-scrollbar ref="mainScrollbar">
          <el-main class="main-container">
            <transition name="fade" mode="out-in" :duration="100">
              <keep-alive :include="cachedViews">
                <router-view />
              </keep-alive>
            </transition>
          </el-main>
        </ein-scrollbar>
      </el-container>
    </el-container>
    <el-image-viewer v-if="imgViewerVisb" :on-close="closeViewer" :url-list="viewerUrlList" />
  </div>
</template>
<script>
import layoutHeader from './component/layoutHeader'
import layoutAside from './component/layoutAside'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'
export default {
  name: 'Layout',
  components: {
    layoutHeader,
    layoutAside,
    ElImageViewer
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    imgViewerVisb() {
      return this.$store.state.app.imgViewerVisb
    },
    viewerUrlList() {
      return this.$store.state.app.viewerUrlList
    }
  },
  methods: {
    closeViewer() {
      this.$store.commit('app/setState', { imgViewerVisb: false, viewerUrlList: [] })
    }
  },
  watch: {
    '$route.path'() {
      this.$refs.mainScrollbar.scrollTo({ x: 0, y: 0 })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './css/index.scss';
</style>
