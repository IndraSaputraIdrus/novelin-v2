export function generateSlug(text: string) {
  const slug = text
    .replace(/[*?~"';]/g, "")
    .replace(/\+s/g, "-")
    .toLowerCase()
    .trim();
  return slug;
}
