<template>
  <div class="login">
    <van-cell-group>
      <img src="../assets/logo.png" alt="logo2" class="logo2" />
    </van-cell-group>
    <van-cell-group class="border mobile" ref="mobile">
      <van-field
        v-model="mobile"
        placeholder="请输入手机号"
        @focus="changeStyle1"
        @blur="blur1"
        @input="input"
      />
      <button
        class="get-code"
        @click="getCode"
        :class="{color: !disabled}"
        :disabled="disabled"
        ref="getCode"
      >获取验证码</button>
    </van-cell-group>
    <van-cell-group class="border" ref="code">
      <van-field v-model="code" placeholder="请输入验证码" @focus="changeStyle2" @blur="blur2" />
    </van-cell-group>
    <van-cell-group class="left">
      新用户登录即自动注册，并表示已同意
      《用户服务协议》
      《隐私权政策》
    </van-cell-group>
    <van-cell-group>
      <van-button type="primary" class="btn">登录</van-button>
    </van-cell-group>
    <van-cell-group class="h10">关于我们</van-cell-group>

    <!-- 图片验证码 -->
    <van-dialog
      v-model="show"
      title="请填写图片验证码"
      show-cancel-button
      class="dialog"
      @confirm="confirm"
    >
      <div style="padding:5vw;">
        <van-cell-group class="border imgcell">
          <van-field v-model="imgCode" />
          <img :src="captcha_image" alt="验证码" class="imgcode" @click="refresh" />
        </van-cell-group>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Qs from "qs";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      code: "",
      disabled: true,
      time: 30,
      timer: null,
      show: true,
      imgCode: "",
      captcha_image: "",
      captcha_hash: ""
    };
  },
  methods: {
    changeStyle1() {
      this.$refs.mobile.style.borderColor = "rgb(0, 140, 240)";
    },
    changeStyle2() {
      this.$refs.code.style.borderColor = "rgb(0, 140, 240)";
    },
    blur1() {
      this.$refs.mobile.style.borderColor = "#eee";
    },
    blur2() {
      this.$refs.code.style.borderColor = "#eee";
    },
    input(ev) {
      let isMobile = /^1[3456789]\d{9}$/.test(ev);
      console.log(/^1[3456789]\d{9}$/.test(ev));
      this.disabled = !isMobile;
    },
    getCode() {
      console.log("123456789");
      this.disabled = true;
      console.log(this.$refs.getCode);
      this.$refs.getCode.innerText = `已发送(${this.time}s)`;
      this.timer = setInterval(() => {
        if (this.time >= 1) {
          this.time--;
          this.$refs.getCode.innerText = `已发送(${this.time}s)`;
        } else {
          clearInterval(this.timer); // 清除定时器
          this.timer = null;
          this.$refs.getCode.innerText = `重新获取`;
          this.disabled = false;
        }
      }, 1000);
      let data = {
        mobile: this.mobile,
        captcha_value: "",
        captcha_hash: "",
        scf: "ms"
      };
      axios
        .post("/api/restapi/eus/login/mobile_send_code", Qs.stringify(data))
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          // 1. 出现图片验证码。
          axios
            .post(
              "/api/restapi/eus/v3/captchas",
              Qs.stringify({
                captcha_str: this.mobile
              })
            )
            .then(res => {
              console.log(res);
              this.captcha_hash = res.data.captcha_hash;
              this.captcha_image = res.data.captcha_image;
            })
            .catch(err => {
              console.log(err);
            });
          this.src = "newvalue";
          this.show = true;
        });
    },
    confirm() {
      console.log("confirm");
      99
    },
    refresh() {
      console.log("刷新验证码");
      axios
        .post(
          "/api/restapi/eus/v3/captchas",
          Qs.stringify({
            captcha_str: this.mobile
          })
        )
        .then(res => {
          console.log(res);
          this.captcha_hash = res.data.captcha_hash;
          this.captcha_image = res.data.captcha_image;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.login {
  font-size: 14px;
  padding: 10vw;
  color: #999;
  .logo2 {
    width: 40vw;
  }
  .van-cell-group {
    text-align: center;
    margin-top: 4vw;
    padding: 3px;
  }
  .border {
    border: 1px solid #eee;
    border-radius: 5px;
  }
  .left {
    text-align: left;
  }
  [class*="van-hairline"]::after {
    border: none !important;
  }
  .van-field {
    border: 1px solid #fff;
    border-radius: 5px;
  }
  .btn {
    width: 100%;
  }
  .h10 {
    height: 10vw;
    line-height: 10vw;
    //   border: 1px solid red;
  }
  .mobile,
  .imgcell {
    position: relative;
    .get-code {
      position: absolute;
      top: 4vw;
      right: 3vw;
      background-color: #fff;
      border: 0;
    }
    .color {
      color: #2395ff;
    }
  }
  .dialog {
    .van-dialog__header {
      font-weight: 700 !important;
      font-size: 18px;
    }
  }
  .imgcode {
    position: absolute;
    top: 1.5vw;
    right: 2vw;
    width: 25vw;
    height: 10vw;
    cursor: pointer;
  }
}
</style>