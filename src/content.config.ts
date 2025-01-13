import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Not available with legacy API

const pages = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        updatedDate: z.coerce.date().optional(),
    })
});
const twas = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/twas" }),
    schema: z.object({
        title: z.string(),
        author: z.string(),
        updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { pages, twas };