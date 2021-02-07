using FluentValidation;
using Lyra.Domain.Enums;

namespace Lyra.Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommandValidator : AbstractValidator<CreateAlbumCommand>
    {
        public CreateAlbumCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.")
                .NotEmpty().WithMessage("Name is required.");
            
            RuleFor(v => v.AlbumType)
                .IsInEnum().WithMessage("Invalid album type.")
                .NotNull().WithMessage("Album type is required.");
        }
    }
}