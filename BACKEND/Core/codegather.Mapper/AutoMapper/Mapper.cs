using AutoMapper;
using codegather.Application.Interfaces.AutoMapper;
using AutoMapper.Internal;

namespace codegather.Mapper;

public class Mapper : Application.Interfaces.AutoMapper.IMapper
{
    public static List<TypePair> typepairs = new();
    private AutoMapper.IMapper MapperContainer;
    public TDestination Map<TDestination, TSource>(TSource source, string? ignore = null)
    {
        AddConfig<TDestination, TSource>(5, ignore);
        return MapperContainer.Map<TSource, TDestination>(source);
    }

    public IList<TDestination> Map<TDestination, TSource>(IList<TSource> source, string? ignore = null)
    {
        AddConfig<TDestination, TSource>(5, ignore);
        return MapperContainer.Map<IList<TSource>, IList<TDestination>>(source);
    }

    public TDestination Map<TDestination>(object source, string? ignore = null)
    {
        AddConfig<TDestination, object>(5, ignore);
        return MapperContainer.Map<TDestination>(source);
    }

    public IList<TDestination> Map<TDestination>(IList<object> source, string? ignore = null)
    {
        AddConfig<TDestination, IList<object>>(5, ignore);
        return MapperContainer.Map<IList<TDestination>>(source);
    }



    public void AddConfig<TDestination, TSource>(int depth = 5, string? ignore = null)
    {
        var typePair = new TypePair(typeof(TSource), typeof(TDestination));

        if (typepairs.Any(a => a.DestinationType == typePair.DestinationType && a.SourceType == typePair.SourceType && ignore is null))
            return;

        typepairs.Add(typePair);

        var config = new MapperConfiguration(cfg =>
        {
            foreach (var item in typepairs)
            {
                if (ignore is not null)
                    cfg.CreateMap(item.SourceType, item.DestinationType).MaxDepth(depth).ForMember(ignore, opt => opt.Ignore()).ReverseMap();

                else
                    cfg.CreateMap(item.SourceType, item.DestinationType).MaxDepth(depth).ReverseMap();
            }
        });

        MapperContainer = config.CreateMapper();
    }
}
