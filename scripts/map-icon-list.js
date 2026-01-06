/**
 * @class MapIconList
 * @classdesc
 * Provides a comprehensive list of categorized map icon names and their corresponding keys.
 * Includes utility methods to retrieve, sort, and combine icon sets for use in mapping and dashboard applications.
 * 
 * Categories include:
 * - Arts and Culture
 * - Conference and Indoors
 * - Education and Institutions
 * - Food and Beverage
 * - Medical and Health
 * - Roadway Signs, Travel, and Transportation
 * - Nature and Outdoors
 * - Amusement Park and Carnival
 * - Shopping and Services
 * - Public Restrooms
 * - Other
 * 
 * All icon sets are returned as objects with key-value pairs, where the key is the icon identifier and the value is the display name.
 * 
 * @example
 * // Get all icons sorted alphabetically by name
 * const allIcons = MapIconList.getAllIcons();
 * 
 * // Get only popular icons
 * const popularIcons = MapIconList.getPopularIcons();
 */
class MapIconList {

  /**
   * This function sorts the icons object alphabetically by icon name.
   *  Note: This could potentially be a function call under base.js
   * 
   * @param {object} icons Key-value pair of the file name and icon name
   * @returns {object} Alphabetically sorted object by icon name
   */
  static sortIcons(icons) {
    const sorted = Object.entries(icons).sort(([, a], [, b]) => {
      return a.localeCompare(b);
    });

    return Object.fromEntries(sorted);
  }

  static getAllIcons() {
    const combined = { 
      ...this.getArtsAndCultureIcons(), 
      ...this.getConferenceAndIndoorsIcons(), 
      ...this.getEducationAndInstitutionsIcons(), 
      ...this.getFoodAndBeverageIcons(), 
      ...this.getMedicalAndHealthIcons(), 
      ...this.getRoadwaySignsTravelAndTransportationIcons(), 
      ...this.getNatureAndOutdoorsIcons(), 
      ...this.getAmusementParkAndCarnivalIcons(), 
      ...this.getShoppingAndServicesIcons(), 
      ...this.getPublicRestroomsIcons(), 
      ...this.getOtherIcons()
    };

    return this.sortIcons(combined);
  }

  static getPopularIcons() {
    const icons = {
      'toilet': 'Toilet',
      'circle': 'Circle',
      'electrician': 'Electrician',
      'square': 'Square',
      'parking': 'Parking',
      'food': 'Food',
      'electrical-outlet': 'Electrical Outlet',
      'location-arrow': 'Location Arrow',
      'zoom-out': 'Zoom Out',
      'trash': 'Trash',
      'atm': 'ATM',
      'park': 'Park',
      'male': 'Male',
      'female': 'Female',
      'police': 'Police',
      'wheelchair': 'Wheelchair',
      'health': 'Health',
      'bar': 'Bar',
      'restaurant': 'Restaurant',
      'rv-park': 'RV Park',
    }

    // TODO: Confirm if we want to sort the popular icons
    // return this.sortIcons(icons);
    return icons;
  }

  static getArtsAndCultureIcons() {
    const icons = {
      'aquarium': 'Aquarium',
      'art-gallery': 'Art Gallery',
      'beauty-salon': 'Beauty Salon',
      'book-store': 'Book Store',
      'night-club': 'Night Club',
      'painter': 'Painter',
      'guitar': 'Guitar',
    }

    return this.sortIcons(icons);
  }

  static getConferenceAndIndoorsIcons() {
    const icons = {
      'accounting': 'Accounting',
      'circle-table': 'Circle Table',
      'eight-people-oval-table': 'Eight People Oval Table',
      'eight-people-round-table': 'Eight People Round Table',
      'face-to-face': 'Face To Face',
      'meeting-table': 'Meeting Table',
      'nine-people-round-table': 'Nine People Round Table',
      'rectangular-table': 'Rectangular Table',
      'six-people-hexagonal-table': 'Six People Hexagonal Table',
      'six-people-oval-table': 'Six People Oval Table',
      'six-people-rectangular-table': 'Six People Rectangular Table',
      'square-table': 'Square Table',
      'ten-people-round-table': 'Ten People Round Table',
      'three-people-round-table': 'Three People Round Table',
    }

    return this.sortIcons(icons);
  }

  static getEducationAndInstitutionsIcons() {
    const icons = {
      'atm': 'Atm',
      'bank': 'Bank',
      'courthouse': 'Courthouse',
      'university': 'University',
      'church': 'Church',
      'city-hall': 'City Hall',
      'courthouse': 'Courthouse',
      'embassy': 'Embassy',
      'school': 'School',
      'lawyer': 'Lawyer',
      'library': 'Library',
      'local-government': 'Local Government',
      'hospital': 'Hospital',
      'post-box': 'Post Box',
      'post-office': 'Post Office',
      'police-station': 'Police Station',
      'police': 'Police',
      'political': 'Political',
    }

    return this.sortIcons(icons);
  }

  static getFoodAndBeverageIcons() {
    const icons = {
      'restaurant': 'Restaurant',
      'food': 'Food',
      'beer-mug': 'Beer Mug',
      'cafe': 'Cafe',
      'food-truck1': 'Food Truck 1',
      'food-truck2': 'Food Truck 2',
      'food-truck3': 'Food Truck 3',
      'food-truck4': 'Food Truck 4',
      'food-truck5': 'Food Truck 5',
      'burger': 'Burger',
      'chicken-leg': 'Chicken Leg',
      'coffee-cup': 'Coffee Cup',
      'croissant': 'Croissant',
      'donut': 'Donut',
      'hotdog': 'Hotdog',
      'ice-cream-cone': 'Ice Cream Cone',
      'pizza-slice': 'Pizza Slice',
      'popcorn': 'Popcorn',
      'water-bottle': 'Water Bottle',
      'bakery': 'Bakery',
      'bar': 'Bar',
      'drinking-fountain': 'Drinking Fountain',
      'fish-cleaning': 'Fish Cleaning',
      'water-spigot': 'Water Spigot',
    }

    return this.sortIcons(icons);
  }

  static getMedicalAndHealthIcons() {
    const icons = {
      'dentist': 'Dentist',
      'doctor': 'Doctor',
      'aed': 'AED',
      'aed-heart-1': 'AED Heart 1',
      'aed-heart-2': 'AED Heart 2',
      'aed-heart-3': 'AED Heart 3',
      'aed-kit': 'AED Kit',
      'first-aid-kit': 'First Aid Kit',
      'medical-kit': 'Medical Kit',
    }

    return this.sortIcons(icons);
  }

  static getRoadwaySignsTravelAndTransportationIcons() {
    const icons = {
      'accessible-parking-1': 'Accessible Parking 1',
      'accessible-parking-2': 'Accessible Parking 2',
      'compass': 'Compass',
      'compass-east': 'East',
      'compass-north': 'North',
      'compass-south': 'South',
      'compass-west': 'West',
      'curved-arrow': 'Curved Arrow',
      'direction': 'Direction',
      'direction-arrow': 'Direction Arrow',
      'direction-arrow-all-sides': 'Direction Arrow All Sides',
      'direction-left-right': 'Direction Left Right',
      'location-arrow': 'Location Arrow',
      'map-pin-1': 'Map Pin 1',
      'map-pin-2': 'Map Pin 2',
      'map-pin-3': 'Map Pin 3',
      'barrier': 'Barrier',
      'one-way': 'One Way',
      'parking-area': 'Parking Area',
      'railroad': 'Railroad',
      'road-merging': 'Road Merging',
      'road-sign-1': 'Road Sign 1',
      'road-sign-2': 'Road Sign 2',
      'road-sign-3': 'Road Sign 3',
      'three-lane': 'Three Lane',
      'traffic-cone': 'Traffic Cone',
      'traffic-light': 'Traffic Light',
      'two-way': 'Two Way',
      'escalator-down-1': 'Escalator Down 1',
      'escalator-down-2': 'Escalator Down 2',
      'escalator-up-1': 'Escalator Up 1',
      'escalator-up-2': 'Escalator Up 2',
      'lift': 'Lift',
      'lift-button': 'Lift Button',
      'stair-descend': 'Stair Descend',
      'bus-station': 'Bus Station',
      'bus-stop-1': 'Bus Stop 1',
      'bus-stop-2': 'Bus Stop 2',
      'bus-stop-pointer': 'Bus Stop Pointer',
      'airport': 'Airport',
      'subway-station': 'Subway Station',
      'taxi-stand': 'Taxi Stand',
      'train-station': 'Train Station',
      'transit-station': 'Transit Station',
      'route': 'Route',
      'route-pin': 'Route Pin',
      'parking': 'Parking',
      'chairlift': 'Chairlift',
      'postal-code': 'Postal Code',
      'postal-code-prefix': 'Postal Code Prefix',
      'square-pin': 'Square Pin',
      'expand': 'Expand',
      'wheelchair': 'Wheelchair',
    }

    return this.sortIcons(icons);
  }

  static getNatureAndOutdoorsIcons() {
    const icons = {
      'abseiling': 'Abseiling',
      'archery': 'Archery',
      'baseball': 'Baseball',
      'bowling-alley': 'Bowling Alley',
      'canoe': 'Canoe',
      'cross-country-skiing': 'Cross Country Skiing',
      'fishing': 'Fishing',
      'skateboarding': 'Skateboarding',
      'skiing': 'Skiing',
      'sledding': 'Sledding',
      'ski-jumping': 'Ski Jumping',
      'snowboarding': 'Snowboarding',
      'snowmobile': 'Snowmobile',
      'snow-shoeing': 'Snow Shoeing',
      'surfing': 'Surfing',
      'swimming': 'Swimming',
      'tennis': 'Tennis',
      'waterskiing': 'Waterskiing',
      'whale-watching': 'Whale Watching',
      'wind-surfing': 'Wind Surfing',
      'zoo': 'Zoo',
      'lake-tree': 'Lake Tree',
      'palm-trees-1': 'Palm Trees 1',
      'palm-trees-2': 'Palm Trees 2',
      'tree-1': 'Tree 1',
      'tree-2': 'Tree 2',
      'tree-3': 'Tree 3',
      'trees-1': 'Trees 1',
      'trees-2': 'Trees 2',
      'trees-3': 'Trees 3',
      'trees-4': 'Trees 4',
      'boating': 'Boating',
      'boat-ramp': 'Boat Ramp',
      'boat-tour': 'Boat Tour',
      'campground': 'Campground',
      'snow': 'Snow',
      'climbing': 'Climbing',
      'diving': 'Diving',
      'scuba-diving': 'Scuba Diving',
      'sailing': 'Sailing',
      'kayaking': 'Kayaking',
      'jet-skiing': 'Jet Skiing',
      'inline-skating': 'Inline Skating',
      'ice-fishing': 'Ice Fishing',
      'ice-skating': 'Ice Skating',
      'rv-park': 'Rv Park',
      'rafting': 'Rafting',
      'hang-gliding': 'Hang Gliding',
      'park': 'Park',
      'fireworks': 'Fireworks',
      'marina': 'Marina',
      'natural-feature': 'Natural Feature',
    }

    return this.sortIcons(icons);
  }

  static getAmusementParkAndCarnivalIcons() {
    const icons = {
      'amusement-park': 'Amusement Park',
      'balloon-dog': 'Balloon Dog',
      'bass-drum': 'Bass Drum',
      'beer-glass': 'Beer Glass',
      'bicycle': 'Bicycle',
      'blower-whistle': 'Blower Whistle',
      'boat-park': 'Boat Park',
      'bumper-car': 'Bumper Car',
      'calendar': 'Calendar',
      'candy-lollipop': 'Candy Lollipop',
      'cannon': 'Cannon',
      'carousel': 'Carousel',
      'circus-hat': 'Circus Hat',
      'circus-tent': 'Circus Tent',
      'clown': 'Clown',
      'confetti': 'Confetti',
      'costume-dancer': 'Costume Dancer',
      'crown': 'Crown',
      'crystal-fortune': 'Crystal Fortune',
      'dart': 'Dart',
      'drum': 'Drum',
      'ears-bunny': 'Ears Bunny',
      'elephant': 'Elephant',
      'ferris-wheel': 'Ferris Wheel',
      'flag-decoration': 'Flag Decoration',
      'headbands': 'Headbands',
      'head-dress': 'Head Dress',
      'hot-air-balloon': 'Hot Air Balloon',
      'jester': 'Jester',
      'juggling': 'Juggling',
      'lion': 'Lion',
      'magic-hat': 'Magic Hat',
      'maracas': 'Maracas',
      'marching-band-bass-drum': 'Marching Band Bass Drum',
      'marching-band-drum': 'Marching Band Drum',
      'marching-band-trumpet': 'Marching Band Trumpet',
      'mask': 'Mask',
      'merry-go-round': 'Merry Go Round',
      'monkey': 'Monkey',
      'music': 'Music',
      'parade-car': 'Parade Car',
      'playing-card': 'Playing Card',
      'roller-coaster': 'Roller Coaster',
      'stage': 'Stage',
      'stall': 'Stall',
      'stand': 'Stand',
      'ticket': 'Ticket',
      'trumpet': 'Trumpet',
      'seals': 'Seals',
      'tamer': 'Tamer',
      'unicycle': 'Unicycle',
    }

    return this.sortIcons(icons);
  }

  static getShoppingAndServicesIcons() {
    const icons = {
      'moving-company': 'Moving Company',
      'plumber': 'Plumber',
      'car-dealer': 'Car Dealer',
      'car-rental': 'Car Rental',
      'car-repair': 'Car Repair',
      'car-wash': 'Car Wash',
      'clothing-store': 'Clothing Store',
      'convenience-store': 'Convenience Store',
      'composting': 'Composting',
      'department-store': 'Department Store',
      'electrician': 'Electrician',
      'electronics-store': 'Electronics Store',
      'shopping-mall': 'Shopping Mall',
      'spa': 'Spa',
      'roofing-contractor': 'Roofing Contractor',
      'fire-department': 'Fire Department',
      'fire-hydrant': 'Fire Hydrant',
      'fire-station': 'Fire Station',
      'furniture-store': 'Furniture Store',
      'grocery-or-supermarket': 'Grocery Or Supermarket',
      'funeral-home': 'Funeral Home',
      'gas-station': 'Gas Station',
      'general-contractor': 'General Contractor',
      'florist': 'Florist',
      'laundry': 'Laundry',
      'locksmith': 'Locksmith',
      'lodging': 'Lodging',
      'movie-rental': 'Movie Rental',
      'movie-theater': 'Movie Theater',
      'moving-company': 'Moving Company',
      'museum': 'Museum',
      'hindu-temple': 'Hindu Temple',
      'insurance-agency': 'Insurance Agency',
      'jewelry-store': 'Jewelry Store',
      'real-estate-agency': 'Real Estate Agency',
      'recycling': 'Recycling',
      'stadium': 'Stadium',
      'storage': 'Storage',
      'store': 'Store',
      'synagogue': 'Synagogue',
      'travel-agency': 'Travel Agency',
      'gym': 'Gym',
      'hair-care': 'Hair Care',
      'hand-wash': 'Hand Wash',
      'hardware-store': 'Hardware Store',
      'pet-store': 'Pet Store',
      'pharmacy': 'Pharmacy',
      'physiotherapist': 'Physiotherapist',
      'place-of-worship': 'Place Of Worship',
      'playground': 'Playground',
      'point-of-interest': 'Point Of Interest',
      'mosque': 'Mosque',
      'veterinary-care': 'Veterinary Care',
      'liquor-store': 'Liquor Store',
    }

    return this.sortIcons(icons);
  }

  static getPublicRestroomsIcons() {
    const icons = {
      'public-toilet-1': 'Public Toilet 1',
      'public-toilet-2': 'Public Toilet 2',
      'toilet': 'Toilet',
      'unisex': 'Unisex',
    }

    return this.sortIcons(icons);
  }

  static getOtherIcons() {
    const icons = {
      'assistive-listening-system': 'Assistive Listening System',
      'audio-description': 'Audio Description',
      'braille': 'Braille',
      'casino': 'Casino',
      'cemetery': 'Cemetery',
      'crosshairs': 'Crosshairs',
      'circle': 'Circle',
      'low-vision-access': 'Low Vision Access',
      'volume-control-telephone': 'Volume Control Telephone',
      'zoom-in': 'Zoom In',
      'zoom-in-alt': 'Zoom In Alt',
      'zoom-out': 'Zoom Out',
      'zoom-out-alt': 'Zoom Out Alt',
      'finance': 'Finance',
      'closed-captioning': 'Closed Captioning',
      'electrical-outlet': 'Electrical Outlet',
      'music-notes': 'Music Notes',
      'trash': 'Trash',
      'search': 'Search',
      'sign-language': 'Sign Language',
      'square': 'Square',
      'check-in': 'Check In',
      'female': 'Female',
      'fullscreen': 'Fullscreen',
      'male': 'Male',
      'health': 'Health',
      'microphone': 'Microphone',
      'open-captioning': 'Open Captioning',
      'square-rounded': 'Square Rounded',
    }

    return this.sortIcons(icons);
  }
}