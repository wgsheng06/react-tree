import IconsResolver from 'unplugin-icons/resolver';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
// import IconsResolver from 'unplugin-icons/vite';
import AutoImport from 'unplugin-auto-import/vite';
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ['react'],
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: 'Icon',
          // enabledCollections: ['mdi'],
        }),
      ],
    }),
    Icons({
      autoInstall: true,
      // auto
      compiler: 'jsx',
      jsx: 'react',
    }),
  ],
});
