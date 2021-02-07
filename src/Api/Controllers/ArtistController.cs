using System.Collections.Generic;
using System.Threading.Tasks;
using Lyra.Application.Artists;
using Lyra.Application.Artists.Commands.CreateArtist;
using Lyra.Application.Artists.Commands.DeleteArtist;
using Lyra.Application.Artists.Queries.GetArtist;
using Lyra.Application.Artists.Queries.GetMultipleArtists;
using Lyra.Application.Common.Security;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class ArtistController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> CreateArtist(CreateArtistCommand command)
        {
            return await Mediator.Send(command);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistDto>> GetArtist(int id)
        {
            var query = new GetArtistQuery
            {
                Id = id
            };

            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound();
            return result;
        }

        [HttpGet]
        public async Task<ActionResult<List<ArtistDto>>> GetMultipleArtists([FromQuery] GetMultipleArtistsQuery query)
        {
            return await Mediator.Send(query);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteArtist(int id)
        {
            await Mediator.Send(new DeleteArtistCommand {Id = id});

            return Ok();
        }
    }
}