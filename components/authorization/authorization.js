// components/Authorization/authorization.js
var config = require('../../utils/config.js');

Component({
 
  /**
   * 组件的初始数据
   */
  data: {
    isAuthorized: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 组件生命周期函数，在组件实例进入页面节点树时执行
   */
  created(){
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 设置显示与隐藏
    setIsShow: function() {
      this.setData({
        isAuthorized: false
      })
    },
    // 隐藏授权按钮
    _hide: function() {
      this.setData({
        isAuthorized: true
      })
    },
    // 允许授权
    _authorization_allow: function(e) {
      let handler = this;
      if (e.detail.userInfo) {
        // 保存用户信息
        getApp().globalData.wxUserInfo.wxName = e.detail.userInfo.nickName;
        getApp().globalData.wxUserInfo.wxAvatarUrl = e.detail.userInfo.avatarUrl;
        if (e.detail.userInfo.gender === 1) {
          getApp().globalData.wxUserInfo.wxGender = 'b';
        } else {
          getApp().globalData.wxUserInfo.wxGender = 'g';
        }
        console.log('授权页中的3getApp().globalData.wxUserInfo',getApp().globalData.wxUserInfo);
        wx.login({
          success: res => {
            console.log(res.code, e.detail.iv, e.detail.encryptedData);
            wx.request({
              url: config.api_rootspath.client_id + '/OAuth/Token',
              data: {
                grant_type: 'password',     //授权类型
                client_id: getApp().globalData.client_id,              //客户端编号
                client_secret: getApp().globalData.client_secret,          //客户端密钥
                username: 'WeChat_'+res.code+'_'+e.detail.iv,               //格式'WeChat_'+code+'_'+iv,   code:wx.login成功获取到的code,  iv:wx.getUserInfo()成功之后得到的iv
                password: e.detail.encryptedData               //encryptedData,小程序使用wx.getUserInfo得到的 临时登录凭证encryptedData
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              method: 'POST',
              // 成功获取用户token
              success: function(res) {
                console.log('tokenRes',res);
                if (res.statusCode === 200){
                  wx.setStorageSync('__token__',res.data.access_token);
                  handler.triggerEvent('Authorization', {});
                  handler._hide();
                  console.log('获取token', res.data);
                } else {
                  handler.setIsShow();
                  console.log('重新登陆获取的code');
                }
              },
              // 获取用户token失败
              fail: function(error) {
                handler.setIsShow();
                console.log('获取用户token失败', error);
              }
            })
          }
        })
      } else {
        handler.setIsShow();
      }
    }
  }
})
