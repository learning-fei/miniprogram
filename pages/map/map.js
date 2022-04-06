// import {getRequest} from '../../request/request'
var app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 27.858528854,
    longitude: 114.995442427,
    // latitude:'',
    // longitude:'',
    marker: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.updateAnimalLocation()
  },

  updateAnimalLocation: function () {
    var _this = this
    wx.request({
      url: baseUrl + '/location/getLocations',
      method: 'GET',
      header: {
        'token': "3f6d101998184993aa5111c942e46b45"
      },
      success(res) {
        console.log(res);
        console.log(res.data.data);
        var getArr = res.data.data

        var newArr = _this.data.marker
        for (let i = 0; i < getArr.length; i++) {
          var markerData = {
            latitude: getArr[i].latitude,
            longitude: getArr[i].longitude,
            iconPath: '../../imgs/marker.png',
          }
          newArr.push(markerData)
        }
        _this.setData({
          marker: newArr
        })

        // }

        // var mak=[{
        //   latitude: 27.858528854,
        //   longitude: 114.995442427,
        //   iconPath: '../../imgs/marker.png',
        // }, {
        //   latitude: 27.848528000,
        //   longitude: 114.995442427,
        //   iconPath: '../../imgs/marker.png',
        // }]
        // _this.data.marker=mak
        console.log(_this.data.marker);
      },
      fail(res) {
        console.log(res);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var _this = this
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        _this.data.latitude = res.latitude
        _this.data.longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy
        console.log(_this.data.latitude);

      }
    })

    //   wx.chooseLocation({
    //     success(res){
    //       console.log(res);
    //       _this.data.latitude=res.latitude,
    //       _this.data.longitude= res.longitude
    // console.log( _this.data.latitude);
    //     }
    //   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})