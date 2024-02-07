namespace codegather.Domain;
public class Metrics
{
    public float CompileTime { get; set; }
    public float MemoryUsage { get; set; }

    public Metrics(float compileTime, float memoryUsage)
    {
        CompileTime = compileTime;
        MemoryUsage = memoryUsage;
    }

}
