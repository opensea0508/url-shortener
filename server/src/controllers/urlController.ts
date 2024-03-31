import { Request, Response } from 'express';
import Url from '../models/urlModel';

export const createShortUrl = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;
    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            res.json(url);
        } else {
            url = new Url({ originalUrl });
            await url.save();
            res.json(url);
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
    const { slug } = req.params;
    try {
        const url = await Url.findOne({ slug });
        if (url && url.originalUrl) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
