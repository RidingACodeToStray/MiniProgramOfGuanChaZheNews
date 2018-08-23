//index.js
//获取应用实例
const app = getApp()
var num = 1;
Page({
  data: {
    windowHeight:'500px',
    url: '../../pages/details/index'
  },
  onLoad: function () {
    let that = this;
    wx.setNavigationBarTitle({
      title: '滚动',
    })
    wx.request({
      url: app.globalData.api.gundong,
      data:{
        page:num
      },
      success:function(res){
        let result = res.data.datas;
        if(res.data.datas.length !== 0){
          that.setData({
            data_arr: result
          })
        }
      }
    })
  },
  //加载更多
  loadMore: function () {
    wx.showLoading({
      title: "加载中..."
    })
    let that = this;
    wx.request({
      url: app.globalData.api.gundong,
      data: {
        page: ++num
      },
      success: function (res) {
        that.setData({
          data_arr: that.data.data_arr.concat(res.data.datas)
        });

      },
      complete: function () {
        wx.hideLoading()
      }
    })
  }
})
