// Import Toast API from TDesign
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    prompt: '',
    negativePrompt: '',
    showNegativePrompt: false,
    generating: false,
    styleTags: ['写实', '动漫', '电影感', '梦幻', '极简', '复古', '科技感', '水彩'],
    examplePrompts: [
      '一位探险家站在雪山顶峰，金色阳光，电影感',
      '未来城市的街道，霓虹灯，赛博朋克风格，下雨天',
      '古代中国画卷风格，山水，烟雾缭绕，仙鹤飞过'
    ]
  },

  onLoad() {
    // Check if user is logged in
    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo) {
      // Redirect to profile page to login
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请先登录',
        theme: 'warning'
      });
      
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/profile/profile'
        });
      }, 1500);
    }
  },

  onPromptChange(e) {
    this.setData({
      prompt: e.detail.value
    });
  },

  onNegativePromptChange(e) {
    this.setData({
      negativePrompt: e.detail.value
    });
  },

  toggleNegativePrompt() {
    this.setData({
      showNegativePrompt: !this.data.showNegativePrompt
    });
  },

  addStyleTag(e) {
    const tag = e.currentTarget.dataset.tag;
    let currentPrompt = this.data.prompt;
    
    // Add the tag to the prompt
    if (currentPrompt) {
      if (currentPrompt.endsWith(',') || currentPrompt.endsWith('，')) {
        currentPrompt = currentPrompt + ' ' + tag;
      } else {
        currentPrompt = currentPrompt + ', ' + tag;
      }
    } else {
      currentPrompt = tag;
    }
    
    this.setData({
      prompt: currentPrompt
    });
    
    // Show toast
    Toast({
      context: this,
      selector: '#t-toast',
      message: `已添加: ${tag}`,
      theme: 'success'
    });
  },

  useExamplePrompt(e) {
    const prompt = e.currentTarget.dataset.prompt;
    
    this.setData({
      prompt: prompt
    });
    
    // Show toast
    Toast({
      context: this,
      selector: '#t-toast',
      message: '已使用示例提示词',
      theme: 'success'
    });
  },

  generateImage() {
    if (!this.data.prompt) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '请输入提示词',
        theme: 'error'
      });
      return;
    }
    
    this.setData({
      generating: true
    });
    
    // Show loading toast
    Toast({
      context: this,
      selector: '#t-toast',
      message: '正在生成图片...',
      theme: 'loading',
      direction: 'column',
      duration: 3000
    });
    
    // Simulate API call delay
    setTimeout(() => {
      this.setData({
        generating: false
      });
      
      // Navigate to the image generated page
      wx.navigateTo({
        url: `/pages/image-generated/image-generated?prompt=${encodeURIComponent(this.data.prompt)}&negativePrompt=${encodeURIComponent(this.data.negativePrompt)}`
      });
    }, 3000);
  }
}); 