//index.js
//获取应用实例
const app = getApp()
var num = 1;
Page({
  data: {
    request_fail:false,
    windowHeight: '500px',
    data_arr:[],
    url:'../../pages/details/index'
  },
  onLoad: function () {
    let that = this;
    //修改头部标题
    wx.setNavigationBarTitle({
      title: '时评',
    })
    //设置滚动区域高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          windowHeight: res.windowHeight + "px"
        })
      },
    })
    wx.request({
      url: app.globalData.api.shiping,
      data:{
        page:num
      },
      success:function(res){
        that.setData({
          data_arr:res.data.datas
        });

      }
    })
    },
    //加载更多
    loadMore:function(){
      wx.showLoading({
        title:"加载中..."
      })
      let that = this;
      wx.request({
        url: app.globalData.api.shiping,
        data: {
          page: ++num
        },
        success: function (res) {
          that.setData({
            data_arr: that.data.data_arr.concat(res.data.datas)
          });

        },
        complete:function(){
          wx.hideLoading()
        }
      })
    }
})
