// next.config.ts
import createMDX from '@next/mdx';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // Usa nombres de módulo para que sean serializables
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: ['rehype-highlight'], // o ['rehype-highlight', {}] si necesitas opciones
  },
});

const nextConfig: import('next').NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Elimina esto salvo que realmente lo necesites y sepas por qué
  // transpilePackages: ['next-mdx-remote'],
};

export default withMDX(nextConfig);
