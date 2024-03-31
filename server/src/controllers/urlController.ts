import { Request, Response } from 'express';
import Url from '../models/urlModel';

export const createShortUrl = async (req: Request, res: Response) => {
    const { originalUrl } = req.body;
    console.log("craeted shorten url", originalUrl)
    try {
        let url = await Url.findOne({ originalUrl });
        if (url) {
            console.log('not found')
            res.json(url);
        } else {
            url = new Url({ originalUrl });
            console.log('url: ', url)
            await url.save();
            console.log('saved')
            res.json(url);
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};

export const redirectToOriginalUrl = async (req: Request, res: Response) => {
    const { slug } = req.params;
    console.log('requested slug', slug)
    try {
        const url = await Url.findOne({ slug });
        console.log('found url', url)
        if (url && url.originalUrl) {
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
