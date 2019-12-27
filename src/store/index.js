import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: Cookies.get('UTUSER') - 0 > 0, // 是否登录标识
    user_id: Cookies.get('UTUSER') - 0 || 0, // 用户id
    user: null, // 用户信息
    lng: null, // 经度
    lat: null, // 纬度
    currentCity: '北京',
    currentAddress: '正在定位...',
  },
  mutations: {
    setUserId(state, value) {
      state.user_id = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setCoordinate(state, coords) {
      state.lng = coords.longitude;
      state.lat = coords.latitude;
    },
    setCurrentCity(state, city) {
      state.currentCity = city;
    },
    setCurrentAddress(state, address) {
      state.currentAddress = address;
    }
  },
  actions: {
  },
  modules: {
  }
})
