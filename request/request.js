var app = getApp()
const baseUrl = app.globalData.baseUrl
// var token=''
// export function loginRequest(url, data) {
  // if (token !== null) {
  //   // console.log(res)
  //  var token= wx.getStorageSync('token');
  //   // wx.getStorageSync('user_id');
  // }
// }


export function postRequest(url, data) {
  var token = wx.getStorageSync('token');
  console.log(token);
  wx.request({
    url: baseUrl + url,
    method: 'POST',
    data: data,
    header: {
      // "Content-Type": 'application/json',
      'token': token
    },
    success(res) {
      console.log(res);
    },
    fail(res) {
      console.log(res);
    }
  })
}
export function getRequest(url) {
  // var token = wx.getStorageSync('token');
  // console.log(token);
  wx.request({
    url: baseUrl + url,
    method: 'GET',
    // data: data,
    header: {
      // "Content-Type": 'application/json',
      'token': "3f6d101998184993aa5111c942e46b45"
    },
    success(res) {
      console.log(res);

    },
    fail(res) {
      console.log(res);
    }
  })
}