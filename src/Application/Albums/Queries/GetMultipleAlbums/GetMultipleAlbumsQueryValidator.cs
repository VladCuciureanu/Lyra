using FluentValidation;

namespace Lyra.Application.Albums.Queries.GetMultipleAlbums
{
    public class GetMultipleAlbumsQueryValidator : AbstractValidator<GetMultipleAlbumsQuery>
    {
        public GetMultipleAlbumsQueryValidator()
        {
            RuleFor(e => e.Ids).Must(q => q.Count <= 50)
                .WithMessage("Upper limit of fetches in one query is of 50 albums.");
        }
    }
}