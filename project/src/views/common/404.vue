<template>
  <div class="page-box">
    <img src="@/assets/images/common/404.png" />
  </div>
</template>

<script>
export default {
  name: 'Demo',
  components: {},
  data() {
    return {
      activeTab: 'first'
    }
  }
}
</script>
<style lang="scss" scoped>
.page-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
