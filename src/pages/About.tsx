import { Link } from "react-router-dom";

const prodi = "Teknologi Laboratorium Medis (D-IV)";

const dosenPengampu = [
  {
    nama: "Patricia Gita Naully, M.Si",
    nidn: "0409029201",
  },
  {
    nama: "Taufik Gunawan, S.KM, M.Kes",
    nidn: "412130294",
  },
];

const anggotaKelompok = [
  {
    nama: "Trynanda Diva Wilhemina",
    npm: "2250391042",
  },
  {
    nama: "Shalsa Laras Mutiara",
    npm: "2250391043",
  },
  {
    nama: "Astri Lafenia Berutu",
    npm: "2250391044",
  },
  {
    nama: "Adinda Luthfiani Amalia",
    npm: "2250391045",
  },
  {
    nama: "Tasya Salsabilla Khairunissa",
    npm: "2250391046",
  },
  {
    nama: "Muhammad Haikal Ibrahim",
    npm: "2250391047",
  },
  {
    nama: "Endang Pratiwi",
    npm: "2250391048",
  },
  {
    nama: "Suci Ayunda Pratiwi",
    npm: "2250391049",
  },
  {
    nama: "Nadia Sinta Wulandari",
    npm: "2250391050",
  },
  {
    nama: "Nabilah Noviyanti",
    npm: "2250391051",
  },
  {
    nama: "Putri Dwi Ananda",
    npm: "2250391052",
  },
  {
    nama: "Muthia Hanun P",
    npm: "2250391053",
  },
  {
    nama: "Nadia rizkia anazziah",
    npm: "2250391055",
  },
  {
    nama: "Diana puspitasari",
    npm: "225391056",
  },
  {
    nama: "Raisya Hendriani Putri",
    npm: "2250391057",
  },
  {
    nama: "Khansa Hanan Nabilah",
    npm: "2250391058",
  },
  {
    nama: "Salsabiila Ainurrahmi",
    npm: "2250391059",
  },
  {
    nama: "Sabrina Putri Setyani",
    npm: "2250391060",
  },
];

export const About = () => {
  return (
    <div className="grid place-items-center w-screen h-screen bg-[#86BBD8] overflow-auto">
      <div className="flex flex-col my-4 text-white">
        <span className="font-silkscreen text-3xl sm:text-5xl text-center">
          About
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          {prodi}
        </span>
      </div>
      <div className="flex flex-col my-4 text-white">
        <span className="font-silkscreen text-3xl sm:text-5xl text-center">
          Dosen Pengampu
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          {dosenPengampu.map((dosen) => (
            <div key={dosen.nidn}>
              {dosen.nama} ({dosen.nidn})
            </div>
          ))}
        </span>
      </div>
      <div className="flex flex-col my-4 text-white">
        <span className="font-silkscreen text-3xl sm:text-5xl text-center">
          Anggota Kelompok
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          {anggotaKelompok.map((anggota) => (
            <div key={anggota.npm}>
              {anggota.nama} ({anggota.npm})
            </div>
          ))}
        </span>
      </div>
      <div className="flex flex-col my-4 text-white">
        <span className="font-silkscreen text-3xl sm:text-5xl text-center">
          Source Code
        </span>
        <span className="font-inter font-semibold uppercase sm:text-xl text-center">
          <Link to="https://github.com/ibldzn/quiz-app">Github</Link>
        </span>
      </div>
    </div>
  );
};
