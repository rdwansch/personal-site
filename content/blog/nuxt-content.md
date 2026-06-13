---
title: "Nuxt Content: Cara Elegan Nuxt Mengelola Konten"
date: 2026-06-07
description: Mengenal Nuxt Content secara mendalam — dari konsep, use case nyata, hingga query konten layaknya database
tags: [Nuxt, Vue, JavaScript]
---

## Apa Itu Nuxt Content

`@nuxt/content` adalah _module_ resmi Nuxt yang memungkinkan kita membaca file Markdown, YAML, JSON, dan CSV langsung dari folder `content/` dan mengaksesnya seperti _query_ database.

Tidak perlu _API endpoint_ khusus. Tidak perlu _backend_. Cukup tulis file, dan Nuxt Content mengurusnya.

Kalau kamu pernah pakai Contentful atau Sanity.io — itu adalah _headless CMS external_. Nuxt Content bisa dibilang versi _local-first_-nya: kamu yang pegang file, kamu yang kontrol, dan tidak ada biaya _subscription_.

> **Fun Fact:** Nuxt Content v2 pertama kali dirilis bersamaan dengan Nuxt 3 di awal 2022. Pada v3 (yang dipakai sekarang), arsitekturnya dibangun ulang total dengan _SQLite-based engine_ di bawahnya — artinya query `WHERE`, `ORDER BY`, dan `LIMIT` yang kamu tulis itu benar-benar dieksekusi seperti SQL asli.

---

## Kenapa Ini Menarik

Sebelum Nuxt Content, kalau mau punya blog di site statis, kita biasanya:

1. Baca file Markdown secara manual pakai `fs.readFileSync`
2. Parse frontmatter pakai `gray-matter`
3. Render Markdown pakai `remark` atau `marked`
4. Buat sendiri sistem _routing_, _pagination_, dan _filtering_

Itu banyak sekali _boilerplate_ yang tidak ada hubungannya dengan konten itu sendiri. Nuxt Content menghilangkan semua itu.

---

## Instalasi

```bash
# pakai bun
bun add @nuxt/content

# atau npm
npm install @nuxt/content
```

Daftarkan di `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
})
```

Buat folder `content/` di root project, dan mulai tulis. Selesai.

---

## Mendefinisikan Koleksi

Di Nuxt Content v3, kita mendefinisikan _schema_ koleksi di `content.config.ts`:

```ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string(),
        date: z.string(),
        description: z.string(),
        tags: z.array(z.string()).optional(),
      }),
    }),
  },
})
```

`type: 'page'` artinya konten ini bisa di-_render_ sebagai halaman — punya _body_, _toc_ (daftar isi otomatis), dan _excerpt_. Sementara `type: 'data'` cocok untuk file JSON/YAML yang berisi data tanpa _rendered body_.

---

## Use Case 1 — Blog Pribadi

Paling klasik. Kamu tulis artikel di `content/blog/nama-artikel.md`, lalu query di halaman daftar artikel:

```vue
<script setup lang="ts">
const { data: posts } = await useAsyncData('posts', () =>
  queryCollection('blog')
    .where('draft', '!=', true)
    .order('date', 'DESC')
    .all()
)
</script>

<template>
  <article v-for="post in posts" :key="post.stem">
    <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
    <p>{{ post.description }}</p>
    <time>{{ post.date }}</time>
  </article>
</template>
```

Dan untuk halaman detail artikel:

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
)
</script>

<template>
  <ContentRenderer :value="post" />
</template>
```

`<ContentRenderer>` merender Markdown menjadi HTML, lengkap dengan _syntax highlighting_ dan semua komponen MDC yang kita definisikan.

---

## Use Case 2 — Dokumentasi

Nuxt Content sangat populer untuk _documentation site_. Banyak _library_ open source yang memakai ini, termasuk dokumentasi Nuxt sendiri yang dibangun di atas Nuxt Content.

Struktur folder dokumentasi biasanya:

```
content/
├── docs/
│   ├── 1.getting-started/
│   │   ├── 1.introduction.md
│   │   └── 2.installation.md
│   ├── 2.configuration/
│   │   └── index.md
│   └── 3.api-reference/
│       └── index.md
```

Nuxt Content menghormati _prefix_ angka di nama file/folder untuk menentukan urutan, tapi tidak memasukkannya ke URL. Jadi `1.getting-started/1.introduction.md` akan diakses di `/docs/getting-started/introduction`.

Untuk navigasi otomatis:

```vue
<script setup lang="ts">
const navigation = await queryCollectionNavigation('docs')
</script>

<template>
  <nav>
    <template v-for="item in navigation">
      <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
      <ul v-if="item.children">
        <li v-for="child in item.children">
          <NuxtLink :to="child.path">{{ child.title }}</NuxtLink>
        </li>
      </ul>
    </template>
  </nav>
</template>
```

Navigasi hierarki dibangun otomatis dari struktur folder. Tidak perlu tulis _config_ navigasi secara manual.

> **Fun Fact:** `queryCollectionNavigation` diperkenalkan di v3 dan tidak ada di v2. Di v2 kita harus pakai `fetchContentNavigation()` yang cara kerjanya berbeda. Ini salah satu _breaking change_ yang paling sering bikin bingung saat upgrade.

---

## Use Case 3 — Portfolio dengan Data JSON

Nuxt Content tidak hanya untuk Markdown. File JSON bisa dijadikan _data collection_ yang di-_query_ juga. Cocok untuk data yang lebih terstruktur seperti daftar project atau pengalaman kerja.

```json
// content/projects.json
{
  "items": [
    {
      "title": "Personal Site",
      "description": "Blog dan portfolio pribadi dibangun dengan Nuxt 3",
      "tags": ["Nuxt", "Tailwind"],
      "link": "https://github.com/rdwansch/personal-site"
    }
  ]
}
```

```ts
// content.config.ts
projects: defineCollection({
  type: 'data',
  source: 'projects.json',
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()),
      link: z.string().nullable(),
    })),
  }),
})
```

```vue
<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () =>
  queryCollection('projects').first()
)
</script>

<template>
  <div v-for="project in projects?.items" :key="project.title">
    <h3>{{ project.title }}</h3>
    <p>{{ project.description }}</p>
  </div>
</template>
```

---

## MDC — Markdown Component Syntax

Ini fitur yang paling bikin saya tertarik: kita bisa menyisipkan komponen Vue langsung di dalam file Markdown.

**Komponen inline:**

```md
:badge[NEW]{type="success"}
```

**Komponen block:**

```md
::callout{type="warning"}
Hati-hati, ini adalah peringatan penting!
::
```

**Komponen dengan slot:**

```md
::card
---
title: Judul Card
description: Deskripsi singkat
---
Konten di dalam card bisa berisi **Markdown** biasa.
::
```

Supaya komponen MDC bisa dipakai, kita letakkan komponen Vue di `components/content/` — Nuxt Content otomatis _register_ semua komponen di sana sebagai komponen global yang bisa dipakai di Markdown.

```vue
<!-- components/content/Callout.vue -->
<script setup lang="ts">
defineProps<{
  type?: 'info' | 'warning' | 'error' | 'success'
}>()
</script>

<template>
  <div :class="`callout callout-${type ?? 'info'}`">
    <slot />
  </div>
</template>
```

---

## Query Layaknya Database

Ini bagian yang saya paling suka. API query Nuxt Content v3 terasa seperti ORM ringan:

```ts
// Filter berdasarkan tag
const posts = await queryCollection('blog')
  .where('tags', 'LIKE', '%Nuxt%')
  .order('date', 'DESC')
  .limit(5)
  .all()

// Pencarian full-text
const results = await queryCollection('blog')
  .where('body', 'LIKE', `%${keyword}%`)
  .all()

// Ambil hanya field tertentu (projection)
const titles = await queryCollection('blog')
  .select('title', 'date', 'path')
  .order('date', 'DESC')
  .all()
```

Di bawahnya, ini semua diterjemahkan ke SQL dan dieksekusi oleh SQLite. Performanya cepat bahkan untuk ratusan file konten.

---

## Daftar Isi Otomatis

`<ContentRenderer>` juga menyertakan _table of contents_ yang dibangun otomatis dari heading di Markdown:

```vue
<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('blog').path(route.path).first()
)
</script>

<template>
  <div class="layout">
    <aside>
      <ul>
        <li v-for="link in post?.body?.toc?.links" :key="link.id">
          <a :href="`#${link.id}`">{{ link.text }}</a>
          <ul v-if="link.children">
            <li v-for="child in link.children" :key="child.id">
              <a :href="`#${child.id}`">{{ child.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>

    <main>
      <ContentRenderer :value="post" />
    </main>
  </div>
</template>
```

Heading `##` menjadi level pertama, `###` menjadi child-nya. Semua otomatis.

---

## Hot Reload di Development

Saat _development_, setiap perubahan pada file di folder `content/` langsung ter-_reflect_ di browser tanpa perlu _refresh_ manual. Ini karena Nuxt Content menggunakan _file watcher_ yang terintegrasi dengan Vite HMR.

> **Fun Fact:** Di Nuxt Content v3, _hot reload_ untuk konten bahkan lebih cepat dari v2 karena perubahan hanya me-_re-index_ file yang berubah, bukan semua file sekaligus. Ini terasa jelas saat project punya ratusan artikel.

---

## Kapan Tidak Pakai Nuxt Content

Nuxt Content cocok untuk konten yang _owner_-nya developer atau tim teknis yang nyaman dengan Git dan Markdown. Tapi kalau _stakeholder_ kamu adalah content editor non-teknis yang butuh UI visual untuk nulis, lebih baik tetap pakai _headless CMS_ seperti Sanity.io atau Directus — dan konsumsi kontennya lewat API biasa, bukan Nuxt Content.

Nuxt Content bukan pengganti CMS. Ia adalah pilihan tepat kalau kamu mau _control penuh_ atas konten tanpa ketergantungan layanan eksternal.

---

## Penutup

Nuxt Content mengubah cara saya melihat _content management_. Tidak ada lagi _boilerplate_ yang memakan waktu. Tidak ada lagi ketergantungan pada _service_ eksternal yang bisa berubah _pricing_ kapan saja. Konten ada di Git, di-_version control_, dan bisa di-_query_ dengan cara yang ekspresif.

Kalau kamu sudah pakai Nuxt dan butuh blog, dokumentasi, atau apapun yang berbasis konten — Nuxt Content adalah pilihan pertama yang layak dicoba.

## Referensi

[Nuxt Content Official Docs](https://content.nuxt.com/) \*
[MDC Syntax](https://content.nuxt.com/docs/files/markdown#mdc-syntax) \*
[queryCollection API](https://content.nuxt.com/docs/utils/query-collection) \*
[Nuxt Content GitHub](https://github.com/nuxt/content) \*

~ Ann
