import { Router, RequestHandler } from 'express';
import { db } from '../db/db';
const router = Router();

interface AppendBody {
  url: string;
  params: Record<string, string>;
}

/**
 * @openapi
 * /append-parameters:
 *   post:
 *     summary: Append query parameters to a given URL
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - url
 *               - params
 *             properties:
 *               url:
 *                 type: string
 *                 format: uri
 *               params:
 *                 type: object
 *                 additionalProperties:
 *                   type: string
 *     responses:
 *       '200':
 *         description: The URL with parameters appended
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 originalUrl: { type: string }
 *                 parameters:  { type: object }
 *                 updatedUrl:  { type: string }
 *       '400':
 *         description: Bad input
 */
const appendParameters: RequestHandler<{}, any, AppendBody> = (req, res): void => {
  const { url, params } = req.body;

  if (!url || typeof params !== 'object') {
    res.status(400).json({ error: 'Invalid input' });
    return;
  }

  try {
    const urlObj = new URL(url);

    for (const [key, value] of Object.entries(params)) {
      if (typeof value !== 'string') {
        res.status(400).json({ error: 'All param values must be strings' });
        return;
      }
      
      // Validate that parameter keys don't start with ampersand
      if (key.startsWith('&')) {
        res.status(400).json({ 
          error: 'Parameter keys should not start with &',
          invalidKey: key
        });
        return;
      }
      
      urlObj.searchParams.set(key, value);
    }

    const updatedUrl = urlObj.toString();

    // Persist to database
    db.prepare(
      'INSERT INTO links (original_url, parameters, updated_url) VALUES (?, ?, ?)'
    ).run(url, JSON.stringify(params), updatedUrl);

    res.json({
      originalUrl: url,
      parameters: params,
      updatedUrl: urlObj.toString()
    });
  } catch {
    res.status(400).json({ error: 'Invalid URL' });
  }
};

/**
 * @openapi
 * /links:
 *   get:
 *     summary: List all processed links
 *     responses:
 *       '200':
 *         description: Array of stored links
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 */
const getLinks: RequestHandler = (_req, res): void => {
    const rows = db
    .prepare('SELECT * FROM links ORDER BY created_at DESC')
    .all();
    res.json({ links: rows });
};

/* ----- Register routes ----- */
router.post('/append-parameters', appendParameters);
router.get('/links', getLinks);

export default router;