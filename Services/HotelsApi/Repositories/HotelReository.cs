using HotelsApi.DbEntities;
using HotelsApi.Dto;
using HotelsApi.Repositories.Interfaces;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace HotelsApi.Repositories
{
    public class HotelsRepository : IHotelsRepository
    {
        private IList<HotelDto> _hotels = new List<HotelDto>();

        // Ideally this should come from database but its this particular scenario we lazy load and store the JSON file.
        private async Task<IEnumerable<HotelDto>> LoadHotels()
        {
            if (!_hotels.Any())
            {
                using (var fileStream = File.OpenRead(@"Resources/hotels.json"))
                {
                    return await JsonSerializer.DeserializeAsync<IList<HotelDto>>(fileStream);
                }
            }

            return await Task.FromResult<IList<HotelDto>>(_hotels);
        }

        public async Task<IEnumerable<HotelDto>> getHotels()
        {
            return await LoadHotels();
        }
        public async Task<IEnumerable<HotelDto>> getHotelsByCriteria(HotelSearchCriteria criteria)
        {
            if (HotelSearchCriteria.HasCriteria(criteria))
            {
                IEnumerable<HotelDto> data = await LoadHotels();

                if (!string.IsNullOrWhiteSpace(criteria.Name))
                {
                    data = data.Where(r => !string.IsNullOrWhiteSpace(r.name) && r.name.ToLower().Contains(criteria.Name.ToLower()));
                }

                if (criteria.RatingFilter.HasValue)
                {
                    data = data.Where(r => r.rating == criteria.RatingFilter);
                }

                return await Task.FromResult(data);
            }
            else
            {
                return await LoadHotels();
            }
        }
    }
}
