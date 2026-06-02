import { createClient } from '@vercel/kv';

export default async function handler(request, response) {
  // データベース（Redis）に接続
  const kv = createClient({
    url: process.env.KV_REST_API_URL,
    token: process.env.KV_REST_API_TOKEN,
  });

  // Wikiからデータが送られてきた時（保存）
  if (request.method === 'POST') {
    const pages = request.body;
    await kv.set('wiki_pages_v2', JSON.stringify(pages));
    return response.status(200).json({ success: true });
  }

  // Wikiを開いた時（読み込み）
  if (request.method === 'GET') {
    const data = await kv.get('wiki_pages_v2');
    return response.status(200).json(data || []);
  }

  return response.status(405).json({ error: 'Method not allowed' });
}