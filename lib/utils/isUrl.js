import parse from 'url-parse'

export function isUrl(url) {
  const parsed = parse(url, {})
  return !!parsed.host
}