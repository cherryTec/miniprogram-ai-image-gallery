/**
 * API Service for AI Gallery mini-program
 * 
 * This module contains functions for communicating with backend services
 * for AI image generation and user data management.
 * 
 * Note: This is currently a mock implementation with simulated responses.
 * In production, these functions would make actual API calls.
 */

// Mock image generation endpoint
const generateImage = (prompt, negativePrompt = '') => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Generate a random image from picsum.photos with the seed based on the prompt
      const seed = Array.from(prompt).reduce((acc, char) => acc + char.charCodeAt(0), 0) % 1000;
      
      resolve({
        success: true,
        data: {
          imageUrl: `https://picsum.photos/600/600?random=${seed}`,
          prompt: prompt,
          negativePrompt: negativePrompt
        }
      });
    }, 3000); // 3 second delay to simulate image generation
  });
};

// Mock gallery image fetch endpoint
const fetchGalleryImages = (page = 1, pageSize = 10) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Generate mock gallery images
      const images = Array.from({ length: pageSize }, (_, i) => ({
        id: (page - 1) * pageSize + i + 1,
        imageUrl: `https://picsum.photos/400/${300 + Math.floor(Math.random() * 300)}?random=${(page - 1) * pageSize + i + 1}`,
        prompt: getMockPrompt(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
      }));
      
      resolve({
        success: true,
        data: {
          images,
          total: 100, // Mock total count
          page,
          pageSize
        }
      });
    }, 1000); // 1 second delay
  });
};

// Mock user gallery images fetch endpoint
const fetchUserImages = (userId, page = 1, pageSize = 10) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Generate mock user images
      const images = Array.from({ length: pageSize }, (_, i) => ({
        id: (page - 1) * pageSize + i + 1,
        imageUrl: `https://picsum.photos/400/${300 + Math.floor(Math.random() * 300)}?random=${userId * 100 + (page - 1) * pageSize + i + 1}`,
        prompt: getMockPrompt(),
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000)).toISOString()
      }));
      
      resolve({
        success: true,
        data: {
          images,
          total: 30, // Mock total count for user images
          page,
          pageSize
        }
      });
    }, 800); // 0.8 second delay
  });
};

// Mock publish image endpoint
const publishImage = (imageData) => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          ...imageData,
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
      });
    }, 1500); // 1.5 second delay
  });
};

// Helper function to generate mock prompts
const getMockPrompt = () => {
  const subjects = [
    '宇宙飞船', '未来城市', '森林精灵', '水晶城堡', '龙', 
    '星球', '海底世界', '魔法', '古代建筑', '机器人'
  ];
  
  const locations = [
    '在太空中', '在森林里', '在海底', '在山顶', '在沙漠', 
    '在云端', '在城市', '在河边', '在岛屿上', '在洞穴中'
  ];
  
  const actions = [
    '飞行', '探索', '战斗', '休息', '庆祝', 
    '冥想', '建造', '舞蹈', '航行', '研究'
  ];
  
  const styles = [
    '写实风格', '动漫风格', '油画风格', '水彩风格', '像素风格', 
    '复古风格', '未来风格', '赛博朋克风格', '梦幻风格', '极简风格'
  ];
  
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  const randomStyle = styles[Math.floor(Math.random() * styles.length)];
  
  return `${randomSubject}${randomLocation}${randomAction}，${randomStyle}`;
};

module.exports = {
  generateImage,
  fetchGalleryImages,
  fetchUserImages,
  publishImage
}; 