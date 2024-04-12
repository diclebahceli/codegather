using codegather.Application;
using MediatR;

namespace codegather.Application;
public class UpdateQuestionCommandRequest: IRequest<UpdateQuestionCommandResponse>
{
    public int Id {get; set;}
    public string Description {get; set;}
    public string TestCases {get; set;}
}
