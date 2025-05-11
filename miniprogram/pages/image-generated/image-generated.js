// Import Toast and Dialog APIs from TDesign
import Toast from 'tdesign-miniprogram/toast/index';
import Dialog from 'tdesign-miniprogram/dialog/index';

Page({
  data: {
    imageUrl: 'https://picsum.photos/600/600?random=20',
    prompt: '',
    negativePrompt: '',
    isPublished: false
  },

  onLoad(options) {
    if (options.prompt) {
      this.setData({
        prompt: decodeURIComponent(options.prompt)
      });
    }
    
    if (options.negativePrompt) {
      this.setData({
        negativePrompt: decodeURIComponent(options.negativePrompt)
      });
    }
  },

  previewImage() {
    wx.previewImage({
      current: this.data.imageUrl,
      urls: [this.data.imageUrl]
    });
  },

  saveToAlbum() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '保存中...',
      theme: 'loading',
      direction: 'column',
      duration: 1000
    });
    
    // Simulate download delay
    setTimeout(() => {
      wx.saveImageToPhotosAlbum({
        filePath: this.data.imageUrl,
        success: () => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '已保存到相册',
            theme: 'success'
          });
        },
        fail: (err) => {
          Toast({
            context: this,
            selector: '#t-toast',
            message: '保存失败，请授权相册权限',
            theme: 'error'
          });
          
          console.error('Save to album failed:', err);
        }
      });
    }, 1000);
  },

  publishToGallery() {
    if (this.data.isPublished) {
      Toast({
        context: this,
        selector: '#t-toast',
        message: '已经发布过了',
        theme: 'warning'
      });
      return;
    }
    
    Dialog.confirm({
      context: this,
      title: '发布确认',
      content: '确定要发布到画廊吗？发布后所有人都可以看到',
      confirmBtn: {
        content: '确定发布',
        variant: 'base'
      },
    }).then(() => {
      // User confirmed publish
      Toast({
        context: this,
        selector: '#t-toast',
        message: '发布中...',
        theme: 'loading',
        direction: 'column',
        duration: 1500
      });
      
      // Simulate publishing delay
      setTimeout(() => {
        // Mark as published
        this.setData({
          isPublished: true
        });
        
        // Prepare the new image data
        const newPublishedImage = {
          id: Date.now(),
          imageUrl: this.data.imageUrl,
          prompt: this.data.prompt
        };
        
        // Set the new published image to be added to the gallery
        const pages = getCurrentPages();
        const homePage = pages.find(page => page.route === 'pages/home/home');
        
        if (homePage) {
          homePage.setData({
            newPublishedImage: newPublishedImage
          });
        }
        
        Toast({
          context: this,
          selector: '#t-toast',
          message: '发布成功！',
          theme: 'success'
        });
        
        // Navigate back to home page after a short delay
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/home/home'
          });
        }, 1500);
      }, 1500);
    }).catch(() => {
      // User canceled publish
    });
  },

  regenerateImage() {
    Toast({
      context: this,
      selector: '#t-toast',
      message: '重新生成中...',
      theme: 'loading',
      direction: 'column',
      duration: 2000
    });
    
    // Simulate regeneration delay
    setTimeout(() => {
      this.setData({
        imageUrl: `https://picsum.photos/600/600?random=${Math.floor(Math.random() * 100)}`
      });
      
      Toast({
        context: this,
        selector: '#t-toast',
        message: '生成成功',
        theme: 'success'
      });
    }, 2000);
  },

  modifyPrompt() {
    // Navigate back to create image page with current prompt
    const pages = getCurrentPages();
    if (pages.length > 1) {
      const prevPage = pages[pages.length - 2];
      
      // Check if previous page is create-image
      if (prevPage.route === 'pages/create-image/create-image') {
        wx.navigateBack({
          delta: 1
        });
      } else {
        // Navigate to create-image with current prompt
        wx.redirectTo({
          url: `/pages/create-image/create-image?prompt=${encodeURIComponent(this.data.prompt)}&negativePrompt=${encodeURIComponent(this.data.negativePrompt)}`
        });
      }
    } else {
      // Navigate to create-image with current prompt
      wx.redirectTo({
        url: `/pages/create-image/create-image?prompt=${encodeURIComponent(this.data.prompt)}&negativePrompt=${encodeURIComponent(this.data.negativePrompt)}`
      });
    }
  }
}); 