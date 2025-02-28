<template>
  <div
    class="min-h-screen transition-colors duration-300"
    :class="$colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-gray-50'"
  >
    <header class="container mx-auto px-4 py-8">
      <h1
        class="text-4xl font-bold text-center text-purple-500 transition-transform"
        :class="
          $colorMode.value === 'dark' ? 'text-purple-400' : 'text-purple-600'
        "
      >
        YJGGZHK's Portfolio
      </h1>
      <div class="flex justify-end mt-4 max-w-7xl mx-auto">
        <button
          @click="
            $colorMode.preference =
              $colorMode.value === 'dark' ? 'light' : 'dark'
          "
          class="p-2 rounded-lg hover:bg-opacity-80 transition-colors"
          :class="$colorMode.value === 'dark' ? 'bg-gray-700' : 'bg-gray-200'"
        >
          <span
            class="font-bold text-center text-purple-500 transition-transform"
            >Theme</span
          >
          <span v-if="$colorMode.value === 'dark'">🌙</span>
          <span v-else>🌞</span>
        </button>
      </div>
    </header>
    <yjggzhk />

    <main class="max-w-7xl mx-auto px-4 pb-8">
      <h1
        class="text-4xl font-bold text-center text-purple-500 transition-transform mb-8"
        :class="
          $colorMode.value === 'dark' ? 'text-purple-400' : 'text-purple-600'
        "
      >
        My Projects
      </h1>
      <nav class="flex gap-4 mb-8 justify-center">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
          :class="[
            activeTab === tab
              ? 'bg-purple-600 text-white'
              : $colorMode.value === 'dark'
              ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
          ]"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </nav>
      <!-- project card -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Transition
          v-for="(project, index) in filteredProjects"
          :key="project.title"
          name="fade"
          mode="out-in"
          appear
        >
          <ProjectCard :project="project" :data-index="index" />
        </Transition>
      </div>
    </main>
    <!-- footer -->
    <footer class="mt-auto py-8 bg-white dark:bg-gray-800 shadow-lg">
      <div class="max-w-7xl mx-auto px-4">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div class="text-center md:text-left">
            <h3
              class="text-xl font-bold text-purple-600 dark:text-purple-400 mb-2"
            >
              Contact Me
            </h3>
            <p class="text-gray-600 dark:text-gray-300">
              Let's create something amazing together!
            </p>
          </div>

          <div class="flex gap-6">
            <a href="https://github.com/YJGGZHK">
              <img
                src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"
              />
            </a>
            <a href="mailto:zyj20021114@outlook.com">
              <img
                src="https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=outlook&logoColor=white"
              />
            </a>
            <a href="https://yjggzhk.itch.io/space-fortress">
              <img
                src="https://img.shields.io/badge/itch.io-000000?style=for-the-badge&logo=itch.io&logoColor=white"
              />
            </a>
            <a href="#">
              <img
                src="https://img.shields.io/badge/WeChat-yjggzhkwork-07C160?style=for-the-badge&logo=wechat&logoColor=white"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import "./assets/css/markdown.css";
import "highlight.js/styles/github-dark.css"; // 暗色主题
import "highlight.js/styles/github.css"; // 亮色主题

const tabs = ["Development", "Game Development", "Art"];
const activeTab = ref("Development");
import yjggzhk from "./components/yjggzhk.vue";
import { useProjects } from "./composables/useProjects";
const { projects } = useProjects();
const filteredProjects = computed(() => {
  return projects.filter((project) => project.category === activeTab.value);
});
</script>

<style>
/* 滚动条整体样式 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: transparent;
}

/* 深色主题滚动条 */
html.dark ::-webkit-scrollbar-thumb {
  background-color: rgba(133, 88, 132, 0.3);
  border-radius: 4px;
}

html.dark ::-webkit-scrollbar-thumb:hover {
  background-color: rgba(163, 120, 151, 0.5);
}

/* 浅色主题滚动条 */
::-webkit-scrollbar-thumb {
  background-color: rgba(133, 88, 132, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(115, 62, 142, 0.5);
}

/* 确保滚动条不占用空间 */
* {
  scrollbar-width: thin;
  scrollbar-color: auto transparent;
}
</style>
