using MediatR;

namespace codegather.Application;
public class GetQuestionByIdQueryRequest: IRequest<GetQuestionByIdQueryResponse>
{
    public Guid Id { get; set; }
}
