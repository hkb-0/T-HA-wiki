import { Redis } from '@upstash/redis';

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const pages = await redis.get('wiki_pages');
    return res.status(200).json(pages || []);
  }

  if (req.method === 'POST') {
    await redis.set('wiki_pages', req.body);
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}