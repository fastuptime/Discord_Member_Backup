# Discord Üye Yedekleme Sistemi 🔄

Bu proje, Discord sunucunuzdaki üyeleri yedekleyip geri yükleyebilmenizi sağlayan bir sistemdir. Girişte yetkilendirme yapan kullanıcılar tarafından kullanılabilir.

## Özellikler ✨

- Üye yedekleme ve geri yükleme 📦
- Yetkilendirme ile güvenli giriş sistemi 🔑
- Yönetici log kanalı ile işlem kayıtları 📋

## Gereksinimler 🛠️

- Node.js
- MongoDB
- Discord Geliştirici hesabı

## Kurulum 📥

### 1. Depoyu Klonlayın

```bash
git clone https://github.com/fastuptime/Discord_Member_Backup.git
cd Discord_Member_Backup
```

### 2. Gerekli Modülleri Yükleyin

```bash
npm install
```

### 3. Konfigürasyon Dosyasını Düzenleyin

`config.js` dosyasını açarak gerekli bilgileri girin:

```javascript
module.exports = {
    mongoURL: 'xxxxxx', // MongoDB URL 127.0.0.1:27017
    ownerID: [
        "xxxxx"
    ],
    AuthUrl: 'http://xxx/auth/discord', // Auth URL
    addPartLimit: 100, // Add Part Limit
    adminLog_channel: '859359637106065408', // Admin Log Channel ID
    bot: {
        token: 'xxxx',
        client_id: 'xxxx', // Bot ID
        client_secret: 'xxxx', // Bot Secret
        callbackURL: 'http://xxxx/auth/discord', // Bot Callback URL
    }
};
```

### 4. Uygulamayı Başlatın

```bash
node .
```

## Komutlar 📝

### `/admin_loadbackup <serverid>`

- **Açıklama:** Yedeklenmiş üyeleri sunucuya yükler.
- **Kullanım:** `/admin_loadbackup <serverid>`
- **Kategori:** Bot
- **Seçenekler:**
  - **serverid:** Sunucu ID'sini giriniz (Zorunlu)

## Kullanım 🌐

1. **Üyeleri Yedekleme:** Sistem, Discord sunucunuzdaki üyeleri yedekler ve MongoDB'de saklar.
2. **Üyeleri Yükleme:** Yedeklenmiş üyeleri belirli bir sunucuya yüklemek için `/admin_loadbackup <serverid>` komutunu kullanabilirsiniz.
3. **Yetkilendirme:** Kullanıcılar, giriş yaparken yetkilendirme işlemi gerçekleştirir.

## Yardım ve Destek 📞

Herhangi bir sorun veya soru için lütfen bizimle iletişime geçin:

- [GitHub Issues](https://github.com/fastuptime/Discord_Member_Backup/issues)
- [Destek E-posta](mailto:fastuptime@gmail.com)
