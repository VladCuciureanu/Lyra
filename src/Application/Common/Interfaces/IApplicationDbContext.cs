using System.Threading;
using System.Threading.Tasks;
using Lyra.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        DbSet<Artist> Artists { get; set; }

        DbSet<Album> Albums { get; set; }

        DbSet<Track> Tracks { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}