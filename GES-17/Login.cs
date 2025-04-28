using System;

[HttpPost("login")]
public IActionResult Login([FromBody] LoginRequest request)
{
    // Simulamos una base de usuarios
    var users = new List<LoginRequest>
    {
        new LoginRequest { Username = "admin", Password = "admin123" },
        new LoginRequest { Username = "operario", Password = "operario123" }
    };

    var user = users.FirstOrDefault(u => u.Username == request.Username && u.Password == request.Password);

    if (user != null)
    {
        return Ok(new { message = "Login exitoso!" });
    }
    else
    {
        return Unauthorized(new { message = "Credenciales inválidas." });
    }
}

}
