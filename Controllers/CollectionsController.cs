using System;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Kursach.Models;
using System.Data.SqlTypes;

namespace Kursach.Controllers
{
    [ApiController]
    public class CollectionsController : Controller
    {
        private readonly ApplicationDBContext db;

        public CollectionsController(ApplicationDBContext db)
        {
            this.db = db;
        }


        [Route("api/collections"), HttpPost]
        public async Task<IActionResult> GetCollections()
        {
            return Json(new
            {
                collections = await db.Collections.ToListAsync()
            });
        }

        [Route("api/collections/get"), HttpPost]
        public IActionResult GetCollection(JsonElement Data)
        {
            string CollectionId = Data.GetProperty("collectionId").GetString();

            Collection CollectionFromDB = db.Collections.Find(CollectionId);

            return Json(new
            {
                collection = CollectionFromDB
            });
        }

        [Route("api/collections/get-books"), HttpPost]
        public IActionResult GetCollectionBooks(JsonElement Data)
        {
            string CollectionId = Data.GetProperty("collectionId").GetString();

            List<Book> Books = db.CollectionBooks
                .Where(cb => cb.CollectionId == CollectionId)
                .Select(cb => cb.Book).ToList();

            return Json(new {
                books = Books
            });
        }

        [Route("api/collections/create"), HttpPost]
        public IActionResult CreateCollection(JsonElement Data)
        {
            string Name = Data.GetProperty("name").GetString();

            Collection NewCollection = new Collection(Name);

            db.Collections.Add(NewCollection);
            db.SaveChanges();

            return Json(new
            {
                success = true,
                collectionId = NewCollection.Id
            });
        }

        [Route("api/collections/edit"), HttpPost]
        public async Task<IActionResult> EditCollection(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();
            string NewName = Data.GetProperty("name").GetString();

            Collection CollectionToEdit = await db.Collections.FindAsync(Id);
            CollectionToEdit.Name = NewName;
            await db.SaveChangesAsync();

            return Json(new
            {
                success = true
            });
        }

        [Route("api/collections/add-book"), HttpPost]
        public IActionResult AddBook(JsonElement Data)
        {
            string CollectionId = Data.GetProperty("collectionId").GetString();
            string BookId = Data.GetProperty("bookId").GetString();

            //Collection CollectionToAppend = db.Collections.Find(CollectionId);
            //Book BookToAdd = db.Books.Find(BookId);

            CollectionBook NewCollectionBook = new CollectionBook
            {
                CollectionId = CollectionId,
                BookId = BookId
            };

            //CollectionToAppend.CollectionBooks.Add(NewCollectionBook);
            //db.SaveChanges();
            //BookToAdd.CollectionBooks.Add(NewCollectionBook);
            //db.SaveChanges();

            //Console.WriteLine(CollectionToAppend.CollectionBooks.Count);

            //db.Collections.Remove(CollectionToAppend);
            //db.Collections.Add(CollectionToAppend);
            //db.Books.Remove(BookToAdd);
            //db.Books.Add(BookToAdd);
            db.CollectionBooks.Add(NewCollectionBook);
            db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }

        [Route("api/collections/remove-book"), HttpPost]
        public IActionResult RemoveBook(JsonElement Data)
        {
            string CollectionId = Data.GetProperty("collectionId").GetString();
            string BookId = Data.GetProperty("bookId").GetString();

            CollectionBook CollectionBookToRemove = db.CollectionBooks
                .FirstOrDefault(cb => cb.CollectionId == CollectionId && cb.BookId == BookId);

            db.CollectionBooks.Remove(CollectionBookToRemove);
            db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }

        [Route("api/collections/delete"), HttpPost]
        public IActionResult DeleteBook(JsonElement Data)
        {
            string Id = Data.GetProperty("id").GetString();

            Collection CollectionToDelete = db.Collections.Find(Id);
            db.Collections.Remove(CollectionToDelete);
            db.SaveChanges();

            return Json(new
            {
                success = true
            });
        }
    }
}