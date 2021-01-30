using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Domain.Entities;

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