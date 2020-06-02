using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Kursach.Models;

namespace Kursach.Controllers
{
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDBContext _db;

        public BookController(ApplicationDBContext db)
        {
            _db = db;
        }

        [Route("api/books")]
        [HttpPost]
        public async Task<IActionResult> GetBooks()
        {
            return Json(new {
                books = await _db.Book.ToListAsync()
            });
        }

        [Route("api/books/{Id}")]
        [HttpPost]
        public async Task<IActionResult> GetBook(int Id)
        {
            return Json(new {
                book = await _db.Book.FindAsync(Id)
            });
        }


/*
        [Route("api/books/create")]
        [HttpPost]
        public IActionResult CreateBook(JsonElement Data)
        {
            string Name = Data.GetProperty("name").GetString();
            string Author = Data.GetProperty("author").GetString();

            Book NewBook = new Book(Name, Author);

            _db.Book.Add(NewBook);
            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }
*/


        [Route("api/books/create")]
        [HttpPost]
        public async Task<IActionResult> CreateBook(Book BookObj)
        {
            await _db.Book.AddAsync(BookObj);
            await _db.SaveChangesAsync();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/delete")]
        [HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            int Id = Data.GetProperty("id").GetInt32();

            Console.WriteLine(Id);

            Book BookToDelete = _db.Book.Find(Id);
            _db.Book.Remove(BookToDelete);
            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/edit")]
        [HttpPost]
        public async Task<IActionResult> EditBook(Book EditedBook)
        {
            Book BookToEdit = await _db.Book.FindAsync(EditedBook.Id);

            BookToEdit.Name = EditedBook.Name;
            BookToEdit.Author = EditedBook.Author;

            await _db.SaveChangesAsync();

            return Json(new {
                success = true
            });
        }
    }
}