// Import Toast and Dialog APIs from TDesign
import Toast from 'tdesign-miniprogram/toast/index';
import Dialog from 'tdesign-miniprogram/dialog/index';

Page({
  data: {
    isLoggedIn: false,
    userInfo: null,
    userImages: [
      {
        id: 1,
        imageUrl: 'https://picsum.photos/400/400?random=11',
        prompt: '水晶城堡与飞龙，奇幻风格'
      },
      {
        id: 2,
        imageUrl: 'https://picsum.photos/400/500?random=12',
        prompt: '海底城市与人鱼，写实风格'
      },
      {
        id: 3,
        imageUrl: 'https://picsum.photos/400/450?random=13',
        prompt: '未来实验室，科技感'
      },
      {
        id: 4,
        imageUrl: 'https://picsum.photos/400/480?random=14',
        prompt: '古代东方宫殿，金色装饰'
      }
    ]
  },

  onLoad() {
    // Check if user is logged in
    this.checkLoginStatus();
  },

  onShow() {
    // Refresh user data if needed
  },

  checkLoginStatus() {
    // Check if user has authorized the app
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
    }
  },

  onLogin(e) {
    // Handle login with WeChat
    if (e.detail.userInfo) {
      const userInfo = e.detail.userInfo;
      
      // Save user info to storage
      wx.setStorageSync('userInfo', userInfo);
      
      // Update UI
      this.setData({
        isLoggedIn: true,
        userInfo: userInfo
      });
      
      // Show success toast
      Toast({
        context: this,
        selector: '#t-toast',
        message: '登录成功！',
        theme: 'success'
      });
    } else {
      // User denied authorization
      Toast({
        context: this,
        selector: '#t-toast',
        message: '登录失败，请授权使用',
        theme: 'error'
      });
    }
  },

  onLogout() {
    // Show confirmation dialog
    Dialog.confirm({
      context: this,
      title: '确认退出',
      content: '确定要退出登录吗？',
      confirmBtn: {
        content: '确定',
        variant: 'base'
      },
    }).then(() => {
      // User confirmed logout
      wx.removeStorageSync('userInfo');
      
      this.setData({
        isLoggedIn: false,
        userInfo: null
      });
      
      Toast({
        context: this,
        selector: '#t-toast',
        message: '已退出登录',
        theme: 'success'
      });
    }).catch(() => {
      // User canceled logout
    });
  },

  navigateToCreate() {
    wx.navigateTo({
      url: '/pages/create-image/create-image'
    });
  },

  previewImage(e) {
    const url = e.currentTarget.dataset.url;
    wx.previewImage({
      current: url,
      urls: this.data.userImages.map(img => img.imageUrl)
    });
  }
}); 