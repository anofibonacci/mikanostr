// change from: import adapter from "@sveltejs/adapter-node";
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({ out: "build" }),
  },
  preprocess: vitePreprocess(),
};

export default config;
