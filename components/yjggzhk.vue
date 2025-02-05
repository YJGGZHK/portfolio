<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="space-y-16">
      <section>
        <h3
          class="text-3xl font-bold mb-8 text-purple-600 dark:text-purple-400"
        >
          🛠 Tech Stack
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div
            v-for="(tech, index) in techStacks"
            :key="index"
            class="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            @click="openModal(tech)"
          >
            <h4
              class="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200"
            >
              {{ tech.title }}
            </h4>
            <div class="flex flex-wrap gap-4">
              <img :src="tech.iconUrl" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3
          class="text-3xl font-bold mb-8 text-purple-600 dark:text-purple-400"
        >
          📊 GitHub Activities
        </h3>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <img
              src="https://github-readme-activity-graph.vercel.app/graph?username=YJGGZHK&theme=github-compact&hide_border=true&area=true"
              class="w-full h-auto"
              alt="GitHub Activity Graph"
            />
          </div>
          <div class="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=YJGGZHK&theme=radical"
              class="w-full h-auto"
              alt="GitHub Streak Stats"
            />
          </div>
        </div>
      </section>
    </div>

    <!-- 模态框 -->
    <Transition name="fade">
      <div
        v-if="activeModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div
          class="bg-white dark:bg-gray-800 rounded-xl p-8 w-[95%] max-w-4xl max-h-[85vh] overflow-y-auto relative"
        >
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {{ activeModal.title }}
            </h3>
            <button
              @click="closeModal"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          <div class="flex justify-center">
            <img
              :src="activeModal.iconUrl"
              class="max-w-full h-auto object-contain"
              :style="{ maxHeight: '60vh' }"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const activeModal = ref(null);

const techStacks = [
  {
    title: "💻 Programming Languages",
    iconUrl:
      "https://skillicons.dev/icons?i=html,css,js,ts,python,c,cpp,cs,dart&theme=light",
  },
  {
    title: "🎨 Frontend Technologies",
    iconUrl:
      "https://skillicons.dev/icons?i=vue,react,flutter,electron,vite,webpack,next,tailwind,sass,npm,pnpm,yarn,threejs&theme=light",
  },
  {
    title: "⚙️ Backend Technologies",
    iconUrl:
      "https://skillicons.dev/icons?i=nodejs,express,nest,prisma,mysql,docker,nginx,linux,sqlite,postman&theme=light",
  },
  {
    title: "🎮 Game Development",
    iconUrl: "https://skillicons.dev/icons?i=unity&theme=light",
  },
  {
    title: "🎯 Design Tools",
    iconUrl: "https://skillicons.dev/icons?i=ps,ae,pr,blender&theme=light",
  },
  {
    title: "🔧 Development Tools",
    iconUrl:
      "https://skillicons.dev/icons?i=git,github,vscode,clion,webstorm,obsidian&theme=light",
  },
];

const openModal = (tech) => {
  activeModal.value = tech;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  activeModal.value = null;
  document.body.style.overflow = "auto";
};
</script>

<style scoped>
.tech-card {
  @apply transform transition-all duration-300;
}

.tech-card:hover {
  @apply -translate-y-2;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
