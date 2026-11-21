// ==========================================================
// data.js - the data of the whole site
// Every object in the array has these properties:
//   id    - unique name without spaces (used to save favorites and observations)
//   name  - name shown on the page
//   type  - "planet", "star" or "galaxy" (used by the catalog filters)
//   fact  - short curious fact
//   image - path to the image file
//   alt   - text that describes the image
// To add a new object, copy one block, change the values and keep the comma
// between objects (but not after the last one)
// ==========================================================

const universeObjects = [
    // ==================== PLANETS ====================
    {
        id: "earth",
        name: "Earth",
        type: "planet",
        fact: "Earth is the only known planet with life. About 71% of its surface is covered by water.",
        image: "images/planet/earth.webp",
        alt: "Earth seen from space, NASA Blue Marble"
    },
    {
        id: "mars",
        name: "Mars",
        type: "planet",
        fact: "Mars is home to Olympus Mons, the tallest known volcano in the Solar System, approximately 22 km high.",
        image: "images/planet/mars.webp",
        alt: "Full disk view of Mars"
    },
    {
        id: "jupiter",
        name: "Jupiter",
        type: "planet",
        fact: "Jupiter is the largest planet in the Solar System. Its Great Red Spot is a gigantic storm that has lasted for centuries.",
        image: "images/planet/jupiter.webp",
        alt: "Jupiter photographed by Cassini"
    },
    {
        id: "saturn",
        name: "Saturn",
        type: "planet",
        fact: "Saturn has an enormous ring system made mostly of ice, rocky debris, and dust.",
        image: "images/planet/saturn.webp",
        alt: "Saturn and its rings photographed by Voyager 1"
    },
    {
        id: "neptune",
        name: "Neptune",
        type: "planet",
        fact: "Neptune is the most distant planet from the Sun and has some of the fastest winds in the Solar System.",
        image: "images/planet/neptune.webp",
        alt: "Neptune photographed by Voyager 2"
    },

    // ==================== GALAXIES ====================
    {
        id: "milky-way",
        name: "Milky Way",
        type: "galaxy",
        fact: "Our home galaxy contains hundreds of billions of stars and has a supermassive black hole at its center.",
        image: "images/galaxy/milky-way.webp",
        alt: "Artist's conception of the Milky Way galaxy"
    },
    {
        id: "andromeda",
        name: "Andromeda Galaxy",
        type: "galaxy",
        fact: "Andromeda is the nearest large spiral galaxy to the Milky Way, approximately 2.5 million light-years away.",
        image: "images/galaxy/andromeda.webp",
        alt: "Andromeda Galaxy"
    },
    {
        id: "whirlpool",
        name: "Whirlpool Galaxy",
        type: "galaxy",
        fact: "The Whirlpool Galaxy is famous for its beautiful spiral arms and its interaction with a smaller companion galaxy.",
        image: "images/galaxy/whirlpool.webp",
        alt: "Whirlpool Galaxy M51"
    },
    {
        id: "sombrero",
        name: "Sombrero Galaxy",
        type: "galaxy",
        fact: "The Sombrero Galaxy is recognizable by its bright central bulge and prominent dark dust lane.",
        image: "images/galaxy/sombrero.webp",
        alt: "Sombrero Galaxy M104"
    },
    {
        id: "pinwheel",
        name: "Pinwheel Galaxy",
        type: "galaxy",
        fact: "The Pinwheel Galaxy is a large spiral galaxy estimated to contain nearly one trillion stars.",
        image: "images/galaxy/pinwheel.webp",
        alt: "Pinwheel Galaxy M101"
    },

    // ==================== STARS ====================
    {
        id: "sun",
        name: "The Sun",
        type: "star",
        fact: "The Sun contains approximately 99.86% of the total mass of the Solar System.",
        image: "images/sun/sun.webp",
        alt: "The Sun with solar activity captured by NASA's SDO"
    },
    {
        id: "sirius",
        name: "Sirius",
        type: "star",
        fact: "Sirius is the brightest star in the night sky as seen from Earth. It is approximately 8.6 light-years away.",
        image: "images/sun/sirius.webp",
        alt: "Sirius, the brightest star in the night sky"
    },
    {
        id: "betelgeuse",
        name: "Betelgeuse",
        type: "star",
        fact: "Betelgeuse is a red supergiant star in Orion. Its diameter is hundreds of times larger than the Sun's.",
        image: "images/sun/betelgeuse.webp",
        alt: "Betelgeuse, a red supergiant star"
    },
    {
        id: "arcturus",
        name: "Arcturus",
        type: "star",
        fact: "Arcturus is an orange giant star and one of the brightest stars visible from Earth.",
        image: "images/sun/arcturus.webp",
        alt: "Arcturus compared to the Sun"
    },
    {
        id: "antares",
        name: "Antares",
        type: "star",
        fact: "Antares is a red supergiant star in the constellation Scorpius. Its name means rival of Mars.",
        image: "images/sun/antares.webp",
        alt: "Antares, a red supergiant star"
    }
];
