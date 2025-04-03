/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript
interface ImportMetaEnv {
	readonly SITE: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

export function url(path = '') {
	return `${import.meta.env.SITE}${import.meta.env.BASE_URL}${path}`;
}