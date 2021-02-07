using FluentValidation;

namespace Lyra.Application.Tracks.Commands.CreateTrack
{
    public class CreateTrackCommandValidator : AbstractValidator<CreateTrackCommand>
    {
        public CreateTrackCommandValidator()
        {
            RuleFor(v => v.Name)
                .MaximumLength(200).WithMessage("Name must not exceed 200 characters.")
                .NotEmpty().WithMessage("Name is required.");
            
            RuleFor(v => v.Explicit)
                .NotNull().WithMessage("Explicit flag is required.");
            
            RuleFor(v => v.DurationMs)
                .GreaterThanOrEqualTo(0).WithMessage("Track duration must be >= 0.")
                .NotEmpty().WithMessage("Track duration in ms is required.");
            
            RuleFor(v => v.DataPath)
                .NotEmpty().WithMessage("Track data path is required.");

            RuleFor(v => v.TrackNumber)
                .GreaterThan(0).WithMessage("Track number must be a positive integer.")
                .NotNull().WithMessage("Track number is required.");
            
            RuleFor(v => v.DiscNumber)
                .GreaterThan(0).WithMessage("Track disc number must be a positive integer.")
                .NotNull().WithMessage("Track disc number is required.");
        }
    }
}