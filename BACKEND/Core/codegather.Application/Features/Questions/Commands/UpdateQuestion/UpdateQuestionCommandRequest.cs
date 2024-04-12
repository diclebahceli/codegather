using codegather.Application;
using MediatR;

namespace codegather.Application;
public class UpdateQuestionCommandRequest: IRequest<UpdateQuestionCommandResponse>
{
    public Guid Id {get; set;}
    public string Description {get; set;}
    public string TestCases {get; set;}
}
