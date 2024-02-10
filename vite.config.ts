import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { SpringSocketServer } from './src/lib/connectionManager.ts';

export const socket ={
    name: "socket",
    server:SpringSocketServer.getInstance()
} 


export default defineConfig({
	plugins: [sveltekit(),socket],
	server: {
        host: true,
        port: 4173,
    },
    build: {
        minify: false
    }
});
