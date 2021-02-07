using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Lyra.Api.Extensions
{
    public static class SwaggerConfiguration
    {
        public static IServiceCollection ConfigureSwagger(this IServiceCollection services)
        {
            return services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Lyra ",
                    Description = "API specs for the self-hosted music streaming application.",
                    Contact =
                        new OpenApiContact
                        {
                            Email = "vlad.c.cuciureanu@gmail.com",
                            Name = "Vlad Cuciureanu",
                            Url = new Uri("https://github.com/VladCuciureanu")
                        }
                });
            });
        }

        public static IApplicationBuilder UseSwaggerAndUi(this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(o => o.SwaggerEndpoint("/swagger/v1/swagger.json", "Lyra API v1"));
            return app;
        }
    }
}