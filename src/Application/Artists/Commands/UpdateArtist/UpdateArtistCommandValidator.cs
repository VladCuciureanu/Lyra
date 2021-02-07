using FluentValidation;

namespace Lyra.Application.Artists.Commands.UpdateArtist
{
    public class UpdateArtistCommandValidator : AbstractValidator<UpdateArtistCommand>
    {
        public UpdateArtistCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

            RuleFor(v => v.Popularity)
                .InclusiveBetween(0, 100).WithMessage("Popularity must be in [0, 100] interval.");
        }
    }
}