<template>
  <div :data-index="props['data-index']" class="transition-all duration-300">
    <div
      class="p-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl relative h-[240px] w-full"
      :class="
        $colorMode.value === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
          : 'bg-white hover:bg-gray-50 text-gray-800'
      "
    >
      <div class="flex flex-col h-full">
        <h3
          class="text-xl font-semibold transition-colors"
          :class="
            $colorMode.value === 'dark' ? 'text-purple-400' : 'text-purple-600'
          "
        >
          {{ project.title }}
        </h3>
        <p
          class="mt-2 line-clamp-3"
          :class="
            $colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-600'
          "
        >
          {{ project.description }}
        </p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-3 py-1 rounded-full text-white text-sm transition-colors"
            :class="
              $colorMode.value === 'dark'
                ? 'bg-purple-700 hover:bg-purple-600'
                : 'bg-purple-600 hover:bg-purple-500'
            "
          >
            {{ tag }}
          </span>
        </div>
        <div class="absolute bottom-2 right-2">
          <button
            :class="
              $colorMode.value === 'dark'
                ? 'bg-purple-700 hover:bg-purple-600'
                : 'bg-purple-600 hover:bg-purple-500'
            "
            class="px-3 py-1 rounded-md text-white text-sm transition-colors"
            @click="handleViewDetails"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Project Details"
      width="80%"
      :class="$colorMode.value === 'dark' ? 'dark-dialog' : 'light-dialog'"
    >
      <div v-if="isLoading" class="flex justify-center items-center p-10">
        <el-icon class="is-loading">
          <Loading />
        </el-icon>
      </div>
      <div v-else-if="error" class="text-red-500 p-4">
        Failed to load content. Please try again later.
      </div>
      <div
        v-else
        v-html="renderedContent"
        class="markdown-body"
        :class="
          $colorMode.value === 'dark' ? 'markdown-dark' : 'markdown-light'
        "
      ></div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Loading } from "@element-plus/icons-vue";
import { useMarkdown } from "../composables/md";

const dialogVisible = ref(false);
const { renderedContent, loadMarkdownFile, isLoading, error } = useMarkdown();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  "data-index": {
    type: [String, Number],
    required: false,
  },
});

const handleViewDetails = async () => {
  try {
    await loadMarkdownFile(`/content/${props.project.title}.md`);
    dialogVisible.value = true;
  } catch (err) {
    console.error("Error loading markdown content:", err);
    error.value = err;
    dialogVisible.value = true;
  }
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

:deep(.dark-dialog) {
  background-color: #0d1117;
}

:deep(.light-dialog) {
  background-color: #ffffff;
}

:deep(.el-dialog) {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin: 0;
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
}

:deep(.el-dialog__body) {
  padding: 0;
}

:deep(.markdown-body) {
  padding: 20px;
}

/* 添加加载图标的样式 */
.is-loading {
  font-size: 24px;
  color: var(--el-color-primary);
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
