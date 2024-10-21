let currentInput = ''; // Menyimpan input yang ditampilkan
let operator = '';
let expression = ''; // Variabel untuk menyimpan semua angka dan operator yang diinput

const result = document.getElementById('result');
const buttons = document.querySelectorAll('button');
const backspaceButton = document.getElementById('backspace'); // Tambahkan elemen backspace

// Fungsi untuk memperbarui layar kalkulator
function updateDisplay(value) {
    result.value = value;
}

// Fungsi untuk menangani input angka dan operator
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const value = this.value;

        // Jika tombol adalah "="
        if (this.id === 'equal') {
            calculate();
        }
        // Jika tombol adalah "C" (Clear)
        else if (this.id === 'clear') {
            clearAll();
        }
        // Jika tombol adalah operator
        else if (['+', '-', '*', '/'].includes(value)) {
            chooseOperator(value);
        }
        // Tombol angka atau titik
        else {
            appendNumber(value);
        }
    });
});

// Fungsi untuk menambahkan angka ke input
function appendNumber(number) {
    currentInput += number;  // Menyimpan input angka saat ini
    expression += number;    // Tambahkan ke variabel ekspresi
    updateDisplay(expression);  // Tampilkan ekspresi di layar
}

// Fungsi untuk memilih operator
function chooseOperator(op) {
    if (currentInput === '') return;
    
    operator = op;
    expression += ' ' + op + ' ';  // Tambahkan operator ke variabel ekspresi
    currentInput = '';  // Reset input saat ini
    updateDisplay(expression);  // Tampilkan ekspresi di layar
}

// Fungsi untuk menghitung hasil
function calculate() {
    try {
        const resultValue = eval(expression);  // Evaluasi ekspresi matematika
        expression = resultValue.toString();  // Simpan hasil sebagai ekspresi baru
        updateDisplay(expression);  // Tampilkan hasil di layar
        currentInput = '';  // Kosongkan input saat ini
    } catch (error) {
        updateDisplay('Error');  // Tampilkan error jika ekspresi tidak valid
        expression = '';  // Kosongkan ekspresi
        currentInput = '';  // Kosongkan input
    }
}

// Fungsi untuk backspace (menghapus karakter terakhir)
backspaceButton.addEventListener('click', function() {
    // Hapus karakter terakhir dari ekspresi
    expression = expression.slice(0, -1);
    updateDisplay(expression); // Perbarui layar dengan ekspresi yang diubah
});

// Fungsi untuk menghapus semua input
function clearAll() {
    currentInput = '';
    operator = '';
    expression = '';  // Reset ekspresi
    updateDisplay('');  // Kosongkan layar kalkulator
}
