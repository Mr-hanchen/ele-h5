<template>
  <div class="select-city">
    <van-sticky>
      <van-nav-bar title="城市选择" left-arrow @click-left="$router.back()" />
      <van-search placeholder="请输入城市名或者拼音" v-model="value" @input="input" />
    </van-sticky>
    <van-index-bar>
      <div v-if="citys!==null">
        <div v-for="(cl,i) in citys.cityList" :key="i">
          <van-index-anchor :index="cl.idx" class="index" />
          <van-cell
            :title="c.name"
            v-for="(c,j) in cl.cities"
            :key="j"
            @click="selectCity(c.longitude, c.latitude, c.name)"
          />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "selectCity",
  data() {
    return {
      value: "",
      citys: localStorage.getItem("citys")
        ? JSON.parse(localStorage.getItem("citys"))
        : null
    };
  },
  created() {
    if (!this.citys) {
      this.getCitys();
    }
  },
  methods: {
    ...mapMutations(["setCoordinate", "setCurrentCity"]),
    getCitys() {
      axios
        .get("https://shadow.elemecdn.com/lib/city-list@0.0.3/city_list.json")
        .then(res => {
          this.citys = res.data;
          localStorage.setItem("citys", JSON.stringify(res.data));
        });
    },
    selectCity(longitude, latitude, city) {
      // console.log(`${longitude},${latitude}`);
      this.setCoordinate({ longitude, latitude });
      this.setCurrentCity(city);
      this.$router.back();
    },
    input() {
      var newCitys = { cityList: [] };
      var cityList = JSON.parse(localStorage.getItem("citys")).cityList;
      for (let i = 0; i < cityList.length; i++) {
        const oldObj = cityList[i];
        var newObj = {
          idx: oldObj.idx,
          cities: []
        };
        for (let j = 0; j < oldObj.cities.length; j++) {
          const oldCity = oldObj.cities[j];
          if (
            oldCity.pinyin.indexOf(this.value.toLowerCase()) > -1 ||
            oldCity.name.indexOf(this.value) > -1
          ) {
            if (!newObj.cities.includes(oldCity)) {
              newObj.cities.push(oldCity);
            }
          }
        }
        if (newObj.cities.length !== 0) {
          newCitys.cityList.push(newObj);
        }
      }
      this.citys = newCitys;
    }
  }
};
</script>

<style lang="scss" scoped>
.select-city {
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
  .van-search {
    background-image: linear-gradient(90deg, #0af, #0085ff) !important;
    padding-left: 5vw;
    padding-right: 5vw;
    .van-search__content {
      border-radius: 6vw;
    }
  }
  .index {
    background-color: #f5f5f5 !important;
  }
  .van-cell:not(:last-child)::after {
    border-bottom-color: #ccc !important;
  }
}
</style>