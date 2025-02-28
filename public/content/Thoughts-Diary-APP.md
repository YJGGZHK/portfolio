## 项目概述

Thoughts Diary 是一款基于 Electron、Vue 3 和 Express 构建的桌面日记应用程序，旨在帮助用户高效管理日常待办事项、倒数日和日记。它结合了现代化的技术栈和友好的用户界面，为用户提供了一个便捷、直观的记录和管理工具。

## 技术架构

### 前端技术栈

- **桌面框架**：Electron
    
- **前端框架**：Vue 3
    
- **UI 组件库**：Element Plus
    
- **状态管理**：Pinia
    
- **开发语言**：TypeScript
    
- **构建工具**：Vite
    
- **Markdown 编辑器**：Cherry Markdown
    

### 后端技术栈

- **服务框架**：Express
    
- **数据库**：MySQL
    
- **ORM 框架**：Sequelize
    
- **开发语言**：Node.js
    

## 项目结构


```
thoughts-diary/
├── client/          # 前端 Electron 应用
│   ├── src/
│   │   ├── components/  # Vue 组件
│   │   ├── pages/      # 页面组件
│   │   ├── store/      # Pinia 状态管理
│   │   └── router/     # 路由配置
├── server/          # 后端 Express 服务
│   ├── routes/     # API 路由
│   ├── models/     # 数据模型
│   └── config/     # 配置文件
```

## 核心功能

### 1. 待办事项管理

- **添加、修改、删除待办事项**
    
- **待办事项分级**（高、中、低）
    
- **进度追踪和状态管理**
    
- **时间线展示**
    

### 2. 倒数日功能

- **自定义倒数日创建**
    
- **支持置顶显示**
    
- **轮播展示重要倒数日**
    
- **剩余天数实时计算**
    

### 3. 日记功能

- **Markdown 编辑器支持**
    
- **支持图片、表格等富文本内容**
    
- **实时预览**
    

### 4. 日历总览

- **日历视图展示待办事项**
    
- **活动数量统计**
    
- **筛选和查询功能**
    

## 特色功能

### 1. 自适应导航栏

```vue
<template>
    <div class="navigation-bar-hover-area" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <!-- 导航栏鼠标浮动判定区域 -->
    </div>
    <div class="navigation-bar" id="navigation-bar" :class="{ 'hidden': isHidden }">
        <!-- 导航栏内容 -->
        <router-link :to="{ name: 'calendar' }">
            <el-card class="navigation-bar-item hover-jump" id="navigation-bar-item-2" shadow="hover"
                @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="icon-text-container">
                    <el-icon size="30">
                        <Calendar />
                    </el-icon>
                    <div class="navigation-bar-item-text">日历总览</div>
                </div>
            </el-card>
        </router-link>
        <router-link :to="{ name: 'timeline' }">
            <el-card class="navigation-bar-item hover-jump" id="navigation-bar-item-1" shadow="hover"
                @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="icon-text-container">
                    <el-icon size="30">
                        <Memo />
                    </el-icon>
                    <div class="navigation-bar-item-text">今日任务</div>
                </div>
            </el-card>
        </router-link>
        <router-link :to="{ name: 'manage' }">
            <el-card class="navigation-bar-item hover-jump" id="navigation-bar-item-3" shadow="hover"
                @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="icon-text-container">
                    <el-icon size="30">
                        <DocumentCopy />
                    </el-icon>
                    <div class="navigation-bar-item-text">倒数日设置</div>
                </div>
            </el-card>
        </router-link>
        <router-link :to="{ name: 'diary' }">
            <el-card class="navigation-bar-item hover-jump" id="navigation-bar-item-4" shadow="hover"
                @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
                <div class="icon-text-container">
                    <el-icon size="30">
                        <Notebook />
                    </el-icon>
                    <div class="navigation-bar-item-text">日记</div>
                </div>
            </el-card>
        </router-link>
    </div>
</template>
```

- **悬浮显示/隐藏**
    
- **动画过渡效果**
    
- **响应式布局**
    

### 2. 多样化编辑器

```typescript
initMarkDown() {
    this.cherryInstance = new Cherry({
        id: 'markdown-container',
        value: this.content,
        emoji: { useUnicode: true },
        editor: { defaultModel: this.editorModel },
        toolbars: {
            // 定义顶部工具栏
            toolbar: [
                'undo', 'redo', '|',
                { bold: ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'ruby'] },
                'color', 'size', '|', 'header', 'list', 'panel', '|',
                { insert: ['image', 'audio', 'video', 'link', 'hr', 'br', 'code', 'formula', 'toc', 'table', 'drawIo'] },
                'graph'
            ],
            // 定义侧边栏，默认为空
            sidebar: ['theme', 'mobilePreview', 'copy'],
            // 定义顶部右侧工具栏，默认为空
            toolbarRight: ['fullScreen', 'export'],
            // 定义选中文字时弹出的“悬浮工具栏”，默认为 ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'quote', '|', 'size', 'color']
            bubble: ['bold', 'italic', 'underline', 'strikethrough', 'sub', 'sup', 'ruby', '|', 'color', 'size'],
            // 定义光标出现在行首位置时出现的“提示工具栏”，默认为 ['h1', 'h2', 'h3', '|', 'checklist', 'quote', 'table', 'code']
            float: ['table', 'code', 'graph'],
        },
    });
}
```

- **支持多种编辑模式**
    
- **丰富的工具栏功能**
    
- **实时预览**
    

### 3. 数据本地化

- **MySQL 本地数据库存储**
    
- **支持数据导入导出**
    
- **离线使用支持**
    

## 项目特点

### 1. 现代化技术栈

- **使用 Vue 3 Composition API**
    
- **TypeScript 类型支持**
    
- **Vite 快速构建**
    

### 2. 优秀的用户体验

- **流畅的动画效果**
    
- **响应式设计**
    
- **直观的操作界面**
    

### 3. 可扩展性

- **模块化设计**
    
- **清晰的代码结构**
    
- **完善的开发文档**
    

### 4. 安全性

- **本地数据存储**
    
- **环境变量配置**
    
- **错误处理机制**

