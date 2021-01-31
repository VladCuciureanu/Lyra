using FluentValidation;

namespace Lyra.Application.Albums.Queries.GetAlbum
{
    public class GetAlbumQueryValidator : AbstractValidator<GetAlbumQuery>
    {
        public GetAlbumQueryValidator()
        {
            RuleFor(q => q.Id).GreaterThanOrEqualTo(1).WithMessage("Entity Ids are always greater or equal to 1.");
        }
    }
}