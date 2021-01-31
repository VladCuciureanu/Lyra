using FluentValidation;

namespace Lyra.Application.Artists.Queries.GetMultipleArtists
{
    public class GetMultipleArtistsQueryValidator : AbstractValidator<GetMultipleArtistsQuery>
    {
        public GetMultipleArtistsQueryValidator()
        {
            RuleFor(e => e.Ids).Must(q => q.Count <= 50).WithMessage("Upper limit of fetches in one query is of 50 artists.");
        }
    }
}