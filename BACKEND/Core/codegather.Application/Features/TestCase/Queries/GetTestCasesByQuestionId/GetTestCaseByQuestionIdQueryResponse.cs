using codegather.Domain;

namespace codegather.Application;

public class GetTestCaseByQuestionIdQueryResponse
{
    public ICollection<TestCase> TestCases { get; set; }
}
