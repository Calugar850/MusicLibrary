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
    public class AlbumController : ControllerBase
    {
        private AlbumServices albumServices;

        public AlbumController(AlbumServices albumServices)
        {
            this.albumServices = albumServices;
        }

        [HttpPost]
        [Route("createAlbum")]
        public IActionResult CreateAlbum([FromBody] AlbumDTO albumDTO)
        {
            int result = albumServices.CreateAlbum(albumDTO);
            if (result != 0)
            {
                return Ok(result);
            }
            else
            {
                return StatusCode((int)HttpStatusCode.InternalServerError);
            }
        }

        [HttpGet]
        [Route("getAlbumById")]
        public IActionResult GetAlbumById(int id)
        {
            AlbumDTO result = albumServices.GetAlbumById(id);
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
        [Route("getAllAlbums")]
        public IActionResult GetAllSongs()
        {
            List<AlbumDTO> result = albumServices.GetAllAlbums();
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
        [Route("removeAlbum")]
        public IActionResult RemoveSong(int id)
        {
            bool result = albumServices.RemoveAlbum(id);
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
        [Route("updateAlbum")]
        public IActionResult UpdateSong([FromBody] AlbumDTO albumDTO)
        {
            AlbumDTO result = albumServices.UpdateAlbum(albumDTO);
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
        [Route("getAllAlbumsForArtist")]
        public IActionResult GetAllAlbumsForArtist(int artistId)
        {
            List<AlbumDTO> result = albumServices.GetAllAlbumsForArtist(artistId);
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
