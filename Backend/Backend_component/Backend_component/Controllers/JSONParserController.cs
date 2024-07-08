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
    public class JSONParserController : ControllerBase
    {
        private JsonParserServices jsonParserServices;

        public JSONParserController(JsonParserServices jsonParserServices)
        {
            this.jsonParserServices = jsonParserServices;
        }

        [HttpPost]
        [Route("parseJsonFile")]
        public IActionResult ParseJsonFile([FromBody] JsonParserDTO pathToFile)
        {
            bool result = jsonParserServices.ParseJsonFile(pathToFile);
            if (result)
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
