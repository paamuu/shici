# 诗词集

Angular 21 + Tailwind CSS 4 的中国古典诗词展示应用，支持 SSR 预渲染、主题配色、字体切换、筛选与详情分享卡片。

## 功能

- 首页封面与诗词列表
- 作者、词牌、朝代、主题筛选
- 5 套配色主题与 3 种字体
- 详情页注释、译文、赏析 tab
- 分享卡片弹层
- 37 首诗词 JSON 数据（`public/data/poems/`）

## 开发

```bash
npm start
```

打开 http://localhost:4200/。

## 构建与测试

```bash
npm run build
npm test
```

生产构建会尝试内联 Google Fonts，离线环境下需要网络或改用本地字体资源。

## 数据

诗词以 JSON 形式存放在 `public/data/poems/`，`manifest.json` 列出全部文件。应用启动时通过 `PoemsService` 一次性加载；单个文件加载失败不会阻塞其他诗词。
