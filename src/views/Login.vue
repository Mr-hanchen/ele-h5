<template>
  <div class="login">
    <van-cell-group>
      <img src="../assets/logo2.png" alt="logo2" class="logo2" />
    </van-cell-group>
    <van-cell-group class="border mobile" ref="mobile">
      <van-field v-model="mobile" placeholder="手机号" @focus="focus1" @blur="blur1" @input="input" />
      <button
        class="get-code"
        :class="{color: !disabled}"
        :disabled="disabled"
        @click="getCode"
        ref="getCode"
      >获取验证码</button>
    </van-cell-group>
    <van-cell-group class="border" ref="code">
      <van-field v-model="code" placeholder="验证码" @focus="focus2" @blur="blur2" />
    </van-cell-group>
    <van-cell-group class="left">
      新用户登录即自动注册，并表示已同意
      《用户服务协议》
      《隐私权政策》
    </van-cell-group>
    <van-cell-group>
      <van-button type="primary" class="btn" @click="login">登录</van-button>
    </van-cell-group>
    <van-cell-group class="h10">关于我们</van-cell-group>

    <!-- 图片验证码 -->
    <van-dialog class="dialog" v-model="show" title="请填写图片验证" show-cancel-button @confirm="confirm">
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
import { mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    return {
      mobile: "",
      code: "",
      disabled: true,
      time: 30,
      timer: null,
      show: false,
      imgCode: "",
      captcha_image: "",
      captcha_hash: "",
      validate_token: ""
    };
  },
  methods: {
    ...mapMutations(["setUserId"]),
    focus1() {
      this.$refs.mobile.style.borderColor = "#008cf0";
    },
    focus2() {
      this.$refs.code.style.borderColor = "#008cf0";
    },
    blur1() {
      this.$refs.mobile.style.borderColor = "#ddd";
    },
    blur2() {
      this.$refs.code.style.borderColor = "#ddd";
    },
    input(ev) {
      // var reg = new RegExp('^1[3456789]\d{9}$');
      var reg = /^1[3456789]\d{9}$/;
      // console.log(reg.test(ev));
      this.disabled = !reg.test(ev);
    },
    getCode() {
      this.disabled = true;
      // next下一次 Tick滴答声，直译：下一次滴答声，在这里表示当前组件下一次渲染。目的：确保你获取的虚拟DOM（this.$refs.getCode）存在，才可以去使用DOM中的属性和方法
      this.$nextTick(() => {
        this.$refs.getCode.innerText = `已发送(${this.time}s)`;
      });

      this.timer = setInterval(() => {
        if (this.time >= 1) {
          this.time--;
          this.$nextTick(() => {
            this.$refs.getCode.innerText = `已发送(${this.time}s)`;
          });
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.$nextTick(() => {
            this.$refs.getCode.innerText = `重新获取`;
          });
          this.disabled = false;
        }
      }, 1000);

      axios
        .post(
          "/api/restapi/eus/login/mobile_send_code",
          Qs.stringify({
            mobile: this.mobile,
            captcha_value: "",
            captcha_hash: "",
            scf: "ms"
          })
        )
        .then(res => {
          // validate_token为了在登录时验证短信验证码输入的是否正确。
          this.validate_token = res.data.validate_token;
        })
        .catch(err => {
          console.log(err);
          axios
            .post(
              "/api/restapi/eus/v3/captchas",
              Qs.stringify({
                captcha_str: this.mobile
              })
            )
            .then(res => {
              // captcha_hash在你确定图片验证码时使用。
              // captcha_image为了显示验证码图片。 base64格式的图片
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
      axios
        .post(
          "/api/restapi/eus/login/mobile_send_code",
          Qs.stringify({
            mobile: this.mobile,
            captcha_value: this.imgCode, // 用户根据图片验证码输入的值。vg3c
            captcha_hash: this.captcha_hash,// 确保你输入的图片验证码是正确。
            scf: "ms"
          })
        )
        .then(res => {
          this.validate_token = res.data.validate_token;
        })
        .catch(err => {
          this.show = true;
        });
    },
    refresh() {
      axios
        .post(
          "/api/restapi/eus/v3/captchas",
          Qs.stringify({
            captcha_str: this.mobile
          })
        )
        .then(res => {
          this.captcha_hash = res.data.captcha_hash;
          this.captcha_image = res.data.captcha_image;
        })
        .catch(err => {
          console.log(err);
        });
    },
    login() {
      clearInterval(this.timer);
      this.timer = null;
      if (!this.mobile) {
        this.$toast("请填写手机号");
        return;
      }
      if (!this.code) {
        this.$toast("请获取验证码");
        return;
      }
      axios
        .post(
          "/api/restapi/eus/login/login_by_mobile",
          Qs.stringify({
            mobile: this.mobile,
            validate_code: this.code,
            scf: "ms",
            // token值是饿了么验证的凭证。
            validate_token: this.validate_token
          })
        )
        .then(res => {
          console.log(res);
          this.setUserId(res.data.user_id);
          this.$router.push(this.$route.query.returnURL);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
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
    border: 1px solid #ddd;
    border-radius: 1vw;
  }
  .left {
    text-align: left;
  }
  [class*="van-hairline"]::after {
    border: none !important;
  }
  .btn {
    width: 100%;
  }
  .h10 {
    height: 10vw;
    line-height: 10vw;
  }
  .mobile,
  .imgcell {
    position: relative;
  }
  .get-code {
    position: absolute;
    top: 4vw;
    right: 3vw;
    border: none;
    background-color: #fff;
  }
  .color {
    color: #2395ff;
  }
  .dialog {
    .van-dialog__header {
      font-weight: 700 !important;
      font-size: 18px;
    }
  }
  .imgcode {
    position: absolute;
    top: 1vw;
    right: 3vw;
    width: 25vw;
    height: 10vw;
    cursor: pointer;
  }
}
</style>