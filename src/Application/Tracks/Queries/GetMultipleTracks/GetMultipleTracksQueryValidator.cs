using FluentValidation;

namespace Lyra.Application.Tracks.Queries.GetMultipleTracks
{
    public class GetMultipleTracksQueryValidator : AbstractValidator<GetMultipleTracksQuery>
    {
        public GetMultipleTracksQueryValidator()
        {
            RuleFor(e => e.Ids).Must(q => q.Count <= 50)
                .WithMessage("Upper limit of fetches in one query is of 50 artists.");
        }
    }
}