# SAKALA_V4_UI_UX_DESIGN_SPEC

## Kiblat Visual & Interaksi Baru — "Signal" v2, Disempurnakan Riset Tren 2026

**Status:** Menggantikan total `SAKALA_V4_UI_UX_DESIGN_SPEC.md` v1 dan ADR-007 lama ("Papan Jadwal") di `SAKALA_V4_REV2_MASTER_BUILD_SPEC.md` §5.
**Tanggal:** 24 September 2026
**Berlaku untuk:** seluruh permukaan SAKALA V4 — web, print, light & dark.

---

## 0. Guardrail — Baca Ini Dulu

Riset tren 2026 yang mendasari dokumen ini banyak bersumber dari produk **AI-native** (dashboard adaptif, asisten AI, generative UI). SAKALA V4 punya larangan produk mutlak:

```
Tanpa AI Scheduling. Engine deterministik.
Jangan pernah menambah: SAKALA AI · AI Scheduling · generate kurikulum ...
```
— PROJECT_KNOWLEDGE §10, §38

Karena itu dokumen ini **mengambil pola interaksi**, bukan konsep AI itu sendiri. Contoh konkret: pola "verifikasi sebelum eksekusi" dari dunia AI 2026 diterapkan ke alur **Engine deterministik yang sudah ada** — Variant → Preview → Impact → Apply (§4.8 Master Spec, ADR-006) — bukan alasan untuk menambah asisten AI. Setiap kali dokumen ini menyebut "usulan" atau "hasil generate", itu selalu hasil solver deterministik, tidak pernah AI. Implementer berikutnya: jangan baca bagian 9 sebagai izin menambah fitur AI.

---

## 1. Riset & Referensi (ringkas)

Disintesis dari riset tren UI/UX SaaS 2026 (rangkuman tren yang mengutip pola visual populer di media desain serta studi kasus produk nyata):

| Temuan | Sumber (ringkas) | Diterapkan ke SAKALA sebagai |
|---|---|---|
| Visual saturation — dashboard SaaS makin seragam (pastel, ilustrasi kosong). "Function-forward" jadi nilai estetika baru | Tubik Studio, "7 UI Design Trends 2026" | Prinsip inti §2: kejelasan = kemewahan, bukan dekorasi |
| Dark-first untuk power user yang pakai tool "sepanjang hari" (Linear, Vercel, Supabase) | SaaS UI Design Examples 2026 | Dark jadi **tema default operator** (§3.6) — langsung jawab kebutuhan "betah berjam-jam" |
| Progressive disclosure "diangkat jadi seni" — tampilkan sedikit, ungkap kompleksitas saat siap | SaaS UI Trends 2026 (Asana/Linear/Notion onboarding) | Sudah selaras dengan prinsip lama SAKALA §4.2 "Kesiapan tanpa wizard wajib" — dipertegas di seluruh komponen |
| Bento grid: modul visual berbeda ukuran, cocok untuk dashboard multi-metrik, bukti dwell-time lebih tinggi vs grid seragam | Studi Bento Grid 2026, saasframe.io | Layout **Beranda & Laporan** (bukan Schedule Canvas — itu tetap grid fungsional per §16 Project Knowledge) |
| Palet netral tenang + warna dipakai strategis (bukan kontras keras) | Top UI Trends SaaS Dashboards 2026 | Selaras dengan "rich but not busy" v1 — dipertegas |
| Data prompt AI 2026: dark mode naik dari 27%→38%, "desain seperti Linear" makin diminta | Superdesign, analisis 210rb prompt | Validasi arah Geist + dark-first + minim dekorasi |
| Pola AI 2026: "verifikasi sebelum eksekusi", "intentional friction" — jangan biarkan sistem bertindak sendiri tanpa tinjauan manusia | parallelhq.com, AI UX Best Practices 2026 | Diterapkan ke visual alur **Preview/Impact/Apply engine** (§9) — BUKAN fitur AI (lihat §0) |

---

## 2. Filosofi Inti

> **Kejelasan adalah kemewahan.** Tahun 2026, dashboard yang "terlalu didekorasi" terasa murah; yang tenang dan presisi terasa mahal.
> **Satu aksen, seribu kegunaan.** Signal Violet dipakai hemat — brand, fokus, aksi utama. Selebihnya netral.
> **Gelap adalah default, terang adalah pilihan.** Operator sekolah bekerja berjam-jam menyusun jadwal — mata mereka prioritas nomor satu.
> **Progressive disclosure di semua tempat.** Operator lihat sedikit dulu, sistem ungkap detail saat dibutuhkan — bukan sekali tumpah semua.

Prinsip yang **tetap** dari versi sebelumnya (tidak berubah oleh dokumen ini):
- Area data padat tetap datar dan terbaca — tidak ada bento/efek di grid Jadwal
- Status selalu **ikon + label**, tidak pernah warna saja
- Warna melekat pada Mapel, bukan Guru (ADR-001)
- Kontras diuji: 4.5:1 teks kecil, 3:1 elemen besar
- Tanpa AI Scheduling, tanpa engine non-deterministik (§0)

---

## 3. Sistem Warna

### 3.1 Signal Violet — brand, dipakai hemat

| Token | Hex | Pemakaian |
|---|---|---|
| `violet-50` | `#F5F1FF` | Tint hover halus (light) |
| `violet-100` | `#EBE4FF` | Badge/chip aktif (light) |
| `violet-200` | `#D6C7FF` | Border aktif lembut |
| `violet-300` | `#B99CFF` | Border hover sekunder |
| `violet-400` | `#9A6EFF` | **Primary di dark mode** |
| **`violet-500`** | **`#7A35FF`** | **Signal Violet — brand utama, primary di light mode** |
| `violet-600` | `#6320E8` | Hover tombol primer (light) |
| `violet-700` | `#4E18BA` | Teks di atas tint violet |
| `violet-800` | `#3A1289` | Kontras tinggi di atas violet-100 |
| `violet-900` | `#271061` | Cadangan kontras ekstrem |

### 3.2 Mist Gray — permukaan (light mode)

| Token | Hex | Pemakaian |
|---|---|---|
| `mist-50` | `#FFFFFF` | Card tertinggi |
| `mist-100` | `#F7F8FA` | Permukaan sekunder |
| **`mist-200`** | **`#F0F2F5`** | **Latar utama light mode** |
| `mist-300` | `#E4E6EC` | Muted, disabled |
| `mist-400` | `#D3D6E0` | Border |

### 3.3 Ink — teks (light mode)

| Token | Hex |
|---|---|
| `ink-950` | `#0E0B14` |
| `ink-900` | `#17131F` |
| `ink-700` | `#322B42` |
| `ink-500` | `#6B6478` |
| `ink-300` | `#A29CB0` |

### 3.4 Signal Dark — permukaan (dark mode, DEFAULT operator)

Bukan invert dari light. Obsidian sungguhan, kontras diuji ulang khusus untuk sesi kerja panjang (kurang silau, tetap tajam).

| Token | Hex | Pemakaian |
|---|---|---|
| `night-950` | `#0D0B12` | Latar utama — **default aplikasi** |
| `night-900` | `#17141F` | Card |
| `night-800` | `#1E1A29` | Permukaan sekunder, hover row |
| `night-700` | `#2A2436` | Border |
| `mist-dark` | `#F0EEF5` | Teks utama di dark mode |
| `mist-dark-muted` | `#A29CB0` | Teks sekunder di dark mode |

### 3.5 Status Slot Jadwal (light / dark)

| Status | Token | Light | Dark |
|---|---|---|---|
| Terjadwal (default) | `status-scheduled` | `mist-100` | `night-800` |
| Otomatis (AUTO) | `status-auto-ink` | `ink-500` | `mist-dark-muted` |
| Operator (MANUAL) | `status-manual` | `violet-500` | `violet-400` |
| Dikunci (LOCKED) | `status-locked` | `ink-900` | `mist-dark` |
| Bentrok (CONFLICT) | `status-conflict` | `#E11D48` | `#FB7185` |
| Peringatan (WARNING) | `status-warning` | `#F59E0B` | `#FBBF24` |
| Preview (hasil generate belum diterapkan) | `status-preview` | `#0EA5E9` | `#38BDF8` |
| Terlindungi (PROTECTED) | `status-protected` | `#64748B` | `#94A3B8` |

### 3.6 Kenapa Dark Jadi Default (bukan Cuma Opsi)

Riset 2026 konsisten: tool yang dipakai "sepanjang hari" oleh power user (Linear, Vercel, Supabase, Raycast) mendesain dark dulu, light kedua — kebalikan konvensi lama. Operator sekolah menyusun jadwal bisa berjam-jam nonstop di satu layar padat data. Maka:

- **Dark adalah tema default** saat pertama buka aplikasi (bukan lagi light-first seperti v1)
- Light tetap **didesain penuh & diuji kontras sendiri** — untuk ruang kerja terang/preferensi personal — bukan sekadar invert
- Preferensi tema disimpan per browser, mengikuti pola konteks tahun ajaran (§4.3 Master Spec)

### 3.7 Warna Mapel (24, ADR-001 tetap)

Tidak berubah dari v1 — sudah flat modern, tinggal dipastikan tetap punya kontras cukup di atas `night-800` (dark) selain `mist-100` (light):

```
subject-01 #F43F5E rose      subject-13 #7A35FF violet (signal)
subject-02 #F97316 orange    subject-14 #A855F7 purple
subject-03 #F59E0B amber     subject-15 #D946EF fuchsia
subject-04 #EAB308 yellow    subject-16 #EC4899 pink
subject-05 #84CC16 lime      subject-17 #F472B6 pink-light
subject-06 #22C55E green     subject-18 #FB7185 rose-light
subject-07 #10B981 emerald   subject-19 #FBBF24 amber-light
subject-08 #14B8A6 teal      subject-20 #4ADE80 green-light
subject-09 #06B6D4 cyan      subject-21 #2DD4BF teal-light
subject-10 #0EA5E9 sky       subject-22 #38BDF8 sky-light
subject-11 #3B82F6 blue      subject-23 #818CF8 indigo-light
subject-12 #6366F1 indigo    subject-24 #C084FC purple-light
```
Pemakaian: strip kiri 4–6px + tint pucat (8–12% light / 14–18% dark), bukan blok solid.

---

## 4. Tipografi

Tidak berubah dari v1 — divalidasi oleh riset ("desain seperti Linear" adalah permintaan AI-prompt nomor satu 2026, dan Linear memakai pendekatan satu-keluarga-font serupa Geist):

| Peran | Font | Sumber |
|---|---|---|
| UI & data (dominan) | **Geist** | npm `geist`, self-hosted, zero network |
| Aksen editorial (hemat) | **Instrument Serif** italic | Google Fonts via `<link>` |

Skala: `13 / 15 / 18 / 22 / 28 / 36`. Angka tabular aktif di seluruh data JP/jam.

---

## 5. Layout — Bento untuk Dashboard, Grid Fungsional untuk Jadwal

**Aturan pemisah tegas:** Bento grid HANYA untuk Beranda dan Laporan (ringkasan, bukan kerja detail). Schedule Canvas, tabel master data, dan Riwayat **tetap grid/tabel fungsional biasa** — bento di situ akan merusak kegunaan (§16 Project Knowledge: "Canvas adalah instrumen data, bukan galeri").

### 5.1 Beranda — Bento Grid

```
┌─────────────────────────┬───────────────┐
│                          │  Guru         │
│   Kesiapan Penjadwalan   │  ○ 0 data     │
│   (hero, 2×2)            ├───────────────┤
│   5 dari 6 langkah       │  Mapel        │
│                          │  ✓ 12 data    │
├───────────┬──────────────┴───────────────┤
│  Kelas    │       Beban Mengajar          │
│  ✓ 9 data │       ✓ 84 data (2×1)         │
├───────────┼───────────────────────────────┤
│  Ruang    │       Jam ke- Aktif           │
│  ✓ 6 data │       ✓ 42 slot (2×1)         │
└───────────┴───────────────────────────────┘
```

Aturan modul (dari riset bento 2026):
- Kartu kecil (1×1): padding 16–20px
- Kartu sedang (2×1): padding 20–24px
- Kartu besar (2×2, hero): padding 24–32px, satu metrik utama + konteks
- Tiap kartu: 1 metrik jelas di atas, bukan tumpukan angka — scan cepat, bukan baca

### 5.2 Topbar → Command Bar

Ctrl/Cmd+K (§23 Master Spec) dinaikkan jadi elemen visual utama topbar, bukan cuma shortcut tersembunyi — tren 2026 menaruh command palette sebagai entry point utama produk power-user. Field pencarian selalu terlihat di topbar, bukan ikon kaca pembesar kecil.

### 5.3 Sidebar

Collapsible (ikon saja saat diciutkan) — operator kerja lama butuh lebar Canvas maksimal saat sudah hafal navigasi. Tetap flat list per §4.1, tanpa berubah struktur.

---

## 6. Elevasi & Material (Dark-First)

| Token | Dark (utama) | Light |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(0,0,0,.3)` | `0 1px 2px rgba(23,19,31,.04)` |
| `shadow-sm` | `0 1px 3px rgba(0,0,0,.4)` | `0 1px 3px rgba(23,19,31,.06)` |
| `shadow-md` | `0 4px 16px rgba(0,0,0,.45)` | `0 4px 16px rgba(23,19,31,.08)` |
| `shadow-lg` | `0 20px 48px rgba(0,0,0,.55)` | `0 16px 40px rgba(23,19,31,.12)` |
| `shadow-focus` | `0 0 0 3px rgba(154,110,255,.28)` | `0 0 0 3px rgba(122,53,255,.18)` |
| `shadow-glow` | `0 10px 32px rgba(154,110,255,.35)` | `0 8px 28px rgba(122,53,255,.22)` |

Radius `0.75rem`, maksimal 2 lapis bayangan per elemen (tetap).

---

## 7. Motion

Tidak berubah dari v1, dipertegas:

| Token | Nilai |
|---|---|
| `motion-fast` | 120ms |
| `motion-normal` | 200ms |
| `motion-slow` | 320ms |
| easing | `cubic-bezier(.16,1,.3,1)` (expo-out) |

- Hover: `translateY(-2px)`, tanpa `scale`
- Bento tile masuk: stagger 20–30ms per kartu (kesan "tersusun", bukan meledak)
- Command bar buka: scale dari 98%→100% + fade, 150ms — satu-satunya tempat scale diizinkan (overlay, bukan kartu data)
- `prefers-reduced-motion`: semua transisi jadi instan

---

## 8. Komponen Inti

| Komponen | Perubahan dari v1 |
|---|---|
| Button | Tidak berubah — primary/secondary/ghost/destructive, hover translateY+glow |
| Card | Tidak berubah — flat, shadow-sm→md |
| Bento Tile | **Baru** — varian Card untuk Beranda/Laporan, 1×1 / 2×1 / 2×2, satu metrik dominan |
| ReadinessBadge | Tidak berubah |
| Command Bar | **Naik status** — dari shortcut tersembunyi jadi elemen topbar utama |
| Sidebar | **Baru: collapsible** |
| Theme Toggle | **Baru** — dark (default) / light, ikon di topbar |

---

## 9. Pola "Tinjau Sebelum Terapkan" pada Engine (bukan AI — lihat §0)

Riset 2026 soal produk AI menekankan: jangan biarkan sistem bertindak tanpa manusia meninjau dulu ("intentional friction", "verifikasi sebelum eksekusi"). SAKALA V4 **sudah punya** alur ini secara produk (Variant → Preview → Impact → Apply, ADR-006) — dokumen ini hanya mempertajam visualnya:

- Hasil generate ditampilkan sebagai **usulan**, bukan langsung tampil sebagai jadwal final — border putus-putus `status-preview`, label "Usulan — belum diterapkan"
- Impact Sheet (§21 Project Knowledge) memakai pola "ringkasan alasan" ala chain-of-thought AI 2026 — TAPI isinya murni penjelasan solver deterministik (kenapa slot ini dipilih, constraint apa yang dipertimbangkan), bukan teks yang dibangkitkan model bahasa
- Tombol "Terapkan" selalu berdampingan dengan "Tinjau Detail" — tidak ada jalur "terapkan langsung" untuk hasil generate massal (beda dari pemindahan manual tunggal yang tetap boleh instan per ADR-006)

---

## 10. Ergonomi Operator — Betah Berjam-Jam

Bagian yang menjawab langsung permintaan inti: nyaman dipakai lama, tidak melelahkan.

- **Dark default** (§3.6) — pengurang silau utama untuk sesi panjang
- **Kontras terkontrol, bukan maksimal** — teks dark mode `#F0EEF5` di atas `#0D0B12` (bukan putih murni di atas hitam murni — kontras ekstrem bikin mata lelah lebih cepat di sesi panjang)
- **Line-height lapang** untuk teks data: 1.6 — napas visual di grid padat
- **Progressive disclosure konsisten** — default ringkas di semua modul, detail on-demand, operator tidak "dibanjiri" informasi tiap buka halaman
- **Command bar** — operator hafal jalan pintas, kurangi klik berulang dalam sesi panjang
- **Motion minim & konsisten** — tidak ada animasi dekoratif berulang yang mengalihkan fokus selama kerja fokus lama
- **Status prediktif** — posisi ikon status selalu sama, operator scan tanpa berpikir setelah terbiasa

---

## 11. Aksesibilitas (tetap)

- Kontras 4.5:1 teks kecil, 3:1 elemen besar — diuji ulang untuk dark-first
- IKON + LABEL + PENJELASAN selalu
- Target sentuh ≥ 44px, fokus terlihat (`shadow-focus`), keyboard penuh
- `forced-colors`, `prefers-reduced-motion` didukung
- Print: semua efek dimatikan, hitam-putih tetap terbaca

---

## 12. Perubahan Ringkas dari v1

| Aspek | v1 (Signal) | v2 (dokumen ini) |
|---|---|---|
| Tema default | Light-first | **Dark-first**, light tetap didukung penuh |
| Layout Beranda/Laporan | Card list biasa | **Bento grid** |
| Command bar | Shortcut tersembunyi | **Elemen topbar utama** |
| Sidebar | Statis | **Collapsible** |
| Hasil generate engine | Ditampilkan sebagai jadwal biasa | **Pola usulan/tinjau** eksplisit (§9) |
| Warna, tipografi, elevasi, motion | — | Tidak berubah struktur, hanya diberi varian dark-first |

Bagian non-visual (skema database, engine, hard/soft constraint, alur produk, PRD, dan **larangan AI Scheduling**) sama sekali tidak berubah.
