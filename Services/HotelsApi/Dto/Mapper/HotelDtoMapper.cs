using AutoMapper;
using HotelsApi.DbEntities;

namespace HotelsApi.Dto.Mapper
{
    public class HotelDtoMapper : Profile
    {
        public HotelDtoMapper()
        {
            CreateMap<HotelDto, Hotel>()
                .ForMember(target => target.Id, source => source.MapFrom(s => s.id))
                .ForMember(target => target.Name, source => source.MapFrom(s => s.name))
                .ForMember(target => target.Price, source => source.MapFrom(s => s.price))
                .ForMember(target => target.Description, source => source.MapFrom(s => s.description))
                .ForMember(target => target.Location, source => source.MapFrom(s => s.location))
                .ForMember(target => target.Rating, source => source.MapFrom(s => s.rating));
        }
    }
}
