using System;
using AutoMapper;
using System.Linq;
using HotelsApi.Dto;
using HotelsApi.DbEntities;
using HotelsApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HotelsApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HotelsController : ControllerBase
    {
        private readonly ILogger<HotelsController> _logger;
        private readonly IHotelsRepository _hotelsRepository;
        private readonly IMapper _mapper;
        
        public HotelsController(IHotelsRepository hotelsRepository, ILogger<HotelsController> logger, IMapper mapper)
        {
            _logger = logger;
            _mapper = mapper;
            _hotelsRepository = hotelsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hotel>>> Get()
        {
            var hotels = await _hotelsRepository.getHotels();
            return Ok(hotels);
        }

        [HttpPost]
        [Route("/search")]
        public async Task<ActionResult<IEnumerable<Hotel>>> SearchHotels([FromBody] HotelSearchCriteria criteria)
        {
            var data = await _hotelsRepository.getHotels();

            if (HotelSearchCriteria.HasCriteria(criteria))
            {
                Func<HotelDto, bool> nameCriteria = e => string.IsNullOrWhiteSpace(criteria.Name) ||
                                                        (!string.IsNullOrWhiteSpace(e.name) && e.name.ToLower().Contains(criteria.Name.ToLower()));
                Func<HotelDto, bool> ratingCriteria = e => !criteria.RatingFilter.HasValue || (criteria.RatingFilter.Value == e.rating);
                data = data.Where(r => nameCriteria(r) && ratingCriteria(r));
            }

            var hotels = data.Select(r => this._mapper.Map<Hotel>(r)).ToList();

            return Ok(hotels);
        }
    }
}
