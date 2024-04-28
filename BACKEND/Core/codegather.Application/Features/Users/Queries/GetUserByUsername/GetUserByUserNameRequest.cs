using MediatR;

namespace codegather.Application 
{
    public class GetUserByUserNameRequest : IRequest<GetUserByUsernameResponse>
    {
        public string UserName { get; set; }
    }
    
}
