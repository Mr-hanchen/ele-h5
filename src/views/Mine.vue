<template>
  <div class="mine">
    <div class="header">
      <van-cell is-link to="/login" class="cell">
        <template slot="title">
          <img src="../assets/logo2.png" alt="logo" class="logo" />
          <div class="content">
            <div class="title">登录/注册</div>
            <div class="tip">
              <img src="../assets/mobile.svg" alt="mobile" />
              登录后享受更多特权
            </div>
          </div>
        </template>
      </van-cell>
    </div>
    <van-row class="row">
      <van-col span="12" class="col">
        <img src="../assets/red-packet.svg" alt="red-packet" />
        <span>红包</span>
      </van-col>
      <van-col span="12" @click="auth('/coin', '/mine')">
        <img src="../assets/gold-coin.svg" alt="gold-coin" />
        <span>金币</span>
      </van-col>
    </van-row>
    <div class="navs">
      <div class="nav1">
        <van-cell v-for="(cell,i) in navs[0]" :key="i" is-link :to="cell.path">
          <template slot="title">
            <img :src="cell.icon" alt="icon" class="icon" />
            <span>{{cell.title}}</span>
          </template>
        </van-cell>
      </div>

      <div class="nav2">
        <van-cell v-for="(cell,i) in navs[1]" :key="i" is-link :to="cell.path">
          <template slot="title">
            <img :src="cell.icon" alt="icon" class="icon" />
            <span>{{cell.title}}</span>
          </template>
        </van-cell>
      </div>

      <div class="nav3">
        <van-cell v-for="(cell,i) in navs[2]" :key="i" is-link :to="cell.path">
          <template slot="title">
            <img :src="cell.icon" alt="icon" class="icon" />
            <span>{{cell.title}}</span>
          </template>
        </van-cell>
      </div>
    </div>

    <BaseTabbar />
  </div>
</template>

<script>
import address from "@/assets/address.svg";
import coinMall from "@/assets/coin-mall.svg";
import share from "@/assets/share.svg";
import customer from "@/assets/customer.svg";
import download from "@/assets/download.svg";
import rule from "@/assets/rule.svg";
export default {
  name: "mine",
  mounted(){
    console.log(this)
  },
  data() {
    return {
      navs: [
        [{ icon: address, title: "我的地址", path: "/" }],
        [
          { icon: coinMall, title: "金币商城", path: "/" },
          { icon: share, title: "分享拿20元现金", path: "/" }
        ],
        [
          { icon: customer, title: "我的客服", path: "/" },
          { icon: download, title: "下载饿了么APP", path: "/" },
          { icon: rule, title: "规则中心", path: "/" }
        ]
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.mine {
  background-color: #f5f5f5;
  height: 100vh;
  .header {
    background-image: linear-gradient(90deg, #0af, #0085ff);
    .cell {
      height: 29.33vw;
      color: #fff;
      background-image: linear-gradient(90deg, #0af, #0085ff) !important;
      align-items: center;
      .van-cell__right-icon {
        color: #fff;
      }
      .van-cell__title {
        display: flex;
      }
      .logo {
        width: 16.01vw;
        height: 16.01vw;
        margin-right: 4vw;
        border-radius: 50%;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 5.6vw;
          font-weight: 700;
          height: 6vw;
          line-height: 6vw;
        }
        .tip {
          font-size: 3.2vw;
          img {
            width: 1.866667vw !important;
            height: 2.933333vw !important;
          }
        }
      }
    }
  }
  .row {
    font-size: 3.2vw;
    background-color: #fff;
    .col{
      border-right: .13vw solid #eee;
    }
    .van-col {
      border-bottom: .13vw solid #eee;
      height: 22.4vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      img {
        width: 6.933333vw;
        height: 6.933333vw;
        margin-bottom: 2vw;
      }
    }
  }
  .navs {
    /* 1rem = 75.0667 */
    /* font-size: .426667rem;*/
    margin-top: 3vw;
    font-size: 3.2vw;
    .nav1,
    .nav2,
    .nav3 {
      margin-bottom: 3vw;
      border-top: .13vw solid #eee;
      border-bottom: .13vw solid #eee;
    }
    .icon {
      width: 4.8vw;
      height: 4.8vw;
      margin-right: 2vw;
      position: relative;
      top: 0.45vw;
    }
  }
}
</style>