using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Lyra.Application.Common.Interfaces
{
    public interface IApplicationDbContext
    {
        //TODO: Add DbSets

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}