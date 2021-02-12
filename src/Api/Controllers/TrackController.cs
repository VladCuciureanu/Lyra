using System.Collections.Generic;
using System.Threading.Tasks;
using Lyra.Application.Common.Security;
using Lyra.Application.Tracks;
using Lyra.Application.Tracks.Commands.CreateTrack;
using Lyra.Application.Tracks.Commands.DeleteTrack;
using Lyra.Application.Tracks.Commands.UpdateTrack;
using Lyra.Application.Tracks.Queries.GetMultipleTracks;
using Lyra.Application.Tracks.Queries.GetTrack;
using Microsoft.AspNetCore.Mvc;

namespace Lyra.Api.Controllers
{
    [Authorize]
    public class TrackController : ApiControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<int>> CreateTrack(CreateTrackCommand command)
        {
            return await Mediator.Send(command);
        }

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

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateTrack(int id, UpdateTrackCommand command)
        {
            if (id != command.Id)
            {
                return BadRequest();
            }

            await Mediator.Send(command);

            return Ok();
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTrack(int id)
        {
            await Mediator.Send(new DeleteTrackCommand {Id = id});

            return Ok();
        }
    }
}