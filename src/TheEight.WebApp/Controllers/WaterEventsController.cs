﻿using System;
using Microsoft.AspNetCore.Mvc;
using TheEight.WebApp.Models.Shared;

namespace TheEight.WebApp.Controllers
{
    [Route("water-events")]
    public class WaterEventsController : Controller
    {
        [HttpGet("")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("boat-lineups/{id:guid?}")]
        public IActionResult BoatLineups(Guid id = new Guid())
        {
            var reactVM = new ReactVM
            {
                ComponentName = "BoatLineupPlanner",
                FileName = "boat-lineup-planner",
                Props = new { x = 1, y = 2 }
            };

            return View("React", reactVM);
        }
    }
}