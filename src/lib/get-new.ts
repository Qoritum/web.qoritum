import type { NewMetadata } from '@/types/new';
import { getAllMDX, getMDX } from '@/lib/mdx';

const dir = '/src/app/novedades/(md)';

export const getNew = async (id: string) => {
  return await getMDX<NewMetadata>(dir, id);
};

export const getAllNews = async () => {
  const list = await getAllMDX<NewMetadata>(dir);

  if (!Array.isArray(list.data) || list.data.length === 0) {
    return {
      ...list,
      data: []
    };
  }

  const filtered = list.data
    .filter(x => x.published)
    .sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da; // nuevos -> viejos
    });

  return {
    ...list,
    data: filtered
  };
};

