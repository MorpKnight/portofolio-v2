import React from 'react';
import { useTranslation } from 'react-i18next';

// Ganti dengan URL gambar latar belakang motif Minecraft yang Anda inginkan
const minecraftBackgroundUrl = 'https://www.transparenttextures.com/patterns/cubes.png'; // Contoh URL, ganti dengan milik Anda

const MinecraftServerPage = () => {
  const { t } = useTranslation();

  // Informasi Server - Ganti dengan data Anda
  const minecraftVersion = '1.20.1'; // Contoh versi

  // Tautan Unduhan - Ganti dengan URL unduhan yang sebenarnya
  const minecraftDownloadLink = '#'; // Ganti dengan tautan unduhan Minecraft (misal, ke website resmi jika relevan)
  const modpackDownloadLink = '#'; // GANTI DENGAN TAUTAN LANGSUNG KE MODPACK ANDA

  // Gaya spesifik untuk background image dan text shadow yang mungkin lebih mudah dipertahankan inline
  // atau bisa dipindahkan ke file CSS global jika sering digunakan dengan pola yang sama.
  const pageSpecificStyles = {
    backgroundImage: `url(${minecraftBackgroundUrl})`,
    textShadow: '1px 1px 2px black', // Bayangan teks agar lebih mudah dibaca
  };

  return (
    <div
      style={pageSpecificStyles}
      className="bg-repeat min-h-screen pt-[100px] px-5 pb-10 text-[color:var(--text)]" // pt-[100px] untuk menghindari navbar, padding, dan warna teks dasar
    >
      <div className="container mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">{t('minecraftPage.title')}</h1>
          <p className="text-lg">{t('minecraftPage.subtitle')}</p>
        </header>

        {/* Bagian Informasi Server */}
        <section className="bg-black bg-opacity-70 p-5 rounded-lg mb-8 shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">{t('minecraftPage.serverInfoTitle')}</h2>
          <p className="text-xl mb-3">
            {t('minecraftPage.versionLabel')}: <strong>{minecraftVersion}</strong>
          </p>
          <a
            href={minecraftDownloadLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out no-underline text-base my-2 mx-1"
          >
            {t('minecraftPage.downloadMinecraftButton')}
          </a>
        </section>

        {/* Bagian Informasi Modpack */}
        <section className="bg-black bg-opacity-70 p-5 rounded-lg mb-8 shadow-xl">
          <h2 className="text-3xl font-semibold mb-4">{t('minecraftPage.modpackInfoTitle')}</h2>
          <p className="mb-4">
            {t('minecraftPage.modpackDescription')}
          </p>
          <div className="text-center">
            <a
              href={modpackDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[color:var(--primary)] hover:bg-[color:var(--secondary)] text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-150 ease-in-out no-underline text-base my-2 mx-1"
            >
              {t('minecraftPage.downloadModpackButton')}
            </a>
          </div>
        </section>

        {/* Bagian Cara Bergabung */}
        <section className="bg-black bg-opacity-70 p-5 rounded-lg mb-8 shadow-xl text-center">
            <h2 className="text-2xl font-semibold mb-3">{t('minecraftPage.howToJoinTitle')}</h2>
            <p>{t('minecraftPage.howToJoinInstructionsModpack')}</p>
            {/* Anda bisa menambahkan alamat server di sini jika publik */}
            {/* <p className="text-xl mt-2">Server Address: <strong>your.server.address</strong></p> */}
        </section>
      </div>
    </div>
  );
};

export default MinecraftServerPage;