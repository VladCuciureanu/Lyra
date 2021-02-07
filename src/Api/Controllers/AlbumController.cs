using System.Collections.Generic;
using System.Threading.Tasks;
using Lyra.Application.Albums;
using Lyra.Application.Albums.Commands.CreateAlbum;
using Lyra.Application.Albums.Commands.DeleteAlbum;
using Lyra.Application.Albums.Queries.GetAlbum;
using Lyra.Application.Albums.Queries.GetMultipleAlbums;
using Lyra.Application.Common.Security;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class AlbumController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> CreateAlbum(CreateAlbumCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumDto>> GetAlbum(int id)
        {
            var query = new GetAlbumQuery
            {
                Id = id
            };

            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound();
            return result;
        }

        [HttpGet]
        public async Task<ActionResult<List<AlbumDto>>> GetMultipleAlbums([FromQuery] GetMultipleAlbumsQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAlbum(int id)
        {
            await Mediator.Send(new DeleteAlbumCommand {Id = id});

            return Ok();
        }
    }
}