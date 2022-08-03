<!-- 我的 -->
<template>
  <div class="user-box">
    <div class="user-top">
      <img :src="avatarSrc" alt="" />
      <!-- 如果登陆了，就显示用户名，否则显示立即登录 -->
      <h3 v-if="ifLogined">{{ username }}</h3>
      <!-- 点击登录，显示模态框 -->
      <h3 @click="ljdl" v-else>点击登录</h3>
      <van-icon :name="ifLogined ? 'cross' : 'arrow'" @click="loginout" />
    </div>

    <!-- 九宫格部分 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in gridArr"
        :key="item.id"
        :icon="item.icon"
        :text="item.type"
      />
    </van-grid>

    <!-- 模态框 -->
    <div class="modal" v-if="ifShowModal">
      <div class="modal-bg" @click="ifShowModal = false"></div>
      <div class="modal-content">
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="pwd"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <!-- <van-field 
           v-model="text" 
            label="验证码"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          ></van-field><SIdentify/> -->
          <div style="margin: 16px">
            <van-button round block type="danger" native-type="submit"
              >提交</van-button
            >
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入登录接口
import { LoginData } from "@/api/home";
import headImg from "@/assets/logo.png";  //默认头像
import SIdentify from '@/components/SIdentify'
export default {
  name: "user",
  data() {
    return {
      username: "",
      pwd: "",
      avatarSrc: headImg,  //头像
      ifLogined: false, // 登录状态
      ifShowModal: false, // 是否显示模态框
      gridArr: [
        // grid数组
        { id: 0, icon: "label-o", type: "我的订单" },
        { id: 1, icon: "bill-o", type: "优惠券" },
        { id: 2, icon: "goods-collect-o", type: "礼品卡" },
        { id: 3, icon: "location-o", type: "我的收藏" },
        { id: 4, icon: "flag-o", type: "我的足迹" },
        { id: 5, icon: "contact", type: "会员福利" },
        { id: 6, icon: "aim", type: "地址管理" },
        { id: 7, icon: "warn-o", type: "账号安全" },
        { id: 8, icon: "service-o", type: "联系客服" },
        { id: 9, icon: "question-o", type: "帮助中心" },
        { id: 10, icon: "smile-comment-o", type: "意见反馈" },
      ],
    };
  },
  created() {
    // 登陆前先看本人是否登陆过
    let user = JSON.parse(localStorage.getItem("userInfo"));
    // 用户名存在
    if (user) {
      this.username = user.username;  //用户名
      this.avatarSrc = user.avatar; //头像
      this.ifLogined = true; // 显示用户名
    }
  },
  components:{SIdentify},
  
  methods: {
    // 点击立即登录，显示登录模态框
    ljdl() {
      this.ifShowModal = true;   
    },

    // 提交用户名，密码信息
    onSubmit() {
      this.getloginData(); //发送数据请求
    },

    // 发送数据请求：登录注册
    getloginData() {
      LoginData({ username: this.username, pwd: this.pwd }).then((res) => {
        console.log(res);
        if (res.errno === 0) {
          console.log("登录成功");
          this.$toast.success("登录成功");
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
          this.ifShowModal = false; //不显示模态框
          this.ifLogined = true; // 显示用户名
          this.avatarSrc = res.data.userInfo.avatar; //头像
          this.username = res.data.userInfo.username;
        }
      });
    },
    // 退出登录
    loginout() {
      // 登录了
      if (this.ifLogined) {
        this.$dialog
          .confirm({
            title: "退出登录",
            message: "是否退出登录",
          })
          .then(() => {
            // on confirm
            this.ifLogined = false; // 不显示用户名
            this.avatarSrc = headImg; //头像
            // 清除token
            localStorage.removeItem("token");
            localStorage.removeItem("userInfo");
            // 刷新当前页
            this.$router.go(0);
            // 刷新当前页
            this.$router.go(0);
          })
          .catch(() => {
            // on cancel
          });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.user-box {
  .user-top {
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 20px 10px;
    box-sizing: border-box;
    background-color: #333;
    color: white;
    img {
      width: 70px;
      height: 70px;
      margin-right: 10px;
      border-radius: 50%;
    }
    h3 {
      flex: 1;
    }
  }
  .modal {
    width: 100%;
    height: 100%;
    position: fixed; //position: fixed让height:100%起作用
    left: 0;
    top: 0;
    .modal-bg {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    .modal-content {
      width: 90%;
      height: 200px;
      box-sizing: border-box;
      // height: 200px;
      background-color: #fff;
      padding: 20px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      z-index: 100;
    }
  }
}

</style>
