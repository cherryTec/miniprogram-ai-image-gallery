// Import Toast API from TDesign
import Toast from 'tdesign-miniprogram/toast/index';

Page({
  data: {
    images: [
      {
        id: 1,
        imageUrl: 'https://picsum.photos/400/400?random=1',
        prompt: '夕阳下的城市剪影，电影风格'
      },
      {
        id: 2,
        imageUrl: 'https://picsum.photos/400/600?random=2',
        prompt: '梦幻森林中的小屋，动漫风格'
      },
      {
        id: 3,
        imageUrl: 'https://picsum.photos/400/500?random=3',
        prompt: '霓虹灯下的未来都市，赛博朋克风格'
      },
      {
        id: 4,
        imageUrl: 'https://picsum.photos/400/400?random=4',
        prompt: '沙漠中的绿洲，写实风格'
      },
      {
        id: 5,
        imageUrl: 'https://picsum.photos/400/450?random=5',
        prompt: '浮在半空中的岛屿，魔幻风格'
      },
      {
        id: 6,
        imageUrl: 'https://picsum.photos/400/550?random=6',
        prompt: '宇宙星云中的太空船，科幻风格'
      }
    ],
    loading: false,
    page: 1,
    pageSize: 6
  },

  onLoad() {
    // Initialize the page
  },

  onShow() {
    // Check for new published images when returning to this page
    this.checkForNewImages();
  },

  onPullDownRefresh() {
    // Refresh the gallery
    this.refreshGallery();
  },

  onReachBottom() {
    // Load more images when scrolling to bottom
    this.loadMoreImages();
  },

  refreshGallery() {
    // Reset page counter and refresh gallery
    this.setData({ page: 1 });
    this.loadImages(true);
    wx.stopPullDownRefresh();
  },

  loadMoreImages() {
    if (this.data.loading) return;
    
    this.setData({ loading: true });
    
    // Simulate API loading delay
    setTimeout(() => {
      const newImages = [
        {
          id: 7,
          imageUrl: 'https://picsum.photos/400/480?random=7',
          prompt: '古老的城堡，暴风雨，油画风格'
        },
        {
          id: 8,
          imageUrl: 'https://picsum.photos/400/520?random=8',
          prompt: '热带海滩日落，鲜艳色彩'
        }
      ];
      
      // Add new images to gallery
      const updatedImages = [...this.data.images, ...newImages];
      this.setData({
        images: updatedImages,
        loading: false,
        page: this.data.page + 1
      });
    }, 1500);
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
      urls: this.data.images.map(img => img.imageUrl)
    });
  },

  checkForNewImages() {
    // Check if there are newly published images to display
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    if (currentPage.data.newPublishedImage) {
      // Add the new image to the top of the gallery
      const newImages = [currentPage.data.newPublishedImage, ...this.data.images];
      
      this.setData({
        images: newImages
      });
      
      // Clear the flag
      currentPage.setData({
        newPublishedImage: null
      });
      
      // Show success toast
      Toast({
        context: this,
        selector: '#t-toast',
        message: '发布成功！',
        theme: 'success'
      });
    }
  }
}); 