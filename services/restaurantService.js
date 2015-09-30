/**
 * Created by a on 9/9/2015.
 */
"use strict";

exports.restaurants = function (req, res) {

  console.log("Restaurant LIST");
  var outText = JSON.stringify([
    {
      id: 1,
      name: "Bob's wok"
    },
    {
      id: 2,
      name: "Marylin's bites"
    },
    {
      id: 3,
      name: "MC's"
    }
  ]);

  res.send(outText);
};

exports.restaurantDetail = function (req, res) {
  var id = req.params.restaurantId;
  console.log("Restaurant DETAIL");
  res.json({
    id: id,
    name: "Bob's wok",
    location: "1 Grand Str."
  });
};
