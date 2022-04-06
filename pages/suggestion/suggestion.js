// import { fail } from "assert/strict";
import {
  postRequest
} from "../../request/request";

var app = getApp()
const baseUrl = app.globalData.baseUrl

// var chooseImgs=[]
//  var  user_id=wx.getStorageSync('user_id')
// console.log(user_id);得不到
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    suggestData: '',
    textVal: '',
    // 被选中的图片路径 数组
    chooseImgs:[]
  },

  onShow() {
    const userinfo = wx.getStorageSync("userInfo");
    this.setData({
      userinfo
    });
  },
  //textVal的
  handleTextInput() {
    // console.log(e)
    // // this.setData({
    // //   textVal: e.detail.value
    // // })
    // this.data.textVal= e.detail.value
    // console.log(this.data.textVal);
  },
  handleChooseImg() {
    // 2 调用小程序内置的选择图片api
    wx.chooseImage({
      // 同时选中的图片的数量
      count: 9,
      // 图片的格式  原图  压缩
      sizeType: ['original', 'compressed'],
      // 图片的来源  相册  照相机
      sourceType: ['album', 'camera'],

      success:(res)=> {
        let tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);

        this.setData({
          chooseImgs:tempFilePaths
        })
        // this.data.chooseImgs=tempFilePaths
        console.log(this.data.chooseImgs);

        for (let i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: baseUrl+'/fileUpload/img',
            filePath: tempFilePaths[i],
            name: 'img',
            success(res) {
              // const data = res.data
              // console.log(res.data);
              const result = JSON.parse(res.data)
              console.log(result.data);
              var chooseImgs=result.data
              return chooseImgs
              // re.data.push()
              // const re=[]
              // re.push(result.data)
              // this.data.chooseImgs=res
              // console.log(this.data.chooseImgs);
              // this.setData({
              //   chooseImgs
              // })
             
              // chooseImgs.push(re.data);
              //  console.log(chooseImgs);
            },
            fail(res) {
              console.log(res);
            }

          })
        }
      }
    });

  },
  handleFormSubmit(){
    
    console.log(this.data.textVal);
    console.log(user_id);
    let data={
      suggestionText:this.data.textVal,
      imgUrl:[],
      suggestUserId:user_id
    }
    postRequest('/suggestion/addOne',data)
  },
  

  // Add Code In 2022-04-02 選擇圖片上傳
  handleChoseFiles(){
    var _this = this
    wx.chooseImage({
      count: 6,
      sizeType:['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res)
        console.log(_this.data.chooseImgs);
        // if(res.tempFilePaths.length > 1){
          for(var i = 0; i< res.tempFilePaths.length; i++){
            (function(i){
              let imgArr =_this.data.chooseImgs
              imgArr.push(res.tempFilePaths[i])
              _this.setData({
                chooseImgs:imgArr
              })
            })(i)
           
          
            // 閉包上傳
            // (function(i){
            //   wx.uploadFile({
            //     url: baseUrl+'/fileUpload/img',
            //     filePath:res.tempFilePaths[i],
            //     name:'img',
            //     success:(res) => {
            //       console.log(res);
            //       let data = JSON.parse(res.data)
            //       console.log(data)
            //       if(data.code == 200){
            //         let imgArr =_this.data.chooseImgs
            //         imgArr.push(data.msg)
            //         _this.setData({
            //           chooseImgs:imgArr
            //         })
            //       }
            //     }
            //   })
            // })(i)
          }
        // }else{
        //   wx.uploadFile({
        //     url: baseUrl+'/fileUpload/img',
        //     filePath:res.tempFilePaths[0],
        //     name:'img',
        //     success:(res) => {
        //       let data = JSON.parse(res.data)
        //       // console.log(data)
        //       // 根據返回值獲取圖片返回值填入IMGLIST
        //       if(data.code == 200){
        //         let newArr =this.data.chooseImgs
        //         newArr.push(data.msg)
        //         _this.setData({
        //           chooseImgs:newArr
        //         })
        //       }
        //     }
        //   })
        // }
      }
    })
    console.log(this.data.chooseImgs);
    console.log(this.data.chooseImgs[2]);

  },

  handleFormSubmit(){
    
    console.log(this.data.textVal);
    console.log(this.data.chooseImgs);
    // console.log(user_id);
    var  user_id=wx.getStorageSync('user_id')
    console.log(user_id);
    let data={
      suggestionText:this.data.textVal,
      imgUrl:this.data.chooseImgs,
      suggestUserId:user_id
    }
  //  data= JSON.stringify(data)
    console.log(data);
    postRequest('/suggestion/addOne',data),
    function feedBack() {
      wx.navigateTo({
        url: '/pages/suggestion/suggestion',
      })
    }
  },
  
// Add Code In 2022-04-02 輸出數據
handleConsole(){
  console.log(this.data.chooseImgs)
}
})


  



