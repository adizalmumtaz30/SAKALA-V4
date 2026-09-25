# SAKALA V4 — UI/UX DESIGN SPEC
## Arah Visual "Signal" — Modern, Premium, Quiet-Rich

**Status:** Menggantikan total ADR-007 ("Papan Jadwal", skeuomorphism) di `SAKALA_V4_REV2_MASTER_BUILD_SPEC.md` §5 dan `DECISIONS.md`.
**Tanggal:** 24 September 2026
**Berlaku untuk:** seluruh permukaan aplikasi SAKALA V4 (web, print, dark mode).

---

## 1. Filosofi

> **Rich, but not busy.** Satu aksen mewah (Signal Violet), sisanya tenang.
> **Flat-elevated, bukan literal.** Kedalaman lewat bayangan lembut, bukan tekstur kertas/kuningan/kayu.
> **Warna kerja fungsional, bukan dekorasi.** Setiap warna menjawab pertanyaan operator: apa status ini, mapel apa ini.

Skeuomorphism "Papan Jadwal" (kertas gading, gembok kuningan, catatan pensil) **dihapus total**. Alasan: metafora fisik membatasi skala visual ke "vintage/craft", sedangkan produk ini butuh kesan *modern SaaS premium* — cepat, presisi, dipercaya sekolah sebagai alat kerja harian, bukan barang antik.

Prinsip yang **tetap dipertahankan** dari spec lama (tidak berubah oleh redesain ini):
- Area data padat tetap datar dan terbaca (Hukum emas §5.2 lama tetap berlaku)
- Status selalu **ikon + label**, tidak pernah warna saja
- Warna melekat pada Mapel, bukan Guru (ADR-001, tidak berubah)
- Kontras diuji: 4.5:1 teks kecil, 3:1 elemen besar
- Light-first; dark adalah varian yang diuji ulang, bukan hasil invert otomatis

---

## 2. Palet Warna

### 2.1 Signal Violet — brand & aksi utama

Dipakai **hemat**: teks tombol utama, ring fokus, badge "Operator/Manual", glow hover, aksen garis. **Jangan** jadi warna blok besar di background luas — itu yang bikin UI terasa murah, bukan mewah.

| Token | Hex | Pemakaian |
|---|---|---|
| `violet-50` | `#F5F1FF` | Tint sangat pucat, hover background halus |
| `violet-100` | `#EBE4FF` | Badge/chip aktif, accent background |
| `violet-200` | `#D6C7FF` | Border aktif lembut |
| `violet-300` | `#B99CFF` | Border hover sekunder |
| `violet-400` | `#9A6EFF` | Primary di dark mode |
| **`violet-500`** | **`#7A35FF`** | **Signal Violet — brand utama, tombol primer, ring fokus** |
| `violet-600` | `#6320E8` | Hover state tombol primer |
| `violet-700` | `#4E18BA` | Teks di atas tint violet (badge) |
| `violet-800` | `#3A1289` | Teks kontras tinggi di atas violet-100 |
| `violet-900` | `#271061` | Cadangan kontras ekstrem |

### 2.2 Mist Gray — permukaan & latar

Netral dominan aplikasi. Bukan putih polos — sedikit kebiruan/keabuan, kesan "studio modern", bukan kertas kantor.

| Token | Hex | Pemakaian |
|---|---|---|
| `mist-50` | `#FFFFFF` | Card, popover, permukaan tertinggi |
| `mist-100` | `#F7F8FA` | Permukaan sekunder, hover row |
| **`mist-200`** | **`#F0F2F5`** | **Mist Gray — latar utama aplikasi** |
| `mist-300` | `#E4E6EC` | Muted background, disabled fill |
| `mist-400` | `#D3D6E0` | Border, input border |

### 2.3 Ink — teks & garis

Netral dingin dengan sedikit undertone ungu (kohesi ke brand), bukan hitam murni.

| Token | Hex | Pemakaian |
|---|---|---|
| `ink-950` | `#0E0B14` | Teks utama (foreground) |
| `ink-900` | `#17131F` | Teks card, heading |
| `ink-700` | `#322B42` | Teks sekunder kuat |
| `ink-500` | `#6B6478` | Muted foreground, label kecil |
| `ink-300` | `#A29CB0` | Placeholder, teks nonaktif |

### 2.4 Status Slot Jadwal

Dipetakan ulang dari sistem lama — flat, tanpa metafora material.

| Status | Token | Nilai | Penanda |
|---|---|---|---|
| Terjadwal (default) | `status-scheduled` | `mist-100` | Kartu netral |
| Otomatis (AUTO) | `status-auto-ink` | `ink-500` | Label kecil "Otomatis" |
| Operator (MANUAL) | `status-manual` | `violet-500` | Badge tint violet-100 + teks violet-700, label "Operator" |
| Dikunci (LOCKED) | `status-locked` | `ink-900` | Ikon gembok solid, tegas — bukan lagi kuningan |
| Bentrok (CONFLICT) | `status-conflict` | `#E11D48` | Tepi merah rose + ikon segitiga |
| Peringatan (WARNING) | `status-warning` | `#F59E0B` | Tepi amber + ikon seru |
| Preview | `status-preview` | `#0EA5E9` | Tepi biru langit, putus-putus |
| Terlindungi (PROTECTED) | `status-protected` | `#64748B` | Slate, arsir diagonal |

### 2.5 Warna Mapel (24, ADR-001 tetap)

Redesain flat modern — saturasi & lightness diselaraskan (bukan lagi jewel-tone gelap) supaya grid jadwal padat tetap tenang saat 20+ mapel tampil bersamaan. Dipakai sebagai **strip kiri 4–6px + tint pucat 8–12%**, bukan blok warna penuh.

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

### 2.6 Dark Mode — "Signal Dark"

Obsidian sungguhan, bukan invert kasar dari light. Violet diredupkan ke `violet-400` (`#9A6EFF`) sebagai primary supaya tidak menyilaukan di layar gelap.

| Peran | Hex |
|---|---|
| Background | `#0D0B12` |
| Card | `#17141F` |
| Foreground | `#F0EEF5` |
| Border | `#2A2436` |
| Primary | `#9A6EFF` |

---

## 3. Tipografi

| Peran | Font | Sumber | Catatan |
|---|---|---|---|
| UI & data (dominan) | **Geist** | npm package `geist`, self-hosted | Zero network saat build — sekaligus menghindari bug Turbopack pada loader `next/font/google`. Angka tabular aktif (`font-feature-settings: tnum`). |
| Aksen editorial (hemat) | **Instrument Serif** (italic) | Google Fonts via `<link>` stylesheet biasa | Dipakai **tipis-tipis**: angka hero besar, judul halaman tertentu (mis. logo "Sakala" di sidebar). Bukan untuk body text atau data. |

**Kenapa Geist:** satu keluarga font untuk hampir semua kebutuhan (bukan pairing rumit) adalah pola produk premium modern saat ini (Linear, Vercel, Raycast). Konsisten, presisi, netral tapi berkarakter di weight tebal.

**Kenapa Instrument Serif italic sebagai aksen:** kombinasi grotesk modern + serif editorial tipis adalah pola desain 2025–2026 yang membawa kesan "mewah" tanpa jatuh ke klasik/antik (beda dari Fraunces di desain lama yang terasa lebih "buku tua").

Skala tipe: `13 / 15 / 18 / 22 / 28 / 36` — transisi halus, bukan lompat kasar antar level.

---

## 4. Elevasi & Bayangan

Bayangan **lembut & menyebar**, bukan tajam/berundak seperti sebelumnya. Ini yang membedakan kesan "mahal" (Linear/Arc-style) dari "murah" (default browser shadow).

| Token | Nilai | Pemakaian |
|---|---|---|
| `shadow-xs` | `0 1px 2px rgba(23,19,31,.04)` | Border halus pada input |
| `shadow-sm` | `0 1px 3px rgba(23,19,31,.06), 0 1px 2px rgba(23,19,31,.04)` | Card default |
| `shadow-md` | `0 4px 16px rgba(23,19,31,.08), 0 1px 2px rgba(23,19,31,.04)` | Card hover, dropdown |
| `shadow-lg` | `0 16px 40px rgba(23,19,31,.12), 0 2px 6px rgba(23,19,31,.05)` | Dialog, Impact Sheet |
| `shadow-focus` | `0 0 0 3px rgba(122,53,255,.18)` | Ring fokus (ganti ring keras lama) |
| `shadow-glow` | `0 8px 28px rgba(122,53,255,.22)` | Hover tombol primer — sentuhan "premium glow" |

Maksimal 2 lapis bayangan per elemen (aturan lama tetap berlaku). Radius dasar `0.75rem` (naik dari `0.625rem` lama — sudut lebih lembut, kesan lebih modern).

---

## 5. Motion

| Token | Nilai |
|---|---|
| `motion-fast` | 120ms |
| `motion-normal` | 200ms |
| `motion-slow` | 320ms |
| `motion-ease-out` | `cubic-bezier(.16,1,.3,1)` (expo-out — bukan lagi `cubic-bezier(.2,.8,.2,1)`) |

Aturan:
- Hover card/tombol: `translateY(-2px)`, **tanpa `scale`** (scale terasa "toy-ish", tidak premium)
- List masuk (Tray, Riwayat): stagger 20–30ms per item
- Drag slot: sedikit rotate (-1°) + elevasi naik = kesan "diangkat", bukan lompat
- Hormati `prefers-reduced-motion` — ganti ke perubahan instan

---

## 6. Komponen Inti (sudah diimplementasikan)

- **Button** — 4 varian: `primary` (violet solid + glow saat hover), `secondary` (mist + border tipis), `ghost` (teks saja), `destructive`. Semua `hover:-translate-y-0.5`, tanpa scale.
- **Card** — permukaan `mist-50`, border `mist-400`, `shadow-sm` default → `shadow-md` saat relevan.
- **ReadinessBadge** — `done` = tint violet-100/teks violet-700; `empty` = muted netral. Selalu ikon (✓/○) + label.
- **Sidebar** — flat, `bg-card`, item aktif = tint `accent` (violet-100) + teks violet-700.
- **Input/Form** — border tipis `mist-400`, fokus = `shadow-focus` (ring violet lembut) + border violet-400, tanpa inset shadow skeuomorphic.

---

## 7. Aksesibilitas (tidak berubah dari spec lama)

- Kontras 4.5:1 teks kecil, 3:1 elemen besar — diuji ulang untuk palet baru
- IKON + LABEL + PENJELASAN, tidak pernah warna saja
- Target sentuh ≥ 44px, fokus terlihat jelas (`shadow-focus`), keyboard penuh
- `forced-colors` dan `prefers-reduced-motion` didukung
- Mode cetak: semua bayangan/gradient dimatikan (`@media print`), hitam-putih tetap terbaca

---

## 8. Yang Dihapus dari Spec Lama

Referensi berikut di `SAKALA_V4_REV2_MASTER_BUILD_SPEC.md` §5 dan §5.1–§5.14 **tidak lagi berlaku**, digantikan dokumen ini:

- Metafora "Papan Jadwal" fisik (kertas, kayu, gembok kuningan, segel malam, kalkir)
- Token `--paper-*`, `--brass-*`, `--walnut-*`, `--elev-*`, `--inset-1`, `--press-1`
- Font Fraunces + Source Sans 3
- 24 warna Mapel versi "jewel tone" (garnet/jade/dst.)
- Mega Mendung sebagai elemen ukiran emboss (dipertimbangkan ulang di fase ikonografi berikutnya — belum diganti, belum dihapus keputusannya)

Bagian lain dari Master Build Spec (skema database, engine, hard/soft constraint, alur produk, PRD) **tidak berubah** — redesain ini murni lapisan visual.
