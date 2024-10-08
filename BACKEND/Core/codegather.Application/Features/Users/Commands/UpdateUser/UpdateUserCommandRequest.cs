﻿using MediatR;
using Microsoft.AspNetCore.Http;

namespace codegather.Application;

public class UpdateUserCommandRequest : IRequest<Unit>
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string? ProfileImage { get; set; }
}
