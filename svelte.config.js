// change from: import adapter from "@sveltejs/adapter-node";
//import adapter from '@sveltejs/adapter-static';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    //adapter: adapter({ out: "build" }),

		adapter: adapter({
			fallback: '200.html' // may differ from host to host
		})
    //	adapter: adapter()
  },
  preprocess: vitePreprocess(),
};

export default config;
