function bubbleSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function sortArray(arr) {
  const sortedArray = bubbleSort(arr);
  const genap = [];
  const ganjil = [];
  for (let number of sortedArray) {
    if (number % 2 === 0) {
      genap.push(number);
    } else {
      ganjil.push(number);
    }
  }

  console.log("Array:", sortedArray.join(", "));
  console.log("Ganjil:", ganjil.join(", "));
  console.log("Genap:", genap.join(", "));
}

const arr = [2, 24, 32, 22, 31];
sortArray(arr);
