function hitungVoucher(voucher, totalBelanja) {
  let potongan, maksimalDiskon, minimalBelanja;

  if (voucher === "DumbWaysJos") {
    potongan = 0.211;
    maksimalDiskon = 20000;
    minimalBelanja = 50000;
  } else if (voucher === "DumbWaysMantap") {
    potongan = 0.30;
    maksimalDiskon = 40000;
    minimalBelanja = 80000;
  } else {
    return "Voucher tidak valid";
  }

  if (totalBelanja < minimalBelanja) {
    return `Total belanja harus lebih dari ${minimalBelanja}`;
  }

  let diskon = Math.min(totalBelanja * potongan, maksimalDiskon);
  let totalBayar = totalBelanja - diskon;
  let kembalian = totalBelanja - totalBayar;

  return `Uang yang harus dibayar: ${totalBayar}\nDiskon: ${diskon}\nKembalian: ${kembalian}`;
}

console.log(hitungVoucher("DumbWaysJos", 100000));