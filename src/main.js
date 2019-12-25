import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vant, { CouponList } from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

// 注册全局组件
const requireComponent = require.context(
  './components',// 其组件目录的相对路径
  false,// 是否查询其子目录
  /Base[A-Z|a-z]\w+\.(vue)$/ // 匹配基础组件文件名的正则表达式
)
requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName);
  const componentName = fileName.split('/')[1].split('.')[0];
  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
});

// 路由守卫
// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !store.state.isLogin) {
//     router.push(`/login?returnURL=${to.path}`);
//     return;
//   }
//   next();
// })

// 全局混入
Vue.mixin({
  methods: {
    auth(path, returnURL) {
      if (!store.state.isLogin) {
        router.push(`/login?returnURL=${returnURL}`);
        return;
      }
      router.push(path);
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
