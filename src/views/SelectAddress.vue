<template>
  <div class="select-address">
    <van-sticky>
      <van-nav-bar title="请选择收货地址" left-arrow @click-left="$router.back()" />
    </van-sticky>
    <van-row class="row">
      <van-col span="4" class="col">
        <span class="city" @click="$router.push('/selectCity')">{{currentCity}}</span>
        <img src="../assets/down2.svg" alt="down.svg" class="down" />
      </van-col>
      <van-col span="20">
        <van-search placeholder="请输入地址" v-model="key" @input="input" />
      </van-col>
    </van-row>
    <div class="list" v-show="citys.length!==0">
      <div
        class="item"
        v-for="(c,i) in citys"
        :key="i"
        @click="selectCity(c.longitude,c.latitude,c.city)"
      >
        <div class="address">
            <div class="title">{{c.name}} </div>
            <div class="distance">{{c.distance}}</div>
        </div>
        <div class="detail">{{c.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "selectAddress",
  data() {
    return {
      key: "",
      citys: []
    };
  },
  computed: {
    ...mapState(["currentCity", "lng", "lat"])
  },
  methods: {
    ...mapMutations(["setCoordinate", "setCurrentAddress"]),
    input() {
      var url = `/api/restapi/bgs/poi/search_poi_nearby_alipay?keyword=${this.key}&offset=0&limit=20`;
      if (this.lng && this.lat) {
        url = `/api/restapi/bgs/poi/search_poi_nearby_alipay?keyword=${this.key}&offset=0&limit=20&latitude=${this.lat}&longitude=${this.lng}`;
      }
      axios.get(url).then(res => {
        console.log(res);
        this.citys = res.data;
      });
    },
    selectCity(longitude, latitude, address) {
      //   console.log(`${longitude},${latitude},${address}`);
      this.setCoordinate({ longitude, latitude });
      this.setCurrentAddress(address);
      this.$router.back();
    }
  }
};
</script>


<style lang="scss" scoped>
.select-address {
  background-color: #f4f4f4;
  height: 100vh;
  font-size: 4vw;
  .van-nav-bar {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    .van-icon {
      color: #fff;
      font-size: 6vw;
    }
    .van-ellipsis {
      color: #fff !important;
    }
  }
  .row {
    padding: 0 1.3333vw;
    background-color: #fff;
    .city {
      margin-right: 2vw;
      display: inline-block;
      height: 46px;
      line-height: 46px;
    }
    .down {
      width: 2vw;
      height: 1.5vw;
    }
  }
  .list {
    background: #fff;
    .item {
      padding: 3vw;
      border-bottom: 1px solid #eee;
      .address {
        font-weight: 700;
        display: flex;
        justify-content: space-between;
        .distance{
            font-weight: normal;
        }
      }
      .detail {
        font-size: 3.5vw;
      }
    }
  }
}
</style>