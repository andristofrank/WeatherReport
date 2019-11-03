const model = (
  weatherHistoryHorsens,
  weatherHistoryAarhus,
  weatherHistoryCopenhagen,
  weatherPredictionHorsens,
  weatherPredictionAarhus,
  weatherPredictionChp,
  filter = () => true
) => {
  const getLatestWeatherHistoryForTypeAndTown = function(type, town) {
    switch (town) {
      case "Horsens":
        var newDta = weatherHistoryHorsens.filter(function(wd) {
          return wd.type === type;
        });
        return newDta[newDta.length - 1];
      case "Aarhus":
        var newDta = weatherHistoryAarhus.filter(function(wd) {
          return wd.type === type;
        });
        return newDta[newDta.length - 1];
      case "Copenhagen":
        var newDta = weatherHistoryCopenhagen.filter(function(wd) {
          return wd.type === type;
        });
        return newDta[newDta.length - 1];
    }
  };
  const getLatestWeatherHistoryForAllTypes = function(town) {
    return [
      getLatestWeatherHistoryForTypeAndTown("temperature", town),
      getLatestWeatherHistoryForTypeAndTown("wind speed", town),
      getLatestWeatherHistoryForTypeAndTown("precipitation", town),
      getLatestWeatherHistoryForTypeAndTown("cloud coverage", town)
    ];
  };
  function parseDate(date) {
    var dateTime = date.split("T");
    var date = dateTime[0].split("-");
    return date[2];
  }
  function getlast5DaysofData(town) {
    var now = new Date();
    var fiveDaysAgo = now.getUTCDate() - 5;
    switch (town) {
      case "Horsens":
        return weatherHistoryHorsens.filter(function(wd) {
          return parseDate(wd.time) >= fiveDaysAgo;
        });
      case "Aarhus":
        return weatherHistoryAarhus.filter(function(wd) {
          return parseDate(wd.time) >= fiveDaysAgo;
        });
      case "Copenhagen":
        return weatherHistoryCopenhagen.filter(function(wd) {
          return parseDate(wd.time) >= fiveDaysAgo;
        });
    }
  }
  const getMinMaxTemperature = function(town) {
    return getlast5DaysofData(town)
      .filter(function(wd) {
        return wd.type === "temperature";
      })
      .reduce((acc, val) => {
        acc[0] =
          acc[0] === undefined || val.value < acc[0] ? val.value : acc[0];
        acc[1] =
          acc[1] === undefined || val.value > acc[1] ? val.value : acc[1];
        return acc;
      }, []);
  };
  const getTotalPrecipitation = function(town) {
    return getlast5DaysofData(town)
      .filter(function(wd) {
        return wd.type === "precipitation";
      })
      .reduce((acc, val) => {
        return acc + val.value;
      }, 0);
  };

  const getAverageCloudCoverage = function(town) {
    var count = 0;
    return (
      getlast5DaysofData(town)
        .filter(function(wd) {
          return wd.type === "cloud coverage";
        })
        .reduce((acc, val) => {
          count += 1;
          return acc + parseFloat(val.value);
        }, 0) / count
    );
  };

  const getDominantWindDirection = function(town) {
    var direction = [
      "North",
      "Northeast",
      "East",
      "Southeast",
      "South",
      "Southwest",
      "West",
      "Northwest"
    ];
    var counters = [0, 0, 0, 0, 0, 0, 0, 0];
    var other = getlast5DaysofData(town)
      .filter(function(wd) {
        return wd.type === "wind speed";
      })
      .reduce((counters, val) => {
        direction.forEach((element, index) => {
          if (element === val.direction) {
            if (!counters[index]) counters[index] = 1;
            else counters[index] = counters[index] + 1;
          }
        });
        return counters;
      }, []);
    return direction[other.indexOf(Math.max(...other))];
  };
  const get5DaysData = function(town) {
    return [
      {
        type: "Temperature Average",
        value: getMinMaxTemperature(town),
        unit: "C"
      },
      {
        type: "Dominant Wind Direction",
        value: getDominantWindDirection(town),
        unit: "Direction"
      },
      {
        type: "Total precipitation",
        value: getTotalPrecipitation(town),
        unit: "mm"
      },
      {
        type: "Average Cloud Coverage",
        value: getAverageCloudCoverage(town),
        unit: "%"
      }
    ];
  };
  function getDateObject(time) {
    var dateTime = time.split("T");
    var date = dateTime[0].split("-");
    var time = dateTime[1].split(":");
    return {
      year: date[0],
      month: date[1],
      day: date[2],
      hour: time[0]
    };
  }
  const weather24HPredictionsHorsens = function() {
    var now = new Date();
    var in24h = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCMilliseconds()
    );
    return weatherPredictionHorsens
      .filter(function(wp) {
        var tempDate = new Date(wp.time);
        return tempDate >= now && tempDate <= in24h;
      })
      .map(function(weatherPrediction) {
        return {
          type: weatherPrediction.type,
          time: getDateObject(weatherPrediction.time).hour,
          from: weatherPrediction.from,
          to: weatherPrediction.to,
          unit: weatherPrediction.unit
        };
      });
  };
  const weather24HPredictionsAarhus = function() {
    var now = new Date();
    var in24h = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCMilliseconds()
    );
    return weatherPredictionAarhus
      .filter(function(wp) {
        var tempDate = new Date(wp.time);
      return tempDate >= now && tempDate <= in24h
      })
      .map(function(weatherPrediction) {
        return {
          type: weatherPrediction.type,
          time: getDateObject(weatherPrediction.time).hour,
          from: weatherPrediction.from,
          to: weatherPrediction.to,
          unit: weatherPrediction.unit
        };
      });
  };
  const weather24HPredictionsCopenhagen = function() {
    var now = new Date();
    var in24h = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCMilliseconds()
    );
    return weatherPredictionChp
      .filter(function(wp) {
        var tempDate = new Date(wp.time);

        return tempDate > now && tempDate < in24h;
      })
      .map(function(weatherPrediction) {
        var tempDate = new Date(weatherPrediction.time);
        return {
          type: weatherPrediction.type,
          time: tempDate.getUTCHours(),
          from: weatherPrediction.from,
          to: weatherPrediction.to,
          unit: weatherPrediction.unit
        };
      });
  };
  return {
    getLatestWeatherHistoryForTypeAndTown,
    getLatestWeatherHistoryForAllTypes,
    get5DaysData,
    weather24HPredictionsHorsens,
    weather24HPredictionsAarhus,
    weather24HPredictionsCopenhagen
  };
};

export default model;
