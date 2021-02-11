using HotelsApi.DbEntities;
using HotelsApi.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelsApi.Repositories.Interfaces
{
    public interface IHotelsRepository
    {
        Task<IEnumerable<HotelDto>> getHotels();
        Task<IEnumerable<HotelDto>> getHotelsByCriteria(HotelSearchCriteria criteria);
    }
}
