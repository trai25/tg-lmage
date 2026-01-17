import axios from 'axios';
import toast from 'react-hot-toast';

/**
 * Axios 实例配置
 * 统一的请求和响应处理
 */

// 创建 axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 120000, // 120秒超时（上传大文件需要更长时间）
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 从 localStorage 获取 token
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        const token = state?.token;
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('解析 token 失败:', error);
      }
    }

    // 如果是上传文件，修改 Content-Type
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 处理错误响应
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 401:
          // 未授权，清除 token 并跳转到登录页
          localStorage.removeItem('auth-storage');
          toast.error('登录已过期，请重新登录');
          
          // 延迟跳转，避免在某些情况下立即跳转
          setTimeout(() => {
            window.location.href = '/login';
          }, 1000);
          break;

        case 403:
          toast.error('没有权限访问该资源');
          break;

        case 404:
          toast.error('请求的资源不存在');
          break;

        case 500:
          toast.error('服务器错误，请稍后重试');
          break;

        case 502:
        case 503:
        case 504:
          toast.error('服务暂时不可用，请稍后重试');
          break;

        default:
          // 显示后端返回的错误信息
          const errorMessage = data?.error || data?.message || '请求失败';
          toast.error(errorMessage);
      }
    } else if (error.request) {
      // 请求已发送但没有收到响应
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        toast.error('上传超时，请检查网络或尝试压缩图片后重试');
      } else {
        toast.error('网络错误，请检查您的网络连接');
      }
    } else {
      // 其他错误
      toast.error(error.message || '请求失败');
    }

    return Promise.reject(error);
  }
);

/**
 * 封装的请求方法
 */

// GET 请求
export const get = (url, params, config = {}) => {
  return request.get(url, { params, ...config });
};

// POST 请求
export const post = (url, data, config = {}) => {
  return request.post(url, data, config);
};

// PUT 请求
export const put = (url, data, config = {}) => {
  return request.put(url, data, config);
};

// DELETE 请求
export const del = (url, config = {}) => {
  return request.delete(url, config);
};

// PATCH 请求
export const patch = (url, data, config = {}) => {
  return request.patch(url, data, config);
};

/**
 * 上传文件（带进度）
 */
export const upload = (url, formData, onProgress) => {
  return request.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
};

/**
 * 下载文件
 */
export const download = async (url, filename) => {
  try {
    const response = await request.get(url, {
      responseType: 'blob',
    });

    // 创建下载链接
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(downloadUrl);

    toast.success('下载成功');
  } catch (error) {
    toast.error('下载失败');
    throw error;
  }
};

/**
 * 并发请求
 */
export const all = (requests) => {
  return Promise.all(requests);
};

export default request;
