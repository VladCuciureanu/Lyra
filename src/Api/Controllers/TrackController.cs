using System.Collections.Generic;
using System.Threading.Tasks;
using Lyra.Application.Common.Security;
using Lyra.Application.Tracks;
using Lyra.Application.Tracks.Commands.DeleteTrack;
using Lyra.Application.Tracks.Queries.GetMultipleTracks;
using Lyra.Application.Tracks.Queries.GetTrack;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class TrackController : ApiControllerBase
    {
        [HttpGet("{id}")]
        public async Task<ActionResult<TrackDto>> GetTrack(int id)
        {
            var query = new GetTrackQuery
            {
                Id = id
            };

            var result = await Mediator.Send(query);

            if (result == null)
                return NotFound();
            return result;
        }

        [HttpGet]
        public async Task<ActionResult<List<TrackDto>>> GetMultipleTracks([FromQuery] GetMultipleTracksQuery query)
        {
            return await Mediator.Send(query);
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTrack(int id)
        {
            await Mediator.Send(new DeleteTrackCommand {Id = id});

            return Ok();
        }
    }
}