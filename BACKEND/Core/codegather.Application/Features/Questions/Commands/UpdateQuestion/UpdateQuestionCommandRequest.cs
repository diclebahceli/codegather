using codegather.Application;
using codegather.Domain;
using MediatR;

namespace codegather.Application;
public class UpdateQuestionCommandRequest : IRequest<UpdateQuestionCommandResponse>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string StarterCode { get; set; }
}
