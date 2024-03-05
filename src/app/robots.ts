import { MetadataRoute } from 'next'
import { ROUTE_BASE, ROUTE_ROOT } from './lib/routes/routes'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: [
                ROUTE_ROOT,
            ],
            disallow: [],
        },
        sitemap: `${ROUTE_BASE}/sitemap.xml`,
    }
}