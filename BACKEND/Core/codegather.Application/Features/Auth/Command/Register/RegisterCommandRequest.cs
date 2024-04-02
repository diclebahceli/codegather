﻿using MediatR;

namespace codegather.Application;

public class RegisterCommandRequest : IRequest<Unit>
{
    public string Email { get; set; }
    public string Password { get; set; }
    public string ConfirmedPassword { get; set; }

}