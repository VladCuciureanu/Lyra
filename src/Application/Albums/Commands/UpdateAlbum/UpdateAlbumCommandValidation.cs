using System;
using FluentValidation;
using Lyra.Application.Albums.Commands.UpdateAlbum;

namespace Lyra.Application.Artists.Commands.UpdateArtist
{
    public class UpdateAlbumCommandValidator : AbstractValidator<UpdateAlbumCommand>
    {
        public UpdateAlbumCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

            RuleFor(v => v.AlbumType)
                .IsInEnum().WithMessage("Invalid album type.");

            RuleFor(v => v.Popularity)
                .InclusiveBetween(0, 100).WithMessage("Popularity must be in [0, 100] interval.");
        }
    }
}