using FluentValidation;

namespace Lyra.Application.Artists.Queries.GetArtist
{
    public class GetArtistQueryValidator : AbstractValidator<GetArtistQuery>
    {
        public GetArtistQueryValidator()
        {
            RuleFor(q => q.Id).GreaterThanOrEqualTo(1).WithMessage("Entity Ids are always greater or equal to 1.");
        }
    }
}