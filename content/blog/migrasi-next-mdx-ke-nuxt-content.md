---
title: Migrasi dari Next MDX ke Nuxt Content
date: 2026-06-14
description: Cerita di balik keputusan migrasi Next MDX ke Nuxt Content setelah 3 tahun tak tersentuh
tags: [Nuxt, Next]
---

## A Story

Website ini sebelumnya dibangun menggunakan Next.js dengan MDX untuk menulis artikel. Idenya menarik di awal — menulis Markdown yang bisa diselipi komponen React. Karena saat itu baru lulus sekolah dan "_cuman bisa React_", fitur terbaru Next 13 soal App router itu juga lagi hype, akhirnya saya tertarik membuat personal site dengan Next - MDX.

Versi lama bisa dilihat di sini: [personal-site-old](https://github.com/rdwansch/personal-site-old/).

## Masalah dengan Next MDX

React itu unopinionated. Apalagi 4-5 tahun yang lalu saat baru belajar dan menonton tutorial di YouTube, itu tiap channel punya style berbeda. Saat itu belum ada AI dan browsing alakadarnya anak SMA, stackoverflow, forum/diskusi, sampai DM pak [Sandhika Galih](https://www.instagram.com/sandhikagalih/) buat minta bantuan. Bahkan yang paling ngeselin, masuk ke `Github Issue` dan ternyata masih open.

- #### Versi baru, tidak support
  MDX tidak jalan di Next.js versi terbaru 13. Saya harus downgrade ke versi yang _compatible_, dan berdoa _upgrade_ berikutnya tidak merusak apa-apa.
- #### Debugging untuk hal yang sia-sia
  Banyak waktu habis untuk _debugging error_ yang sumbernya dari _package_ itu sendiri. Jika beruntung kita akan menemukan `github issue` yang masih open, atau yang kita orang pertama yang melaporkan issue ini.
- #### Status package
  Tidak ada _fix_, tidak ada _release_, hanya _issue_ yang menumpuk di GitHub. Project open source memang mulia, tapi maintener memprioritaskan pekerjaan utama yang sudah pasti punya value lebih (uang) dibanding meluangkan waktu untuk open source yang kurang dana.

Intinya, saya menghabiskan lebih banyak waktu testing - error - debugging - fixing _tooling_ daripada menulis konten.

## Kenapa Nuxt Content

Titik baliknya datang dari pengalaman kerja. Di perusahaan sebelumnya, kami punya _internal platform_ yang awalnya ditulis dengan Next.js lalu dimigrasi ke Nuxt. Dari situ saya merasa pengalaman _development_ dengan Vue, khususnya Nuxt, jauh lebih _magical_.

[Nuxt Content](https://content.nuxt.com/) minim konfigurasi:

- #### File-based, langsung jalan
  Tulis Markdown di folder `content/`, langsung bisa di-_query_. Tidak perlu konfigurasi versi yang ribet.
- #### Markdown yang diperkaya (MDC)
  Bisa menyisipkan komponen Vue di dalam Markdown lewat sintaks **MDC**, mirip semangat MDX tapi lebih rapi dan terintegrasi.
- #### Query layaknya database
  Konten bisa di-_query_ dengan _API_ yang ekspresif untuk filter, sort, dan pagination tanpa _boilerplate_.
- #### Maintained dan first-party
  Ini bagian terpenting. Nuxt Content dirawat sebagai bagian dari ekosistem resmi Nuxt, bukan _package_ pihak ketiga yang sewaktu-waktu bisa archived di repo nya.

## Proses Migrasi

Migrasinya ternyata lebih mulus dari ekspektasi.

- File `.mdx` saya konversi ke `.md` biasa. Sebagian besar artikel saya memang Markdown murni tanpa banyak komponen, jadi prosesnya cepat.
- _Frontmatter_ tetap dipertahankan — `title`, `date`, `description`, `tags`. Nuxt Content membacanya tanpa perlu setup tambahan.
- Komponen kustom yang dulu di-_import_ di MDX saya ganti dengan komponen global Vue yang bisa dipakai langsung lewat MDC.
- _Rendering_ ditangani komponen `<ContentRenderer>`, jadi tidak perlu lagi memikirkan _loader_ dan _plugin_ Webpack/Babel yang dulu sering bermasalah.

## Penutup

Pelajaran yang saya ambil: pilih _tooling_ yang sehat ekosistemnya, bukan hanya yang paling _hype_ saat itu. MDX adalah ide bagus, tapi ketergantungan pada _package_ eksperimental yang akhirnya ditinggal membuat _maintenance_-nya tidak sepadan.

Pindah ke Nuxt Content bukan soal Vue lebih baik dari React, tapi soal _developer experience_ yang membuat saya kembali fokus menulis, bukan menambal _tooling_.

## Referensi

[Nuxt Content](https://content.nuxt.com/) \*
[MDC Syntax](https://content.nuxt.com/docs/files/markdown#mdc-syntax) \*
[personal-site-old](https://github.com/rdwansch/personal-site-old/) \*
