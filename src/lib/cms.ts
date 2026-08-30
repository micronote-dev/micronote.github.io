import StructCms from "@asahi-fj/structcms";

export const cms = StructCms({
  token: import.meta.env.GITHUB_TOKEN,
  owner: "micronote-dev",
  repo: "website",
});
