
using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(opt =>{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors(opt  => {
  opt.AddPolicy("CorsPolicy", policy => {
      policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
  });
});

builder.Services.AddMediatR(typeof(List.Handler).Assembly);
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
//HouseKeeping   ./Extensions/ApplicationServiceExtensions.cs
//builder.Services.AddApplicationServices(_config);

var app = builder.Build();



app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

//CreateDatabase
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try{
  var context = services.GetRequiredService<DataContext>();
  await context.Database.MigrateAsync();
  await Seed.SeedData(context);
} 
catch(Exception ex){
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex , "Il y à eu une erreur pendant la migration");
}
// End CreateDataBase


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()){
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.Run();
