export default window => {
  const document = window.document;

  //Table of Latest Measurements
  const table_body_HorsensM = document.getElementById("HorsensMeasurements");
  const table_body_AarhusM = document.getElementById("AarhusMeasurements");
  const table_body_Copenhagen = document.getElementById(
    "CopenhagenMeasurements"
  );
  //Last 5 days of measurements Data
  const table_body5_HorsensM = document.getElementById("value-Row-Horsens");
  const table_body5_AarhusM = document.getElementById("value-Row-Aarhus");
  const table_body5_Copenhagen = document.getElementById(
    "value-Row-Copenhagen"
  );
  //24 Hours predictions
  const predictions_Aarhus = document.getElementById("HourlyPredictionAarhus");
  const predictions_Horsens = document.getElementById(
    "HourlyPredictionHorsens"
  );
  const predictions_Cph = document.getElementById("HourlyPredictionCph");

  //Last Measurements
  const addWeatherHistoryHorsens = weatherData => {
    const tr = table_body_HorsensM.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(
      document.createTextNode(weatherData.value + "" + weatherData.unit)
    );
    tr.insertCell().appendChild(
      document.createTextNode(
        weatherData.time.split("T")[0] + " " + weatherData.time.split("T")[1]
      )
    );
  };
  const addWeatherHistoryAarhus = weatherData => {
    const tr = table_body_AarhusM.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(
      document.createTextNode(weatherData.value + "" + weatherData.unit)
    );
    tr.insertCell().appendChild(
      document.createTextNode(
        weatherData.time.split("T")[0] + " " + weatherData.time.split("T")[1]
      )
    );
  };
  const addWeatherHistoryCopenhagen = weatherData => {
    const tr = table_body_Copenhagen.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(
      document.createTextNode(weatherData.value + "" + weatherData.unit)
    );
    tr.insertCell().appendChild(
      document.createTextNode(
        weatherData.time.split("T")[0] + " " + weatherData.time.split("T")[1]
      )
    );
  };
  //Last 5 days
  const add5DaysDataHistoryHorsens = weatherData => {
    const tr = table_body5_HorsensM.appendChild(document.createElement("tr"));

    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    if (weatherData.length > 1) {
      tr.insertCell().appendChild(
        document.createTextNode(
          weatherData.value[0] + "---" + weatherData.value[1]
        )
      );
    } else {
      tr.insertCell().appendChild(document.createTextNode(weatherData.value));
    }
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  const add5DaysDataHistoryAarhus = weatherData => {
    const tr = table_body5_AarhusM.appendChild(document.createElement("tr"));

    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    if (weatherData.length > 1) {
      tr.insertCell().appendChild(
        document.createTextNode(
          weatherData.value[0] + "---" + weatherData.value[1]
        )
      );
    } else {
      tr.insertCell().appendChild(document.createTextNode(weatherData.value));
    }
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  const add5DaysDataHistoryCopenhagen = weatherData => {
    const tr = table_body5_Copenhagen.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    if (weatherData.length > 1) {
      tr.insertCell().appendChild(
        document.createTextNode(
          weatherData.value[0] + "---" + weatherData.value[1]
        )
      );
    } else {
      tr.insertCell().appendChild(document.createTextNode(weatherData.value));
    }
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  //Predictions
  const addPredictionsAarhus = weatherData => {
    const tr = predictions_Aarhus.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.time));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(document.createTextNode(weatherData.from));
    tr.insertCell().appendChild(document.createTextNode(weatherData.to));
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  const addPredictionsHorsens = weatherData => {
    const tr = predictions_Horsens.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.time));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(document.createTextNode(weatherData.from));
    tr.insertCell().appendChild(document.createTextNode(weatherData.to));
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  const addPredictionsCph = weatherData => {
    const tr = predictions_Cph.appendChild(document.createElement("tr"));
    tr.insertCell().appendChild(document.createTextNode(weatherData.time));
    tr.insertCell().appendChild(document.createTextNode(weatherData.type));
    tr.insertCell().appendChild(document.createTextNode(weatherData.from));
    tr.insertCell().appendChild(document.createTextNode(weatherData.to));
    tr.insertCell().appendChild(document.createTextNode(weatherData.unit));
  };
  const update = model => {
    //****Step 1 ----Empty current data from tables

    //Latest Data
    while (table_body_HorsensM.firstChild)
      table_body_HorsensM.removeChild(table_body_HorsensM.firstChild);
    while (table_body_AarhusM.firstChild)
      table_body_AarhusM.removeChild(table_body_AarhusM.firstChild);
    while (table_body_Copenhagen.firstChild)
      table_body_Copenhagen.removeChild(table_body_Copenhagen.firstChild);

    //Last 5 days
    while (table_body5_HorsensM.firstChild)
      table_body5_HorsensM.removeChild(table_body5_HorsensM.firstChild);
    while (table_body5_AarhusM.firstChild)
      table_body5_AarhusM.removeChild(table_body5_AarhusM.firstChild);
    while (table_body5_Copenhagen.firstChild)
      table_body5_Copenhagen.removeChild(table_body5_Copenhagen.firstChild);

    //Predictions Tables
    while (predictions_Aarhus.firstChild)
      predictions_Aarhus.removeChild(predictions_Aarhus.firstChild);
    while (predictions_Horsens.firstChild)
      predictions_Horsens.removeChild(predictions_Horsens.firstChild);
    while (predictions_Cph.firstChild)
      predictions_Cph.removeChild(predictions_Cph.firstChild);

    //****Step2 ----Populate the tables
    //Latest Data Tables
    //Horsens
    model
      .getLatestWeatherHistoryForAllTypes("Horsens")
      .forEach(addWeatherHistoryHorsens);
    //Aarhus
    model
      .getLatestWeatherHistoryForAllTypes("Aarhus")
      .forEach(addWeatherHistoryAarhus);
    //Copenhagen
    model
      .getLatestWeatherHistoryForAllTypes("Copenhagen")
      .forEach(addWeatherHistoryCopenhagen);

    //Last 5 Days
    model.get5DaysData("Horsens").forEach(add5DaysDataHistoryHorsens);
    model.get5DaysData("Aarhus").forEach(add5DaysDataHistoryAarhus);
    model.get5DaysData("Copenhagen").forEach(add5DaysDataHistoryCopenhagen);

    //Predictions Tables
    model.weather24HPredictionsAarhus().forEach(addPredictionsAarhus);
    model.weather24HPredictionsHorsens().forEach(addPredictionsHorsens);
    model.weather24HPredictionsCopenhagen().forEach(addPredictionsCph);
  };
  const prompt = window.prompt.bind(window);
  return {
    update,
    prompt
  };
};
