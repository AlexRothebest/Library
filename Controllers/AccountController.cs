using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

using Kursach.Models;


namespace Kursach.Controllers
{
    [ApiController]
    public class AccountController : Controller
    {
        SignInManager<User> _signInManager;
        UserManager<User> _userManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signManager)
        {
            _signInManager = signManager;
            _userManager = userManager;
        }


        //[Route("api/registration")]
        //[HttpPost]
        //public async Task<IActionResult> RegisterUser([FromBody] User newUser)
        //{
        //    return Json(new {
        //        success = true
        //    });
        //}
    }
}