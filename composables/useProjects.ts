export const useProjects = () => {
  const projects = [
    {
      title: "Thoughts-Diary-APP",
      description: "A full-stack Electron-Vue-Project",
      tags: ["Electron", "Vue", "Node.js", "MySQl", "Express"],
      category: "Development",
    },
    {
      title: "AI-Chat-APP",
      description: "A full-stack AI-Chat-APP",
      tags: ["Next.js", "Nest.js", "OpenAI", "LLM", "Ollama"],
      category: "Development",
    },
    {
      title: "AI-Image-Education-APP",
      description: "A full-stack AI-Image-Education-APP",
      tags: ["Vue", "Node.js", "json", "stable-diffusion"],
      category: "Development",
    },
    {
      title: "Management platform",
      description: "A full-stack Management platform",
      tags: ["Vue.js", "Express", "MySQL", "Node.js", "Nginx"],
      category: "Development",
    },
    {
      title: "Notes-website",
      description: "Notes-website for sharing technical knowledge",
      tags: ["Next.js", "Markdown", "TailwindCSS"],
      category: "Development",
    },
    {
      title: "Computer peripheral APP",
      description: " flutter Computer peripheral APP",
      tags: ["flutter", "dart", "android"],
      category: "Development",
    },
    {
      title: "Bilibili-Spider",
      description: "Bilibili-Spider",
      tags: ["Python", "Bilibili", "Spider"],
      category: "Development",
    },

    {
      title: "Space-Fortress",
      description: "A Unity-based adventure game",
      tags: ["Unity", "C#", "3D Modeling"],
      category: "Game Development",
    },
    {
      title: "VR-Game",
      description: "A Unity-based VR-Game",
      tags: ["Unity", "C#", "VR"],
      category: "Game Development",
    },
    {
      title: "3D Modeling Figurine",
      description: "A collection of 3D Modeling Figurine",
      tags: ["3D Modeling", "Blender", "3D Printing", "Zbrush"],
      category: "Art",
    },
    {
      title: "3D Modeling",
      description: "A collection of 3D Modeling",
      tags: ["3D Modeling", "Blender", "Maya", "Zbrush"],
      category: "Art",
    },
  ];
  return {
    projects: readonly(projects),
  };
};
