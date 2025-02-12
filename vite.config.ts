import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    return {
      server: { 
        host: env.VITE_HOST,
        port: env.VITE_PORT as unknown as number
        }, 
        plugins: [vue()],
        resolve: {
          alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
          }
        },
        define: {
            'process.env': {                    
              VITE_APP_API_URL: `${env.VITE_APP_API_URL}`
            }
        },
        test: {
            globals: true,
            environment: "jsdom",
        },
    }
})
