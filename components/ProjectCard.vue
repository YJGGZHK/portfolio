<template>
  <div
    class="p-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
    :class="
      $colorMode.value === 'dark'
        ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
        : 'bg-white hover:bg-gray-50 text-gray-800'
    "
  >
    <h3
      class="text-xl font-semibold transition-colors"
      :class="
        $colorMode.value === 'dark' ? 'text-purple-400' : 'text-purple-600'
      "
    >
      {{ project.title }}
    </h3>
    <p
      class="mt-2"
      :class="$colorMode.value === 'dark' ? 'text-gray-300' : 'text-gray-600'"
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
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
});
</script>
