var config = require('./utils/config.js');
//app.js
App({
  onLaunch: function () {
    // 获取用户ClientType
    wx.getSystemInfo({
      success: res => {
        this.globalData.ClientType = res.platform;
      },
      fail: err => {
        console.log('获取用户设备失败',err);
      }
    });
    // 获取用户ip
    wx.request({
      url: 'https://pv.sohu.com/cityjson?ie=utf-8',
      success: res => {
        let str = res.data.split('=')[1];
        let obj = JSON.parse(str.substr(0,str.length-1));
        this.globalData.ip = obj.cip;
      },
      fail: err => {
        console.log('获取用户ip失败',err);
      }
    });
    // 打开调试开关。此开关对正式版也能生效
    if (config.api_rootspath.mode !== 2) {
      wx.setEnableDebug({
        enableDebug: true
      });
    }
  },
  globalData: {
    userInfo: null,
    projectname: "", //项目名 url编码
    ClientType: '',  // 客户端类型
    appid: '', // 项目id
    AppSecret: '', //项目密钥
    openId: '', // 用户openid
    client_id: '',  // 客户端id
    ip: '', // 用户ip
    client_secret: '',
    wxSubscription_id: '', // 微信公众号id
    wxUserInfo: {
      wxName: '',
      wxGender: '',
      wxAvatarUrl: ''
    }, // 小程序中获取到的用户信息
    invite_open_id: "" // 邀请人的openID
  }
})