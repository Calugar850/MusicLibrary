using Backend_component.DTOS;
using Backend_component.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Backend_component.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistController : ControllerBase
    {
        private ArtistServices artistServices;

        public ArtistController(ArtistServices artistServices)
        {
            this.artistServices = artistServices;
        }

        [HttpPost]
        [Route("createArtist")]
        public IActionResult CreateArtist([FromBody] ArtistDTO artistDTO)
        {
            int result = artistServices.CreateArtist(artistDTO);
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
        [Route("getArtistById")]
        public IActionResult GetArtistById(int id)
        {
            ArtistDTO result = artistServices.GetArtistById(id);
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
        [Route("getAllArtists")]
        public IActionResult GetAllArtists()
        {
            List<ArtistDTO> result = artistServices.GetAllArtists();
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
        [Route("removeArtist")]
        public IActionResult RemoveArtist([FromQuery] int id)
        {
            bool result = artistServices.RemoveArtist(id);
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
        [Route("updateArtist")]
        public IActionResult UpdateArtist([FromBody] ArtistDTO artistDTO)
        {
            ArtistDTO result = artistServices.UpdateArtist(artistDTO);
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
