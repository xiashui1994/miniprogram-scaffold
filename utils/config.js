/**
 * 小程序配置文件
 * 配置环境及接口地址
 * 使用方法：
 * 1.页面引入:  var config = require('../../utils/config.js')
 * 2.调用:  config.api_rootspath.api
 */
// 开发环境: 0 模拟数据mockapi, 1 开发, 2正式, 3 测试服务器
var mode = 0;

// 服务器端获取用户唯一标识（token信息）时传入的参数信息
var client_id = [
  '', // 模拟服务器
  '', // 开发服务器
  '', // 正式服务器
  '' // 测试服务器
];

// 程序数据接口，用于当前小程序数据获取
var api_roots = [
  '', // 模拟地址
  '', // 开发地址
  '', // 正式地址
  '', // 测试地址
];

// 开放平台，用于广告
var api_openApiPath = [
  'http://muser.aipublish.cn/api', // 模拟地址
  'http://topen.yqj.cn/api', // 开发地址
  'https://open.aipublish.cn/api', // 正式地址
  'http://topen.yqj.cn/api' // 测试地址
];

// 统计数据接口，用于数据统计
var api_statistics = [
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 模拟地址
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 开发地址
  'http://open.yqj.cn/api/Statistics/PageVisit', // 正式地址
  'http://topen.yqj.cn/api/Statistics/PageVisit', // 测试地址
]

// openid，用于获取openid
var open_id = [
  '', // 模拟地址
  '', // 开发地址
  'https://user.aipublish.cn/api/Account/Info/GetOpenId_ByAppId', // 正式地址
  'http://tuser.yqj.cn/api/Account/Info/GetOpenId_ByAppId' // 测试地址
];

// 领取奖励及按钮点击数据接口，用于领取奖励与按钮点击
var api_bookonline = [
  'http://10.10.2.80:3402', // 模拟地址
  'http://10.10.2.80:3402', // 开发地址
  'https://wwwapi.aipublish.cn', // 正式地址
  'https://testwwwapi.yqj.cn' // 测试地址
];

// 配置信息
var api_rootspath =
  {
    mode: mode, // 开发环境
    client_id: client_id[mode],// 使用的的client信息
    api: api_roots[mode],// 程序数据接口地址
    api_statistics: api_statistics[mode],// 获取统计数据
    api_openApiPath: api_openApiPath[mode], // 开放平台，用于广告
    open_id: open_id[mode], // openid
    api_bookonline: api_bookonline[mode] // 领取奖励及按钮点击
  };


// 对外暴露方法和内容
module.exports = {
  api_rootspath: api_rootspath
}