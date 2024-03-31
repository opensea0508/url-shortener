import express from 'express';
import { createShortUrl, redirectToOriginalUrl } from '../controllers/urlController';

const router = express.Router();

router.post('/api/url/shorten', createShortUrl);
router.get('/:slug', redirectToOriginalUrl);

export default router;