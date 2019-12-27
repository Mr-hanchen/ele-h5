<template>
  <div class="index">
    <header class="header">
      <div class="address-box" @click="$router.push('/selectAddress')">
        <img src="../assets/loction.svg" alt="定位" class="loc" />
        <div class="address">{{currentAddress}}</div>
        <img src="../assets/down.svg" alt="下拉" class="down" />
      </div>
      <van-sticky>
        <div class="search-box">
          <div class="search">
            <img src="../assets/search.svg" alt="搜索" class="search-img" />
            <div class="text">搜索饿了么商家、商品名称</div>
          </div>
        </div>
      </van-sticky>
    </header>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "index",
  computed: {
    ...mapState(["lng", "lat", "currentAddress"])
  },
  created() {
    if (!this.lng || !this.lat) {
      this.getLocation();
    }
  },
  methods: {
    ...mapMutations(["setCoordinate"]),
    getLocation() {
      if (!navigator.geolocation) {
        this.$toast("您的浏览器不支持使用HTML 5来获取地理位置服务");
        return;
      }
      navigator.geolocation.getCurrentPosition(
        position => {
          console.log("12345678");
          this.setCoordinate(position.coords);
          // 拿着经纬度去接口中请求详细的地址信息。
        },
        error => {
          this.address = "未能获取地址";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.$toast("您拒绝对获取地理位置的请求");
              break;
            case error.POSITION_UNAVAILABLE:
              this.$toast("位置信息是不可用的");
              break;
            case error.TIMEOUT:
              this.$toast("请求您的地理位置超时");
              break;
            case error.UNKNOWN_ERROR:
              this.$toast("未能获取地址");
              break;
          }
          this.$router.push("/selectAddress");
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  font-size: 4vw;
  .header {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    color: #fff;
    .address-box {
      padding: 3vw;
      padding-bottom: 0;
      display: flex;
      align-items: center;
      .loc {
        width: 4vw;
        height: 4vw;
        margin-right: 1vw;
      }
      .address {
        width: 50vw;
        font-weight: 700;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .down {
        width: 2vw;
        height: 1.5vw;
      }
    }
    .search-box {
      background-image: linear-gradient(90deg, #0af, #0085ff);
      padding: 3vw;
      .search {
        height: 9.6vw;
        line-height: 9.6vw;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        .search-img {
          width: 4.266667vw;
          height: 4.266667vw;
          margin-right: 2vw;
        }
        .text {
          color: #999;
        }
      }
    }
  }
}
</style>