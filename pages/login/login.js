// import {
//   loginRequest


// } from "../../request/request";
var app = getApp()
var baseUrl = app.globalData.baseUrl

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    var _this=this
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          // hasUserInfo: true,
        })
        wx.setStorageSync('userInfo',res.userInfo)//放入缓存中，为下个页面获取
        wx.login({
          success(res) {
            console.log(res);
            console.log(res.code);
            if (res.code) {
              // loginRequest(
              //   '/user/login', res.code,
              // )
              // let login_code=wx.getStorageSync('login_code')
              // console.log(login_code);
              let login_data={
                code:res.code,
                userIconPath:_this.data.userInfo.avatarUrl,
                userNickName:_this.data.userInfo.nickName,
              }
              console.log(login_data);
              wx.request({
                url: baseUrl + '/user/login',
                method: 'POST',
                data: login_data,
                header: {
                  "Content-Type": 'application/json',
                  // 'token': "token"
                },
                success(res) {
                  console.log(res);
                  if (res.data.code == 200) {
                  wx.setStorageSync('token', res.data.data.token);
                  wx.setStorageSync('user_id', res.data.data.user_id);
                  _this.setData({
                    hasUserInfo: true,
                  })
          
                  wx.navigateTo({
                    url: '/pages/suggestion/suggestion',
                  })
          
                  } else {
                    wx.showToast({
                      title: '服务异常',
                      icon: 'error',
                      duration: 2000
                    })
    
                  }
                },
                fail(res) {
                  console.log(res);
                }
              })
    
            } else {
              console.log('登录失败');
            }
          }
        })
 
      },
    })
  },
  feedBack() {
    wx.navigateTo({
      url: '/pages/suggestion/suggestion',
    })
  }

})