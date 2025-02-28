import { marked } from "marked";
import hljs from "highlight.js";
import { ref, computed } from "vue";

// 定义markdown渲染配置接口
interface MarkdownOptions {
  breaks?: boolean;
  gfm?: boolean;
  headerIds?: boolean;
  headerPrefix?: string;
  highlight?: (code: string, lang: string) => string;
  langPrefix?: string;
  mangle?: boolean;
  pedantic?: boolean;
  sanitize?: boolean;
  silent?: boolean;
  smartLists?: boolean;
  smartypants?: boolean;
  xhtml?: boolean;
}

export function useMarkdown(options: MarkdownOptions = {}) {
  const content = ref("");
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  // 配置marked选项
  const renderer = new marked.Renderer();

  // 自定义链接渲染
  renderer.link = (
    href: string,
    title: string | null | undefined,
    text: string
  ) => {
    const link = marked.Renderer.prototype.link.call(
      renderer,
      href,
      title,
      text
    );
    return link.replace("<a", '<a target="_blank" rel="noopener noreferrer"');
  };

  // 自定义图片渲染
  renderer.image = (
    href: string,
    title: string | null | undefined,
    text: string
  ) => {
    const img = marked.Renderer.prototype.image.call(
      renderer,
      href,
      title,
      text
    );
    return img.replace(
      "<img",
      '<img loading="lazy" class="rounded-lg shadow-md"'
    );
  };

  // 配置代码高亮
  const highlight = (code: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(code, { language: lang, ignoreIllegals: true })
          .value;
      } catch (e) {
        console.error("Highlight error:", e);
      }
    }
    return hljs.highlightAuto(code).value;
  };

  // 配置marked选项
  marked.setOptions({
    renderer,
    highlight,
    breaks: true,
    gfm: true,
    headerIds: true,
    headerPrefix: "heading-",
    mangle: false,
    pedantic: false,
    sanitize: false,
    silent: false,
    smartLists: true,
    smartypants: true,
    xhtml: false,
    ...options,
  });

  // 渲染markdown内容
  const renderMarkdown = (markdown: string): string => {
    try {
      return marked(markdown);
    } catch (e) {
      console.error("Markdown rendering error:", e);
      return "";
    }
  };

  // 异步加载markdown文件
  const loadMarkdownFile = async (url: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      content.value = text;
    } catch (e) {
      error.value = e as Error;
      console.error("Error loading markdown file:", e);
    } finally {
      isLoading.value = false;
    }
  };

  // 计算属性：渲染后的HTML
  const renderedContent = computed(() => {
    return renderMarkdown(content.value);
  });

  // 清理内容
  const clearContent = () => {
    content.value = "";
    error.value = null;
  };

  return {
    content,
    isLoading,
    error,
    renderedContent,
    loadMarkdownFile,
    renderMarkdown,
    clearContent,
  };
}

// 导出一些常用的markdown工具函数
export const markdownUtils = {
  // 提取markdown中的第一个标题
  extractFirstTitle: (markdown: string): string => {
    const match = markdown.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : "";
  },

  // 提取markdown中的所有标题
  extractTitles: (markdown: string): { level: number; text: string }[] => {
    const titles: { level: number; text: string }[] = [];
    const lines = markdown.split("\n");

    lines.forEach((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        titles.push({
          level: match[1].length,
          text: match[2].trim(),
        });
      }
    });

    return titles;
  },

  // 提取markdown中的第一段描述
  extractFirstParagraph: (markdown: string): string => {
    const match = markdown.match(/^(?:(?!#).)*?\n\n(.*?)\n\n/s);
    return match ? match[1].trim() : "";
  },

  // 统计markdown中的字数
  countWords: (markdown: string): number => {
    // 移除代码块、链接、图片等
    const cleanText = markdown
      .replace(/```[\s\S]*?```/g, "")
      .replace(/`.*?`/g, "")
      .replace(/\[.*?\]\(.*?\)/g, "")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .replace(/#/g, "");

    // 统计中英文字符
    return cleanText.replace(/\s/g, "").length;
  },
};
