/**
 * basePathをプレフィックスとして付与するヘルパー関数
 * 静的エクスポート環境でGitHub Pagesのサブパス配信に対応
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * 内部リンクにbasePathを付与する（冪等）
 * @param path - パス（例: "/chatbot"）
 * @returns basePathが付与されたパス（例: "/my-portfolio/chatbot"）
 */
export const withBasePath = (path: string): string => {
  if (!basePath) return path;
  if (!path.startsWith('/')) return path;
  // 二重付与防止: 既にbasePathが付いている場合はそのまま返す
  if (path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
};

export { basePath };
