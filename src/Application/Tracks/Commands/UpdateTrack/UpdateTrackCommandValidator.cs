using System;
using FluentValidation;
using Lyra.Application.Tracks.Commands.UpdateTrack;

namespace Lyra.Application.Artists.Commands.UpdateArtist
{
    public class UpdateTrackCommandValidator : AbstractValidator<UpdateTrackCommand>
    {
        public UpdateTrackCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.");

            RuleFor(v => v.DurationMs)
                .GreaterThanOrEqualTo(0).WithMessage("Track duration must be >= 0.");

            RuleFor(v => v.TrackNumber)
                .GreaterThan(0).WithMessage("Track number must be a positive integer.");

            RuleFor(v => v.DiscNumber)
                .GreaterThan(0).WithMessage("Track disc number must be a positive integer.");

            RuleFor(v => v.Popularity)
                .InclusiveBetween(0, 100).WithMessage("Popularity must be in [0, 100] interval.");
        }
    }
}