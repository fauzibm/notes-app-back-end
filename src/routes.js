const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotByIdHandler,
  deleteNoteByIdHandler,
} = require('./handler');

const routes = [
  {
    // route ini digunakan untuk menyimpan notes
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
  },
  {
    // route ini digunanakn untuk menampilkan seluruh catatan
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    // rout ini digunakan untuk membuka note yang sudah ada
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    // route ini digunakan untuk merubah catatan yang sudah ada
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNotByIdHandler,
  },
  {
    // route ini digunakan untuk menghapus catatan
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;
