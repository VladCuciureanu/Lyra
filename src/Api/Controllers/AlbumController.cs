using System.Threading.Tasks;
using Lyra.Application.Albums;
using Lyra.Application.Albums.Queries.GetAlbum;
using Lyra.Application.Artists;
using Lyra.Application.Common.Security;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class AlbumController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumDto>> GetAlbum(int id)
        {
            var query = new GetAlbumQuery()
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