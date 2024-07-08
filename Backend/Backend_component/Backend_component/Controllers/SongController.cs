using Backend_component.Services;
using Backend_component.DTOS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;

namespace Backend_component.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SongController : ControllerBase
    {
        private SongServices songServices;

        public SongController(SongServices songServices)
        {
            this.songServices = songServices;
        }

        [HttpPost]
        [Route("createsong")]
        public IActionResult CreateSong([FromBody] SongDTO songDto)
        {
            int result = songServices.CreateSong(songDto);
            if(result != 0)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("getSongById")]
        public IActionResult GetSongById(int id)
        {
            SongDTO result = songServices.GetSongById(id);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("getAllSongs")]
        public IActionResult GetAllSongs()
        {
            List<SongDTO> result = songServices.GetAllSongs();
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpDelete]
        [Route("removeSong")]
        public IActionResult RemoveSong(int id)
        {
            bool result = songServices.RemoveSong(id);
            if (result)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpPut]
        [Route("updateSong")]
        public IActionResult UpdateSong([FromBody] SongDTO songDTO)
        {
            SongDTO result = songServices.UpdateSong(songDTO);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("getAllSongsForAlbum")]
        public IActionResult GetAllSongsForAlbum(int albumId)
        {
            List<SongDTO> result = songServices.GetAllSongsForAlbum(albumId);
            if (result != null)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }
    }
}
