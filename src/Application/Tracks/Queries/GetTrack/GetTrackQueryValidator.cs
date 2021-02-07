using FluentValidation;

namespace Lyra.Application.Tracks.Queries.GetTrack
{
    public class GetTrackQueryValidator : AbstractValidator<GetTrackQuery>
    {
        public GetTrackQueryValidator()
        {
            RuleFor(q => q.Id).GreaterThanOrEqualTo(1).WithMessage("Entity Ids are always greater or equal to 1.");
        }
    }
}