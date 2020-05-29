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
        [HttpGet]
        public IActionResult GetBooks()
        {
            return Json(new {
                books = _db.Book.ToList()
            });
        }

        [Route("api/books/{Id}")]
        [HttpGet]
        public IActionResult GetBook(int Id)
        {
            return Json(new {
                book = _db.Book.Find(Id)
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
        public IActionResult CreateBook(Book BookObj)
        {
            _db.Book.Add(BookObj);
            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/delete")]
        [HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            int Id = Data.GetProperty("id").GetInt32();

            Book BookToDelete = _db.Book.Find(Id);
            _db.Book.Remove(BookToDelete);
            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/edit")]
        [HttpPost]
        public IActionResult EditBook(Book EditedBook)
        {
            Book BookToEdit = _db.Book.Find(EditedBook.Id);

            BookToEdit.Name = EditedBook.Name;
            BookToEdit.Author = EditedBook.Author;

            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }
    }
}