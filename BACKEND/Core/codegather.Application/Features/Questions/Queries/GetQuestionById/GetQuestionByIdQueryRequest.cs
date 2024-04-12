using MediatR;

namespace codegather.Application;
public class GetQuestionByIdQueryRequest: IRequest<GetQuestionByIdQueryResponse>
{
    public int Id { get; set; }
}
