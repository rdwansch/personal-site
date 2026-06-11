---
title: Jamstack
date: 2023-07-30
description: Mengenal Jamstack, arsitektur web yang memisahkan web layer dari data dan business logic
tags: [Architecture]
---

## Apa itu Jamstack

"Jamstack" yang sebenarnya adalah JAM dan stack dimana JAM adalah akronim dari JavaScript, API & Markup. Sebuah arsitektur yang memisahkan _web layer_ dari _data_ dan _business logic_.

- #### JavaScript
  Semua fungsionalitas dilakukan oleh JavaScript, seperti _request API_ atau merender halaman statis. Banyak _library_ atau _framework_ yang bisa digunakan sesuai kebutuhan.
- #### APIs
  _Server side operation_ seperti koneksi ke database atau terhubung ke _third-party services_.
- #### Markup
  _Pre-render_ halaman statis HTML yang dikirimkan ke browser, di-_generate_ dari Markdown atau dengan _Static Site Generator_.

## Workflow

Setiap push ke _Version Control System_ akan trigger build di _CDN_ dimana **SSG** - _Static Site Generator_ akan dijalankan, proses ini kemudian menghasilkan _static asset_ yang dikirim ke browser. Datasource umumnya menggunakan HeadlessCMS yang memudahkan untuk mengatur content seperti Strapi, Contentful, Sanity.io.

## Keuntungan

- #### Performance
  Jamstack _generate page_ selama _build_ sehingga hanya _static_ yang terkirim. Layanan CDN dapat menerima request dengan cepat tanpa infrastruktur kompleks
- #### Developer Experience
  Sangat banyak variasi teknologi yang bisa digunakan. Developer punya kebebasan untuk memilih framework, third-party APIs yang mempercepat proses _development_ dan menyenangkan untuk dilakukan.
- #### Security
  Kita tidak perlu khawatir dengan keamanan karena aplikasi terpecah menjadi beberapa layanan.
- #### Scalability
  Dengan CDN mudah untuk mengatur traffic

---

## Development

Untuk _generate_ halaman asset HTML banyak cara yang dilakukan.

### Hand Coding

Menulis HTML untuk halaman yang sederhana.

### Static Site Generator

- [Next JS](https://nextjs.org)
- [Hugo](https://gohugo.io/)
- [Gatsby](https://www.gatsbyjs.com/)

See more [SSG](https://jamstack.org/generators/)

---

## Deployment

- [Vercel](https://vercel.com/)
- [GitHub Pages](https://pages.github.com/)
- [Amazon S3](https://www.tnd.dev/tools/hosting-deployment/)

See more [Hosting & Deployment](https://jamstack.org/generators/)

---

## CMS

Secara umum dikenal dengan HeadlessCMS untuk mengatur content.

- [Netlify CMS](https://www.netlifycms.org)
- [Strapi](https://strapi.io/)
- [Contentful](https://www.contentful.com/)
- [Sanity.io](https://sanity.io/)

See more [Headless CMS](https://jamstack.org/headless-cms/)

---

## Static Web Service

List untuk layanan yang bisa digunakan [awesome-static-website-services](https://github.com/agarrharr/awesome-static-website-services)

---

## Referensi

[Jamstack org](https://jamstack.org/) \*
[Jamstack WTF](https://jamstack.wtf/#what-is-jamstack) \*
[Contentful](https://www.contentful.com/r/knowledgebase/jamstack-cms/) \*
[jamstack-architecture-and-scenarios](https://www.maibornwolff.de/en/spotlight/jamstack-architecture-and-scenarios/) \*
