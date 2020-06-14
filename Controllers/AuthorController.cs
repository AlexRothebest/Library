using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Kursach.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Kursach.Controllers
{
    [ApiController]
    public class AuthorController : Controller
    {
        private readonly ApplicationDBContext db;

        public AuthorController(ApplicationDBContext db)
        {
            this.db = db;
        }


        [Route("api/authors"), HttpPost]
        public async Task<IActionResult> GetAuthors()
        {
            return Json(new
            {
                authors = await db.Authors.ToListAsync()
            });
        }

        [Route("api/authors/get"), HttpPost]
        public IActionResult GetAuthor(JsonElement Data)
        {
            string AuthorId = Data.GetProperty("authorId").GetString();

            Author AuthorFromDB = db.Authors.Find(AuthorId);

            return Json(new
            {
                author = AuthorFromDB
            });
        }

        [Route("api/authors/get-books"), HttpPost]
        public IActionResult GetAuthorBooks(JsonElement Data)
        {
            string AuthorId = Data.GetProperty("authorId").GetString();

            List<Book> Books = db.AuthorBooks
                .Where(cb => cb.AuthorId == AuthorId)
                .Select(cb => cb.Book).ToList();

            return Json(new
            {
                books = Books
            });
        }

        [Route("api/authors/create"), HttpPost]
        public IActionResult CreateAuthor(JsonElement Data)
        {
            string Name = Data.GetProperty("name").GetString();

            Author NewAuthor = new Author
            {
                Name = Name
            };

            db.Authors.Add(NewAuthor);
            db.SaveChanges();

            return Json(new
            {
                success = true,
                authorId = NewAuthor.Id
            });
        }

        [Route("api/authors/edit"), HttpPost]
        public async Task<IActionResult> EditAuthor(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();
            string NewName = Data.GetProperty("name").GetString();

            Author AuthorToEdit = await db.Authors.FindAsync(Id);
            AuthorToEdit.Name = NewName;
            await db.SaveChangesAsync();

            return Json(new
            {
                success = true
            });
        }

        [Route("api/authors/delete"), HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();

            Author AuthorToDelete = db.Authors.Find(Id);
            db.Authors.Remove(AuthorToDelete);
            db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }
    }
}