import { readFileSync, readdirSync, existsSync } from "fs";
import { join } from "path";
import { cms } from "./cms";

export type DocEntry = {
  slug: string;
  content: string;
  meta: {
    title: string;
    description?: string;
    order?: number;
    draft?: boolean;
    [key: string]: unknown;
  };
};

// Read docs from local filesystem during development
function getLocalDocs(): DocEntry[] {
  const contentsDir = join(process.cwd(), "contents");
  if (!existsSync(contentsDir)) return [];

  const slugs = readdirSync(contentsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  return slugs
    .map((slug) => {
      const metaPath = join(contentsDir, slug, "meta.json");
      const contentPath = join(contentsDir, slug, "content.md");
      if (!existsSync(metaPath) || !existsSync(contentPath)) return null;
      const meta = JSON.parse(readFileSync(metaPath, "utf-8"));
      const content = readFileSync(contentPath, "utf-8");
      return { slug, content, meta };
    })
    .filter((d): d is DocEntry => d !== null && d.meta.draft !== true);
}

async function getRemoteDocs(): Promise<DocEntry[]> {
  const all = await cms.getAll();
  return (all as DocEntry[]).filter((d) => d.meta.draft !== true);
}

export async function getAllDocs(): Promise<DocEntry[]> {
  const token = import.meta.env.GITHUB_TOKEN;
  const docs = token ? await getRemoteDocs() : getLocalDocs();
  return docs.sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99));
}
