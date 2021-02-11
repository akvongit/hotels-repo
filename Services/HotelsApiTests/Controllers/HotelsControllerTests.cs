using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using HotelsApi.Controllers;
using HotelsApi.DbEntities;
using HotelsApi.Dto;
using HotelsApi.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using NUnit.Framework;
using System.Net;
using System.Linq;

namespace HotelsApiTests.Controllers
{
    [TestFixture]
    public class HotelsControllerTests
    {
        private HotelsController _controller;
        private Mock<IHotelsRepository> _hotelsRepository;
        private Mock<ILogger<HotelsController>> _logger;
        private Mock<IMapper> _mapper;
        private IList<HotelDto> _hotels;
        
        private IEnumerable<HotelDto> Hotels
        {
            get
            {
                if (_hotels == null)
                {
                    _hotels = new List<HotelDto>();

                    _hotels.Add(new HotelDto() { id = 1, name = "Hotel One", description = "Hotel One description", location = "Hotel One location", price = 1000, rating = 1 });
                    _hotels.Add(new HotelDto() { id = 2, name = "Hotel Two", description = "Hotel Two description", location = "Hotel Two location", price = 2000, rating = 3 });
                    _hotels.Add(new HotelDto() { id = 3, name = "Hotel Three", description = "Hotel Three description", location = "Hotel Three location", price = 3000, rating = 4 });
                    _hotels.Add(new HotelDto() { id = 4, name = "Hotel Four", description = "Hotel Four description", location = "Hotel Four location", price = 4000, rating = 2 });
                    _hotels.Add(new HotelDto() { id = 5, name = "Hotel Five", description = "Hotel Five description", location = "Hotel Five location", price = 5000, rating = 3 });
                    _hotels.Add(new HotelDto() { id = 6, name = "Hotel Six", description = "Hotel Six description", location = "Hotel Six location", price = 6000, rating = 5 });
                    _hotels.Add(new HotelDto() { id = 7, name = "Hotel Seven", description = "Hotel Seven description", location = "Hotel Seven location", price = 7000, rating = 2 });
                    _hotels.Add(new HotelDto() { id = 8, name = "Hotel Eight", description = "Hotel Eight description", location = "Hotel Eight location", price = 8000, rating = 3 });
                    _hotels.Add(new HotelDto() { id = 9, name = "Hotel Nine", description = "Hotel Nine description", location = "Hotel Nine location", price = 9000, rating = 2 });
                    _hotels.Add(new HotelDto() { id = 10, name = "Hotel Ten", description = "Hotel Ten description", location = "Hotel Ten location", price = 10000, rating = 5 });
                }

                return _hotels;
            }
        }

        [SetUp]
        public void Setup()
        {
            _mapper = new Mock<IMapper>();
            _mapper.Setup(x => x.Map<HotelDto, Hotel>(It.IsAny<HotelDto>())).Returns(new Hotel());

            _logger = new Mock<ILogger<HotelsController>>();
            
            _hotelsRepository = new Mock<IHotelsRepository>();
            _hotelsRepository.Setup(r => r.getHotels()).Returns(Task.FromResult(this.Hotels));

            _controller = new HotelsController(_hotelsRepository.Object, _logger.Object, _mapper.Object);
        }

        [Test]
        public async Task TestGetAllHotels() 
        {
            ActionResult<IEnumerable<Hotel>> response = await _controller.Get();
            var result = response.Result as OkObjectResult;
            var data = result.Value;
            Assert.IsNotNull(result);
            Assert.AreEqual(result.StatusCode, (int)HttpStatusCode.OK);
            Assert.AreEqual(data, this.Hotels);
        }

        //TODO: Improve method assertion...
        [Test]
        public async Task TestGetFilterMatchingNamedHotels()
        {
            HotelSearchCriteria criteria = new HotelSearchCriteria() { Name = "N"  };

            ActionResult<IEnumerable<Hotel>> response = await _controller.SearchHotels(criteria);
            var result = response.Result as OkObjectResult;
            var data = result.Value as IEnumerable<Hotel>;
            Assert.IsNotNull(result);
            Assert.AreEqual(result.StatusCode, (int)HttpStatusCode.OK);
            var matching = Hotels.Where(r => r.name.ToLower().Contains(criteria.Name.ToLower())).ToList();
            Assert.AreEqual(data.Count(), matching.Count());
        }


        //TODO: Improve method assertion...
        [Test]
        public async Task TestGetFilterMatchingRatingHotels()
        {
            HotelSearchCriteria criteria = new HotelSearchCriteria() { Rating = "1" };

            ActionResult<IEnumerable<Hotel>> response = await _controller.SearchHotels(criteria);
            var result = response.Result as OkObjectResult;
            var data = result.Value as IEnumerable<Hotel>;
            Assert.IsNotNull(result);
            Assert.AreEqual(result.StatusCode, (int)HttpStatusCode.OK);
            var matching = Hotels.Where(r => r.rating == float.Parse(criteria.Rating)).ToList();
            Assert.AreEqual(data.Count(), matching.Count());
        }

        [Test]
        public async Task TestNoHotelsReturnedWhenNonMatchingCriteria()
        {
            HotelSearchCriteria criteria = new HotelSearchCriteria() { Rating = "1", Name = "zXRT" };

            ActionResult<IEnumerable<Hotel>> response = await _controller.SearchHotels(criteria);
            var result = response.Result as OkObjectResult;
            var data = result.Value as IEnumerable<Hotel>;
            Assert.IsNotNull(result);
            Assert.AreEqual(result.StatusCode, (int)HttpStatusCode.OK);
            Assert.AreEqual(data.Count(), 0);
        }
    }
}
