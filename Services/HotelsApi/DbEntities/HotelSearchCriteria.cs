using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelsApi.DbEntities
{
    public class HotelSearchCriteria
    {
        private string _rating;

        public string Name { get; set; }

        //Minor Hack Quick code. JSON Serializer does not Deserialize to non string types.
        public string Rating
        {
            get
            {
                return _rating;
            }
            set
            {
                _rating = value;
                AssignRatingFilter(value);
            }
        }
        internal float? RatingFilter { get; set; }

        public static bool HasCriteria(HotelSearchCriteria criteria)
        {
            return criteria != null && (!string.IsNullOrWhiteSpace(criteria.Name) || criteria.RatingFilter.HasValue);
        }

        private void AssignRatingFilter(string value)
        {
            float parsedValue = 0;
            this.RatingFilter = null;
            if (float.TryParse(value, out parsedValue))
            {
                this.RatingFilter = parsedValue;
            }
        }
    }
}
