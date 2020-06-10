using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

using Kursach.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Kursach.Controllers
{
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDBContext _db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BookController(ApplicationDBContext db, IWebHostEnvironment webHostEnvironment)
        {
            _db = db;
            _webHostEnvironment = webHostEnvironment;
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
        public async Task<IActionResult> GetBook(string Id)
        {
            return Json(new {
                book = await _db.Book.FindAsync(Id)
            });
        }


        [Route("api/books/create")]
        [HttpPost]
        public IActionResult CreateBook([FromForm] string name,
                                        [FromForm] string author,
                                        [FromForm] IFormFile bookFile)
        {
            Book NewBook = new Book(name, author);

            string FileName = NewBook.Id + "_" + name + ".pdf";
            string FilePath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "BookCatalog", FileName);
            bookFile.CopyTo(new FileStream(FilePath, FileMode.Create));

            NewBook.FileName = FileName;
            NewBook.FilePath = FilePath;

            _db.Book.Add(NewBook);
            _db.SaveChanges();

            return Json(new {
                success = true
            });
        }

        /*
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
        */

        [Route("api/books/edit")]
        [HttpPost]
        public async Task<IActionResult> EditBook(JsonElement Data)
        {
            Book BookToEdit = await _db.Book.FindAsync(Data.GetProperty("id").GetString());

            BookToEdit.Name = Data.GetProperty("name").GetString();
            BookToEdit.Author = Data.GetProperty("author").GetString();

            await _db.SaveChangesAsync();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/delete")]
        [HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();

            Console.WriteLine(Id);

            Book BookToDelete = _db.Book.Find(Id);
            _db.Book.Remove(BookToDelete);
            _db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }
    }
}