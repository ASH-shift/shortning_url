import { generateNanoId } from "../utils/helper.js"
import { getCustomShortUrl, saveShortUrl } from "../dao/short_url.js"

const normalizeUrl = (url) => {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url;
    }
    return url;
};

export const createShortUrlWithoutUser = async (url) => {
    const shortUrl = generateNanoId(7)
    if (!shortUrl) throw new Error("Short URL not generated")

    const normalizedUrl = normalizeUrl(url)
console.log("NORMALIZED URL:", normalizedUrl)
await saveShortUrl(shortUrl, normalizedUrl)

    return shortUrl
}

export const createShortUrlWithUser = async (url, userId, slug = null) => {
    const shortUrl = slug || generateNanoId(7)

    const exists = await getCustomShortUrl(slug)
    if (exists) throw new Error("This custom url already exists")

    const normalizedUrl = normalizeUrl(url)

    await saveShortUrl(shortUrl, normalizedUrl, userId)
    return shortUrl
}
