﻿using Microsoft.AspNetCore.Mvc;

namespace TheEight.WebApp.Controllers
{
    [Route("")]
    public class HomeController : Controller
    {
        public IActionResult Index()
        { 
            return View();
        }
    }
}