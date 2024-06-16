using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using api.Dto;

namespace api.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoadImageController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public LoadImageController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpPost]
        public async Task<string> Post([FromForm] LoadImageDto load)
        {
            try
            {
                if (load.image.Length > 0)
                {
                    string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }

                    string filePath = Path.Combine(uploadsFolder, load.image.FileName);

                    using (FileStream fileStream = System.IO.File.Create(filePath))
                    {
                        await load.image.CopyToAsync(fileStream);
                        await fileStream.FlushAsync();
                        return "Upload done.";
                    }
                }
                else
                {
                    return "Failed";
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        [HttpGet("{FileName}")]
        public async Task<IActionResult> Get([FromRoute] string FileName)
        {
            if (string.IsNullOrEmpty(FileName))
            {
                return BadRequest("FileName cannot be null or empty.");
            }

            if (string.IsNullOrEmpty(_webHostEnvironment.WebRootPath))
            {
                return StatusCode(500, "Web root path is not configured.");
            }

            string uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads");
            string filePath = Path.Combine(uploadsFolder, FileName);

            if (System.IO.File.Exists(filePath))
            {
                byte[] fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                return File(fileBytes, "image/png");
            }

            return NotFound();
        }
    }
}