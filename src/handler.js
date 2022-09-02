const { nanoid } = require('nanoid');
const notes = require('./notes');

//  fungsi addNoteHandler digunakan untuk menyimpan note.
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSucces = notes.filter((note) => note.id === id).length > 0;

  if (isSucces) {
    const response = h.response({
      status: 'success',
      message: 'Catatan Berhasil Ditambahkan',
      data: {
        noteid: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Catatan Gagal Ditambahkan',
  });
  response.code(500);
  return response;
};

// fungsi getAllNotesHandle digunakan untuk menampilkan seluruh notes yang sudah di simpan.
const getAllNotesHandler = () => ({
  status: 'success',
  data: {
    notes,
  },
});

//  fungsi getNoteByIdHandler digunakan untuk memmbaca note dengan id spesifik.
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    massage: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
};

// fungsi editNoteByIdHandler digunakan untuk melakukan edit pada note dengan id spesifik.
const editNotByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  // merubah isi dalam note
  // jika id ditemukan akan mereturn object array di index. jika tidak akan mengembalikan nilai -1
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      massage: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Catatan gagal diperbarui, id tidak ditemukan',
  });
  response.data(404);
  return response;
};

// fungsi handler untuk menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'succes',
      massage: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    massage: 'Catatan gagal di hapus, Id tidak di temukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNotByIdHandler,
  deleteNoteByIdHandler,
};