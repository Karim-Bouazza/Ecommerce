export function extractPlainTextFromHtml(html: string): string {
    return html
        .replace(/<[^>]*>/g, " ")
        .replace(/&nbsp;/gi, " ")
        .replace(/\s+/g, " ")
        .trim();
}

export function normalizeRichTextHtml(html: string): string {
    const trimmedHtml = html.trim();

    if (extractPlainTextFromHtml(trimmedHtml).length === 0) {
        return "";
    }

    return trimmedHtml;
}
