﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HotelsApi.DbEntities
{
    public class Hotel
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public float Rating { get; set; }

        public float Price { get; set; }

        public string Location { get; set; }

    }
}
