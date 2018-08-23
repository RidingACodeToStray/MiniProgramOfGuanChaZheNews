//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    request_fail:false,
    content:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs',
      windowHeight:'500px'
    })
  },
  onLoad: function (options) {
    let that = this;
    wx.setNavigationBarTitle({
      title: options.title,
    })
    wx.request({
      url: app.globalData.api.details + options.id,
      success:function(res){
        //抓取内容
        let s = res.data.search("textPageCont");
        let sStr = res.data.substring(s+14);
        let e = sStr.indexOf("</section>");
        let eStr = sStr.substring(0,e);
        
        //删除js代码
        let sScript = eStr.indexOf("<script");
        if (sScript !== -1){
          let eStrTemp = eStr;
          let eScript = eStr.indexOf("</script>") + 9;
          let estr1 = eStr.substring(0, sScript);
          let estr2 = eStrTemp.substring(eScript);
          eStr = estr1 + estr2;
        };
        //补全代码
        let reg1 = new RegExp(/!wap.jpg"/, "g");
        let fStr = eStr.replace(reg1, '" style="width:250px" />');
        let reg2 = new RegExp(/\/> \/>/, "g");
        let gStr = fStr.replace(reg2, '/>');
        that.setData({
          content: gStr
        })
      }
    })
  }
})
