function Cari(bilangan) {
  if (bilangan < 2) return false;
  for (let i = 2; i < bilangan; i++) {
    if (bilangan, i === 0) return false;
  }
  return true;
}

function gambarSegitiga(alasTinggi) {
  let bilangan = 2;

  for (let i = 1; i <= alasTinggi; i++) {
    let baris = '';

    for (let cek = 0; cek < i; cek++) {
      while (!Cari(bilangan)) {
        bilangan++;
      }

      baris += bilangan + ' ';
      bilangan++;
    }

    console.log(baris.trim());
  }
}

gambarSegitiga(7); 