<template>
  <div class="home">
    <router-view />
    <BaseTabbar :actived="0"/>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss" scoped>
.home {
}
</style>