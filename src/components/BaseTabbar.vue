<template>
  <van-tabbar v-model="value">
    <van-tabbar-item replace v-for="icon in icons" :key="icon.path" :to="icon.path">
      <span>{{icon.title}}</span>
      <img slot="icon" slot-scope="props" :title="props.active" :src="props.active ? icon.active : icon.inactive" />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import home from "@/assets/home.svg";
import find from "@/assets/find.svg";
import order from "@/assets/order.svg";
import mine from "@/assets/mine.svg";
import homeSelected from "@/assets/home-selected.svg";
import findSelected from "@/assets/find-selected.svg";
import orderSelected from "@/assets/order-selected.svg";
import mineSelected from "@/assets/mine-selected.svg";
export default {
  name: "baseTabbar",
  props: ['actived'],
  data() {
    return {
      value: this.actived || 0,
      icons: [
        { path: "/", title: "首页", active: homeSelected, inactive: home },
        { path: "/find", title: "发现", active: findSelected, inactive: find },
        {
          path: "/order",
          title: "订单",
          active: orderSelected,
          inactive: order
        },
        { path: "/mine", title: "我的", active: mineSelected, inactive: mine }
      ]
    };
  }
};
</script>