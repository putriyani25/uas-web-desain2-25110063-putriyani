function pindahHalaman(namaHalaman) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.page-view').forEach(function (el) {
        el.classList.remove('active');
    });

    // Tampilkan halaman yang dipilih
    const target = document.getElementById('page-' + namaHalaman);
    if (target) target.classList.add('active');

    // Update class active di navbar
    document.querySelectorAll('.nav-link-page').forEach(function (link) {
        const isActive = link.getAttribute('data-page') === namaHalaman;
        link.classList.toggle('active', isActive);
    });

    // Otomatis scroll ke atas tanpa jeda
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Auto-close hamburger menu di tampilan mobile saat link diklik
    const navbar = document.getElementById("navbarLinks");
    if (navbar.classList.contains("show")) {
        // Menggunakan trigger bootstrap (jQuery) agar animasi penutupan berjalan
        $('.navbar-toggler').click();
    }
}

// Event listener klik tombol navigasi dan button lainnya
document.querySelectorAll('[data-page]').forEach(function (el) {
    el.addEventListener('click', function (e) {
        e.preventDefault();
        pindahHalaman(this.getAttribute('data-page'));
    });
});

// LOGIKA PEMESANAN & MODAL
let harga = 0;
let jumlah = 1;

document.querySelectorAll(".btn-beli").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        harga = Number(this.dataset.harga);
        jumlah = 1;

        // Tampilkan di modal
        document.getElementById("namaProduk").innerText = this.dataset.nama;
        document.getElementById("hargaProduk").innerText = "Rp" + harga.toLocaleString("id-ID");
        document.getElementById("jumlahProduk").innerText = jumlah;
        document.getElementById("totalHarga").innerText = "Rp" + (harga * jumlah).toLocaleString("id-ID");

        $("#detailPesanan").modal("show");
    });
});

document.getElementById("btnTambah").addEventListener("click", function () {
    jumlah++;
    document.getElementById("jumlahProduk").innerText = jumlah;
    document.getElementById("totalHarga").innerText = "Rp" + (harga * jumlah).toLocaleString("id-ID");
});

document.getElementById("btnKurang").addEventListener("click", function () {
    if (jumlah > 1) {
        jumlah--;
        document.getElementById("jumlahProduk").innerText = jumlah;
        document.getElementById("totalHarga").innerText = "Rp" + (harga * jumlah).toLocaleString("id-ID");
    }
});

document.getElementById("btnPesan").addEventListener("click", function () {
    const pesanan = document.getElementById("namaProduk").innerText;
    const total = "Rp" + (harga * jumlah).toLocaleString("id-ID");

    alert(
        "📝 PESANAN DITERIMA!\n\n" +
        "Menu : " + pesanan + "\n" +
        "Jumlah : " + jumlah + "\n" +
        "Total : " + total + "\n\n" +
        "Terima kasih telah memesan di Warkop Agam 02! Pesanan Anda segera kami siapkan."
    );
    $("#detailPesanan").modal("hide");
});

// LOGIKA FILTER KATEGORI MENU
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        // Hapus class active dari semua tombol filter
        filterButtons.forEach(function (btn) {
            btn.classList.remove('active');
        });
        // Tambahkan active ke tombol yang diklik
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        menuItems.forEach(function (item) {
            // Tampilkan jika filter 'semua' atau class item cocok dengan filter
            if (filter === 'semua' || item.classList.contains(filter)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// VALIDASI FORM KIRIM PESAN WARKOP
const formKontak = document.getElementById("formKontak");

if (formKontak) {
    formKontak.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = this.querySelectorAll("input")[0].value.trim();
        const hp = this.querySelectorAll("input")[1].value.trim();
        const pesan = this.querySelector("textarea").value.trim();

        if (nama === "" || hp === "" || pesan === "") {
            alert("Harap lengkapi semua data!");
            return;
        }

        if (!/^[0-9]+$/.test(hp)) {
            alert("Nomor HP/WA hanya boleh berisi angka!");
            return;
        }

        if (confirm("Kirim pesan ke Warkop Agam 02 sekarang?")) {
            alert("Pesan berhasil dikirim! Terima kasih atas masukannya.");
            this.reset();
        }
    });
}
