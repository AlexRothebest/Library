using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace Kursach.Models
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CollectionBook>()
                .HasKey(cb => new { cb.CollectionId, cb.BookId });

            modelBuilder.Entity<AuthorBook>()
                .HasKey(ab => new { ab.AuthorId, ab.BookId });

            //modelBuilder.Entity<CollectionBook>()
            //    .HasOne(x => x.Book)
            //    .WithMany(x => x.CollectionBooks)
            //    .HasForeignKey(x => x.BookId);

            //modelBuilder.Entity<CollectionBook>()
            //   .HasOne(x => x.Collection)
            //   .WithMany(x => x.CollectionBooks)
            //   .HasForeignKey(x => x.CollectionId);

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Book> Books { get; set; }

        public DbSet<Collection> Collections { get; set; }
        public DbSet<CollectionBook> CollectionBooks { get; set; }

        public DbSet<Author> Authors { get; set; }
        public DbSet<AuthorBook> AuthorBooks { get; set; }
    }
}