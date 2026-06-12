import { SiteConfig } from "@/types/config";
import configJson from "../../site.config.json";

export const siteConfig = configJson as unknown as SiteConfig;
export default siteConfig;
