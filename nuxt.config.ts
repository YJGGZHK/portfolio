// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "@element-plus/nuxt"],
  colorMode: {
    classSuffix: "",
  },
  content: {
    markdown: {
      remarkPlugins: ["remark-gfm"],
    },
  },
});
