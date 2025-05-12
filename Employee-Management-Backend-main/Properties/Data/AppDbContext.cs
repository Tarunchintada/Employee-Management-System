using EmployeeManagement.Properties.NewFolder2;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagement.Properties.Data
{
    public class AppDbContext : DbContext 
    {

        public DbSet<Employee> Employees { get; set; } 
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) 
        { }


        
    }
}
