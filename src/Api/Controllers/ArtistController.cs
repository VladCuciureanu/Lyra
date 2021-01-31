using System.Threading.Tasks;
using Lyra.Application.Artists;
using Lyra.Application.Artists.Queries.GetArtist;
using Lyra.Application.Common.Security;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class ArtistController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<ArtistDto>> GetArtist(int id)
        {
            var query = new GetArtistQuery()
            {
                Id = id
            };

            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound();
            else
                return result;
        }
    }
}