using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Kursach.Models;

namespace Kursach.Controllers
{
    [ApiController]
    public class BookController : Controller
    {
        private readonly ApplicationDBContext db;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BookController(ApplicationDBContext db, IWebHostEnvironment webHostEnvironment)
        {
            this.db = db;
            _webHostEnvironment = webHostEnvironment;
        }


        [Route("api/books")]
        [HttpPost]
        public async Task<IActionResult> GetBooks()
        {
            return Json(new
            {
                books = await db.Books.ToListAsync()
            });
        }

        [Route("api/books/{Id}")]
        [HttpPost]
        public async Task<IActionResult> GetBook(string Id)
        {
            return Json(new {
                book = await db.Books.FindAsync(Id)
            });
        }

        [Route("api/books/create")]
        [HttpPost]
        public IActionResult CreateBook([FromForm] string name,
                                        [FromForm] string authorName,
                                        [FromForm] IFormFile bookFile)
        {
            Author author;
            List<Author> AuthorsWithSameName = db.Authors.Where(author => author.Name == authorName).ToList();
            if (AuthorsWithSameName.Count == 0)
            {
                author = new Author
                {
                    Name = authorName
                };
            }
            else
            {
                author = AuthorsWithSameName.FirstOrDefault();
            }

            Book NewBook = new Book
            {
                Name = name,
                Author = author
            };

            AuthorBook NewAuthorBook = new AuthorBook
            {
                Author = author,
                Book = NewBook
            };

            db.AuthorBooks.Add(NewAuthorBook);

            string FileName = NewBook.Id + "_" + name + ".pdf";
            string FilePath = Path.Combine(_webHostEnvironment.ContentRootPath, "wwwroot", "BookCatalog", FileName);
            bookFile.CopyTo(new FileStream(FilePath, FileMode.Create));

            NewBook.FileName = FileName;
            NewBook.FilePath = FilePath;

            db.Books.Add(NewBook);
            db.SaveChanges();

            return Json(new {
                success = true
            });
        }

        /*
        [Route("api/books/create")]
        [HttpPost]
        public async Task<IActionResult> CreateBook(Book BookObj)
        {
            await db.Books.AddAsync(BookObj);
            await db.SaveChangesAsync();

            return Json(new {
                success = true
            });
        }
        */

        [Route("api/books/edit")]
        [HttpPost]
        public async Task<IActionResult> EditBook(JsonElement Data)
        {
            Book BookToEdit = await db.Books.FindAsync(Data.GetProperty("id").GetString());

            BookToEdit.Name = Data.GetProperty("name").GetString();

            await db.SaveChangesAsync();

            return Json(new {
                success = true
            });
        }

        [Route("api/books/delete")]
        [HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();

            Book BookToDelete = db.Books.Find(Id);
            db.Books.Remove(BookToDelete);
            db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }
    }
}