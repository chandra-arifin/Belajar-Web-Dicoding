const bukus = [];
const RENDER_EVENT = 'render-buku';
const SAVED_EVENT = 'saved-buku';
const STORAGE_KEY = 'BUKU_APPS';
let namaBuku = '';
let tipeSimpan = '';

document.addEventListener('DOMContentLoaded', function () {
	const submitForm = document.getElementById('form');
	const submitCariForm = document.getElementById('formCariBuku');
	
	submitForm.addEventListener('submit', function (event) {
		event.preventDefault();
		addBuku();
	});

	submitCariForm.addEventListener('submit', function (event) {
		event.preventDefault();
		searchBooks();
	});

	if (isStorageExist()) {
		loadDataFromStorage();
	}
});

document.addEventListener(RENDER_EVENT, function () {
	const belumBacaList = document.getElementById('belum-baca');
	belumBacaList.innerHTML = '';
 
	const selesaiBacaList = document.getElementById('selesai-baca');
	selesaiBacaList.innerHTML = '';

	for (const buku of bukus) {
		if (namaBuku === '' || buku.title.indexOf(namaBuku) > -1)
		{
			const bukuElement = makeBuku(buku);
			if (!buku.isComplete)
				belumBacaList.append(bukuElement);
			else
				selesaiBacaList.append(bukuElement);			
		}
	}
});

document.addEventListener(SAVED_EVENT, function () {
	if(tipeSimpan === 'SIMPAN')
		alert('Buku Berhasil Disimpan');
	else
	if(tipeSimpan === 'HAPUS')
		alert('Buku Berhasil Dihapus');
});

function searchBooks()
{
	namaBuku = document.getElementById('judulBuku').value;
	document.dispatchEvent(new Event(RENDER_EVENT));
}

function addBuku() {
	tipeSimpan = 'TAMBAH';
	const txtJudul = document.getElementById('judul').value;
	const txtPenulis = document.getElementById('penulis').value;
	const txtTahun = document.getElementById('tahun').value;
	const isSelesaiBaca = document.getElementById('tipeBuku').checked;
  

	let tahunVal = Number(txtTahun);

	if (Number(txtTahun)) {
		const generatedID = generateId();
		const bukuObject = generateBukuObject(generatedID, txtJudul, txtPenulis,
			tahunVal, isSelesaiBaca);
		bukus.push(bukuObject);
  
		document.dispatchEvent(new Event(RENDER_EVENT));
		saveData();
	}
	else {
		alert('Tahun Harus Integer!');
		return -1;
	}
}

function generateId() {
	return +new Date();
}
 
function generateBukuObject(id, title, author, year, isComplete) {
	return {
		id,
		title,
		author,
		year,
		isComplete
	}
}


function makeBuku(bukuObject) {
	tipeSimpan = '';
	const textTitle = document.createElement('h2');
	textTitle.innerText = bukuObject.title;
 
	const textPenulis = document.createElement('p');
	textPenulis.innerText = `Penulis: ${bukuObject.author}`;

	const textTahun = document.createElement('p');
	textTahun.innerText = `Tahun: ${bukuObject.year}`;

	const textContainer = document.createElement('div');
	textContainer.classList.add('inner');
	textContainer.append(textTitle, textPenulis, textTahun);
 
	const container = document.createElement('div');
	container.classList.add('item', 'shadow');
	container.append(textContainer);
	container.setAttribute('id', `buku-${bukuObject.id}`);
    
	if (bukuObject.isComplete) {
		const belumBacaButton = document.createElement('button');
		belumBacaButton.innerText = "Belum Baca";
		belumBacaButton.classList.add('blmbaca-button');
  
		belumBacaButton.addEventListener('click', function () {
			bukuBelumDibaca(bukuObject.id);
		});
 
		const hapusBukuButton = document.createElement('button');
		hapusBukuButton.innerText = "Hapus Buku";
		hapusBukuButton.classList.add('hapusbuku-button');
 
		hapusBukuButton.addEventListener('click', function () {
			hapusBuku(bukuObject.id);
		});
 
		container.append(belumBacaButton, hapusBukuButton);
	}
	else {
		const selesaiBacaButton = document.createElement('button');
		selesaiBacaButton.innerText = "Selesai dibaca";
		selesaiBacaButton.classList.add('sudahbaca-button');
    
		selesaiBacaButton.addEventListener('click', function () {
			addBukuSudahDibaca(bukuObject.id);
		});
    
		const hapusBukuButton = document.createElement('button');
		hapusBukuButton.innerText = "Hapus Buku";
		hapusBukuButton.classList.add('hapusbuku-button');
 
		hapusBukuButton.addEventListener('click', function () {
			hapusBuku(bukuObject.id);
		});

		container.append(selesaiBacaButton, hapusBukuButton);
	}
    
	return container;
}

function addBukuSudahDibaca(bukuId) {
	const bukuTarget = cariBuku(bukuId);
 
	if (bukuTarget == null) return;
 
	bukuTarget.isComplete = true;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}

function cariBuku(bukuId) {
	for (const bukuItem of bukus) {
		if (bukuItem.id === bukuId) {
			return bukuItem;
		}
	}
	return null;
}


function cariIndexBuku(bukuId) {
	for (const index in bukus) {
		if (bukus[index].id === bukuId) {
			return index;
		}
	}
 
	return -1;
}

function hapusBuku(bukuId) {

	let yakinHapus = confirm('Ingin Menghapus Buku?');
	if (yakinHapus == true) {
		tipeSimpan = 'HAPUS';
		const bukuTarget = cariIndexBuku(bukuId);
 
		if (bukuTarget === -1) return;
 
		bukus.splice(bukuTarget, 1);
		document.dispatchEvent(new Event(RENDER_EVENT));
		saveData();
	}	
}
 
 
function bukuBelumDibaca(bukuId) {
	const bukuTarget = cariBuku(bukuId);
 
	if (bukuTarget == null) return;
 
	bukuTarget.isComplete = false;
	document.dispatchEvent(new Event(RENDER_EVENT));
	saveData();
}


function saveData() {
	if (isStorageExist()) {
		const parsed = JSON.stringify(bukus);
		localStorage.setItem(STORAGE_KEY, parsed);
		document.dispatchEvent(new Event(SAVED_EVENT));
	}
}

function isStorageExist() {
	if (typeof (Storage) === undefined) {
		alert('Browser kamu tidak mendukung local storage!!!');
		return false;
	}
	return true;
}


function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	let data = JSON.parse(serializedData);
 
	if (data !== null) {
		for (const buku of data) {
			bukus.push(buku);
		}
	}
 
	document.dispatchEvent(new Event(RENDER_EVENT));
}


