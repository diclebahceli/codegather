using codegather.Domain;

namespace codegather.Application
{
    public class TestCaseRules: BaseRules
    {
        public Task CannotEditTestCaseAfterMadePublic(Competition comp){
            if(comp.IsPublic)
                throw new Exception("Competition already started");

            return Task.CompletedTask;
        }

    }
}
