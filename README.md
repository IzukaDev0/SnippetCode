# 🖥️ System Monitor Dashboard - WhatsApp Bot Snippet

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-orange.svg)

Daftar Isi:
- [Deskripsi](#deskripsi)
- [Fitur](#fitur)
- [Preview](#preview)
- [Dependencies](#dependencies)
- [Cara Install](#cara-install)
- [Penggunaan](#penggunaan)
- [Konfigurasi](#konfigurasi)
- [Raw Links](#raw-links)
- [Lisensi](#lisensi)

## 📝 Deskripsi

Snippet kode untuk WhatsApp Bot yang menampilkan **System Monitoring Dashboard** secara real-time menggunakan library Canvas. Menampilkan informasi lengkap tentang performa sistem dalam bentuk gambar yang menarik dengan gauge charts dan cards.

Dibuat dan dikembangkan oleh **XRizal**

## ✨ Fitur

- **CPU Monitoring**
  - Penggunaan CPU real-time (gauge chart)
  - Jumlah core dan kecepatan
  - Model prosesor

- **Memory Monitoring**
  - Penggunaan RAM (gauge chart)
  - Total memory
  - Used vs Free memory

- **Storage Monitoring**
  - Penggunaan disk (gauge chart + progress bar)
  - Total, used, dan free storage

- **System Information**
  - Hostname
  - Platform OS
  - Bot uptime
  - Server uptime

- **Node.js Memory**
  - RSS (Resident Set Size)
  - Heap Total
  - Heap Used
  - External memory

- **Real-time Response**
  - Ping latency
  - Timestamp generation

## 🎨 Preview Dashboard

<p align="center">
  <img src="https://via.placeholder.com/900x1000/2c3e50/ffffff?text=System+Monitor+Dashboard+Preview" alt="Dashboard Preview" width="80%" style="border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.3);" />
</p>

```ascii
┌─────────────────────────────────────────────────────────────────────┐
│                         🚀 SYSTEM MONITOR                           │
│                    Real-time Performance Dashboard                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│    ┌───────────────┐    ┌───────────────┐    ┌───────────────┐    │
│    │   🔥 CPU      │    │   💾 MEMORY   │    │   💿 STORAGE  │    │
│    │               │    │               │    │               │    │
│    │      ●        │    │      ●        │    │      ●        │    │
│    │     / \       │    │     / \       │    │     / \       │    │
│    │    │45%│      │    │    │78%│      │    │    │32%│      │    │
│    │     \ /       │    │     \ /       │    │     \ /       │    │
│    │      ●        │    │      ●        │    │      ●        │    │
│    │               │    │               │    │               │    │
│    │ 8 Cores @3.6GHz│   │ Total: 32GB   │   │ Total: 512GB  │    │
│    │ Intel i9-13900K│   │ Used: 24GB    │   │ Used: 164GB   │    │
│    │               │    │ Free: 8GB     │   │ Free: 348GB   │    │
│    └───────────────┘    └───────────────┘    └───────────────┘    │
│                                                                     │
│    ┌─────────────────────────────────────────────────────────┐    │
│    │                    SYSTEM INFORMATION                    │    │
│    ├─────────────────────────────────────────────────────────┤    │
│    │  🖥️ Hostname    │  ⚙️ Platform  │  ⏱️ Bot Uptime  │  📡 Server │
│    │  server-xrizal  │   linux      │   15d 8h 12m   │  45d 6h   │
│    └─────────────────────────────────────────────────────────┘    │
│                                                                     │
│    ┌─────────────────────────────────────────────────────────┐    │
│    │                   NODE.JS MEMORY                         │    │
│    ├─────────────────────────────────────────────────────────┤    │
│    │  📍 RSS      │  📍 Heap Total │  📍 Heap Used  │  📍 External │
│    │  245 MB      │   412 MB       │   198 MB       │   32 MB    │
│    └─────────────────────────────────────────────────────────┘    │
│                                                                     │
│    📅 Generated: 15/03/2024 14:30:22              ╔══════════════╗ │
│                                                    ║   ⚡ 45ms   ║ │
│                                                    ╚══════════════╝ │
└─────────────────────────────────────────────────────────────────────┘
