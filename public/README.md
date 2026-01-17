# Public 静态资源目录

这个目录包含 Vite 开发服务器和生产构建时需要的静态资源。

## 目录结构

```
public/
├── images/          # 图片资源
│   ├── logo.svg    # 网站 Logo
│   └── blocked.png # 占位图片
└── README.md       # 本文件
```

## 使用说明

### 开发环境

在开发模式下，Vite 会自动从 `client/public` 目录提供静态文件。

访问方式：
- Logo: `/images/logo.svg`
- 占位图: `/images/blocked.png`

### 生产环境

构建时，这些文件会被复制到构建输出目录（`../public`），与后端的静态文件合并。

## 注意事项

1. **路径引用**：在代码中使用绝对路径 `/images/xxx` 引用这些资源
2. **文件同步**：`client/public` 和根目录 `public` 需要保持同步
3. **构建输出**：`npm run build` 会将这些文件复制到根目录的 `public` 文件夹

## 图标库

项目使用 **Remix Icon** 图标库，通过 CDN 引入：
- CDN: https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css
- 使用方式: `<i className="ri-xxx-line"></i>`
- 文档: https://remixicon.com/
